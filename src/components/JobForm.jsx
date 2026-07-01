import { useState } from "react";

function JobForm({ addJob }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addJob({
      id: Date.now(),
      company,
      role,
      location,
      status: "Applied",
      appliedDate: new Date().toLocaleDateString(),
    });

    setCompany("");
    setRole("");
    setLocation("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full p-3 rounded bg-[#18181b]"
      />

      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-3 rounded bg-[#18181b]"
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-3 rounded bg-[#18181b]"
      />

      <button className="bg-purple-600 px-5 py-3 rounded">
        Add Application
      </button>
    </form>
  );
}

export default JobForm;