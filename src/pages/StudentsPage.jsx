import React, { useState } from "react";
import StudentTable from "@/components/StudentTable";
import GalleryView from "@/components/views/GalleryView";
import KanbanView from "@/components/views/KanbanView";
import TimelineView from "@/components/views/TimelineView";
import CalendarView from "@/components/views/CalendarView";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Students</h1>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow">
        <Tabs defaultValue="table">
          <TabsList>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="table"><StudentTable /></TabsContent>
          <TabsContent value="gallery"><GalleryView /></TabsContent>
          <TabsContent value="kanban"><KanbanView /></TabsContent>
          <TabsContent value="timeline"><TimelineView /></TabsContent>
          <TabsContent value="calendar"><CalendarView /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
