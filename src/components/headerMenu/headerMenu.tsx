import {Link} from "react-router-dom";
import React from "react";
import styles from "./headerMenu.module.css"

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
                    <Link to="/login"><button>Login</button></Link>
                    <Link to="/signup"><button>Sign Up</button></Link>
                </div>
            </div>
        )
    }
}

export default HeaderMenu;