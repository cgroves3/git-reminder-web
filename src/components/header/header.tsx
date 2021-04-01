import * as React from 'react'
import {PropsWithChildren} from "react";
import styles from "./header.module.css"
import {Link} from "react-router-dom";

const Header: React.FC<PropsWithChildren<{logo: JSX.Element}>> = ({logo, children}) => {
    return <header className={styles.header}>
        <Link to="/" className={styles.logo}>
            <div className={styles.logo__svg}>
                {logo}
            </div>
        </Link>
        <div className={styles.header_children}>
            {children}
        </div>
    </header>;
}

export default Header