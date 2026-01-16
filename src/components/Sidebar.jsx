import { NavLink } from 'react-router-dom';
// If you want to use the logo here as well, you can import it
// import logo from '../assets/jnpa-logo.png';

const Sidebar = () => {
  const menuItems = [
    { name: 'Container Terminals', path: '/' }, // Path '/' matches the index route
    { name: 'Vessel Report', path: '/vessel-report' },
    { name: 'Yard Inventory', path: '/yard-inventory' },
    { name: 'CFS Pendency', path: '/cfs-pendency' },
    { name: 'ICD Pendency', path: '/icd-pendency' },
    { name: 'Gate Movement', path: '/gate-movement' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-4 min-h-screen">
      {/* Optional: Add Logo Section here if you remove it from DashboardLayout */}
      {/* <div className="flex items-center gap-2 mb-8 px-2">
        <img src={logo} alt="JNPA Logo" className="w-8 h-8" />
        <span className="font-bold text-xl text-slate-800">JNPA</span>
      </div> */}

      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // 'end' ensures the home path doesn't stay highlighted when on other pages
            end={item.path === '/'} 
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

// CRITICAL: This line fixes the "does not provide an export named 'default'" error
export default Sidebar;