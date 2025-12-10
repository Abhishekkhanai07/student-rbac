import React, { useState } from "react";
import { useLocalSWR } from "@/hooks/useLocalSWR";
import { Button } from "@/components/ui/button";

export default function CustomFieldsPage() {
  const { data: fields = [], set } = useLocalSWR("customFields");
  const [form, setForm] = useState({ label: "", key: "", type: "text", required: false, optionsText: "" });

  function createField(e) {
    e.preventDefault();
    const id = `cf-${Date.now()}`;
    const options = form.optionsText ? form.optionsText.split(",").map(s => s.trim()) : undefined;
    const newField = { id, label: form.label, key: form.key, type: form.type, required: !!form.required, options };
    set([ ...fields, newField ]);
    setForm({ label: "", key: "", type: "text", required: false, optionsText: "" });
  }

  function del(id) {
    set(fields.filter(f => f.id !== id));
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Custom Field Builder</h2>

      <div className="bg-white rounded p-4 mb-6">
        <form onSubmit={createField} className="grid grid-cols-2 gap-3">
          <input placeholder="Label" value={form.label} onChange={(e)=>setForm({...form,label:e.target.value})} className="border p-2 rounded" required />
          <input placeholder="Key (snake_case)" value={form.key} onChange={(e)=>setForm({...form,key:e.target.value})} className="border p-2 rounded" required />
          <select value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})} className="border p-2 rounded">
            <option value="text">Text</option>
            <option value="textarea">Textarea</option>
            <option value="dropdown">Dropdown</option>
            <option value="checkbox">Checkbox</option>
            <option value="date">Date</option>
          </select>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.required} onChange={(e)=>setForm({...form,required:e.target.checked})}/>Required</label>

          <input placeholder="Dropdown options (comma separated)" value={form.optionsText} onChange={(e)=>setForm({...form,optionsText:e.target.value})} className="border p-2 rounded col-span-2" />
          <div className="col-span-2 flex justify-end">
            <Button type="submit">Add Field</Button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded p-4">
        <h3 className="font-semibold mb-2">Existing Fields</h3>
        <ul>
          {fields.map(f => (
            <li key={f.id} className="flex justify-between border-b py-2">
              <div>
                <div className="font-medium">{f.label} <span className="text-xs text-gray-500">({f.key})</span></div>
                <div className="text-xs text-gray-500">{f.type} {f.required ? "• required" : ""}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="destructive" onClick={()=>del(f.id)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
