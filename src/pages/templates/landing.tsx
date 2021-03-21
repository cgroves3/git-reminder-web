import React from 'react'
import Header from "../../components/header/header";
import styles from "./landing.module.css";
import {DesktopBreakpoint, PhoneBreakpoint} from "../../components/breakpoints/breakpoint";
import ToggleButton from "../../components/sideDrawer/toggleButton";
import Footer from "../../components/footer/footer";
import HeaderMenu from "../../components/headerMenu/headerMenu";
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';

const logoPath = require("../../logo.svg")

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
// Initialize the FirebaseUI Widget using Firebase.
let ui = new firebaseui.auth.AuthUI(firebase.auth());


interface OnClickProps {
    onToggleButtonClicked: (event: React.MouseEvent<HTMLButtonElement>) => void
}

class LandingTemplate extends React.Component<OnClickProps> {

    constructor(props: Readonly<OnClickProps>) {
        super(props);
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional

        ui.start('#firebaseui-auth-container', {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ],
            // Other config options...
        });

    }


    render()
    {
        return (
            <div>
                <Header logo={<img className={styles.img__logo} src={logoPath} alt={"Git Reminder"}/>}>
                    <nav className={styles.header__nav}>
                        <DesktopBreakpoint>
                            <HeaderMenu/>
                            <div id="firebaseui-auth-container"></div>
                            <div id="loader">Loading...</div>
                        </DesktopBreakpoint>
                        <PhoneBreakpoint>
                            <div className={styles.toggleButton__div}>
                                <ToggleButton onClick={this.props.onToggleButtonClicked}/>
                            </div>
                        </PhoneBreakpoint>
                    </nav>
                </Header>
                    {this.props.children}
                <Footer></Footer>
            </div>
        )
    }
}

export default LandingTemplate