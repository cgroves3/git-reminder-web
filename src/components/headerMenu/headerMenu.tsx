import {Link} from "react-router-dom";
import React from "react";

class HeaderMenu extends React.Component {
    render() {
        return (
            <ul>
                <li><Link to="/services">Services and Pricing</Link></li>
            </ul>
        )
    }
}

export default HeaderMenu;