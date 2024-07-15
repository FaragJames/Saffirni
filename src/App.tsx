import { useReducer, useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer.tsx";
import SignUp from "./components/signUp/SignUp.tsx";
import SignIn from "./components/signIn/SignIn.tsx";
import Bus from "./components/bus_layout/Bus.tsx";
import AppDashboard from "./components/dashbord/AppDashbord.tsx";
import Trips from "./components/trips/Trips.tsx";
import AddBus from "./components/dashbord/pages/addBus/AddBus.tsx";
import Buses from "./components/dashbord/pages/buses/Buses.tsx";
import Sitting from "./components/dashbord/pages/sitting/Sitting.tsx";
import Employees from "./components/dashbord/pages/employees/Employees.tsx";
import TravelerInfo from "./components/traveler_info/TravelerInfo.tsx";
import Bill from "./components/bill/Bill.tsx";
import AddEmployee from "./components/dashbord/pages/addEmplowee/AddEmployee.tsx";
import AddTrip from "./components/dashbord/pages/addTrip/AddTrip.tsx";
import MyTrips from "./components/my_trips/MyTrips.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DataContext, reducer, User } from "./utilities/Context";
import Home from "./components/home/Home.tsx";
import Navbar from "./components/navbar/Navbar.tsx";

type FakeSeat = {
    number: number;
    selected: boolean;
    reserved: boolean;
};
const fakeSeatsData: Array<FakeSeat> = [
    { number: 1, selected: false, reserved: false },
    { number: 2, selected: false, reserved: false },
    { number: 3, selected: false, reserved: true },
    { number: 4, selected: false, reserved: false },
    { number: 5, selected: false, reserved: false },
    { number: 6, selected: false, reserved: false },
    { number: 7, selected: false, reserved: false },
    { number: 8, selected: false, reserved: false },
    { number: 9, selected: false, reserved: false },
    { number: 10, selected: false, reserved: false },
    { number: 11, selected: false, reserved: false },
    { number: 12, selected: false, reserved: false },
    { number: 13, selected: false, reserved: true },
    { number: 14, selected: false, reserved: false },
    { number: 15, selected: false, reserved: false },
    { number: 16, selected: false, reserved: false },
    { number: 17, selected: false, reserved: false },
    { number: 18, selected: false, reserved: false },
    { number: 19, selected: false, reserved: false },
    { number: 20, selected: false, reserved: false },
    { number: 21, selected: false, reserved: false },
    { number: 22, selected: false, reserved: false },
    { number: 23, selected: false, reserved: true },
    { number: 24, selected: false, reserved: false },
    { number: 25, selected: false, reserved: false },
    { number: 26, selected: false, reserved: false },
    { number: 27, selected: false, reserved: false },
    { number: 28, selected: false, reserved: false },
    { number: 29, selected: false, reserved: false },
    { number: 30, selected: false, reserved: false },
    { number: 31, selected: false, reserved: false },
    { number: 32, selected: false, reserved: false },
    { number: 33, selected: false, reserved: true },
    { number: 34, selected: false, reserved: false },
    { number: 35, selected: false, reserved: false },
    { number: 36, selected: false, reserved: false },
    { number: 37, selected: false, reserved: false },
    { number: 38, selected: false, reserved: false },
    { number: 39, selected: false, reserved: false },
    { number: 40, selected: false, reserved: false },
];

export default function App() {
    const [state, dispatcher] = useReducer(reducer, new User());

    // just memorizing the updated data
    const handleUpdateFakeData = (seatNumber: number) => {
        fakeSeatsData[seatNumber - 1].selected = true;
    };
    const router = createBrowserRouter(
        [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/Trips",
                element: <Trips />,
            },
            {
                path: "/SignUp",
                element: (
                    <>
                        <Navbar />
                        <SignUp />
                        <Footer />
                    </>
                ),
            },
            {
                path: "/SignIn",
                element: (
                    <>
                        <Navbar />
                        <SignIn />
                        <Footer />
                    </>
                ),
            },
            // {
            //     path: "/Bus",
            //     element: (
            //         <Bus
            //             seatsData={fakeSeatsData}
            //             handleBusSubmit={handleBusSubmit}
            //             handleUpdateFakeData={handleUpdateFakeData}
            //         />
            //     ),
            // },
            {
                path: "/MyTrips",
                element: <MyTrips />,
            },
            // {
            //     path: "/TravelerInfo",
            //     element: <TravelerInfo numReservedSeats={numReservedSeats} />,
            // },
            {
                path: "/bill",
                element: <Bill />,
            },
            {
                path: "/check-in",
                element: (
                    <>
                        {" "}
                        <div>Error 404</div>
                        <Footer />{" "}
                    </>
                ),
            },
            {
                path: "/dashboard",
                element: <AppDashboard />,
                children: [
                    {
                        path: "buses",
                        element: <Buses />,
                    },
                    {
                        path: "addBus",
                        element: <AddBus />,
                    },
                    {
                        path: "trips",
                        element: <Trips />,
                    },
                    {
                        path: "Sitting",
                        element: <Sitting />,
                    },
                    {
                        path: "employees",
                        element: <Employees />,
                    },
                    {
                        path: "addEmployee",
                        element: <AddEmployee />,
                    },
                    {
                        path: "addtrip",
                        element: <AddTrip />,
                    },
                ],
            },
        ],
        { basename: "/App" }
    );

    return (
        <DataContext.Provider value={{ state: state, dispatcher: dispatcher }}>
            <RouterProvider router={router} fallbackElement={<></>} />
        </DataContext.Provider>
    );
}
