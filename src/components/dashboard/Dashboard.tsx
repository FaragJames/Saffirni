import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TopBar from "./dashboard_components/TopBar";
import SideBar from "./dashboard_components/SideBar";
import { getDesignTokens } from "./Theme";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { EmployeeContext } from "../../utilities/Contexts/EmployeeContext";

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<string>(
        sessionStorage.getItem("currentMode") ?
            sessionStorage.getItem("currentMode") as string :
            "light"
    );
    const theme = useMemo(
        () => createTheme(getDesignTokens(mode)),
        [mode]
    );

    const navigate = useNavigate()
    const context = useContext(EmployeeContext);
    useEffect(() => {
        if (!context.state.id) {
            navigate("/Company/SignIn");
        }
    }, [context.state]);

    return (
        <ThemeProvider theme={theme}>
            <Box style={{ direction: "ltr" }} sx={{ display: "flex" }}>
                <CssBaseline />
                <TopBar
                    open={open}
                    handleDrawerOpen={() => setOpen(true)}
                    setMode={setMode}
                />

                <SideBar open={open} handleDrawerClose={() => setOpen(false)} />

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Outlet />
                </Box>
            </Box>
        </ThemeProvider>
    );
}