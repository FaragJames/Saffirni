import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import MainIcon from "../../assets/tour and travel.svg";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { UserContext, User } from "../../utilities/Contexts/UserContext";
import { apiClient } from "../../utilities/Axios";
import { ApiResponse } from "../../utilities/Types";
import { toast } from "react-toastify";

function stringAvatar(firstName: string, lastName: string) {
    return {
        children: `${firstName[0]}${lastName[0]}`,
    };
}

export default function Navbar() {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const user = context.state;

    const [active, setActive] = useState("navBar");
    const [signedIn, setSignedIn] = useState(false);
    const [anchorEl, setAnchorEl] = useState<
        (EventTarget & HTMLButtonElement) | null
    >(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        setSignedIn(user.id ? true : false);
    }, [user]);

    async function handleLogOut() {
        try {
            const apiResponse = (
                await apiClient.get<ApiResponse>("/Security/Account/LogOut")
            ).data;
            if (apiResponse.isSuccess) {
                if (apiResponse.message) toast.success(apiResponse.message);

                sessionStorage.removeItem("user");
                if (context.dispatcher)
                    context.dispatcher({ type: "reset", payload: new User() });
                setSignedIn(false);
                setAnchorEl(null);

                navigate("/");
                return;
            }

            apiResponse.errors?.forEach((error) => toast.error(error));
        } catch (error) {
            console.error(error);
        }
    }

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
                                            user.firstName as string,
                                            user.lastName as string
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
                                    <MenuItem>
                                        <NavLink to="/UserSettings">
                                            الإعدادات
                                        </NavLink>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogOut}>
                                        تسجيل الخروج
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
