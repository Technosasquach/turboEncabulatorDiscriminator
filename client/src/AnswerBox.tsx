import * as React from "react";

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
                        <h2>Quote:</h2>
                        <br/>
                        <span>${this.props.a.quote}</span>
                        <br/>
                        <hr/>
                        <br/>
                        <button>Pay Now</button>
                </div>
            </div>
        );
    }
}