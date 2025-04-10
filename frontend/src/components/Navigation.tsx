

import { Link, useNavigate, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { UserCircle, LogOut, Home, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { logout } from "../api/request";

const Navigation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

    const handleLogout = async () => {
        const data = await logout();
        return navigate("/login")
    }
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center font-bold text-lg text-primary">
          <span className="hidden md:inline">UserSession Nexus</span>
          <span className="md:hidden">USN</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5">
          <Link
            to="/dashboard"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/dashboard"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Dashboard
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/admin"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              Admin Panel
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button >
                <UserCircle className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard" className="cursor-pointer flex w-full items-center">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              {user?.role === "admin" && (
                <DropdownMenuItem asChild>
                  <Link to="/admin" className="cursor-pointer flex w-full items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
