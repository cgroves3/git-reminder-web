import {Link} from "react-router-dom";
import React from "react";
import styles from "./headerMenu.module.css"
import firebase from "firebase";

class HeaderMenu extends React.Component {
    render() {
        return (
            <div className={styles.headerMenu}>
                <nav className={styles.nav}>
                    <ul>
                        <li><Link to="/features">Features</Link></li>
                        <li><Link to="/pricing">Pricing</Link></li>
                    </ul>
                </nav>
                <div className={styles.headerMenu__signup}>
                    <Link to="/signin"><button>Sign In</button></Link>
                    <Link to="/signup"><button>Sign Up</button></Link>
                </div>
            </div>
        )
    }
}

export default HeaderMenu;