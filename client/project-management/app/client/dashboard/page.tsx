import StatCards from "@/components/freelancer-ui/StatCard";
import Topbar from "@/components/freelancer-ui/Topbar";


export default function DashboardPage() {
  return (
    <div className="w-full">
      <Topbar />
      <StatCards />

      {/* Placeholder content area for charts/tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 h-80 flex items-center justify-center text-gray-400">
          Chart / Graph area
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 h-80 flex items-center justify-center text-gray-400">
          Recent activity
        </div>
      </div>
    </div>
  );
}