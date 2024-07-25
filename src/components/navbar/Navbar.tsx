import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import MainIcon from "../../assets/tour and travel.svg";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DataContext, User } from "../../utilities/Context";

function stringAvatar(firstName: string, lastName: string) {
    return {
        children: `${firstName[0]}${lastName[0]}`,
    };
}

export default function Navbar() {
    const context = useContext(DataContext);
    const [active, setActive] = useState("navBar");
    const [signedIn, setSignedIn] = useState(false);
    const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (context.state.id)
            setSignedIn(true);
    }, []);

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
                                        {...stringAvatar(context.state.firstName as string,
                                            context.state.lastName as string)}
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
                                    <MenuItem>
                                    <NavLink to="/UserSitting">
                                    الإعدادات
                            </NavLink>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            if(!context.dispatcher) {
                                                throw new Error("Dispatcher is undefined!");
                                            }
                                            context.dispatcher({type: "reset", payload: new User()})
                                            setSignedIn(false);
                                            setAnchorEl(null);
                                            
                                        }}
                                    >
                                        <NavLink to="/">                                        تسجيل خروج 
</NavLink>
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