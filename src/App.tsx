import "./App.css";
import Footer from "./components/footer/Footer.tsx";
import SignUp from "./components/signUp/SignUp.tsx";
import SignIn from "./components/signIn/SignIn.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import Trips from "./components/trips/Trips.tsx";
import TripsCompany from "./components/dashboard/pages/trips/Trips.tsx";
import AddBus from "./components/dashboard/pages/add_bus/AddBus.tsx";
import Buses from "./components/dashboard/pages/buses/Buses.tsx";
import Settings from "./components/dashboard/pages/settings/Settings.tsx";
import Employees from "./components/dashboard/pages/employees/Employees.tsx";
import SeatsOnTrip from "./components/dashboard/pages/seatsOnTrip/SeatsOnTrip.tsx";
import AddTraveler from "./components/dashboard/pages/add_traveler/AddTraveler.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import Bill from "./components/bill/Bill.tsx";
import AddEmployee from "./components/dashboard/pages/add_employee/AddEmployee.tsx";
import AddTrip from "./components/dashboard/pages/add_trip/AddTrip.tsx";
import MyTrips from "./components/my_trips/MyTrips.tsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home.tsx";
import ScrollToTop from "./utilities/ScrollToTop.tsx";
import SeatSelection from "./components/seat_selection/SeatSelection.tsx";
import { useReducer } from "react";
import {
    UserContext,
    userReducer,
    User,
} from "./utilities/Contexts/UserContext.ts";
import TravelerInfo from "./components/traveler_info/TravelerInfo.tsx";
import UserSettings from "./components/user_settings/UserSettings.tsx";
import {
    Employee,
    EmployeeContext,
    employeeReducer,
} from "./utilities/Contexts/EmployeeContext.ts";
import DashboardSignIn from "./components/dashboard/DashboardSignIn.tsx";

export default function App() {
    const userJson = sessionStorage.getItem("user");
    const employeeJson = sessionStorage.getItem("employee");

    const user = userJson ? (JSON.parse(userJson) as User) : null;
    const employee = employeeJson
        ? (JSON.parse(employeeJson) as Employee)
        : null;

    const [userState, userDispatcher] = useReducer(
        userReducer,
        user ?? new User()
    );
    const [employeeState, employeeDispatcher] = useReducer(
        employeeReducer,
        employee ?? new Employee()
    );

    const router = createBrowserRouter(
        [
            {
                path: "/",
                element: (
                    <UserContext.Provider
                        value={{ state: userState, dispatcher: userDispatcher }}
                    >
                        <ScrollToTop />
                        <Navbar />
                        <Outlet />
                        <Footer />
                    </UserContext.Provider>
                ),
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: "Trips",
                        element: <Trips />,
                    },
                    {
                        path: "SignUp",
                        element: <SignUp />,
                    },
                    {
                        path: "SignIn",
                        element: <SignIn />,
                    },
                    {
                        path: "MyTrips",
                        element: <MyTrips />,
                    },
                    {
                        path: "Trip/SeatSelection",
                        element: <SeatSelection />,
                    },
                    {
                        path: "Trip/TravelerInfo",
                        element: <TravelerInfo />,
                    },
                    {
                        path: "Trip/Bill",
                        element: <Bill />,
                    },
                    {
                        path: "UserSettings",
                        element: <UserSettings />,
                    },
                ],
            },
            {
                path: "/Company",
                element: (
                    <EmployeeContext.Provider
                        value={{
                            state: employeeState,
                            dispatcher: employeeDispatcher,
                        }}
                    >
                        <ScrollToTop />
                        <Outlet />
                    </EmployeeContext.Provider>
                ),
                children: [
                    {
                        path: "SignIn",
                        element: <DashboardSignIn />,
                    },
                    {
                        path: "Dashboard",
                        element: <Dashboard />,
                        children: [
                            {
                                path: "Buses",
                                element: <Buses />,
                            },
                            {
                                path: "AddBus",
                                element: <AddBus />,
                            },
                            {
                                index: true,
                                element: <TripsCompany />,
                            },
                            {
                                path: "Settings",
                                element: <Settings />,
                            },
                            {
                                path: "Employees",
                                element: <Employees />,
                            },
                            {
                                path: "AddEmployee",
                                element: <AddEmployee />,
                            },
                            {
                                path: "AddTrip",
                                element: <AddTrip />,
                            },
                            {
                                path: "SeatsOnTrip",
                                element: <SeatsOnTrip />,
                            },
                            {
                                path: "AddTraveler",
                                element: <AddTraveler />,
                            },
                        ],
                    },
                ],
            },
        ],
        { basename: "/App" }
    );

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
