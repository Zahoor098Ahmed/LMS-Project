import React, { useState, useEffect } from "react";
import { db } from "../config/firebase/firebaseconfig";
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageStudents = () => {
  const [studentName, setStudentName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [studentBatch, setStudentBatch] = useState("");
  const [studentDepartment, setStudentDepartment] = useState("");
  const [studentSemester, setStudentSemester] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [students, setStudents] = useState([]);
  const [notification, setNotification] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "students"), (snapshot) => {
      const fetchedStudents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(fetchedStudents);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  const handleAddOrUpdateStudent = async () => {
    if (
      !studentName ||
      !studentID ||
      !studentBatch ||
      !studentDepartment ||
      !studentSemester ||
      !studentEmail ||
      !studentPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (editingStudent) {
        const studentDoc = doc(db, "students", editingStudent.id);
        await updateDoc(studentDoc, {
          name: studentName,
          studentID,
          batch: studentBatch,
          department: studentDepartment,
          semester: studentSemester,
          email: studentEmail,
          password: studentPassword,
        });
        setNotification("Student updated successfully!");
      } else {
        await addDoc(collection(db, "students"), {
          name: studentName,
          studentID,
          batch: studentBatch,
          department: studentDepartment,
          semester: studentSemester,
          email: studentEmail,
          password: studentPassword,
          createdAt: serverTimestamp(),
        });
        setNotification("Student added successfully!");
      }

      setStudentName("");
      setStudentID("");
      setStudentBatch("");
      setStudentDepartment("");
      setStudentSemester("");
      setStudentEmail("");
      setStudentPassword("");
      setEditingStudent(null);

      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.error("Error handling student:", error);
      setNotification("Failed to add/update student. Please try again.");
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      setNotification("Student deleted successfully!");
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.error("Error deleting student:", error);
      setNotification("Failed to delete student. Please try again.");
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setStudentName(student.name);
    setStudentID(student.studentID);
    setStudentBatch(student.batch);
    setStudentDepartment(student.department);
    setStudentSemester(student.semester);
    setStudentEmail(student.email);
    setStudentPassword(student.password);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Students</h2>

       {/* Notification */}
       {notification && (
        <div className="bg-green-100 text-center text-green-700 border border-green-400 px-4 py-2 rounded mb-4">
        {notification}
      </div>
      )}

      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-xl font-bold mb-4">{editingStudent ? "Edit Student" : "Add a New Student"}</h3>
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
        <input
          type="email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          placeholder="Student Email"
          className="border p-3 rounded w-full mb-3"
         
        />
        <input
          type="password"
          value={studentPassword}
          onChange={(e) => setStudentPassword(e.target.value)}
          placeholder="Password"
          className="border p-3 rounded w-full mb-3"
         
        />
        <button
          onClick={handleAddOrUpdateStudent}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
        >
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border border-gray-200 px-4 py-2">S.NO</th>
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">ID</th>
              <th className="border border-gray-200 px-4 py-2">Batch</th>
              <th className="border border-gray-200 px-4 py-2">Department</th>
              <th className="border border-gray-200 px-4 py-2">Semester</th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Password</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student , index) => (
            <tr key={student.id} className="bg-white hover:bg-gray-100 text-center">
              <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-200 px-4 py-2">{student.name}</td>
              <td className="border border-gray-200 px-4 py-2">{student.studentID}</td>
              <td className="border border-gray-200 px-4 py-2">{student.batch}</td>
              <td className="border border-gray-200 px-4 py-2">{student.department}</td>
              <td className="border border-gray-200 px-4 py-2">{student.semester}</td>
              <td className="border border-gray-200 px-4 py-2">{student.email}</td>
              <td className="border border-gray-200 px-4 py-2">{student.password}</td>
              <td className="border border-gray-200 px-4 py-2">
         <div className="flex justify-center space-x-2">
          <button
            onClick={() => handleEditStudent(student)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteStudent(student.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
          >
            <FaTrash />
          </button>
         </div>
         </td>
        </tr>
         ))}
        </tbody>

        </table>
      </div>
    </div>
  );
};

export default ManageStudents;
