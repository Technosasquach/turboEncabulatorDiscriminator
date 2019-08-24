import * as React from "react";

import "./PageWrapper.less";

export class PageWrapper extends React.Component<any, any> {

    render() {
        return (
            <div className="pageWrapper">
                <div className="pageDecoration">
                    <h1 id="title">Turbo Encabulator Discriminator</h1>
                </div>
                <div className="pageContent">
                    {this.props.children}
                </div>                
            </div>
        );
    }
}