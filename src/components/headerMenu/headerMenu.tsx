import React from "react";
import styles from "./headerMenu.module.css"
import { Button, MenuList, Link } from '@material-ui/core';

class HeaderMenu extends React.Component {
    render() {
        return (
            <MenuList className={styles.headerMenu}>
                {/*<div className={styles.headerMenu__signup}>*/}
                {/*    <MenuItem><Link>Features</Link></MenuItem>*/}
                {/*    <MenuItem><Link>Pricing</Link></MenuItem>*/}
                {/*</div>*/}
                <div className={styles.headerMenu__signup}>
                    <Link href={"/signin"}><Button>Sign In</Button></Link>
                    <Link href={"/signup"}><Button variant={"contained"} color={"primary"}>Sign Up</Button></Link>
                </div>
            </MenuList>
        )
    }
}

export default HeaderMenu;