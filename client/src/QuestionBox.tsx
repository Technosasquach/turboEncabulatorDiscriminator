import * as React from "react";

import "./QuestionBox.less";

export class QuestionBox extends React.Component<any, any> {

    render() {
        return (
            <div className="questionBox">
                <div className="questions">
                    <ul id="questionNumbers">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                </div>
                <h1>QuestionBox</h1>
            </div>
        );
    }
}