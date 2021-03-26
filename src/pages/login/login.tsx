import React from "react";
import LandingTemplate from "../templates/landing";

interface OnClickProps {
    onToggleButtonClicked: (event: React.MouseEvent<HTMLButtonElement>) => void
}

class Login extends React.Component<OnClickProps> {
    render() {
        return (
            <LandingTemplate onToggleButtonClicked={this.props.onToggleButtonClicked}></LandingTemplate>
        )
    }
}

export default Login