import * as React from "react";
import { render } from "react-dom";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
            <h1>turboEncabulatorDiscriminator</h1>
        );
    }
}

render(
    <Root />,
    document.getElementById("root")
);