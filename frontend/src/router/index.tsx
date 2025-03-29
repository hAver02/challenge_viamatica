import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/HomePage";
import RootLayout from "../Layout/RootLayout";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import DashboardPage from "../page/DashboardPage";


export const router = createBrowserRouter([{
    path : "/",
    element : <RootLayout />,
    children : [
        {index : true, element : <HomePage />},
        {path : "login", element : <LoginPage /> },
        {path : "register", element : <RegisterPage /> },
        {path : "dashboard", element : <DashboardPage /> },



    ]
}])