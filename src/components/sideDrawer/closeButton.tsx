import React from 'react'
import styles from "./closeButton.module.css";

interface OnClickProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    x: number
    y: number
    height: number
    width: number
}

class CloseButton extends React.Component<OnClickProps> {

    render() {
        return (
            <button className={styles.close_button} onClick={this.props.onClick}>
                <svg className={styles.close_button__svg}
                     viewBox={`${this.props.x} ${this.props.y} ${this.props.width} ${this.props.height}`}>
                    <path
                        d="M-160.4 434.2l-37.2-37.2 37.1-37.1-7-7-37.1 37.1-37.1-37.1-7 7 37.1 37.1-37.2 37.2 7.1 7 37.1-37.2 37.2 37.2"/>
                </svg>
            </button>
        )
    }
}

export default CloseButton