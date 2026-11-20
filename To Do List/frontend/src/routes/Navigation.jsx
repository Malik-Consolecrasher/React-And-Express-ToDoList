import { Link } from "react-router-dom";

function Navigator() {
    return (
        <div className="navBar">
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/" className="nav_link">
                            Register
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="nav_link">
                            Login
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navigator;