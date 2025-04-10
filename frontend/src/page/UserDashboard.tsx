import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger  } from "../components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import FormInput from "../components/FormInput";
import { Calendar, Clock, AlertTriangle, User, Edit } from "lucide-react";
import { validateName, validateDocument, validateDate } from "../utils/validators";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Navigation from "../components/Navigation";
import { getIntentosByUserId, getSessionsByUserId, updatePersona } from "../api/request";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate()
  const { user, persona, isAuth, setPersona } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [sessiones,setSessiones] = useState([])
  const [intentosFallidos, setIntentosFallidos] = useState([])
  const [profileForm, setProfileForm] = useState({nombre: '', apellido : '', documento : '', fechaNacimiento : ''})
  useEffect(() => {
      const fetchSessions = async () => {
              try {
                if(!isAuth || !user) return;
      
                const response = await getSessionsByUserId(user._id);
                setSessiones(response.data.sessions);
                const rta = await getIntentosByUserId(user._id)
                setIntentosFallidos(rta.data.intentosFallidos)
                
                setProfileForm({nombre : persona.nombre, apellido : persona.apellido, documento : persona.documento, fechaNacimiento : persona.fechaNacimiento})
              } catch (error) {
                console.error("Error al obtener los datos del usuario", error);
              }
            };
      
            
            if(!isAuth) navigate("/login")
            fetchSessions();
      }, [user, isAuth]);

  const [profileErrors, setProfileErrors] = useState({
    firstName: null as string | null,
    lastName: null as string | null,
    document: null as string | null,
    birthDate: null as string | null,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log({name,value});
    
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateProfileField = (field: string, value: string) => {
    console.log({field});
    
    switch (field) {
      case "nombre":
      case "apellido":
        return validateName(value);
      case "documento":
        return validateDocument(value);
      case "fechaNacimiento":
        return validateDate(value);
      default:
        return null;
    }
  };

  const handleProfileBlur = (field: string) => {
    setProfileErrors(prev => ({
      ...prev,
      [field]: validateProfileField(field, (profileForm as any)[field])
    }));
  };

  const validateProfileForm = () => {
    const newErrors = {
      firstName: validateName(profileForm.nombre),
      lastName: validateName(profileForm.apellido),
      document: validateDocument(profileForm.documento),
      birthDate: validateDate(profileForm.fechaNacimiento)
    };
    
    setProfileErrors(newErrors);
    
    return !Object.values(newErrors).some(error => error !== null);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProfileForm()) {
      toast.error("Form validation failed");
      return;
    }else{
      try {
          const rta =  await updatePersona(user.idPersona, {
                  nombre : profileForm.nombre,
                  apellido : profileForm.apellido,
                  fechaNacimiento : profileForm.fechaNacimiento,
                  documento : profileForm.documento
              })
              console.log("Rta", rta);
              if(rta.data.ok) { 
                setPersona(rta.data.persona)
                setProfileForm(rta.data.persona);
              }
      } catch (error) {
        toast.error("Error updating data!")
      }
    }
    

    setTimeout(() => {
      toast.success("Your profile information has been updated successfully");
      setIsEditing(false);
    }, 800);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };


  const lastSession = sessiones.find((session : any) => session.sessionEnd == null) || {_id : "1234", sessionStart: new Date().toString()}
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.username || "User"}
            </p>
          </div>
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white">
              <form onSubmit={handleProfileSubmit}>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile information here
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="First Name"
                      id="nombre"
                      type="text"
                      value={profileForm.nombre}
                      onChange={handleProfileChange}
                      error={profileErrors.firstName}
                      required
                      onBlur={() => handleProfileBlur("nombre")}
                    />
                    <FormInput
                      label="Last Name"
                      id="apellido"
                      type="text"
                      value={profileForm.apellido}
                      onChange={handleProfileChange}
                      error={profileErrors.lastName}
                      required
                      onBlur={() => handleProfileBlur("apellido")}
                    />
                    <FormInput
                      label="Document (ID)"
                      id="documento"
                      type="text"
                      value={profileForm.documento}
                      onChange={handleProfileChange}
                      error={profileErrors.document}
                      required
                      onBlur={() => handleProfileBlur("documento")}
                    />
                    <FormInput
                      label="Date of Birth"
                      id="fechaNacimiento"
                      type="date"
                      value={profileForm.fechaNacimiento.split("T")[0]}
                      onChange={handleProfileChange}
                      error={profileErrors.birthDate}
                      required
                      onBlur={() => handleProfileBlur("fechaNacimiento")}
                    />

                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={() => setIsEditing(false)} className="border-2 hover:bg-neutral-500 hover:text-white">
                    Cancel
                  </Button>
                  <Button type="submit" className="border-2 hover:bg-neutral-500 hover:text-white">Save Changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>


        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Session History</TabsTrigger>
            <TabsTrigger value="failed-attempts">Failed Attempts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Account Information
                </CardTitle>
                <CardDescription>Your personal and account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Username</p>
                    <p>{user?.username}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p>{user?.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                    <p>{`${persona.nombre} ${persona.apellido}`}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Document (ID)</p>
                    <p>{persona.documento}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                    <p>{persona.fechaNacimiento.split("T")[0]}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Account Status</p>
                    <p className="text-green-600 font-medium">{user.status.toUpperCase()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Last Session
                </CardTitle>
                <CardDescription>Details of your most recent session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-muted p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Session ID</p>
                        <p className="font-mono text-sm">{lastSession._id.slice(0,8)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Start Time</p>
                        <p>{formatDate(lastSession.sessionStart)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">End Time</p>
                        <p>{"Session acitiva"}</p>
                      </div>
                    </div>

                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Session History
                </CardTitle>
                <CardDescription>A record of your recent login sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted">
                          <th className="text-left p-3 text-sm font-medium">Session ID</th>
                          <th className="text-left p-3 text-sm font-medium">Start Time</th>
                          <th className="text-left p-3 text-sm font-medium">End Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sessiones.map((session : any) => (
                          <tr key={session._id} className="border-t">
                            <td className="p-3 text-sm font-mono">{session._id.slice(0,7)}</td>
                            <td className="p-3">{formatDate(session.sessionStart)}</td>
                            <td className="p-3">{formatDate(session.sessionEnd)}</td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="failed-attempts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Failed Login Attempts
                </CardTitle>
                <CardDescription>Recent unsuccessful login attempts to your account</CardDescription>
              </CardHeader>
              <CardContent>
                {intentosFallidos.length > 0 ? (
                  <div className="rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted">
                            <th className="text-left p-3 text-sm font-medium">Attempt ID</th>
                            <th className="text-left p-3 text-sm font-medium">Date & Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {intentosFallidos.map((attempt : any) => (
                            <tr key={attempt._id} className="border-t">
                              <td className="p-3 text-sm font-mono">{attempt._id.slice(0,7)}</td>
                              <td className="p-3">{formatDate(attempt.date)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">No failed login attempts recorded</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default UserDashboard;
