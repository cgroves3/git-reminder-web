import React from "react";
import {Button, FormControl, Input, InputLabel} from '@material-ui/core'
import styles from "./login.module.css"

class Login extends React.Component {
    render() {
        return (
            <div className={styles.login_form_container}>
                <div className={styles.login_header}>
                    <h1>Sign in to Git Reminder</h1>
                </div>
                <form className={styles.login_form}>
                    <FormControl className={styles.form_control}>
                        <InputLabel>Email</InputLabel>
                        <Input type={"email"} required={true}></Input>
                    </FormControl>
                    <FormControl className={styles.form_control}>
                        <InputLabel>Password</InputLabel>
                        <Input type={"password"} required={true}></Input>
                    </FormControl>
                    <Button className={[styles.form_control, styles.login_button].join(' ')} variant={"contained"} color={"primary"}>Sign In</Button>
                </form>
            </div>
        )
    }
}

export default Login