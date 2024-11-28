import React, { useState } from "react";

// Helper function to format date
const formatDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

const TeacherDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [resultName, setResultName] = useState("");
  const [resultMarks, setResultMarks] = useState("");
  const [resultStudentId, setResultStudentId] = useState("");  
  const [resultDepartment, setResultDepartment] = useState("");  
  const [resultBatch, setResultBatch] = useState("");  
  const [resultSemester, setResultSemester] = useState("");  
  const [results, setResults] = useState([]);
  const [loadingAssignment, setLoadingAssignment] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [activeScreen, setActiveScreen] = useState("assignments");

  // Handle assignment file change
  const handleAssignmentFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAssignmentFile(file);
    }
  };

  // Handle assignment form submission
  const handleUploadAssignment = async () => {
    if (!title || !description || !assignmentFile) {
      alert("Please fill in all fields and upload a file.");
      return;
    }

    setLoadingAssignment(true);

    try {
      const newAssignment = {
        title,
        description,
        fileName: assignmentFile.name,
        submittedAt: new Date(), // Add the submission time
      };

      setAssignments([...assignments, newAssignment]);

      // Show success notification on the current screen (assignments screen)
      setSuccessMessage("Assignment added successfully!");
      setTitle("");
      setDescription("");
      setAssignmentFile(null);

      // Hide success notification after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error uploading assignment:", error);
    } finally {
      setLoadingAssignment(false);
    }
  };

  // Handle result form submission
  const handleAddResult = () => {
    if (!resultName || !resultMarks || !resultStudentId || !resultDepartment || !resultBatch || !resultSemester) {
      alert("Please fill in all fields.");
      return;
    }

    setLoadingResult(true);

    try {
      const newResult = {
        name: resultName,
        studentId: resultStudentId,
        department: resultDepartment,
        batch: resultBatch,
        semester: resultSemester,
        marks: resultMarks,
      };

      setResults([...results, newResult]);

      // Show success notification on the current screen (results screen)
      setSuccessMessage("Result added successfully!");
      setResultName("");
      setResultMarks("");
      setResultStudentId("");  
      setResultDepartment("");  
      setResultBatch("");  
      setResultSemester("");  

      // Hide success notification after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error adding result:", error);
    } finally {
      setLoadingResult(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Section */}
      <nav className="bg-blue-600 text-white py-4 shadow sticky top-0 left-0 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">Teacher Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveScreen("assignments")}
              className={`${
                activeScreen === "assignments" ? "bg-white text-blue-600" : "hover:bg-blue-700"
              } px-4 py-2 rounded transition`}
            >
              Assignments
            </button>
            <button
              onClick={() => setActiveScreen("results")}
              className={`${
                activeScreen === "results" ? "bg-white text-blue-600" : "hover:bg-blue-700"
              } px-4 py-2 rounded transition`}
            >
              Results
            </button>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="bg-blue-100 text-blue-700 py-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <div className="w-full md:w-2/3 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-4xl font-extrabold mb-4">Welcome, Dear Teacher!</h2>
            <p className="text-lg">
              Empower your students by seamlessly uploading assignments and results. Your tools are ready to inspire
              and guide. Let's shape the future together!
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
              alt="Teacher Inspiration Logo"
              className="w-40 h-40 rounded-lg shadow-lg border border-blue-300"
            />
          </div>
        </div>
      </div>

      {/* Assignments Form */}
      {activeScreen === "assignments" && (
        <div className="container mx-auto px-6 mt-8">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Upload Assignment</h2>
            {/* Success Notification for Assignment */}
            {successMessage && (
              <div className="bg-green-100 text-center text-green-700 border border-green-400 px-4 py-2 rounded mb-4">
                {successMessage}
              </div>
            )}
            <div className="mb-4">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter assignment title"
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter assignment description"
                rows="4"
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div className="mb-4">
              <input
                type="file"
                id="assignmentFile"
                onChange={handleAssignmentFileChange}
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleUploadAssignment}
              className={`w-full bg-blue-600 text-white p-3 rounded-lg ${loadingAssignment ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
              disabled={loadingAssignment}
            >
              {loadingAssignment ? "Uploading..." : "Upload Assignment"}
            </button>
          </div>

          {/* Assignments Table */}
          {assignments.length > 0 && (
            <div className="mt-8 bg-white p-8 rounded shadow-md w-full max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Submitted Assignments</h2>
              <div className="overflow-x-auto sm:overflow-hidden">  
                <table className="table-auto border-collapse border border-gray-300 w-full text-center">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2">S.No</th>
                      <th className="border border-gray-300 px-4 py-2">Title</th>
                      <th className="border border-gray-300 px-4 py-2">Description</th>
                      <th className="border border-gray-300 px-4 py-2">File Name</th>
                      <th className="border border-gray-300 px-4 py-2">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.map((assignment, index) => (
                      <tr key={index} className="odd:bg-gray-100 even:bg-gray-50 text-center">
                        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-2">{assignment.title}</td>
                        <td className="border border-gray-300 px-4 py-2">{assignment.description}</td>
                        <td className="border border-gray-300 px-4 py-2">{assignment.fileName}</td>
                        <td className="border border-gray-300 px-4 py-2">{formatDate(assignment.submittedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results Form */}
      {activeScreen === "results" && (
        <div className="container mx-auto px-6 mt-8">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Student Result</h2>
            {/* Success Notification for Results */}
            {successMessage && (
              <div className="bg-green-100 text-center text-green-700 border border-green-400 px-4 py-2 rounded mb-4">
                {successMessage}
              </div>
            )}
            <div className="mb-4">
              <input
                type="text"
                id="name"
                value={resultName}
                onChange={(e) => setResultName(e.target.value)}
                placeholder="Enter student name"
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="studentId"
                value={resultStudentId}
                onChange={(e) => setResultStudentId(e.target.value)}
                placeholder="Enter student ID"
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="department"
                value={resultDepartment}
                onChange={(e) => setResultDepartment(e.target.value)}
                placeholder="Enter department"
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="batch"
                value={resultBatch}
                onChange={(e) => setResultBatch(e.target.value)}
                placeholder="Enter batch"
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="semester"
                value={resultSemester}
                onChange={(e) => setResultSemester(e.target.value)}
                placeholder="Enter semester"
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                id="marks"
                value={resultMarks}
                onChange={(e) => setResultMarks(e.target.value)}
                placeholder="Enter marks"
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleAddResult}
              className={`w-full bg-blue-600 text-white p-3 rounded-lg ${loadingResult ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
              disabled={loadingResult}
            >
              {loadingResult ? "Adding..." : "Add Result"}
            </button>
          </div>

          {/* Results Table */}
          {results.length > 0 && (
            <div className="mt-8 bg-white p-8 rounded shadow-md w-full max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Student Results</h2>
              <div className="overflow-x-auto sm:overflow-hidden">
                <table className="table-auto border-collapse border border-gray-300 w-full text-center">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2">S.No</th>
                      <th className="border border-gray-300 px-4 py-2">Name</th>
                      <th className="border border-gray-300 px-4 py-2">Student ID</th>
                      <th className="border border-gray-300 px-4 py-2">Department</th>
                      <th className="border border-gray-300 px-4 py-2">Batch</th>
                      <th className="border border-gray-300 px-4 py-2">Semester</th>
                      <th className="border border-gray-300 px-4 py-2">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => (
                      <tr key={index} className="odd:bg-gray-100 even:bg-gray-50 text-center">
                        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-2">{result.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{result.studentId}</td>
                        <td className="border border-gray-300 px-4 py-2">{result.department}</td>
                        <td className="border border-gray-300 px-4 py-2">{result.batch}</td>
                        <td className="border border-gray-300 px-4 py-2">{result.semester}</td>
                        <td className="border border-gray-300 px-4 py-2">{result.marks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
