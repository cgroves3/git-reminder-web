import React from "react";
import { FormControl, Input, InputLabel } from '@material-ui/core'
import styles from "./login.module.css"

class Login extends React.Component {
    render() {
        return (
            <div className={ styles.login_form_container }>
                <div className={ styles.login_form_page }>
                    <div className={ styles.login_form }>
                        <FormControl className={ styles.form_control }>
                            <InputLabel>Email</InputLabel>
                            <Input required={true}></Input>
                        </FormControl>
                        <FormControl className={ styles.form_control }>
                            <InputLabel>Password</InputLabel>
                            <Input required={true}></Input>
                        </FormControl>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login