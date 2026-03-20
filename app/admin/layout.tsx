"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Link from "next/link";

import {
  LayoutDashboard,
  Map,
  PlusCircle,
  Calendar,
  Bell,
  Moon,
  Sun,
  Menu,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [openTrips, setOpenTrips] = useState(false);

  const { theme, setTheme } = useTheme();

  const logout = () => {
    document.cookie = "role=; Max-Age=0";
    router.push("/login");
  };

  const menu = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Bookings",
      href: "/admin/bookings",
      icon: Calendar,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white p-6 transition-all
        ${collapsed ? "w-20" : "w-64"}`}
      >
        {/* Collapse Button */}
        <button onClick={() => setCollapsed(!collapsed)} className="mb-6">
          <Menu />
        </button>

        <nav className="flex flex-col gap-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg
                ${active ? "bg-blue-600" : "hover:bg-gray-800"}`}
              >
                <Icon size={18} />

                {!collapsed && item.name}
              </Link>
            );
          })}
          {/* Trips Parent */}
          <div
            onClick={() => setOpenTrips(!openTrips)}
            className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-800"
          >
            <div className="flex items-center gap-3">
              <Map size={18} />
              {!collapsed && "Trips"}
            </div>

            {!collapsed && (
              <span className={`transition ${openTrips ? "rotate-180" : ""}`}>
                <ChevronDown
                  size={16}
                  className={`transition ${openTrips ? "rotate-180" : ""}`}
                />
              </span>
            )}
          </div>

          {/* Submenu */}
          {openTrips && !collapsed && (
            <div className="ml-6 flex flex-col gap-1 text-sm">
              <Link
                href="/admin/trips"
                className={`p-2 rounded hover:bg-gray-800 ${
                  pathname === "/admin/tours" && "bg-blue-600"
                }`}
              >
                All Trips
              </Link>

              <Link
                href="/admin/trips/add"
                className="p-2 rounded hover:bg-gray-800"
              >
                Add New Trip
              </Link>

              <Link
                href="/admin/trip-types"
                className="p-2 rounded hover:bg-gray-800"
              >
                Trip Types
              </Link>

              <Link
                href="/admin/destinations"
                className="p-2 rounded hover:bg-gray-800"
              >
                Destinations
              </Link>

              <Link
                href="/admin/activities"
                className="p-2 rounded hover:bg-gray-800"
              >
                Activities
              </Link>
            </div>
          )}
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 px-6 py-4 shadow">
          <h1 className="font-semibold">Admin Dashboard</h1>

          <div className="flex items-center gap-4">
            {/* Notification */}
            <Bell className="cursor-pointer" />

            {/* Dark Mode */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>

            {/* Admin Avatar */}
            <div className="flex items-center gap-2 cursor-pointer">
              <User />

              <button
                onClick={logout}
                className="flex items-center gap-1 text-sm"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-10 flex-1">{children}</main>
      </div>
    </div>
  );
}
