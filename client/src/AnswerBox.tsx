import * as React from "react";

import { NameGen } from "./content/names";
const axios = require("axios");

import "./AnswerBox.less";

export class AnswerBox extends React.Component<{a: {text: any, quote: any, returnFunc: Function, newAnswer: Function}}, {result: {text: string, quote: number}}> {

    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleNew = this.handleNew.bind(this);
        this.state = {
            result: {
                text: "Loading...",
                quote: 0
            }
        }
    }

    componentDidMount() {
        this.requestResult();
    }

    handleClick(e: any) {
        this.props.a.returnFunc();
    }
    handleNew(e: any) {
        // this.props.a.newAnswer();
        this.requestResult();
    }

    requestResult() {
        axios.post('/question').then((resp: any) => {
            this.setState({
                result: {
                    text: resp.data.answer,
                    quote: resp.data.quote
                }
            });
        }).catch(() => {
            this.requestResult();
        })
    }

    render() {
        return (
            <div className="answerBox">
                <div className="left">
                    <span>{this.state.result.text}</span>
                </div>
                <div className="right">
                    <div className="quotePane">
                        <h3>Quotes:</h3>
                        <QuoteBox quote={this.state.result.quote}/>
                        <QuoteBox quote={this.state.result.quote}/>
                        <QuoteBox quote={this.state.result.quote}/>
                    </div>
                </div>
                <div>
                    <button className="restart" onClick={this.handleNew}>New Answer</button>
                    <br/>
                    <button className="restart" onClick={this.handleClick}>Restart</button>
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
                    <span>Hire them!</span>
                </div>
            </div>
        );
    }
}