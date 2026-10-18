import { LucideIcon } from "lucide-react";

export interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  color: string;
}