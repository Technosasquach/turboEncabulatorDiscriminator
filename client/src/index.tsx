import * as React from "react";
import { render } from "react-dom";

import { PageWrapper } from "./PageWrapper";
//import { AnswerBox } from "./AnswerBox";
import { QuestionBox } from "./QuestionBox"; 
//import { LoadingBox } from "./LoadingBox";

import "./index.less";

export default class Root extends React.Component<any, any> {

    componentDidMount() {
        console.log("[CORE] React has loaded");
    }

    componentWillMount() {
        console.log("[CORE] React will load");
    }

    render() {
        return (
            <PageWrapper>
                <QuestionBox/>
                {/* <AnswerBox/> */}
                {/* <LoadingBox/> */}
            </PageWrapper>
        );
    }
}

render(
    <Root />,
    document.getElementById("root")
);