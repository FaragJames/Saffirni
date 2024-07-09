import { useState } from "react";
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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
    // @ts-ignore
})(({ theme, open }) => ({
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

const TopBar = ({ open, handleDrawerOpen, setMode }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openMen = Boolean(anchorEl); // Check if anchorEl is truthy

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: "none" }),
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Box flexGrow={1} />

                <Stack direction="row">
                    {theme.palette.mode === "light" ? (
                        <IconButton
                            onClick={() => {
                                localStorage.setItem(
                                    "currentMode",
                                    theme.palette.mode === "dark"
                                        ? "light"
                                        : "dark"
                                );
                                setMode((prevMode) =>
                                    prevMode === "light" ? "dark" : "light"
                                );
                            }}
                            color="inherit"
                        >
                            <LightModeOutlinedIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={() => {
                                localStorage.setItem(
                                    "currentMode",
                                    theme.palette.mode === "dark"
                                        ? "light"
                                        : "dark"
                                );
                                setMode((prevMode) =>
                                    prevMode === "light" ? "dark" : "light"
                                );
                            }}
                            color="inherit"
                        >
                            <DarkModeOutlinedIcon />
                        </IconButton>
                    )}

                    <IconButton
                        color="inherit"
                        id="basic-button"
                        aria-controls={openMen ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMen ? "true" : undefined}
                        onClick={handleClickMenu}
                    >
                        <Person2OutlinedIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMen} // Use openMen to control menu visibility
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                // Handle logout logic
                                handleClose();
                            }}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
