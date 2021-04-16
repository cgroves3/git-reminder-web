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
                switch (error.code) {
                    case "auth/invalid-email":
                        setErrorMessage("Invalid email address.")
                        break
                    case "auth/user-disabled":
                        setErrorMessage("User account disabled.")
                        break
                    default:
                        setErrorMessage("Incorrect user or password.")
                        break
                }
                setErrorShown(true)
            })
        }
    }

    return (
        <div>
            <CircularProgress id={"loader"}
                              className={[styles.loader, (loaderShown ? styles.display_block : styles.hidden)].join(" ")}/>
            <div className={[styles.login_form_container, (!loaderShown ? styles.display_block : styles.hidden)].join(" ")}>
                <div className={styles.login_header}>
                    <h1>Sign in to Git Reminder</h1>
                </div>
                <Alert displayed={errorShown} message={errorMessage} dismissible={true} severity={"error"}></Alert>
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
                    <Button className={[styles.form_control, styles.login_button].join(' ')}
                            variant={"outlined"} color={"secondary"} href={"/password_reset"}>Forgot your password?</Button>
                </form>
            </div>
        </div>
    )

}

export default Login