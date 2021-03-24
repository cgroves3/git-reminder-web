import React, {Component} from 'react';
import styles from "./home.module.css";
import LandingTemplate from "../../pages/templates/landing";

interface OnClickProps {
    onToggleButtonClicked: (event: React.MouseEvent<HTMLButtonElement>) => void
}

class Home extends Component<OnClickProps> {
    render()
    {
        return (
            <LandingTemplate onToggleButtonClicked={this.props.onToggleButtonClicked}>
                <h1 className={[styles.tag_line, styles.horizontally_centered].join(' ')}>
                    &lt;Insert Tag line here&gt;
                    <div id="firebaseui-auth-container"></div>
                    <div id="loader">Loading...</div>
                </h1>
            </LandingTemplate>
        )
    }
}

export default Home