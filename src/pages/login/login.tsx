import React from "react";
import {Button, CircularProgress, FormControl, Input, InputLabel} from '@material-ui/core'
import styles from "./login.module.css"

interface State {
    loaderHidden: boolean
}

class Login extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {loaderHidden: true}
        console.log(this.state.loaderHidden ? "display: none" : "display: block")
    }

    // RFC 5322 compliant regex http://emailregex.com/
    emailRegex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")
    EmailName = "email"

    handleEmailSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        let emailInput = event.target.children.namedItem(this.EmailName)
        if (emailInput != null) {
            console.log(emailInput.textContent)
            if (emailInput.textContent != null && this.emailRegex.test(emailInput.textContent)) {
                // Show loader
                this.setState({loaderHidden: true})
                // Call api

            }
        }

    }

    render() {
        return (
            <div>
                <CircularProgress id={"loader"} className={[styles.loader, "display: none"].join(" ")}/>
                <div className={styles.login_form_container} hidden={!this.state.loaderHidden}>
                    <div className={styles.login_header}>
                        <h1>Sign in to Git Reminder</h1>
                    </div>
                    <form className={styles.login_form} onSubmit={this.handleEmailSubmit}>
                        <FormControl className={styles.form_control}>
                            <InputLabel>Email</InputLabel>
                            <Input type={"email"} required={true} autoComplete={"email"} name={this.EmailName}></Input>
                        </FormControl>
                        <FormControl className={styles.form_control}>
                            <InputLabel>Password</InputLabel>
                            <Input type={"password"} required={true}></Input>
                        </FormControl>
                        <Button className={[styles.form_control, styles.login_button].join(' ')} variant={"contained"} color={"primary"}>Sign In</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login