import React from "react";
import { useHistory } from 'react-router-dom'
import {Button, CircularProgress, FormControl, Input, InputLabel} from '@material-ui/core'
import styles from "./login.module.css"
import firebase from "firebase";

interface State {
    loaderHidden: boolean,
    error: string
}

class Login extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {loaderHidden: true, error: ""}
    }

    // RFC 5322 compliant regex http://emailregex.com/
    // emailRegex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")
    EmailName = "email"
    PasswordName = "password"

    handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        this.setState({loaderHidden: true})
        let emailInput = event.target.children.namedItem(this.EmailName)
        let pwdInput = event.target.children.namedItem(this.EmailName)
        if (emailInput != null && pwdInput != null && emailInput.textContent != null && pwdInput.textContent != null) {
            let promise = firebase.auth().signInWithEmailAndPassword(emailInput.textContent, pwdInput.textContent)
            promise.then((credential: firebase.auth.UserCredential) => {
                    let history = useHistory();
                    history.push("/dashboard", credential)
                }
            ).catch((error) => {
                let errorMessage = "Incorrect user or password."
                if (error.code === "auth/user-disabled") {
                    errorMessage = "User account disabled."
                }
                this.setState({ error: errorMessage })
            })
        }
    }

    render() {
        return (
            <div>
                <CircularProgress id={"loader"} className={[styles.loader, (this.state.loaderHidden ? styles.hidden : styles.display_block) ].join(" ")}/>
                <div className={styles.login_form_container} hidden={!this.state.loaderHidden}>
                    <div className={styles.login_header}>
                        <h1>Sign in to Git Reminder</h1>
                    </div>
                    <div>{this.state.error}</div>
                    <form className={styles.login_form} onSubmit={this.handleSubmit}>
                        <FormControl className={styles.form_control}>
                            <InputLabel>Email</InputLabel>
                            <Input type={"email"} required={true} autoComplete={"email"} id={this.EmailName}></Input>
                        </FormControl>
                        <FormControl className={styles.form_control}>
                            <InputLabel>Password</InputLabel>
                            <Input type={"password"} required={true} id={this.PasswordName}></Input>
                        </FormControl>
                        <Button type={"submit"} className={[styles.form_control, styles.login_button].join(' ')} variant={"contained"} color={"primary"}>Sign In</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login