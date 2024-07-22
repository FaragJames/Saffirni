import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import MainIcon from "../../assets/tour and travel.svg";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { User } from "../../utilities/Context";

function stringAvatar(firstName: string, lastName: string) {
    return {
        children: `${firstName[0]}${lastName[0]}`,
    };
}

export default function Navbar() {
    const jsonUser = sessionStorage.getItem("user");
    const user = jsonUser ? JSON.parse(jsonUser) as User : null
    
    const [active, setActive] = useState("navBar");
    const [signedIn, setSignedIn] = useState(false);
    const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (user)
            setSignedIn(true);
        else
            setSignedIn(false)
    }, []);

    return (
        <section className="navBarSection">
            <header className="header flex">
                <div className="logoDiv">
                    <NavLink to="/" className="logo flex">
                        <img src={MainIcon} className="mainicon" />
                    </NavLink>
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
                            <NavLink to="/" className="navLink">
                                تواصل معنا
                            </NavLink>
                        </li>

                        {!signedIn && (
                            <button className="btn">
                                <NavLink to="/SignIn">تسجيل الدخول</NavLink>
                            </button>
                        )}

                        {signedIn && (
                            <>
                                <Button
                                    id="basic-button"
                                    aria-controls={
                                        open ? "basic-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={(event) =>
                                        setAnchorEl(event.currentTarget)
                                    }
                                >
                                    <Avatar
                                        style={{ marginLeft: "1rem" }}
                                        {...stringAvatar(
                                            user?.firstName as string,
                                            user?.lastName as string
                                        )}
                                    />
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={() => setAnchorEl(null)}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            sessionStorage.removeItem("user");
                                            setSignedIn(false);
                                            setAnchorEl(null);
                                        }}
                                    >
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </ul>
                    <div
                        onClick={() => setActive("navBar")}
                        className="closeNavbar"
                    >
                        <AiFillCloseCircle className="icon" />
                    </div>
                </div>
                <div
                    onClick={() => setActive("navBar activeNavbar")}
                    className="toggleNavbar"
                >
                    <TbGridDots className="icon" />
                </div>
            </header>
        </section>
    );
}