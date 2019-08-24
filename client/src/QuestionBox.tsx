import * as React from "react";

import { EQuestionType, IQuestion } from "./content/questions";

import "./QuestionBox.less";

export class QuestionBox extends React.Component<{ a: {questionJSON: IQuestion, currentQuestion: number, maxQuestions: number, callBack: Function} }, { selectedOption: string }> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            selectedOption: "",
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.questionClass = this.questionClass.bind(this);
    }

    //question = this.props.questionJSON;

    handleOptionChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    handleClick(e: any) {
        //e.preventDefault();
        console.log('The next button was clicked.');
        this.props.a.callBack({ answer: "HelloWorld" });
    }

    questionClass(questionNumber: number) {
        if (questionNumber < this.props.a.currentQuestion) {
            return "passedQuestion";
        } else if (questionNumber > this.props.a.currentQuestion) {
            return "futureQuestion";
        } else {
            return "currentQuestion";
        }
    }

    numQuestions = Array.from(Array(this.props.a.maxQuestions).keys());

    render() {
        return (
            <div className="questionBox">
                <div className="questionBoxContent">
                    <div className="questionNumbers">  

                        { this.numQuestions.map((number) => {
                            return <div className={this.questionClass(number+1)}>{number+1}</div>
                        })}   
                    </div>
                    <div className="textSection">
                        <div className="question">
                            <h1>{ this.props.a.questionJSON.question }</h1>
                        </div>
                        
                        {(() => {
                            switch(this.props.a.questionJSON.type) {
                                case EQuestionType.Multi:
                                    return (
                                        <div> 
                                            <form>
                                                { (this.props.a.questionJSON.content || ["hello"]).map((choiceValue) => {
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

                        <div className="buttonCont">
                            <button className="btn" onClick={this.handleClick}>
                                <span>Next</span>
                            </button> 
                        </div>
                </div>
                </div>
            </div>
        );
    }
}