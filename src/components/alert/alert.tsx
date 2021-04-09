import React from 'react'
import styles from "./alert.module.css";
import CloseButton from "../sideDrawer/closeButton";

interface AlertProps {
    displayed: boolean,
    message: string
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function Alert(props: AlertProps) {
    return (
        <div
            className={[styles.error, (props.displayed ? styles.display_block : styles.hidden)].join(" ")}>
            <div className={styles.error_message}>
                {props.message}
                <CloseButton x={-280} y={322}
                             height={150}
                             width={150}
                             onClick={props.onClick}/>
            </div>
        </div>
    )
}

export default Alert