import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import ClientProfile from "./scenes/clientProfile/index";
import AssignBot from "./scenes/assignBot/index";
import ClientAccount from "./scenes/clientAccount/index";
import BotManagement from "./scenes/botManagement/index";
import Billing from "./scenes/billing/index";
import Support from "./scenes/support/index";
import Reports from "./scenes/reports/index";
import LogIn from "./scenes/auth/logIn/index";
import Register from "./scenes/auth/register/index";
import ChangePassword from "./scenes/auth/changePassword/index";
import ForgetPassword from "./scenes/auth/forgetPassword/index";
import OTP from "./scenes/auth/otp/index";
import NewPassword from "./scenes/auth/newPassword/index";
import Test from "./scenes/test/index";

import EditProfile from "./scenes/editProfile/index";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
      const isNonMobile = useMediaQuery("(min-width:768px)");


  const location = useLocation(); // Get the current location

  // Determine if the current path is for authentication
  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/forgetPassword" ||
    location.pathname === "/logIn" ||
    location.pathname === "/otp" ||
    location.pathname === "/newPassword";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isAuthPage ? (
          <div className="auth-page" style={{ height: "100vh" }}>
            <Routes>
              <Route path="/" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logIn" element={<LogIn />} />
              <Route path="/forgetPassword" element={<ForgetPassword />} />
              <Route path="/otp" element={<OTP />} />
              <Route path="/newPassword" element={<NewPassword />} />
              <Route path="*" element={<Navigate to="/logIn" />} />
            </Routes>
          </div>
        ) : (
          <div className="app" style={{ display: "flex", height: "100vh" }}>
            <Sidebar isSidebar={isSidebar} />
            <main
              className="content"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: isNonMobile? "20px" : " 20px 0",
                marginLeft: isNonMobile ? "0" : "80px",

                position: "relative",
              }}
            >
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="*" element={<Navigate to="/logIn" />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/clientProfile" element={<ClientProfile />} />
                <Route path="/assignBot" element={<AssignBot />} />
                <Route path="/account" element={<ClientAccount />} />
                <Route path="/bot" element={<BotManagement />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/support" element={<Support />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/changePassword" element={<ChangePassword />} />
                <Route path="/editProfile" element={<EditProfile />} />
                <Route path="/test" element={<Test />} />
              </Routes>
            </main>
          </div>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
