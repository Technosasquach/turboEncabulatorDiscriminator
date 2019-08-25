import * as React from "react";

import { NameGen } from "./content/names";

import "./AnswerBox.less";

export class AnswerBox extends React.Component<{a: {text: any, quote: any, returnFunc: Function}}, any> {

    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e: any) {
        this.props.a.returnFunc();
    }

    render() {
        return (
            <div className="answerBox">
                <div className="left">
                    <span>{this.props.a.text}</span>
                </div>
                <div className="right">
                    <div className="quotePane">
                        <h3>Quotes:</h3>
                        <QuoteBox quote={this.props.a.quote}/>
                        <QuoteBox quote={this.props.a.quote}/>
                        <QuoteBox quote={this.props.a.quote}/>
                    </div>
                </div>
                <button className="restart" onClick={this.handleClick}>Restart</button>
            </div>
        );
    }
}

export class QuoteBox extends React.Component<{quote: number}, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="quoteBox">
                <span>{NameGen.generateName()}</span>
                <br/>
                <span>${this.props.quote + Math.floor((Math.random() - 0.5) * (Math.random() * 40000))}</span>
                <br/>
                <div className="quoteButton">
                    <span>Hire them!</span>
                </div>
            </div>
        );
    }
}