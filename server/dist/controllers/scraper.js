"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const OSIConfig = require("./../config/osiPiDetails");
const database_1 = require("./../database");
/**
 * OSIPiAPIScraper
 *
 * @export
 * @class OSIPiAPIScraper
 */
class OSIPiAPIScraper {
    constructor() {
        this.buf = new ObjectBuffer();
    }
    /**
     * extractLinks
     * Return a array of all of the urls
     *
     * @private
     * @param {*} scrape - The given scrape object
     * @param {number} depth - Depth of the scrape
     * @returns {string[]} - Extracted links
     * @memberof OSIPiAPIScraper
     */
    extractLinks(scrape, depth) {
        var temp = [];
        //depth to indicate between databases and elements
        if (depth == 0) {
            var a = scrape['Items'];
            for (var i = 0; i < a.length; i++) {
                temp.push(a[i]['Links']['Databases']);
            }
        }
        else {
            var a = scrape['Items'];
            for (var i = 0; i < a.length; i++) {
                temp.push(a[i]['Links']['Elements']);
            }
        }
        return temp;
    }
    /**
     * scrapeWholeAPI
     * Entry point for starting the whole scrape process
     *
     * @memberof OSIPiAPIScraper
     */
    scrapeWholeAPI() {
        return __awaiter(this, void 0, void 0, function* () {
            //clear database while testing
            console.log("[Scrapper] Starting whole API scrape");
            console.log("[Scrapper] Deleting all past scrapes");
            database_1.Node.collection.deleteMany({});
            console.log("[Scrapper] Starting new recursive scrape on " + OSIConfig.default.url);
            yield this.recursiveScrape(0, OSIConfig.default.url);
        });
    }
    /**
     * recursiveScrape
     * Given a scrape, find all entries under it and store into the buffer, then call its self
     *
     * @private
     * @param {number} depth - Given scrape depth
     * @param {string} [startingURL] - Given url to scrape from
     * @param {mongoose.Types.ObjectId} [parent] - The scrape stored ID that occurred before
     * @memberof OSIPiAPIScraper
     */
    recursiveScrape(depth, startingURL, parent) {
        return __awaiter(this, void 0, void 0, function* () {
            const scrape = yield this.requestWrapper(startingURL);
            //if request returned nothing return
            if (scrape == undefined) {
                return;
            }
            //returns objectIDs for all links stored also stores parent if one exists
            const ids = this.storeScrape(depth, scrape, parent);
            //sets children on parent
            if (parent != undefined) {
                const questions = yield database_1.Node.findOne({ _id: parent });
                questions.children.push(...ids);
                questions.save();
            }
            this.buf.add(this.extractLinks(scrape, depth));
            const newDepth = depth + 1;
            //lazy to restructure this
            var i = 0;
            while (this.buf.length() >= 1) {
                //place await infront of this to slow down an excess of requests lol :P
                console.log("[Scrapper] at " + newDepth);
                this.recursiveScrape(newDepth, this.buf.next(), ids[i]);
                i++;
            }
            //indicator for finished scrape - ONLY WORKS WITH AWAIT otherwise pointless ;)
            if (depth == 0) {
                console.log("DONE");
            }
        });
    }
    /**
     * storeScrape
     *
     *
     * @private
     * @param {number} depth - Given scrape depth
     * @param {*} scrape - Scrape data object
     * @param {mongoose.Types.ObjectId} [parent] - Stored ID of parent scrape
     * @returns {Array<mongoose.Types.ObjectId>} - Stored IDs of scrapes
     * @memberof OSIPiAPIScraper
     */
    storeScrape(depth, scrape, parent) {
        var a = scrape['Items'];
        var b = [];
        for (var i = 0; i < a.length; i++) {
            const node = new database_1.Node({
                depth: depth,
                name: a[i]['Name'],
                description: a[i]['Description'],
                json: JSON.stringify(a[i]),
                parents: parent || [],
                children: []
            });
            b.push(node._id);
            node.save();
        }
        return b;
    }
    /**
     * requestWrapper
     * Wraps the request process for querying the OSPi
     *
     * @private
     * @param {string} [url] - Given URL to scrape
     * @returns {Promise<any>} - Async promise
     * @memberof OSIPiAPIScraper
     */
    requestWrapper(url) {
        return __awaiter(this, void 0, void 0, function* () {
            var a = {};
            yield axios_1.default.get(url || OSIConfig.default.url, {
                url: url || OSIConfig.default.url,
                withCredentials: true,
                auth: {
                    username: OSIConfig.default.credentials.username,
                    password: OSIConfig.default.credentials.password
                }
            }).then(response => {
                //success response
                a = response;
            }, response => {
                //fail response - checks if its just a page not existing or a request issue
                if (response.status != undefined) {
                    if (response.response.status == 502) {
                        return;
                    }
                }
                else {
                    //Timeout Issue from large request amount redoes if page exists
                    this.requestWrapper(url);
                }
            });
            return a.data;
        });
    }
}
exports.OSIPiAPIScraper = OSIPiAPIScraper;
/**
 * ObjectBuffer
 * Interim class for buffering requests
 *
 * @class ObjectBuffer
 */
class ObjectBuffer {
    constructor() {
        this.buffer = [];
    }
    /**
     * @name Adds a entry to the buffer
     * @param {any} items - Any number of elements/items can be added
     * @returns {number} New array length
     * @memberof ObjectBuffer
     */
    add(items) {
        for (var i = 0; i < items.length; i++) {
            this.buffer.unshift(items[i]);
        }
        return this.buffer.length;
    }
    /**
     * @name Retrieves and deletes the oldest entry from the buffer
     * @returns {number} New array length
     * @memberof ObjectBuffer
     */
    next() {
        return this.buffer.pop();
    }
    /**
     * @name Deletes the buffer
     * @returns {number} New array length
     * @memberof ObjectBuffer
     */
    delete() {
        this.buffer = [];
    }
    /**
     * @name Length of buffer
     * @returns {number} Array length
     * @memberof ObjectBuffer
     */
    length() {
        return this.buffer.length;
    }
}
exports.scrape = new OSIPiAPIScraper();
//# sourceMappingURL=scraper.js.map