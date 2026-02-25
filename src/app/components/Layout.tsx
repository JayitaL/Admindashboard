import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  ClipboardList, 
  Table, 
  Plus, 
  CreditCard, 
  BarChart3, 
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import rufrentLogo from "figma:asset/33ec04c21ea655fdb9574bd0a62d6cd455f16db6.png";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/pgs", label: "PGs", icon: Building2 },
  { path: "/requests", label: "Requests", icon: ClipboardList },
  { 
    path: "/tables", 
    label: "Users", 
    icon: Table,
    subItems: [
      { path: "/tables/owners", label: "Owners" },
      { path: "/tables/managers", label: "Managers" },
      { path: "/tables/guests", label: "Guests" },
      { path: "/tables/pgs", label: "PGs" },
    ]
  },
  { path: "/add-tables", label: "Add Tables", icon: Plus },
  { path: "/add-amenities", label: "Add Amenities", icon: Plus },
  { path: "/payments", label: "Payments", icon: CreditCard },
  { path: "/reports", label: "Reports", icon: BarChart3 },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function Layout() {
  const location = useLocation();
  const [tablesOpen, setTablesOpen] = useState(location.pathname.startsWith("/tables"));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#001433] border-b border-blue-900 z-30 px-4 py-3 flex items-center justify-between">
        <img src={rufrentLogo} alt="RUFRENT" className="h-6" />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white p-2"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-64 bg-[#001433] border-r border-blue-900 flex flex-col
        fixed lg:static inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-blue-900">
          <div className="flex items-center gap-2">
            <img src={rufrentLogo} alt="RUFRENT" className="h-8" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isParentActive = item.subItems && location.pathname.startsWith(item.path);
              
              if (item.subItems) {
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => setTablesOpen(!tablesOpen)}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isParentActive
                          ? "bg-blue-700 text-white"
                          : "text-blue-100 hover:bg-blue-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {tablesOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {tablesOpen && (
                      <ul className="mt-1 ml-4 space-y-1">
                        {item.subItems.map((subItem) => {
                          const isSubActive = location.pathname === subItem.path;
                          return (
                            <li key={subItem.path}>
                              <Link
                                to={subItem.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                                  isSubActive
                                    ? "bg-blue-700 text-white"
                                    : "text-blue-100 hover:bg-blue-800"
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-700 text-white"
                        : "text-blue-100 hover:bg-blue-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto mt-14 lg:mt-0">
        <Outlet />
      </main>
    </div>
  );
}