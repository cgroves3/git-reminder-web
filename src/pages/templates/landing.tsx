import React from 'react'
import Header from "../../components/header/header";
import styles from "./landing.module.css";
import {DesktopBreakpoint, PhoneBreakpoint} from "../../components/breakpoints/breakpoint";
import ToggleButton from "../../components/sideDrawer/toggleButton";
import Footer from "../../components/footer/footer";
import HeaderMenu from "../../components/headerMenu/headerMenu";
import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAVZiRpvswAn6pG_CUQCo-VOkLLkZuGaDE",
    authDomain: "git-reminders.firebaseapp.com",
    projectId: "git-reminders",
    storageBucket: "git-reminders.appspot.com",
    messagingSenderId: "756031337688",
    appId: "1:756031337688:web:a0e796c9f7df26af2d53ad",
    measurementId: "G-4LR6X31G5N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics();

const logoPath = require("../../logo.svg")

interface OnClickProps {
    onToggleButtonClicked: (event: React.MouseEvent<HTMLButtonElement>) => void
}

class LandingTemplate extends React.Component<OnClickProps> {

    constructor(props: Readonly<OnClickProps>) {
        super(props);
    }

    render()
    {
        return (
            <div>
                <Header logo={<img className={styles.img__logo} src={logoPath} alt={"Git Reminder"}/>}>
                    <DesktopBreakpoint>
                        <HeaderMenu/>
                    </DesktopBreakpoint>
                    <PhoneBreakpoint>
                        <div className={styles.toggleButton__div}>
                            <ToggleButton onClick={this.props.onToggleButtonClicked}/>
                        </div>
                    </PhoneBreakpoint>
                </Header>
                {this.props.children}
                <Footer></Footer>
            </div>
        )
    }
}

export default LandingTemplate