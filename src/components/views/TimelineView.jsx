import React from "react";
import { useLocalSWR } from "@/hooks/useLocalSWR";
import { format, parseISO } from "date-fns";

export default function TimelineView() {
  const { data: students = [] } = useLocalSWR("students");
  const sorted = [...students].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="space-y-6">
      {sorted.map(s => (
        <div key={s.id} className="flex items-start gap-4">
          <div className="w-24 text-xs text-gray-500">{format(parseISO(s.createdAt), "dd MMM yyyy")}</div>
          <div className="flex-1">
            <div className="bg-white p-4 rounded-2xl shadow">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{s.name}</div>
                <div className="text-xs text-gray-400">{s.status}</div>
              </div>
              <div className="text-sm text-gray-600 mt-2">{s.customFields?.bio || "No details"}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
