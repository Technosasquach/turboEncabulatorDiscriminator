import * as React from "react";

import "./LoadingBox.less";

import { LoaderMessages } from "./content/loadingMessages";

export class LoadingBox extends React.Component<any, { percentage: number, text: string }> {

    // timesAbs: number[] = [];
    // timesDiff: number[] = [];
    // values: number[] = [];
    // numberOfSeconds = Math.round(Math.random() * 4 + 2);
    // numberOfDivisions = Math.round(Math.random() * 20 + 10);
    // index = 0;

    constructor(props:any) {
        super(props)
        this.state = {
            percentage: 0,
            text: ""
        }
        this.nextStep = this.nextStep.bind(this)
    }

    // componentDidMount() {
    //     for(let i = 0; i <= this.numberOfDivisions; i++) {
    //         this.timesAbs[i] = Math.random() * this.numberOfSeconds;
    //     }
    //     this.timesAbs.sort((a: number, b: number) => { return a - b; });
    //     for(let i = 0; i < this.timesAbs.length - 1; i++) {
    //         this.timesDiff[i] = this.timesAbs[i + 1] - this.timesAbs[i];
    //     }
    //     for(let i = 0; i < this.numberOfDivisions; i++) {
    //         this.values[i] = Math.random() * 100;
    //     }
    //     console.log("TimesAbs: " + this.timesAbs);
    //     console.log("TimesAbsLength: " + this.timesAbs.length);
    //     console.log("TimesDiff: " + this.timesDiff);
    //     console.log("TimesDiffLength: " + this.timesDiff.length);
    //     console.log("Values: " + this.values);
    //     console.log("ValuesLength: " + this.values.length);
    // }

    timeOutIndex = setInterval(() => {
        this.nextStep();
    }, 800)

    // timeOutIndex = setTimeout(() => {
    //     this.nextStep(Math.floor(this.values[this.index]));
    //     this.stepTimeout();
    // }, this.timesDiff[this.index] * 1000)

    // stepTimeout() {
    //     this.timeOutIndex = setTimeout(() => {
    //         this.nextStep(Math.floor(this.values[this.index]));
    //     }, this.timesDiff[this.index] * 1000)
    // }

    nextStep(number?: number) {
        // this.index++;
        this.setState({ text: LoaderMessages.getRandomMessage() + "..." })
        if (this.state.percentage < 0) {
            this.setState({ percentage: 0 });
        } else if (this.state.percentage > 100) {
            this.setState({ percentage: 100 });
        } else {
            this.setState({
                percentage: number || this.state.percentage + (this.getRandomInt(100 - this.state.percentage))
            });
        }
    }

    getRandomInt(max:any) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    render() {
        return (
            <div className="loadingBox">
                <h3>Loading Encabulator...</h3>
                <div className="progress-bar">
                    <div className="filler" style={{ width: `${this.state.percentage}%` }} >
                        
                    </div>
                </div>
                <span className = "loadComment">{this.state.text}</span>
            </div>
        );
    }
}