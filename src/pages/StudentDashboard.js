import React, { useState, useEffect } from "react";
import { db } from "../config/firebase/firebaseconfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState("assignments");

  const [assignmentFile, setAssignmentFile] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch assignments from Firestore
  const fetchAssignments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "assignments"));
      const fetchedAssignments = [];
      querySnapshot.forEach((doc) => {
        fetchedAssignments.push({ id: doc.id, ...doc.data() });
      });
      setAssignments(fetchedAssignments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setLoading(false);
    }
  };

  // Fetch results from Firestore
  const fetchResults = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "results"));
      const fetchedResults = [];
      querySnapshot.forEach((doc) => {
        fetchedResults.push({ id: doc.id, ...doc.data() });
      });
      setResults(fetchedResults);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching results:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchResults();
  }, []);

  const handleAssignmentUpload = async () => {
    if (!assignmentFile || !studentName || !studentId || !department || !semester) {
      alert("Please fill in all fields and select an assignment file.");
      return;
    }

    setLoading(true);
    try {
      // Logic to upload the assignment file to Firebase storage and save its details to Firestore
      await addDoc(collection(db, "submittedAssignments"), {
        studentName,
        studentId,
        department,
        semester,
        fileUrl: "mock-file-url", // Replace with actual file URL after upload
        assignmentId: "mock-assignment-id", // Replace with actual assignment ID
      });

      setSuccessMessage("Assignment submitted successfully!");
      setStudentName("");
      setStudentId("");
      setDepartment("");
      setSemester("");
      setAssignmentFile(null);

      // Fetch updated assignments
      fetchAssignments();
    } catch (error) {
      console.error("Error uploading assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleScreen = (screen) => {
    setActiveScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sticky Navigation Bar */}
      <nav className="bg-blue-600 text-white p-4 shadow sticky top-0 left-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Student Dashboard</h1>
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={() => handleToggleScreen("assignments")}
                className={`${
                  activeScreen === "assignments"
                    ? "bg-white text-blue-600"
                    : "text-white-300 hover:bg-blue-700 hover:text-white"
                } px-4 py-2 rounded-md transition duration-200`}
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
                    : "text-white-300 hover:bg-blue-700 hover:text-white"
                } px-4 py-2 rounded-md transition duration-200`}
              >
                Results
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="bg-blue-100 text-blue-700 py-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <div className="w-full md:w-2/3 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-4xl font-extrabold mb-4">Welcome, Dear Student!</h2>
            <p className="text-lg">
              Stay organized by viewing your assignments and results here. Keep track of your progress and submit your work seamlessly.
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3449/3449678.png"
              alt="Student Dashboard Logo"
              className="w-40 h-40 rounded-lg shadow-lg border border-blue-300"
            />
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-8">
        {activeScreen === "assignments" && (
          <>
            <h2 className="text-2xl font-bold mb-6">Assignments</h2>
            {loading ? (
              <p className="text-gray-600">Loading assignments...</p>
            ) : assignments.length > 0 ? (
              <ul>
                {assignments.map((assignment) => (
                  <li
                    key={assignment.id}
                    className="border p-4 mb-4 rounded-lg shadow hover:shadow-md transition"
                  >
                    <h3 className="text-lg font-semibold text-blue-600">{assignment.title}</h3>
                    <p className="text-gray-700">{assignment.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Due: {assignment.dueDate || "N/A"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No assignments found.</p>
            )}

            <div className="bg-white shadow rounded-lg p-6 mt-6">
              <h3 className="text-xl font-bold mb-4">Upload Your Assignment</h3>
              {successMessage && (
                <p className="text-green-500">{successMessage}</p>
              )}
              <input
                type="file"
                onChange={(e) => setAssignmentFile(e.target.files[0])}
                className="mb-4"
              />
              <input
                type="text"
                placeholder="Your Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="border p-2 w-full mb-4"
              />
              <input
                type="text"
                placeholder="Your ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="border p-2 w-full mb-4"
              />
              <input
                type="text"
                placeholder="Your Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="border p-2 w-full mb-4"
              />
              <input
                type="text"
                placeholder="Your Semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="border p-2 w-full mb-4"
              />
              <button
                onClick={handleAssignmentUpload}
                className="bg-blue-600 text-white p-3 rounded mt-4"
              >
                Upload Assignment
              </button>
            </div>
          </>
        )}

        {activeScreen === "results" && (
          <>
            <h2 className="text-2xl font-bold mb-6">Results</h2>
            {loading ? (
              <p className="text-gray-600">Loading results...</p>
            ) : results.length > 0 ? (
              <ul>
                {results.map((result) => (
                  <li
                    key={result.id}
                    className="border p-4 mb-4 rounded-lg shadow hover:shadow-md transition"
                  >
                    <h3 className="text-lg font-semibold text-blue-600">
                      {result.studentName}
                    </h3>
                    <p className="text-gray-700">Marks: {result.marks}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Department: {result.department}, Semester: {result.semester}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No results available.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
