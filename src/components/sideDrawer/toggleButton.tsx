import React, {Component} from 'react'
import styles from './toggleButton.module.css'

interface OnClickProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

 class ToggleButton extends Component<OnClickProps> {

    render() {
        return (
            <button className={styles.toggleButton} onClick={this.props.onClick}>
                <div className={styles.toggleButton__line}></div>
                <div className={styles.toggleButton__line}></div>
                <div className={styles.toggleButton__line}></div>
            </button>
        )
    }
}

export default ToggleButton