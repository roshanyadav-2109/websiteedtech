
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BatchesAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<BatchesList />} />
      <Route path="/new" element={<BatchesForm />} />
      <Route path="/edit/:id" element={<BatchesForm isEditing={true} />} />
    </Routes>
  );
};

const BatchesList = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Batches</h2>
        <Button asChild>
          <Link to="/admin/batches/new">Add New Batch</Link>
        </Button>
      </div>
      <p className="text-center py-12">Batches management will be implemented soon.</p>
    </div>
  );
};

const BatchesForm = ({ isEditing = false }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{isEditing ? 'Edit Batch' : 'Add New Batch'}</h2>
        <Button variant="outline" asChild>
          <Link to="/admin/batches">Cancel</Link>
        </Button>
      </div>
      <p className="text-center py-12">Batch form will be implemented soon.</p>
    </div>
  );
};

export default BatchesAdmin;
