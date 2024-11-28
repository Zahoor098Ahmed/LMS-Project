import React, { useState } from "react";

const StudentDashboard = () => {
  const [activeScreen, setActiveScreen] = useState("assignments");
  const [assignments, setAssignments] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);

  // Toggle between screens
  const handleToggleScreen = (screen) => setActiveScreen(screen);

  // Handle assignment submission
  const handleAssignmentSubmit = () => {
    if (!assignmentFile || !studentName || !studentId || !department || !semester) {
      alert("Please fill in all fields and select a file.");
      return;
    }

    const currentDateTime = new Date().toLocaleString(); // Get the current date and time in a readable format

    const newAssignment = {
      id: Date.now(),
      studentName,
      studentId,
      department,
      semester,
      fileName: assignmentFile.name,
      submittedAt: currentDateTime, // Store the submission timestamp
    };

    setAssignments([...assignments, newAssignment]);
    setStudentName("");
    setStudentId("");
    setDepartment("");
    setSemester("");
    setAssignmentFile(null);
    setSuccessMessage("Assignment submitted successfully!");

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white p-4 shadow sticky top-0">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-xl font-bold">Student Dashboard</h1>
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={() => handleToggleScreen("assignments")}
                className={`${
                  activeScreen === "assignments"
                    ? "bg-white text-blue-600"
                    : "hover:bg-blue-700"
                } px-4 py-2 rounded transition`}
              >
                Assignments
              </button>
            </li>
            <li>
              <button
                onClick={() => handleToggleScreen("results")}
                className={`${
                  activeScreen === "results"
                    ? "bg-white text-blue-600"
                    : "hover:bg-blue-700"
                } px-4 py-2 rounded transition`}
              >
                Results
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="bg-blue-100 py-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
          <div className="md:w-2/3 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4 text-blue-700">
              Welcome, Student!
            </h2>
            <p className="text-lg text-blue-600">
              Manage your assignments and results seamlessly in one place.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3449/3449678.png"
              alt="Student Dashboard"
              className="w-40 h-40"
            />
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-8">
        {activeScreen === "assignments" && (
          <>
            <h2 className="text-2xl font-bold mb-6">Assignments</h2>

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-100 text-center text-green-700 border border-green-400 px-4 py-2 rounded mb-4">
                {successMessage}
              </div>
            )}

            {/* Assignment Submission Form */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Submit Your Assignment</h3>
              <input
                type="file"
                onChange={(e) => setAssignmentFile(e.target.files[0])}
                className="block w-full border p-2 mb-4 rounded"
              />
              <input
                type="text"
                placeholder="Your Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="block w-full border p-2 mb-4 rounded"
              />
              <input
                type="text"
                placeholder="Your ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="block w-full border p-2 mb-4 rounded"
              />
              <input
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="block w-full border p-2 mb-4 rounded"
              />
              <input
                type="text"
                placeholder="Semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="block w-full border p-2 mb-4 rounded"
              />
              <button
                onClick={handleAssignmentSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
              >
                Submit Assignment
              </button>
            </div>

            {/* Display Submitted Assignments as Table */}
            <h3 className="text-xl font-bold mb-4">Submitted Assignments</h3>
            {assignments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-4 py-2 border text-center">S.No</th>
                      <th className="px-4 py-2 border text-center">Student Name</th>
                      <th className="px-4 py-2 border text-center">Student ID</th>
                      <th className="px-4 py-2 border text-center">Department</th>
                      <th className="px-4 py-2 border text-center">Semester</th>
                      <th className="px-4 py-2 border text-center">File</th>
                      <th className="px-4 py-2 border text-center">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.map((assignment, index) => (
                      <tr
                        key={assignment.id}
                        className={`${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-2 border text-center">{index + 1}</td>
                        <td className="px-4 py-2 border text-center">{assignment.studentName}</td>
                        <td className="px-4 py-2 border text-center">{assignment.studentId}</td>
                        <td className="px-4 py-2 border text-center">{assignment.department}</td>
                        <td className="px-4 py-2 border text-center">{assignment.semester}</td>
                        <td className="px-4 py-2 border text-center">{assignment.fileName}</td>
                        <td className="px-4 py-2 border text-center">{assignment.submittedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No assignments submitted yet.</p>
            )}
          </>
        )}

        {activeScreen === "results" && (
          <>
            <h2 className="text-2xl font-bold mb-6">Results</h2>
            <p className="text-gray-600">No results available yet.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
