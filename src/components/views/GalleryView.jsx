import React from "react";
import { useLocalSWR } from "@/hooks/useLocalSWR";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";

export default function GalleryView() {
  const { data: students = [] } = useLocalSWR("students");
  const { user } = useAuth();
  const visible = user.role === "admin" ? students : students.filter(s => s.id === user.id);

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
      {visible.map(s => (
        <Card key={s.id} className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-semibold">
              {s.name.split(" ").map(n=>n[0]).slice(0,2).join("").toUpperCase()}
            </div>
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-gray-500">{s.email}</div>
              <div className="text-xs text-gray-500">{s.phone}</div>
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600">{s.customFields?.bio || "No bio"}</div>
          <div className="mt-3 flex items-center justify-between">
            <div className={`text-xs px-2 py-1 rounded ${s.status === "active" ? "bg-green-100" : "bg-gray-100"}`}>{s.status}</div>
            <div className="text-xs text-gray-400">{s.createdAt}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
