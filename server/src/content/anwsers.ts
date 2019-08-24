
import { WordsTechnoBabbleProNouns, WordsTechnoBabbleDescription, WordsCar, Templates, Starters } from "./words";
import { number } from "prop-types";

export class AnwserGenerator {


    static thingGenerator(numberOfDescriptions?: number) {
        let returnable: string[] = [];

        const shuffedProNouns: string[] = this.shuffle(WordsTechnoBabbleProNouns);
        const shuffedDescription: string[] = this.shuffle(WordsTechnoBabbleDescription);
        const numbOfDescriptions: number = numberOfDescriptions || Math.round(Math.random() * 3 + 1);

        for(let i = 0; i < numbOfDescriptions; i++) { returnable.push(shuffedDescription[i].toLowerCase()); }
        
        return [...returnable, shuffedProNouns[0]].join(" ");
    }

    static systemGenerator() {
        const shuffedProNouns = this.shuffle(WordsCar);
        return shuffedProNouns[0];
    }


    static generator() {
        // Pick a random tempate
        const templatesShuffled: string[] = this.shuffle(Templates);
        let template: string = templatesShuffled[0];

        let numberOfThings: any = template.match(/{{{thing}}}/g);
        if (numberOfThings == null) { numberOfThings = 0 } else { numberOfThings = numberOfThings.length };

        let numberOfAlsos: any = template.match(/{{{also}}}/g);
        if (numberOfAlsos == null) {
            numberOfAlsos = 0
        } else {
            numberOfAlsos = numberOfAlsos.length
        };

        // Replacing text
        for (let i = 0; i < numberOfThings; i++) {
            template = template.replace("{{{thing}}}", this.thingGenerator());
        }
        for (let i = 0; i < numberOfAlsos; i++) {
            template = template.replace("{{{also}}}", this.systemGenerator());
        }
        
        // Adding a beginning thing
        if(Math.random() > 0.6) {
            const shuffledStarters = this.shuffle(Starters);
            template = "t" + template.slice(1, template.length);
            template = shuffledStarters[0] + template;
        }

        return template;
    }




    static shuffle(array: any[]): any[] {
        var currentIndex = array.length, temporaryValue, randomIndex;
        
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
}