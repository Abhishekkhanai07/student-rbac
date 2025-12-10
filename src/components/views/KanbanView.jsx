import React from "react";
import { useLocalSWR } from "@/hooks/useLocalSWR";
import { storage } from "@/services/storageService";

export default function KanbanView() {
  const { data: students = [] } = useLocalSWR("students");
  const columns = [
    { key: "active", title: "Active" },
    { key: "inactive", title: "Inactive" }
  ];

  function changeStatus(id, to) {
    const s = students.map(x => x.id === id ? { ...x, status: to } : x);
    storage.set("students", s);
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {columns.map(col => (
        <div key={col.key} className="p-3 rounded-lg bg-slate-50 min-h-[160px]">
          <div className="font-semibold mb-2">{col.title}</div>
          <div className="space-y-3">
            {students.filter(s => s.status === col.key).map(s => (
              <div key={s.id} className="p-3 bg-white rounded shadow flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-semibold">
                  {s.name.split(" ").map(n=>n[0]).slice(0,2).join("").toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-gray-500">{s.email}</div>
                  <div className="mt-2 flex gap-2">
                    <button onClick={()=>changeStatus(s.id, col.key === "active" ? "inactive" : "active")} className="text-xs px-2 py-1 border rounded">
                      Move to {col.key === "active" ? "inactive" : "active"}
                    </button>
                    <div className="text-xs text-gray-400 ml-auto">{s.createdAt}</div>
                  </div>
                </div>
              </div>
            ))}
            {students.filter(s => s.status === col.key).length === 0 && <div className="text-xs text-gray-400">No students here</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
