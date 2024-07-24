import "./App.css";
import Footer from "./components/footer/Footer.tsx";
import SignUp from "./components/signUp/SignUp.tsx";
import SignIn from "./components/signIn/SignIn.tsx";
import AppDashboard from "./components/dashbord/AppDashbord.tsx";
import Trips from "./components/trips/Trips.tsx";
import TripsCompany from "./components/dashbord/pages/trips/Trips.tsx";
import AddBus from "./components/dashbord/pages/addBus/AddBus.tsx";
import Buses from "./components/dashbord/pages/buses/Buses.tsx";
import Sitting from "./components/dashbord/pages/sitting/Sitting.tsx";
import Employees from "./components/dashbord/pages/employees/Employees.tsx";
import SeatsOnTrip from "./components/dashbord/pages/seatsOnTrip/SeatsOnTrip.tsx";
import AddTraveler from "./components/dashbord/pages/addTraveler/AddTraveler.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import Bill from "./components/bill/Bill.tsx";
import AddEmployee from "./components/dashbord/pages/addEmplowee/AddEmployee.tsx";
import AddTrip from "./components/dashbord/pages/addTrip/AddTrip.tsx";
import MyTrips from "./components/my_trips/MyTrips.tsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home.tsx";
import ScrollToTop from "./utilities/ScrollToTop.tsx";
import SeatSelection from "./components/seat_selection/SeatSelection.tsx";
import { useReducer } from "react";
import { DataContext, reducer, User } from "./utilities/Context.ts";

export default function App() {
    const userJson = sessionStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) as User : null
    const [state, dispatcher] = useReducer(reducer, user ?? new User())

    const router = createBrowserRouter(
        [
            {
                path: "/",
                element: (
                    <DataContext.Provider value={{ state: state, dispatcher: dispatcher }}>
                        <ScrollToTop />
                        <Navbar />
                        <Outlet />
                        <Footer />
                    </DataContext.Provider>
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
                    // {
                    //     path: "/TravelerInfo",
                    //     element: <TravelerInfo numReservedSeats={numReservedSeats} />,
                    // },
                    {
                        path: "/Bill",
                        element: <Bill />,
                    },
                    {
                        path: "/Check-in",
                        element: <div>Error 404</div>,
                    },
                ],
            },
            {
                path: "/Dashboard",
                element: (
                    <>
                        <ScrollToTop />
                        <AppDashboard />
                    </>
                ),
                children: [
                    {
                        path: "Buses",
                        element: <Buses />,
                    },
                    {
                        path: "SddBus",
                        element: <AddBus />,
                    },
                    {
                        path: "TripsCompany",
                        element: <TripsCompany />,
                    },
                    {
                        path: "Sitting",
                        element: <Sitting />,
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
        { basename: "/App" }
    );

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}