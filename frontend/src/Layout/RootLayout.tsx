import { Outlet } from "react-router-dom";

export default function RootLayout(){
    return(
        <div>
            <h1 className="text-red-500">
                hola 
            </h1>
            RootLayout
            <Outlet />
        </div>
    )
}