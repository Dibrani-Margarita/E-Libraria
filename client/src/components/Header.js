import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBook, FaUser } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./Header.css";

const Header = ({ isLoggedin, setIsLoggedin }) => {
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/current-user", { withCredentials: true })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    }, [isLoggedin]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${search}`);
    };

    const goToProfile = (e) => {
        navigate("/profile/" + user.username);
    };

    const handleLogout = () => {
        axios
            .post("http://localhost:8000/logout", {}, { withCredentials: true })
            .then((res) => {
                setUser(null);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="header-column">
            <header className="header">
                <div>
                    <NavLink className="nav-link" to="/" style={{ display: "flex" }}>
                        <img src={require("../images/icon2.png")} alt="website logo" style={{ height: "40px", marginRight: "5px" }} /><h1>E-Libraria</h1>
                    </NavLink>
                </div>

                <div className="search-container">
                    <form onSubmit={handleSubmit}>
                        <button className="search-icon">
                            <FaSearch />
                        </button>
                        <input
                            type="text"
                            name="search-box"
                            placeholder="Search for books, authors, papers, etc."
                            onChange={(e) => setSearch(e.target.value)}
                            required
                        />
                    </form>
                </div>
                <div
                    className="auth"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    {user ? (
                        <div className="auth-icons">
                            <Link className="sell-icon" to="/new">
                                <FaBook />
                                ADD A BOOK
                            </Link>
                            <div>
                                <Dropdown className="user-icon">
                                    <Dropdown.Toggle className="inner-user-icon">
                                        <FaUser />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#" onClick={goToProfile}>
                                            Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#" onClick={handleLogout}>
                                            Log out
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <button
                                id="styled-button-one"
                                style={{ marginLeft: "5px", borderRadius: "15px" }}
                            >
                                <NavLink className="nav-link" to="/login">
                                    Log in
                                </NavLink>
                            </button>
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
};

export default Header;
