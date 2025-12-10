import React from "react";
import { useLocalSWR } from "@/hooks/useLocalSWR";
import TextType from "@/components/TextType";
import NotesTyping from "@/components/NotesTyping";

export default function Dashboard() {
  const { data: students = [] } = useLocalSWR("students");
  const { data: users = [] } = useLocalSWR("users");

  return (
    <div>
      {/* 🔷 DASHBOARD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="text-sm text-gray-500">Total Students</div>
          <div className="text-3xl font-bold">{students.length}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="text-3xl font-bold">{users.length}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="text-sm text-gray-500">Notes</div>
          <div className="text-sm text-gray-600">
             <NotesTyping />
          </div>
        </div>
      </div>

      {/* 🔥 CENTERED TEXT-TYPE ANIMATION */}
      <div className="text-center mt-12">
        <TextType
          text={[
            "Welcome Admin 👋",
            "Manage Students",
            "Manage Users",
            "Customize Your Dashboard ✨"
          ]}
          typingSpeed={65}
          deletingSpeed={40}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          variableSpeed={{ min: 40, max: 90 }}
          textColors={["#6D28D9", "#2563EB", "#EC4899", "#14B8A6"]}
          className="text-3xl font-semibold tracking-wide"
        />
      </div>
    </div>
  );
}



