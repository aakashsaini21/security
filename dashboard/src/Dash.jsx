import { useState } from "react";
import { Routes, Route,Link } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Guard from "./scenes/Guard";
import Site from "./scenes/Site";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import Communication from "./scenes/communication";
import IncidentReporting from "./scenes/IncidentReporting";
import Notification from "./scenes/Notification";
import HelpSupport from "./scenes/HelpSupport";
import GuardRegister from "./scenes/GuardRegister";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import SiteRegister from "./scenes/SiteRegister";
import ScheduleJob from "./scenes/Schedule";
import Announcement from "./scenes/Announcement";
import ScheduledJob from "./scenes/ScheduldedJob";
import DailyReport from "./scenes/Incident/Index";

function Dash() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* <Link to="/Dash/team">Team</Link> */}

                <Route path="/Guard" element={<Guard />} />
                {/* <Route path="/Schedule" element={<Contacts />} /> */}
                <Route path="/Schedule" element={<ScheduledJob/>} />
                <Route path="/Site" element={<Site />} />
                <Route path="/Announcement" element={<Announcement/>} />
                <Route path="/GuardRegister" element={<GuardRegister/>} />
                <Route path="/SiteRegister" element={<SiteRegister/>} />
                <Route path="/ScheduleJob" element={<ScheduleJob/>} />
                <Route path="/Communication" element={<Communication />} />
                <Route path="/IncidentReporting" element={<IncidentReporting />} />
                <Route path="/Notification" element={<Notification />} />
                <Route path="/HelpSupport" element={<HelpSupport />} />
                <Route path="/form" element={<Form />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/IncidentReporting" element={<IncidentReporting/>} />
                <Route path="/DailyReport" element={<DailyReport/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Dash;
