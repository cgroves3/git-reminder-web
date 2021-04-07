import React from 'react'
import {useHistory} from "react-router-dom";
import {Button, CircularProgress, FormControl, Input, InputLabel} from "@material-ui/core";
import styles from "../login/login.module.css";
import CloseButton from "../../components/sideDrawer/closeButton";
import ApiSettings from "../../ApiSettings";

interface State {
    loaderHidden: boolean,
    errorHidden: boolean,
    fullName: string,
    email: string,
    password: string,
    error: string
}

class SignUp extends React.Component<any, State> {
    constructor(props: any) {
        super(props)
        this.state = {loaderHidden: true, email: "", password: "", error: "", errorHidden: true, fullName: ""}

        this.handleErrorClose = this.handleErrorClose.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleFullNameChange = this.handleFullNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // RFC 5322 compliant regex http://emailregex.com/
    // emailRegex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")
    handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ email: event.target.value })
    }

    handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ password: event.target.value })
    }

    handleFullNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ fullName: event.target.value })
    }

    handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        this.setState({loaderHidden: true})
        if (this.state.email !== "" && this.state.password !== "") {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': ApiSettings.host,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    displayName: this.state.fullName,
                    email: this.state.email,
                    password: this.state.password
                })
            };
            let promise = fetch(`${ApiSettings.host}:${ApiSettings.port}/api/users`, requestOptions)
            promise.then(
                (response: Response) => {
                    let history = useHistory();
                    history.push("/dashboard", response)
                }
            ).catch((error) => {
                let errorMessage = "Error creating new user."
                this.setState({ error: errorMessage,  errorHidden: false})
                console.log(error)
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
                        <h1>Sign up for Git Reminder</h1>
                    </div>
                    <div className={[styles.login_error, (this.state.errorHidden ? styles.hidden : styles.display_block) ].join(" ")}>
                        <div className={styles.login_error_message}>{this.state.error}<CloseButton x={-280} y={322} height={150} width={150} onClick={this.handleErrorClose}/></div>
                    </div>
                    <form className={styles.login_form} onSubmit={this.handleSubmit}>
                        <FormControl className={styles.form_control}>
                            <InputLabel>Full Name</InputLabel>
                            <Input type={"text"} required={true} autoComplete={"name"} onChange={this.handleFullNameChange}></Input>
                        </FormControl>
                        <FormControl className={styles.form_control}>
                            <InputLabel>Email</InputLabel>
                            <Input type={"email"} required={true} autoComplete={"email"} onChange={this.handleEmailChange}></Input>
                        </FormControl>
                        <FormControl className={styles.form_control}>
                            <InputLabel>Password</InputLabel>
                            <Input type={"password"} required={true} onChange={this.handlePasswordChange}></Input>
                        </FormControl>
                        <Button type={"submit"} className={[styles.form_control, styles.login_button].join(' ')} variant={"contained"} color={"primary"}>Submit</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp