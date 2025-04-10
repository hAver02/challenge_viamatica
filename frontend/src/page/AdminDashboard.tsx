
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "../components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger} from "../components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import FormInput from "../components/FormInput";
import { Lock, Unlock, MoreVertical, Edit, Users, SearchIcon } from "lucide-react";
import { validateName, validateDocument, validateEmail, validateDate, validateUsername } from "../utils/validators";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUsuarios, updateUser } from "../api/request";


interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  status: "active" | "blocked";
  failedAttempts: number;
}

const AdminDashboard = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isEditingUser, setIsEditingUser] = useState(false);
    const { user, isAuth } = useAuth();
    const navigate = useNavigate();
  const [userForm, setUserForm] = useState({ username: "", email: ""});
  
  const [userFormErrors, setUserFormErrors] = useState({
    username: null as string | null,
    email: null as string | null,
  });

  const filteredUsers = users.length > 0 ? users.filter((user : any) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      user.email.toLowerCase().includes(searchStr) ||
      user.username.toLowerCase().includes(searchStr) 

    );
  }) : [];
  
  const handleToggleUserStatus =  async (userId: string) => {
   
    const newStatus = users.find((user : any) => user._id == userId).status === "active" ? "blocked" : "active";
    // console.log(newStatus);
    try {
      const rta = await updateUser(userId, {status : newStatus})
      if(rta.data.ok){
        const copyUsers = structuredClone(users)
        const index = copyUsers.findIndex((user : any) => user._id == userId)
        copyUsers[index].status = newStatus;
        setUsers(copyUsers)
        toast.success(`User has been ${newStatus}`)
      }else{
      toast.error(`Error update status from user!`)
      }
    } catch (error) {
      toast.error(`Error update status from user!`)
    
    }
  };

  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);
    setUserForm({
      username : user.username,
      email: user.email,
    });
    setIsEditingUser(true);
  };

  const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateUserField = (field: string, value: string) => {
    switch (field) {
      case "firstName":
      case "lastName":
        return validateName(value);
      case "document":
        return validateDocument(value);
      case "birthDate":
        return validateDate(value);
      case "email":
        return validateEmail(value);
      default:
        return null;
    }
  };

  const handleUserFormBlur = (field: string) => {
    setUserFormErrors(prev => ({
      ...prev,
      [field]: validateUserField(field, (userForm as any)[field])
    }));
  };

  const validateUserForm = () => {
    const newErrors = {
      username : validateUsername(userForm.username),
      email: validateEmail(userForm.email),
    };
    
    setUserFormErrors(newErrors);
    
    return !Object.values(newErrors).some(error => error !== null);
  };

  const handleUserFormSubmit = async  (e: React.FormEvent) => {
    e.preventDefault();
    console.log("aca");
    
    if (!validateUserForm()) {
        toast.error("Validation failed. Please check the form for errors")
      return;
    }
    
    if (!selectedUser) return;

    try {
      const rta = await updateUser(selectedUser._id, {email : userForm.email, username : userForm.username});
      console.log(rta);
      
      if(!rta.data.ok) return toast.error(rta.data.message);
      const copyUsers = structuredClone(users);
      const index = copyUsers.findIndex((us : any) => us._id == selectedUser._id);
      copyUsers[index] = {...copyUsers[index], email : userForm.email, username : userForm.username }
      setUsers(copyUsers)
      toast.success("User information has been updated successfully")

    } catch (error) {
      toast.error("Error updating user")
    }
    finally{
      setIsEditingUser(false);
      setSelectedUser(null);
    }
  };
  useEffect(() => {
    if(!isAuth || user.role != 'admin' )  navigate('/dashboard')
    async function getUsers(){
        try {
            const rta = await getUsuarios();  

            if(!rta.data.ok) return toast.error("Error!")
            const users = rta.data.usuarios.filter((user : any) =>user.role == "user");
            setUsers(users)
        } catch (error) {
            toast.error("Error getting users")
        }
    }
    getUsers()
}, [isAuth , user])


  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage user accounts and permissions
            </p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>
              View and manage all non-admin users in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <div className="relative w-full max-w-sm">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="rounded-lg border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Id</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Failed Attempts</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user : any) => (
                      <TableRow key={user._id}>
                        <TableCell>
                          {user._id.slice(0,8)}
                        </TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={user.status === "active" ? "outline" : "destructive"}
                            className={
                              user.status === "active"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : ""
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.failedAttempts}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4 cursor-pointer" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleToggleUserStatus(user._id)}
                              >
                                {user.status === "active" ? (
                                  <>
                                    <Lock className="mr-2 h-4 w-4" />
                                    Block User
                                  </>
                                ) : (
                                  <>
                                    <Unlock className="mr-2 h-4 w-4 cursor-pointer" />
                                    Unblock User
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {filteredUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          No users found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
    
      <Dialog open={isEditingUser} onOpenChange={setIsEditingUser}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <form onSubmit={handleUserFormSubmit}>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Make changes to user information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Username"
                  id="username"
                  type="text"
                  value={userForm.username}
                  onChange={handleUserFormChange}
                  error={userFormErrors.username}
                  required
                  onBlur={() => handleUserFormBlur("firstName")}
                />
                <FormInput
                  label="Email"
                  id="email"
                  type="text"
                  value={userForm.email}
                  onChange={handleUserFormChange}
                  error={userFormErrors.email}
                  required
                  onBlur={() => handleUserFormBlur("lastName")}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditingUser(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
