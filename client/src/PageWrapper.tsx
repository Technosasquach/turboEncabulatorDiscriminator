import * as React from "react";

import "./PageWrapper.less";

export class PageWrapper extends React.Component<{a: {returnFunc: Function}}, any> {

    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e: any) {
        // e.preventDefault();
        console.log("Hello World ");
        this.props.a.returnFunc();
    }

    render() {
        return (
            <div className="pageWrapper">
                <div className="pageDecoration"></div>
                <div className="pageForeground">
                    <div className="header">
                        <span>Turbo Encabulator Discriminator</span>
                        <button className="restart" onClick={this.handleClick}>Restart</button>
                    </div>
                </div>
                <div className="pageContent">
                    {this.props.children}
                </div>                
            </div>
        );
    }
}