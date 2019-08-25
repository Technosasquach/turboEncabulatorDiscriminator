import * as React from "react";
import { render } from "react-dom";

import { PageWrapper } from "./PageWrapper";
import { AnswerBox } from "./AnswerBox";
import { QuestionBox } from "./QuestionBox"; 
import { LoadingBox } from "./LoadingBox";

import { Questions, IQuestion } from "./content/questions"; 

const axios = require("axios");

import "./index.less";

export default class Root extends React.Component<any, {question: IQuestion, currentQuestion: number, showPage: number, result: {text: string, quote: string}}> {


    // CONFIG
    numberOfQuestions = 10;
    shuffledQuestions = this.shuffle(Questions);

    constructor(props: any) {
        super(props);
        this.state = {
            question: this.shuffledQuestions[0],
            currentQuestion: 0,
            result: {
                text: "Loading...",
                quote: ""
            },
            showPage: 1
        }
        this.finishedQuestion = this.finishedQuestion.bind(this);
        this.finishedLoading = this.finishedLoading.bind(this);
        this.restartQuiz = this.restartQuiz.bind(this);
    }

    componentDidMount() {
        console.log("[CORE] React has loaded");
        this.requestResult();
    }

    componentWillMount() {
        console.log("[CORE] React will load");
    }
    
    finishedQuestion(result: { answer: string }) {
        // e.preventDefault()
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        })
        console.log("Current Question: " + this.state.currentQuestion);
        if(this.state.currentQuestion >= 10) {
            this.setState({
                showPage: 2
            });
            setTimeout(() => {
                this.setState({
                    showPage: 3
                });
            }, 4000);
        } else {
            // Return a new question
            if(this.shuffledQuestions[this.state.currentQuestion - 1].followup && result.answer == "yes") {
                // Follow up question exists
                this.setState({
                    question: this.shuffledQuestions[this.state.currentQuestion - 1].followup
                })
            } else {
                this.setState({
                    question: this.shuffledQuestions[this.state.currentQuestion]
                })
            }
            
        }
    }

    finishedLoading() {
        this.setState({
            showPage: 3
        });
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

    restartQuiz() {
        // console.log("Test");
    }

    render() {
        return (
            <PageWrapper returnFunc={this.restartQuiz}>
                { this.state.showPage == 1 ? 
                    <QuestionBox a={{ 
                        questionJSON: this.state.question,
                        currentQuestion: this.state.currentQuestion,
                        maxQuestions: this.numberOfQuestions,
                        callBack: this.finishedQuestion
                }}/> : undefined }
                { this.state.showPage == 3 ? 
                    <AnswerBox a={{
                        text: this.state.result.text, 
                        quote: this.state.result.quote 
                }}/> : undefined }
                { this.state.showPage == 2 ? 
                    <LoadingBox/> : undefined }
            </PageWrapper>
        );
    }

    shuffle(array: any[]): any[] {
        var currentIndex = array.length, temporaryValue, randomIndex;
        
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
}

render(
    <Root />,
    document.getElementById("root")
);