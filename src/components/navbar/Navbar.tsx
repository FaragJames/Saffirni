import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import MainIcon from "../../assets/tour and travel.svg";
 
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
}

const Navbar = () => {
    const [active, setActive] = useState("navBar");
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth === "true") {
            setAuth(true);
        }
    }, []);

    const showNav = () => {
        setActive("navBar activeNavbar");
    };

    const removeNav = () => {
        setActive("navBar");
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <section className="navBarSection">
            <header className="header flex">
                <div className="logoDiv">
                    <a href="#" className="logo flex">
                        <img src={MainIcon} className="mainicon" />
                    </a>
                </div>
                <div className={active}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <NavLink to="/" className="navLink">
                                الصفحة الرئيسية
                            </NavLink>
                        </li>
                        <li className="navItem">
                            <NavLink to="/MyTrips" className="navLink">
                                رحلاتي
                            </NavLink>
                        </li>
                        <li className="navItem">
                            <a className="navLink">تواصل معنا</a>
                        </li>

                        {!auth && (
                            <button className="btn">
                                <a href="./SignUp">تسجيل الدخول</a>
                            </button>
                        )}

                        {auth && (
                            <>
                                <Button
                                    id="basic-button"
                                    aria-controls={
                                        open ? "basic-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClickMenu}
                                >
                                    <Avatar
                                        style={{ marginLeft: "1rem" }}
                                        {...stringAvatar("Kent Dodds")}
                                    />
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            setAuth(false);
                                            localStorage.setItem(
                                                "auth",
                                                "false"
                                            );
                                            handleClose();
                                        }}
                                    >
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </ul>
                    <div onClick={removeNav} className="closeNavbar">
                        <AiFillCloseCircle className="icon" />
                    </div>
                </div>
                <div onClick={showNav} className="toggleNavbar">
                    <TbGridDots className="icon" />
                </div>
            </header>
        </section>
    );
};

export default Navbar;
