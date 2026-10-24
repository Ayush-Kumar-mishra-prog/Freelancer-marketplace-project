"use client";

import { LogOut, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function Topbar() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Logout failed");
    }
  };

  return (
    <div className="flex items-center justify-between mb-6 lg:mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back, here's your overview.</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="p-2.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors relative"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button
          onClick={handleLogout}
          aria-label="Logout"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}