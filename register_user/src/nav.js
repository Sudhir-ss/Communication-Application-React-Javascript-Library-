import { Outlet, Link } from "react-router-dom";
import "./css/Nav.css";

function Nav() {
    return (<>
        <div className="container">
            <Outlet />
        </div>
    </>
    );
}

export default Nav;