import React, {useState} from "react";
import {useHistory} from 'react-router-dom'
import {Button, CircularProgress, FormControl, Input, InputLabel} from '@material-ui/core'
import styles from "./login.module.css"
import firebase from "firebase";
import Alert from "../../components/alert/alert";

function Login() {
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loaderShown, setLoaderShown] = useState(false)
    const [errorShown, setErrorShown] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (email !== "" && password !== "") {
            setLoaderShown(true)
            let promise = firebase.auth().signInWithEmailAndPassword(email, password)
            promise.then((credential: firebase.auth.UserCredential) => {
                setLoaderShown(false)
                setErrorShown(true)
                history.push({
                    pathname: "/dashboard",
                    state: JSON.stringify(credential)
                })
            }
            ).catch((error) => {
                setLoaderShown(false)
                let errorMessage = "Incorrect user or password."
                if (error.code === "auth/user-disabled") {
                    errorMessage = "User account disabled."
                }
                setErrorMessage(errorMessage)
                setErrorShown(true)
            })
        }
    }

    const handleErrorClose = () => {
        setErrorShown(false)
    }

    return (
        <div>
            <CircularProgress id={"loader"}
                              className={[styles.loader, (loaderShown ? styles.display_block : styles.hidden)].join(" ")}/>
            <div className={[styles.login_form_container, (!loaderShown ? styles.display_block : styles.hidden)].join(" ")}>
                <div className={styles.login_header}>
                    <h1>Sign in to Git Reminder</h1>
                </div>
                <Alert displayed={errorShown} message={errorMessage} onClick={handleErrorClose}></Alert>
                <form className={styles.login_form} onSubmit={handleSubmit}>
                    <FormControl className={styles.form_control}>
                        <InputLabel>Email</InputLabel>
                        <Input type={"email"} required={true} autoComplete={"email"} onChange={handleEmailChange}></Input>
                    </FormControl>
                    <FormControl className={styles.form_control}>
                        <InputLabel>Password</InputLabel>
                        <Input type={"password"} required={true} onChange={handlePasswordChange}></Input>
                    </FormControl>
                    <Button type={"submit"} className={[styles.form_control, styles.login_button].join(' ')}
                            variant={"contained"} color={"primary"}>Sign In</Button>
                </form>
            </div>
        </div>
    )

}

export default Login