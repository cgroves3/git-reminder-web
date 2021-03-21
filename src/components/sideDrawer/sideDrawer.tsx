import React from 'react'
import styles from './sideDrawer.module.css'
import CloseButton from "./closeButton";
import HeaderMenu from "../headerMenu/headerMenu";


interface OnCloseProps {
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void
    show: boolean
}

class SideDrawer extends React.Component<OnCloseProps> {
    render() {

        let drawClasses = [styles['side-drawer']]

        if (this.props.show) {
            drawClasses.push(styles['open'])
        }

        return (
            <div className={drawClasses.join(' ')}>
                <div className={styles['side-drawer__div']}>
                    <CloseButton onClick={this.props.onClose}></CloseButton>
                    <nav>
                        <HeaderMenu/>
                    </nav>
                </div>
            </div>
        )
    }
}

export default SideDrawer