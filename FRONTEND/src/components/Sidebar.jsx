import { useState } from "react";
import { FaBars, FaHome, FaUsers, FaCog, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div className={` fixed  top-0 left-0 h-screen p-5 pt-8 duration-300 shadow-md 
      ${open ? "w-64" : "w-20"} 
      bg-white text-black dark:bg-gray-900 dark:text-white transition-colors`}>
      
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{open && "CRM"}</h1>
        {/* Optional Toggle Icon */}
        {/* 
        <div className="cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </div> 
        */}
      </div>

      <ul className="mt-10 space-y-4">
        <Link to="/">
          <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
            <FaHome /> {open && <span>Dashboard</span>}
          </li>
        </Link>

        <Link to="/listings">
          <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
            <FaUsers /> {open && <span>Listings</span>}
          </li>
        </Link>

        <Link to="/listinglist">
          <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
            <FaUsers /> {open && <span>Listing list</span>}
          </li>
        </Link>

        <Link to="/agent">
          <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
            <FaUsers /> {open && <span>Agents</span>}
          </li>
        </Link>

        <Link to="/agentlist">
          <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
            <FaUsers /> {open && <span>Agents list</span>}
          </li>
        </Link>

        <Link to="/lead">
          <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
            <FaUsers /> {open && <span>Leads</span>}
          </li>
        </Link>

        <Link to="/leadlist">
          <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
            <FaUsers /> {open && <span>Lead List</span>}
          </li>
        </Link>

        <Link to="/settings">
          <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
            <FaCog /> {open && <span>Settings</span>}
          </li>
        </Link>
      </ul>
    </div>
  );
}
