import * as React from "react";

import { EQuestionType, IQuestion } from "./content/questions";

import "./QuestionBox.less";

export class QuestionBox extends React.Component<{ questionJSON: IQuestion/*, currentQuestion: number, maxQuestions: number, callBack: Function*/ }, { selectedOption: string }> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            selectedOption: ""
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    question = this.props.questionJSON;

    handleOptionChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    handleClick(e: any) {
        e.preventDefault();
        console.log('The next button was clicked.');
        //this.props.callBack({ anwser: "HelloWorld" })
    }
    
    numberQuestions = 5;
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    render() {
        return (
            <div className="questionBox">
                <div className="questionBoxContent">
                    <div className="questionNumbers">                  
                        { this.numbers.map((number) => {
                            return <div>{number}</div>
                        })}
                        
                    </div>
                    <h1>{ this.question.question }</h1>
                    {(() => {
                        switch(this.question.type) {
                            case EQuestionType.Multi:
                                return (
                                    <div> 
                                        <form>
                                            { (this.question.content || ["error"]).map((choiceValue) => {
                                                return ( <div className="form-check">
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="multiChoice"
                                                            value={choiceValue}
                                                            checked={this.state.selectedOption === choiceValue}
                                                            onChange={this.handleOptionChange}
                                                            className="form-check-input"
                                                        />
                                                        {choiceValue}
                                                    </label>
                                                </div> )
                                            })}                         
                                        </form>
                                    </div>
                                );
                            case EQuestionType.Numerical:
                                return (
                                    <div className="numericalAnswer">
                                        <form>
                                            <input type="text" name="number"/>                                      
                                        </form>
                                    </div>
                                );
                            case EQuestionType.Short:
                                return (
                                    <div className="shortAnswer">
                                        <form>
                                            <textarea name="response">
                                                The cat was playing in the garden.
                                            </textarea>                                          
                                        </form>
                                    </div>
                                );
                            case EQuestionType.Bool:
                                return (
                                <div> 
                                    <form>
                                        <div className="form-check">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="bool"
                                                    value="yes"
                                                    checked={this.state.selectedOption === "yes"}
                                                    onChange={this.handleOptionChange}
                                                    className="form-check-input"
                                                />
                                                Yes
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="bool"
                                                    value="no"
                                                    checked={this.state.selectedOption === "no"}
                                                    onChange={this.handleOptionChange}
                                                    className="form-check-input"
                                                />
                                                No
                                            </label>
                                        </div>
                                    </form>  
                                </div>
                                );
                            default:
                                return null;
                        }
                    })()}

                    <div className="nextButton">
                        <button onClick={this.handleClick}>
                            Next
                        </button> 
                    </div>
                </div>
            </div>
        );
    }
}