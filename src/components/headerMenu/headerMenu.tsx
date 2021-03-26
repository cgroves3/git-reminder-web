// import {Link} from "react-router-dom";
import React from "react";
import styles from "./headerMenu.module.css"
import { Button, MenuList, Link } from '@material-ui/core';
import Login from "../../pages/login/login";

class HeaderMenu extends React.Component {
    render() {
        return (
            <MenuList className={styles.headerMenu}>
                {/*<div className={styles.headerMenu__signup}>*/}
                {/*    <MenuItem><Link>Features</Link></MenuItem>*/}
                {/*    <MenuItem><Link>Pricing</Link></MenuItem>*/}
                {/*</div>*/}
                <div className={styles.headerMenu__signup}>
                    <Link component={""}><Button>Sign In</Button></Link>
                    <Link><Button variant={"contained"} color={"primary"}>Sign Up</Button></Link>
                </div>
            </MenuList>
        )
    }
}

export default HeaderMenu;