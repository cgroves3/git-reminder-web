import React, {useState} from 'react'
import styles from "./alert.module.css";
import CloseButton from "../sideDrawer/closeButton";

interface AlertProps {
    displayed: boolean,
    message: string,
    dismissible: boolean,
    severity: "error" | "success"
}

function Alert(props: AlertProps & React.HTMLAttributes<HTMLDivElement>) {

    const [shown, setShown] = useState(props.displayed)

    const handleErrorClose = () => {
        setShown(false)
    }

    let styles_severity;

    switch (props.severity) {
        case "success":
            styles_severity = styles.alert_success
            break;
        case "error":
            styles_severity = styles.alert_error
            break;
    }

    return (
        <div
            className={[styles.error, (shown ? styles.display_block : styles.hidden), styles_severity].join(" ")}>
            <div className={styles.error_message}>
                {props.message}
                <CloseButton className={styles.hidden}
                             x={-280}
                             y={322}
                             height={150}
                             width={150}
                             onClick={handleErrorClose}/>
            </div>
        </div>
    )
}

export default Alert