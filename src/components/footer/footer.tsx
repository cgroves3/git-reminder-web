import React from 'react'
import styles from './footer.module.css'
import {Link} from "react-router-dom";

class Footer extends React.Component {
    render() {
        return (
            <footer className={styles.footer}>
                <Link to="/contact">Contact</Link>
                {/*Copyright Plug & Scrub*/}
            </footer>
        )
    }
}

export default Footer
