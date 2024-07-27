import { useContext, useState } from "react";
import {
    Box,
    IconButton,
    Stack,
    Toolbar,
    styled,
    useTheme,
    Menu,
    MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { apiClient } from "../../../utilities/Axios";
import { ApiResponse } from "../../../utilities/Types";
import { toast } from "react-toastify";
import { Employee, EmployeeContext } from "../../../utilities/Contexts/EmployeeContext";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const styled2 = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})
const AppBar = styled2(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function TopBar(props: {
    open: boolean;
    handleDrawerOpen(): void;
    setMode(value: React.SetStateAction<string>): void
}) {
    const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
    >(null);
    
    const context = useContext(EmployeeContext)
    const theme = useTheme();
    const navigate = useNavigate();

    async function handleLogOut() {
        try {
            const apiResponse = (
                await apiClient.get<ApiResponse>("/Security/Account/LogOut")
            ).data;
            if (apiResponse.isSuccess) {
                if (apiResponse.message) toast.success(apiResponse.message);

                sessionStorage.removeItem("employee");
                if (context.dispatcher)
                    context.dispatcher({ type: "reset", payload: new Employee() });

                navigate("/Company/SignIn");
                return;
            }

            apiResponse.errors?.forEach((error) => toast.error(error));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AppBar position="fixed" open={props.open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(props.open && { display: "none" }),
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Box flexGrow={1} />

                <Stack direction="row">
                    {theme.palette.mode !== "light" ? (
                        <IconButton
                            onClick={() => {
                                sessionStorage.setItem("currentMode", "light");
                                props.setMode("light");
                            }}
                            color="inherit"
                        >
                            <LightModeOutlinedIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={() => {
                                sessionStorage.setItem("currentMode", "dark");
                                props.setMode("dark");
                            }}
                            color="inherit"
                        >
                            <DarkModeOutlinedIcon />
                        </IconButton>
                    )}

                    <IconButton
                        color="inherit"
                        id="basic-button"
                        aria-controls={anchorEl ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorEl ? "true" : undefined}
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                        <Person2OutlinedIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null);
                                handleLogOut();
                            }}
                        >
                            تسجيل الخروج
                        </MenuItem>
                    </Menu>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}