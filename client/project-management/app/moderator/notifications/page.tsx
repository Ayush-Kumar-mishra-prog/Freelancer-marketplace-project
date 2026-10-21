"use client";

import { useState } from "react";
import NotificationItem, {
  type Notification,
} from "@/components/common/NotificationItem";

const initialNotifications: Notification[] = [
  {
    id: "1",
    name: "Riya Sharma",
    avatar: "https://i.pravatar.cc/96?img=47",
    content: "commented on your portfolio project: \"Love the clean UI!\"",
    createdAt: "2026-10-18T09:15:00+05:30",
  },
  {
    id: "2",
    name: "Aman Verma",
    avatar: "https://i.pravatar.cc/96?img=12",
    content: "sent you a connection request.",
    createdAt: "2026-10-17T18:40:00+05:30",
  },
  {
    id: "3",
    name: "Neha Singh",
    avatar: "https://i.pravatar.cc/96?img=32",
    content: "liked your post about building REST APIs with Express.",
    createdAt: "2026-10-16T11:05:00+05:30",
  },
  {
    id: "4",
    name: "Karan Mehta",
    avatar: "https://i.pravatar.cc/96?img=15",
    content: "mentioned you in a discussion on React performance.",
    createdAt: "2026-10-14T20:30:00+05:30",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const handleDelete = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const handleClearAll = () => setNotifications([]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Notifications
          </h1>
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-slate-500"
            >
              Clear all
            </button>
          )}
        </header>

        {notifications.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            You&apos;re all caught up. New notifications will show up here.
          </p>
        ) : (
          <ul className="space-y-3">
            {notifications.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}