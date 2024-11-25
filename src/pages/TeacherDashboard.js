import React, { useState } from "react";
import { db, storage } from "../config/firebase/firebaseconfig"; // Import Firebase storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const TeacherDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [marks, setMarks] = useState("");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [resultFile, setResultFile] = useState(null); // To store result file
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

  // Upload Assignment
  const handleUploadAssignment = async () => {
    if (!title || !description || !assignmentFile) {
      alert("Please fill in all fields and upload a file.");
      return;
    }

    setLoadingAssignment(true);

    try {
      // Create a reference to Firebase Storage
      const fileRef = ref(storage, `assignments/${assignmentFile.name}`);

      // Upload the assignment file to Firebase Storage
      await uploadBytes(fileRef, assignmentFile);

      // Get the file download URL
      const fileURL = await getDownloadURL(fileRef);

      // Save the assignment details to Firestore
      await addDoc(collection(db, "assignments"), {
        title,
        description,
        fileURL, // Save the file URL in Firestore
        teacherId: "teacher_unique_id", // Use the logged-in teacher's ID here
      });

      setSuccessMessage("Assignment uploaded successfully!");
      setTitle("");
      setDescription("");
      setAssignmentFile(null); // Clear the file after upload
    } catch (error) {
      console.error("Error uploading assignment:", error);
    } finally {
      setLoadingAssignment(false);
    }
  };

  // Upload Result
  const handleUploadResult = async () => {
    if (!studentName || !studentId || !marks || !department || !batch || !resultFile) {
      alert("Please fill in all fields and upload a result file.");
      return;
    }

    setLoadingResult(true);

    try {
      // Create a reference to Firebase Storage
      const resultFileRef = ref(storage, `results/${resultFile.name}`);

      // Upload the result file to Firebase Storage
      await uploadBytes(resultFileRef, resultFile);

      // Get the file download URL
      const resultFileURL = await getDownloadURL(resultFileRef);

      // Save the result details to Firestore
      await addDoc(collection(db, "results"), {
        studentName,
        studentId,
        marks: parseInt(marks),
        department,
        batch,
        resultFileURL, // Save the result file URL in Firestore
        teacherId: "teacher_unique_id", // Use the logged-in teacher's ID here
      });

      setSuccessMessage("Result uploaded successfully!");
      setStudentName("");
      setStudentId("");
      setMarks("");
      setDepartment("");
      setBatch("");
      setResultFile(null); // Clear the result file after upload
    } catch (error) {
      console.error("Error uploading result:", error);
    } finally {
      setLoadingResult(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Section */}
      <nav className="bg-blue-600 text-white py-4 shadow sticky top-0 left-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-xl font-bold">Teacher Dashboard</h1>
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={() => setActiveScreen("assignments")}
                className={`px-4 py-2 ${
                  activeScreen === "assignments" ? "bg-white text-blue-600" : "hover:bg-blue-700 hover:text-white"
                } rounded-md transition duration-200`}
              >
                Assignments
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveScreen("results")}
                className={`px-4 py-2 ${
                  activeScreen === "results" ? "bg-white text-blue-600" : "hover:bg-blue-700 hover:text-white"
                } rounded-md transition duration-200`}
              >
                Results
              </button>
            </li>
          </ul>
        </div>
      </nav>

     {/* Welcome Admin Section */}
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





      {/* Assignments Screen */}
      {activeScreen === "assignments" && (
        <div className="container mx-auto p-6 px-6">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Upload Assignment</h2>
            {successMessage && (
              <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
                {successMessage}
              </p>
            )}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Assignment Title
              </label>
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
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Assignment Description
              </label>
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
              <label htmlFor="assignmentFile" className="block text-sm font-medium text-gray-700">
                Upload Assignment File
              </label>
              <input
                type="file"
                id="assignmentFile"
                onChange={handleAssignmentFileChange}
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleUploadAssignment}
              className={`w-full bg-blue-600 text-white p-3 rounded ${
                loadingAssignment ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              } transition`}
              disabled={loadingAssignment}
            >
              {loadingAssignment ? "Uploading..." : "Upload Assignment"}
            </button>
          </div>
        </div>
      )}

      {/* Results Screen */}
      {activeScreen === "results" && (
        <div className="container mx-auto p-6 px-6">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Upload Result</h2>
            {successMessage && (
              <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
                {successMessage}
              </p>
            )}
            <div className="mb-4">
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                Student Name
              </label>
              <input
                type="text"
                id="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student's name"
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                Student ID
              </label>
              <input
                type="text"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter student ID"
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="marks" className="block text-sm font-medium text-gray-700">
                Marks
              </label>
              <input
                type="number"
                id="marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                placeholder="Enter marks"
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Enter department"
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="batch" className="block text-sm font-medium text-gray-700">
                Batch
              </label>
              <input
                type="text"
                id="batch"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                placeholder="Enter batch"
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="resultFile" className="block text-sm font-medium text-gray-700">
                Upload Result File
              </label>
              <input
                type="file"
                id="resultFile"
                onChange={(e) => setResultFile(e.target.files[0])}
                className="mt-1 block w-full p-3 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleUploadResult}
              className={`w-full bg-blue-600 text-white p-3 rounded ${
                loadingResult ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              } transition`}
              disabled={loadingResult}
            >
              {loadingResult ? "Uploading..." : "Upload Result"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
