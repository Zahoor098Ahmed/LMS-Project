import React, { useState, useEffect } from "react";
import { db } from "../config/firebase/firebaseconfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const ManageStudents = () => {
  const [studentName, setStudentName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [studentBatch, setStudentBatch] = useState("");
  const [studentDepartment, setStudentDepartment] = useState("");
  const [studentSemester, setStudentSemester] = useState("");
  const [students, setStudents] = useState([]);

  // Fetch Students List
  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      const fetchedStudents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(fetchedStudents);
    };

    fetchStudents();
  }, []);

  // Add Student
  const handleAddStudent = async () => {
    if (!studentName || !studentID || !studentBatch || !studentDepartment || !studentSemester) {
      alert("Please fill in all fields.");
      return;
    }

    await addDoc(collection(db, "students"), {
      name: studentName,
      studentID,
      batch: studentBatch,
      department: studentDepartment,
      semester: studentSemester,
    });

    setStudentName("");
    setStudentID("");
    setStudentBatch("");
    setStudentDepartment("");
    setStudentSemester("");
    alert("Student added successfully!");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Students</h2>
      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-xl font-bold mb-4">Add a New Student</h3>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Student Name"
          className="border p-3 rounded w-full mb-3"
        />
        <input
          type="text"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
          placeholder="Student ID"
          className="border p-3 rounded w-full mb-3"
        />
        <input
          type="text"
          value={studentBatch}
          onChange={(e) => setStudentBatch(e.target.value)}
          placeholder="Batch"
          className="border p-3 rounded w-full mb-3"
        />
        <input
          type="text"
          value={studentDepartment}
          onChange={(e) => setStudentDepartment(e.target.value)}
          placeholder="Department"
          className="border p-3 rounded w-full mb-3"
        />
        <input
          type="text"
          value={studentSemester}
          onChange={(e) => setStudentSemester(e.target.value)}
          placeholder="Semester"
          className="border p-3 rounded w-full mb-3"
        />
        <button
          onClick={handleAddStudent}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Student
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Student List</h3>
        <ul>
          {students.map((student) => (
            <li key={student.id} className="border-b py-2">
              {student.name} - {student.studentID} ({student.batch}, {student.department}, Semester: {student.semester})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageStudents;
