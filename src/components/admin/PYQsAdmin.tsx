
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PYQsAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<PYQsList />} />
      <Route path="/new" element={<PYQsForm />} />
      <Route path="/edit/:id" element={<PYQsForm isEditing={true} />} />
    </Routes>
  );
};

const PYQsList = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Previous Year Questions</h2>
        <Button asChild>
          <Link to="/admin/pyqs/new">Add New PYQ</Link>
        </Button>
      </div>
      <p className="text-center py-12">PYQs management will be implemented soon.</p>
    </div>
  );
};

const PYQsForm = ({ isEditing = false }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{isEditing ? 'Edit PYQ' : 'Add New PYQ'}</h2>
        <Button variant="outline" asChild>
          <Link to="/admin/pyqs">Cancel</Link>
        </Button>
      </div>
      <p className="text-center py-12">PYQ form will be implemented soon.</p>
    </div>
  );
};

export default PYQsAdmin;
