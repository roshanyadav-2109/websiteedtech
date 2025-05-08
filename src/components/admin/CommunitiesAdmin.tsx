
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CommunitiesAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<CommunitiesList />} />
      <Route path="/new" element={<CommunitiesForm />} />
      <Route path="/edit/:id" element={<CommunitiesForm isEditing={true} />} />
    </Routes>
  );
};

const CommunitiesList = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Communities</h2>
        <Button asChild>
          <Link to="/admin/communities/new">Add New Community</Link>
        </Button>
      </div>
      <p className="text-center py-12">Communities management will be implemented soon.</p>
    </div>
  );
};

const CommunitiesForm = ({ isEditing = false }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{isEditing ? 'Edit Community' : 'Add New Community'}</h2>
        <Button variant="outline" asChild>
          <Link to="/admin/communities">Cancel</Link>
        </Button>
      </div>
      <p className="text-center py-12">Community form will be implemented soon.</p>
    </div>
  );
};

export default CommunitiesAdmin;
