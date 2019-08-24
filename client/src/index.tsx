import * as React from "react";
import { render } from "react-dom";

import { PageWrapper } from "./PageWrapper";
import { AnswerBox } from "./AnswerBox";
import { QuestionBox } from "./QuestionBox"; 
import { LoadingBox } from "./LoadingBox";

import { IQuestion, EQuestionType } from "./content/questions"; 

const axios = require("axios");

import "./index.less";

export default class Root extends React.Component<any, {questions: IQuestion, answers: any, result: {text: string, quote: string}}> {

    constructor(props: any) {
        super(props);
        this.state = {
            questions: {
                question: "Have you driven on a full moon recently?",
                type: EQuestionType.Bool
            },
            answers: null,
            result: {
                text: "Loading...",
                quote: ""
            }
        }
        this.finishedQuestion = this.finishedQuestion.bind(this);
    }

    componentDidMount() {
        console.log("[CORE] React has loaded");
        this.requestResult();
    }

    componentWillMount() {
        console.log("[CORE] React will load");
    }
    
    finishedQuestion(e: Event) {
        e.preventDefault()
    }

    requestResult() {
        axios.post('/question').then((resp: any) => {
            this.setState({
                result: {
                    text: resp.data.answer,
                    quote: resp.data.quote
                }
            });
        })
    }

    questionToSend: IQuestion = {
        question: "When did you last check your tire pressure?",
        type: EQuestionType.Multi,
        content: [
            "Last Day",
            "Last Week",
            "Last Month",
            "Never",
            "My tires are pressurized?!"
        ]
    }

    render() {
        return (
            <PageWrapper>
                <QuestionBox a={{ questionJSON: this.questionToSend,
                    currentQuestion: 3,
                    maxQuestions: 10,
                    callBack: this.finishedQuestion
                }}/>
                <AnswerBox a={{text: this.state.result.text, quote: this.state.result.quote }}/>
                <LoadingBox/>
            </PageWrapper>
        );
    }
}

render(
    <Root />,
    document.getElementById("root")
);