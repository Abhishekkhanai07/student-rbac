import React, { useMemo } from "react";
import { useLocalSWR } from "@/hooks/useLocalSWR";
import { format, parseISO } from "date-fns";

export default function CalendarView() {
  const { data: students = [] } = useLocalSWR("students");

  const grouped = useMemo(() => {
    const g = {};
    (students || []).forEach(s => {
      const d = s.createdAt || "Unknown";
      g[d] = g[d] || [];
      g[d].push(s);
    });
    return Object.keys(g).sort((a,b) => new Date(b) - new Date(a)).reduce((acc,k) => (acc[k] = g[k], acc), {});
  }, [students]);

  return (
    <div className="space-y-4">
      {Object.entries(grouped).length === 0 && <div className="text-gray-500">No events</div>}
      {Object.entries(grouped).map(([date, arr]) => (
        <div key={date} className="bg-white p-3 rounded-lg shadow">
          <div className="font-semibold mb-2">{date === "Unknown" ? "Unknown date" : format(parseISO(date), "EEEE, dd MMM yyyy")}</div>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
            {arr.map(s => (
              <div key={s.id} className="p-3 border rounded">
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-gray-500">{s.email}</div>
                <div className="text-xs text-gray-400 mt-2">{s.customFields?.bio?.slice(0,80) || "No notes"}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
