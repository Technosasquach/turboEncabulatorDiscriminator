import * as React from "react";

import "./LoadingBox.less";

import { LoaderMessages } from "./content/loadingMessages";

export class LoadingBox extends React.Component<any, { percentage: number, text: string }> {

    constructor(props:any) {
        super(props)
        
        this.state = {
          percentage: 0,
          text: ""
        }
        
        this.nextStep = this.nextStep.bind(this)
      }

    timeOutIndex = setInterval(() => {
        this.nextStep();
    }, 1000)

    nextStep() {
        this.changeText();
        if (this.state.percentage < 0)
        {
            this.setState({ percentage: 0 });
        }

        if (this.state.percentage >= 95)
        {
            this.setState({ percentage: 100 });
        }
        else
        {
            return this.setState((prevState: any) => ({ percentage: prevState.percentage + (getRandomInt(100 - this.state.percentage) * Divider())}))
        }
    }

    changeText()
    {
        this.setState({ text: LoaderMessages.getRandomMessage()});
    }

    render() {
        return (
            <div className="loadingBox">
                <h1>Loading Encabulator...</h1>
                <ProgressBar percentage={this.state.percentage} />
                <span className = "loadComment">{this.state.text}</span>
            </div>
        );
    }

}

const ProgressBar = (props:any) => {
    return (
        <div className="progress-bar">
            <Filler percentage={props.percentage}/>
        </div>
    )
}
      
const Filler = (props:any) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }} />
}

function getRandomInt(max:any) {
    return Math.floor(Math.random() * Math.floor(max));
}

function Divider()
{
    let digit:number;
    digit = getRandomInt(3);

    if (digit == 1)
    {
        return -1;
    }
    else{
        return 1;
    }
}