import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

/*
 field: { id, label, key, type, required, options }
 value: object (customFields)
 onChange: (key, value)
 readOnly: boolean
*/
export default function FieldRenderer({ field, value = {}, onChange, readOnly }) {
  const val = value[field.key];

  if (field.type === "text") {
    return (
      <label className="block mb-3">
        <div className="text-sm text-gray-600">{field.label}</div>
        <Input value={val || ""} onChange={(e) => onChange(field.key, e.target.value)} disabled={readOnly} />
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className="block mb-3">
        <div className="text-sm text-gray-600">{field.label}</div>
        <Textarea value={val || ""} onChange={(e) => onChange(field.key, e.target.value)} disabled={readOnly} />
      </label>
    );
  }

  if (field.type === "dropdown" || field.type === "select") {
    return (
      <label className="block mb-3">
        <div className="text-sm text-gray-600">{field.label}</div>
        <Select onValueChange={(v) => onChange(field.key, v)} value={val || ""} disabled={readOnly}>
          <SelectTrigger>
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {(field.options || []).map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
          </SelectContent>
        </Select>
      </label>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="flex items-center gap-2 mb-3">
        <Checkbox checked={!!val} onCheckedChange={(c) => onChange(field.key, !!c)} disabled={readOnly} />
        <div className="text-sm text-gray-600">{field.label}</div>
      </div>
    );
  }

  if (field.type === "date") {
    return (
      <label className="block mb-3">
        <div className="text-sm text-gray-600">{field.label}</div>
        <Input type="date" value={val || ""} onChange={(e) => onChange(field.key, e.target.value)} disabled={readOnly} />
      </label>
    );
  }

  return null;
}
