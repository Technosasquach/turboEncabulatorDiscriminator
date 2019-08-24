import * as React from "react";

import "./LoadingBox.less";

let loadingText:Array<string>;
loadingText = ["Talking to our technicians", "Looking at your data", "Reversing the Polarity", "We're docking the phaser"];

let randomItem:string;
randomItem = "hello";

export class LoadingBox extends React.Component<any, any> {

    constructor(props:any) {
        super(props)
        
        this.state = {
          percentage: 0
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
        randomItem = loadingText[Math.floor(Math.random()*loadingText.length)];
        document.getElementsByTagName("span")[0].innerHTML = randomItem;
    }

    render() {
        return (
            <div className="loadingBox">
                <h1>Loading Encabulator...</h1>
                <ProgressBar percentage={this.state.percentage} />
                <span className = "task"></span>
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