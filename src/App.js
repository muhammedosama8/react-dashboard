import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import AdminTeam from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import AddNewAdmin from "./scenes/team/add-admin";
import Products from "./scenes/products";
import Home from "./scenes/home";
import Login from "./scenes/login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AddNewProduct from "./scenes/products/add-product";
import NoMatch from "./scenes/noMatch";
import Profile from "./scenes/profile";
import UpdateProfile from "./scenes/profile/update";

export const AuthContext = createContext({})

function App() {
  const auth = getAuth();
  const [theme, colorMode] = useMode();
  const [currentUser, setCurrentUser] = useState(null)
  const [pending, setPending] = useState(true)
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (!!user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
        setPending(false)
    }) 
  })

  if(pending){
    return (
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="lds-dual-ring"></div>
            </ThemeProvider>
          </ColorModeContext.Provider>
    )}

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthContext.Provider value={{currentUser, setCurrentUser}}>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} >
                <Route index element={<Dashboard />} />
                <Route path="team" element={<AdminTeam />} />
                <Route path="team/add-new-admin" element={<AddNewAdmin />} />
                <Route path="contacts" element={<Contacts />}/>
                <Route path="products" element={<Products />}/>
                <Route path="products/add-new-product" element={<AddNewProduct />}/>
                <Route path="invoices" element={<Invoices />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/edit" element={<UpdateProfile />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="calendar" element={<Calendar />} />
              </Route>
              <Route exact path="login" element={<Login />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Router>
        </AuthContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;