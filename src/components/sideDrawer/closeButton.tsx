import React from 'react'
import styles from "./closeButton.module.css";

interface CloseButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    x: number
    y: number
    height: number
    width: number
}

function CloseButton(props: CloseButtonProps & React.HTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={[styles.close_button, props.className].join(" ")} onClick={props.onClick}>
            <svg className={styles.close_button__svg}
                 viewBox={`${props.x} ${props.y} ${props.width} ${props.height}`}>
                <path
                    d="M-160.4 434.2l-37.2-37.2 37.1-37.1-7-7-37.1 37.1-37.1-37.1-7 7 37.1 37.1-37.2 37.2 7.1 7 37.1-37.2 37.2 37.2"/>
            </svg>
        </button>
    )
}

export default CloseButton