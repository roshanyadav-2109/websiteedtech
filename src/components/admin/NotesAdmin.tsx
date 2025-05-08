
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotesAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<NotesList />} />
      <Route path="/new" element={<NotesForm />} />
      <Route path="/edit/:id" element={<NotesForm isEditing={true} />} />
    </Routes>
  );
};

const NotesList = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notes</h2>
        <Button asChild>
          <Link to="/admin/notes/new">Add New Note</Link>
        </Button>
      </div>
      <p className="text-center py-12">Notes management will be implemented soon.</p>
    </div>
  );
};

const NotesForm = ({ isEditing = false }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{isEditing ? 'Edit Note' : 'Add New Note'}</h2>
        <Button variant="outline" asChild>
          <Link to="/admin/notes">Cancel</Link>
        </Button>
      </div>
      <p className="text-center py-12">Note form will be implemented soon.</p>
    </div>
  );
};

export default NotesAdmin;
