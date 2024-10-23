import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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



function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ display: "flex", height: "100vh" }}>
          <Sidebar isSidebar={isSidebar} />
          <main
            className="content"
            style={{
              flex: 1,
              overflowY: "auto", // Allow main content to scroll independently
              padding: "20px",
              position: "relative",
            }}
          >
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
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
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
