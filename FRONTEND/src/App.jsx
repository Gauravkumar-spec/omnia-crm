import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Listings from "./pages/Listings";
import { Routes, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import ListingList from "./pages/ListingList";
import Agents from "./pages/Agent";
import AgentList from "./pages/AgentList";
import Lead from "./pages/Lead";
import LeadList from "./pages/LeadList";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen">
      
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main content area with margin-left to prevent overlap */}
      <div className="ml-64">
        <div className="flex justify-end p-4">
          <DarkModeToggle />
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/listinglist" element={<ListingList />} />
          <Route path="/agent" element={<Agents />} />
          <Route path="/agentlist" element={<AgentList />} />
          <Route path="/lead" element={<Lead />} />
          <Route path="/leadlist" element={<LeadList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
