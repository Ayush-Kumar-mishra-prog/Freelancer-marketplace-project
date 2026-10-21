"use client";

import Image from "next/image";

export interface Notification {
  id: string;
  name: string;
  avatar: string;
  content: string;
  createdAt: string; // ISO date string
}

interface Props {
  notification: Notification;
  onDelete: (id: string) => void;
}

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export default function NotificationItem({ notification, onDelete }: Props) {
  const { id, name, avatar, content, createdAt } = notification;

  return (
    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:gap-4">
      <Image
        src={avatar}
        alt={`${name}'s profile picture`}
        width={48}
        height={48}
        unoptimized
        className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
      />

      <div className="min-w-0 flex-1">
        <p className="wrap-break text-sm text-slate-700 sm:text-base">
          <span className="font-semibold text-slate-900">{name}</span> {content}
        </p>
        <time
          dateTime={createdAt}
          suppressHydrationWarning
          className="mt-1 block text-xs text-slate-500"
        >
          {dateFormatter.format(new Date(createdAt))}
        </time>
      </div>

      <button
        type="button"
        onClick={() => onDelete(id)}
        aria-label={`Delete notification from ${name}`}
        className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 focus-visible:outline  focus-visible:outline-red-500"
      >
        Delete
      </button>
    </li>
  );
}