import React, {useState} from 'react'
import {useHistory} from "react-router-dom";
import { Button, CircularProgress, FormControl, Input, InputLabel} from "@material-ui/core";
import styles from "../login/login.module.css";
import ApiSettings from "../../ApiSettings";
import Alert from "../../components/alert/alert";

function SignUp() {
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [loaderShown, setLoaderShown] = useState(false)
    const [errorShown, setErrorShown] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // RFC 5322 compliant regex http://emailregex.com/
    // emailRegex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword( e.target.value)
    }

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value)
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoaderShown( true)
        if (email !== "" && password !== "") {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': ApiSettings.host,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    displayName: fullName,
                    email: email,
                    password: password
                })
            };
            let promise = fetch(`${ApiSettings.host}:${ApiSettings.port}/api/users`, requestOptions)
            promise.then(
                (response: Response) => {
                    setLoaderShown(false)
                    if (response.ok) {
                        let textPromise = response.text()
                        textPromise.then((body: string) => {
                            console.log(`Received response=${body}`)
                            history.push({
                                pathname: "/dashboard",
                                state: body
                            })
                        })
                    }
                    else {
                        let responsePromise = response.json()
                        responsePromise.then(body => {
                            console.log(`Received error response=${body}`)
                            setErrorMessage(body.error_message)
                            setErrorShown(true)
                        })
                    }
                }
            ).catch((error) => {
                setLoaderShown(false)
                setErrorMessage("Error creating new user account.")
                setErrorShown(true)
                console.log(`Received error=${error}`)
            })
        }
    }

    const handleErrorClose = () => {
        setErrorShown(false)
    }

    return (
        <div>
            <CircularProgress id={"loader"} className={[styles.loader, (loaderShown ? styles.display_block : styles.hidden) ].join(" ")}/>
            <div className={[styles.login_form_container, (!loaderShown ? styles.display_block : styles.hidden)].join(" ")}>
                <div className={styles.login_header}>
                    <h1>Sign up for Git Reminder</h1>
                </div>
                <Alert displayed={errorShown} message={errorMessage} onClick={handleErrorClose}></Alert>
                <form className={styles.login_form} onSubmit={handleSubmit}>
                    <FormControl className={styles.form_control}>
                        <InputLabel>Full Name</InputLabel>
                        <Input type={"text"} required={true} autoComplete={"name"} onChange={handleFullNameChange}></Input>
                    </FormControl>
                    <FormControl className={styles.form_control}>
                        <InputLabel>Email</InputLabel>
                        <Input type={"email"} required={true} autoComplete={"email"} onChange={handleEmailChange}></Input>
                    </FormControl>
                    <FormControl className={styles.form_control}>
                        <InputLabel>Password</InputLabel>
                        <Input type={"password"} required={true} onChange={handlePasswordChange}></Input>
                    </FormControl>
                    <Button type={"submit"} className={[styles.form_control, styles.login_button].join(' ')} variant={"contained"} color={"primary"}>Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default SignUp