import {Link} from "react-router-dom";
import React from "react";

class HeaderMenu extends React.Component {
    render() {
        return (
            <ul>
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
            </ul>
        )
    }
}

export default HeaderMenu;