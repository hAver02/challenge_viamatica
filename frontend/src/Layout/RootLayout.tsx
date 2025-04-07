import { Outlet } from "react-router-dom";

export default function RootLayout(){
    return(
        <div className="bg-neutral-950 h-screen  w-full">
            <Outlet />
        </div>
    )
}