import * as React from "react";

import { NameGen } from "./content/names";

import "./AnswerBox.less";

export class AnswerBox extends React.Component<{a: {text: any, quote: any}}, any> {

    constructor(props: any) {
        super(props);
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
                    <span>Quote Now!</span>
                </div>
            </div>
        );
    }
}