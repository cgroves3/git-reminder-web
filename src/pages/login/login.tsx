import React from "react";
import { useHistory } from 'react-router-dom'
import {Button, CircularProgress, FormControl, Input, InputLabel} from '@material-ui/core'
import styles from "./login.module.css"
import firebase from "firebase";
import CloseButton from "../../components/sideDrawer/closeButton";

interface State {
    loaderHidden: boolean,
    errorHidden: boolean,
    email: string,
    password: string,
    error: string
}

class Login extends React.Component<any, State> {

    constructor(props: any) {
        super(props)
        this.state = {loaderHidden: true, email: "", password: "", error: "", errorHidden: true}

        this.handleErrorClose = this.handleErrorClose.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // RFC 5322 compliant regex http://emailregex.com/
    // emailRegex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")
    EmailName = "email"
    PasswordName = "password"

    handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ email: event.target.value })
    }

    handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ password: event.target.value })
    }

    handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        this.setState({loaderHidden: true})
        if (this.state.email !== "" && this.state.password !== "") {
            let promise = firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            promise.then(
                (credential: firebase.auth.UserCredential) => {
                    let history = useHistory();
                    history.push("/dashboard", credential)
                }
            ).catch((error) => {
                let errorMessage = "Incorrect user or password."
                if (error.code === "auth/user-disabled") {
                    errorMessage = "User account disabled."
                }
                this.setState({ error: errorMessage,  errorHidden: false})
                console.log("incorrect user or password.")
            })
        }
    }

    handleErrorClose() {
        this.setState({errorHidden: true})
    }

    render() {
        return (
            <div>
                <CircularProgress id={"loader"} className={[styles.loader, (this.state.loaderHidden ? styles.hidden : styles.display_block) ].join(" ")}/>
                <div className={styles.login_form_container} hidden={!this.state.loaderHidden}>
                    <div className={styles.login_header}>
                        <h1>Sign in to Git Reminder</h1>
                    </div>
                    <div className={[styles.login_error, (this.state.errorHidden ? styles.hidden : styles.display_block) ].join(" ")}>
                        {this.state.error}<CloseButton onClick={this.handleErrorClose}/>
                    </div>
                    <form className={styles.login_form} onSubmit={this.handleSubmit}>
                        <FormControl className={styles.form_control}>
                            <InputLabel>Email</InputLabel>
                            <Input type={"email"} required={true} autoComplete={"email"} id={this.EmailName} onChange={this.handleEmailChange}></Input>
                        </FormControl>
                        <FormControl className={styles.form_control}>
                            <InputLabel>Password</InputLabel>
                            <Input type={"password"} required={true} id={this.PasswordName} onChange={this.handlePasswordChange}></Input>
                        </FormControl>
                        <Button type={"submit"} className={[styles.form_control, styles.login_button].join(' ')} variant={"contained"} color={"primary"}>Sign In</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login