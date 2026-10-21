"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Settings, User, FileText, LayoutDashboard, BellIcon, IndianRupee } from "lucide-react";
import { NavItem } from "@/types/nav";



export default function FreelancerSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems: NavItem[] = [
  { label: "Dashboard", href: "/freelancers/dashboard", icon: LayoutDashboard },
  { label: "Notifications", href: "/freelancers/notifications", icon: BellIcon },
  { label: "Clients", href: "/freelancers/allClients", icon: User },
  { label: "Profile", href: "/freelancers/profile", icon: User },
  { label: "Projects", href: "/freelancers/posts", icon: FileText },
  { label: "Payments", href: "/freelancers/payments", icon: IndianRupee },
  { label: "Settings", href: "/freelancers/settings", icon: Settings },
];

  // Close sidebar automatically on route change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40">
        <span className="font-semibold text-gray-800">MyApp</span>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Overlay backdrop for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-40
          flex flex-col pt-16 lg:pt-6 px-4
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        <div className="hidden lg:flex items-center px-2 mb-8">
          <span className="text-xl font-bold text-gray-800">GigSphare</span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-colors relative
                  ${
                    active
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                {active && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r" />
                )}
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}