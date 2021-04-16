import React, { useState} from 'react'
import {Button, CircularProgress, FormControl, Input, InputLabel} from "@material-ui/core";
import styles from "./passwordReset.module.css";
import Alert from "../../components/alert/alert";
import {useHistory} from "react-router-dom";
import firebase from "firebase";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

function PasswordReset() {

    const history = useHistory();

    const [loaderShown, setLoaderShown] = useState(false)
    const [formShown, setFormShown] = useState(true)
    const [errorShown] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')
    const [resetSuccess, setResetSuccess] = useState(false)

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormShown(false)
        setLoaderShown(true)
        let promise = firebase.auth().sendPasswordResetEmail(email)
        promise.then(() => {
            setLoaderShown(false)
            setResetSuccess(true)
            delay(3000).then(() => history.push("/"))
        }).catch((error) => {
            switch (error.code) {
                case "auth/invalid-email":
                    setErrorMessage("Invalid email address.")
                    break
                case "auth/user-not-found":
                    setErrorMessage("User account not found.")
                    break
                default:
                    setErrorMessage("Incorrect user or password.")
                    break
            }
        })
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    return (
        <div>
            <div className={[styles.login_form_container, (formShown ? styles.display_block : styles.hidden)].join(" ")}>
                <div className={styles.login_header}>
                    <h1>Reset your password</h1>
                </div>
                <Alert displayed={errorShown} message={errorMessage} dismissible={true} severity={"error"}></Alert>
                <form className={styles.login_form} onSubmit={handleSubmit}>
                    <FormControl className={styles.form_control}>
                        <InputLabel>Email</InputLabel>
                        <Input type={"email"} required={true} autoComplete={"email"} onChange={handleEmailChange}></Input>
                    </FormControl>
                    <Button type={"submit"} className={[styles.form_control, styles.login_button].join(' ')}
                            variant={"contained"} color={"primary"}>Reset Password</Button>
                </form>
            </div>
            <CircularProgress id={"loader"}
                              className={[styles.center, (loaderShown ? styles.display_block : styles.hidden)].join(" ")}/>
            <div className={styles.center}>
                <CheckCircleOutlineIcon className={[styles.success_check, styles.success_color, (resetSuccess ? styles.display_block : styles.hidden)].join(" ")}/>
                <Alert displayed={resetSuccess}
                       message={"Password reset email successfully sent."}
                       dismissible={false}
                       severity={"success"}></Alert>
            </div>
        </div>
    )
}

export default PasswordReset