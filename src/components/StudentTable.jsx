import React, { useEffect, useState } from "react";
import { useLocalSWR } from "@/hooks/useLocalSWR";
import { storage } from "@/services/storageService";
import { useAuth } from "@/context/AuthContext";
import StudentDrawer from "@/components/StudentDrawer";
import FieldRenderer from "@/components/FieldRenderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StudentTable() {
  const { data: students = [] } = useLocalSWR("students");
  const { data: customFields = [] } = useLocalSWR("customFields");
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("view");
  const [active, setActive] = useState(null);
  const [form, setForm] = useState({ customFields: {} });

  useEffect(() => {
    if (!active) setForm({ customFields: {} });
  }, [active]);

  function openRow(student, m = "view") {
    setMode(m);

    if (m === "create") {
      setForm({
        id: null,
        name: "",
        email: "",
        phone: "",
        status: "active",
        createdAt: new Date().toISOString().slice(0, 10),
        customFields: {},
      });
      setActive(null);
    } else {
      setForm(JSON.parse(JSON.stringify(student)));
      setActive(student);
    }

    setOpen(true);
  }

  function close() {
    setOpen(false);
    setTimeout(() => {
      setActive(null);
      setForm({ customFields: {} });
      setMode("view");
    }, 200);
  }

  function handleChange(key, value) {
    if (["name", "email", "phone", "status"].includes(key)) {
      setForm((prev) => ({ ...prev, [key]: value }));
    } else {
      setForm((prev) => ({
        ...prev,
        customFields: { ...(prev.customFields || {}), [key]: value },
      }));
    }
  }

  function save() {
    const newStudent = {
      ...form,
      id: form.id ?? `student-${Date.now()}`,
      createdAt: form.createdAt ?? new Date().toISOString().slice(0, 10),
    };

    storage.updateArray("students", newStudent);
    close();
  }

  function remove(id) {
    if (!confirm("Delete student?")) return;
    storage.delete("students", id);
    close();
  }

  const visible =
    user.role === "admin"
      ? students
      : students.filter((s) => s.id === user.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Students</h2>

        {user.role === "admin" && (
          <Button onClick={() => openRow(null, "create")}>+ Create</Button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow overflow-auto">
        <table className="w-full">
          <thead className="text-left">
            <tr className="bg-slate-50">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((s) => (
              <tr
                key={s.id}
                className="cursor-pointer hover:bg-indigo-50"
                onClick={() => openRow(s, "view")}
              >
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">{s.phone}</td>
                <td className="p-3">{s.status}</td>
                <td className="p-3">{s.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StudentDrawer
        open={open}
        onOpenChange={setOpen}
        title={
          mode === "create"
            ? "Create Student"
            : mode === "edit"
            ? "Edit Student"
            : "View Student"
        }
      >
        <>
          <label className="block mb-3">
            <div className="text-sm text-gray-600">Name</div>
            <Input
              value={form.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              disabled={mode === "view"}
            />
          </label>

          <label className="block mb-3">
            <div className="text-sm text-gray-600">Email</div>
            <Input
              value={form.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={mode === "view"}
            />
          </label>

          <label className="block mb-3">
            <div className="text-sm text-gray-600">Phone</div>
            <Input
              value={form.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              disabled={mode === "view"}
            />
          </label>

          <label className="block mb-3">
            <div className="text-sm text-gray-600">Status</div>
            <select
              value={form.status || "active"}
              onChange={(e) => handleChange("status", e.target.value)}
              disabled={mode === "view"}
              className="w-full border rounded p-2"
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </label>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Custom Fields</h4>
            {customFields.map((cf) => (
              <FieldRenderer
                key={cf.id}
                field={cf}
                value={form.customFields || {}}
                onChange={handleChange}
                readOnly={mode === "view"}
              />
            ))}
          </div>

          {/* ⭐ FINAL FIXED BUTTON BLOCK */}
          <div className="mt-4 flex gap-2">
            {mode === "view" && (
              <>
                <Button onClick={() => setMode("edit")}>Edit</Button>
                <Button variant="destructive" onClick={() => remove(form.id)}>
                  Delete
                </Button>
              </>
            )}

            {mode === "edit" && (
              <>
                <Button onClick={save}>Save</Button>
                <Button variant="destructive" onClick={() => remove(form.id)}>
                  Delete
                </Button>
              </>
            )}

            {mode === "create" && <Button onClick={save}>Create</Button>}
          </div>
        </>
      </StudentDrawer>
    </div>
  );
}
