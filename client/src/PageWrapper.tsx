import * as React from "react";

import "./PageWrapper.less";

export class PageWrapper extends React.Component<{returnFunc: Function}, any> {

    constructor(props: any) {
        super(props);
        // this.handleClick = this.handleClick.bind(this);
    }

    // handleClick() {
    //     this.props.returnFunc();
    // }

    render() {
        return (
            <div className="pageWrapper">
                <div className="pageDecoration"></div>
                <div className="pageForeground">
                    <div className="header">
                        <span>Turbo Encabulator Discriminator</span>
                        <button className="restart">Restart</button>
                    </div>
                </div>
                <div className="pageContent">
                    {this.props.children}
                </div>                
            </div>
        );
    }
}