import React, {Component} from 'react';
import styles from "./home.module.css";
import LandingTemplate from "../../pages/templates/landing";

class Home extends Component {
    render()
    {
        return (
            <LandingTemplate>
                <h1 className={[styles.tag_line, styles.horizontally_centered].join(' ')}>
                    &lt;Insert Tag line here&gt;
                </h1>
            </LandingTemplate>
        )
    }
}

export default Home