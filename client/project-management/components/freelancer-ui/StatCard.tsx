"use client";

import { Users, DollarSign, ShoppingCart, TrendingUp, Activity } from "lucide-react";
import { StatCard } from "@/types/dashboard";

const stats: StatCard[] = [
  {
    title: "Total Posts",
    value: "12,458",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Payments",
    value: "$48,290",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Clients",
    value: "1,286",
    change: "-3.1%",
    trend: "down",
    icon: ShoppingCart,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Growth",
    value: "24.8%",
    change: "+4.3%",
    trend: "up",
    icon: TrendingUp,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Active Projects",
    value: "864",
    change: "+1.8%",
    trend: "up",
    icon: Activity,
    color: "bg-teal-50 text-teal-600",
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      {stats.map(({ title, value, change, trend, icon: Icon, color }) => (
        <div
          key={title}
          className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${color}`}>
              <Icon size={20} />
            </div>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                trend === "up"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {change}
            </span>
          </div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
      ))}
    </div>
  );
}