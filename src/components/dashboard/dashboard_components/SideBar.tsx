import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, styled, useTheme, Typography, Tooltip, Theme } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useContext } from "react";
import { EmployeeContext } from "../../../utilities/Contexts/EmployeeContext";
import tmpAvatar from "../../../assets/img.jpeg"

const drawerWidth = 240;
const openedMixin = (theme: Theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
    // @ts-expect-error IDK
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

export default function SideBar({
    open,
    handleDrawerClose,
}: {
    open: boolean;
    handleDrawerClose(): void
}) {
    const location = useLocation();
    const navigate = useNavigate();
    const context = useContext(EmployeeContext);
    const theme = useTheme();

    const links = [
        {
            text: "Trips",
            icon: <CardTravelIcon />,
            path: "/Company/Dashboard",
        },
        {
            text: "Employees",
            icon: <PeopleOutlinedIcon />,
            path: "/Company/Dashboard/Employees",
        },
        {
            text: "Buses",
            icon: <DirectionsBusIcon />,
            path: "/Company/Dashboard/Buses",
        },
        {
            text: "Settings",
            icon: <SettingsIcon />,
            path: "/Company/Dashboard/Settings",
        },
    ];
    return (
        <Drawer style={{ direction: "ltr" }} variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? (
                        <ChevronRightIcon />
                    ) : (
                        <ChevronLeftIcon />
                    )}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <Avatar
                sx={{
                    mx: "auto",
                    width: open ? 88 : 44,
                    height: open ? 88 : 44,
                    my: 1,
                    border: "2px solid grey",
                    transition: "0.25s",
                }}
                alt="Remy Sharp"
                src={tmpAvatar}
            />
            <Typography
                align="center"
                sx={{ fontSize: open ? 17 : 0, transition: "0.25s" }}
            >
                {`${context.state.firstName} ${context.state.lastName}`}
            </Typography>

            <Divider />

            <List>
                {links.map((item) => (
                    <ListItem
                        key={item.path}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <Tooltip
                            title={open ? null : item.text}
                            placement="left"
                        >
                            <ListItemButton
                                onClick={() => navigate(item.path)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                    bgcolor:
                                        location.pathname === item.path
                                            ? theme.palette.mode === "dark"
                                                ? grey[800]
                                                : grey[300]
                                            : null,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{ opacity: open ? 1 : 0 }}
                                />
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}