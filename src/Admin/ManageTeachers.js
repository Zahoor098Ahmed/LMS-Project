import React, { useState, useEffect } from "react";
import { db } from "../config/firebase/firebaseconfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageTeachers = () => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherSubject, setTeacherSubject] = useState("");
  const [teacherDepartment, setTeacherDepartment] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [notification, setNotification] = useState("");

  // Fetch Teachers List
  useEffect(() => {
    const fetchTeachers = async () => {
      const querySnapshot = await getDocs(collection(db, "teachers"));
      const fetchedTeachers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeachers(fetchedTeachers);
    };

    fetchTeachers();
  }, []);

  // Show Notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
  };

  // Add or Edit Teacher
  const handleAddOrEditTeacher = async () => {
    if (!teacherName || !teacherSubject || !teacherDepartment || !teacherEmail || !teacherPassword) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (editId) {
        // Edit existing teacher
        await updateDoc(doc(db, "teachers", editId), {
          name: teacherName,
          subject: teacherSubject,
          department: teacherDepartment,
          email: teacherEmail,
          password: teacherPassword,
        });
        showNotification("Teacher updated successfully!");
      } else {
        // Add new teacher
        await addDoc(collection(db, "teachers"), {
          name: teacherName,
          subject: teacherSubject,
          department: teacherDepartment,
          email: teacherEmail,
          password: teacherPassword,
        });
        showNotification("Teacher added successfully!");
      }

      // Clear form
      setTeacherName("");
      setTeacherSubject("");
      setTeacherDepartment("");
      setTeacherEmail("");
      setTeacherPassword("");
      setEditId(null);

      // Re-fetch teachers to show the updated list
      const querySnapshot = await getDocs(collection(db, "teachers"));
      const fetchedTeachers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeachers(fetchedTeachers);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add or update teacher. Please try again.");
    }
  };

  // Delete Teacher
  const handleDeleteTeacher = async (id) => {
    try {
      await deleteDoc(doc(db, "teachers", id));
      showNotification("Teacher deleted successfully!");

      // Update teacher list
      setTeachers(teachers.filter((teacher) => teacher.id !== id));
    } catch (error) {
      console.error("Error deleting teacher:", error);
      alert("Failed to delete teacher. Please try again.");
    }
  };

  // Load Teacher Data for Editing
  const handleEditTeacher = (teacher) => {
    setTeacherName(teacher.name);
    setTeacherSubject(teacher.subject);
    setTeacherDepartment(teacher.department);
    setTeacherEmail(teacher.email);
    setTeacherPassword(teacher.password);
    setEditId(teacher.id);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Teachers</h2>

      {/* Notification */}
      {notification && (
        <div className="bg-green-100 text-center text-green-700 border border-green-400 px-4 py-2 rounded mb-4">
                {notification}
              </div>
      )}

      {/* Add/Edit Teacher Form */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-xl font-bold mb-4">{editId ? "Edit Teacher" : "Add a New Teacher"}</h3>
        <input
          type="text"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          placeholder="Teacher Name"
          className="border p-3 rounded w-full mb-3"
        />
        <input
          type="text"
          value={teacherSubject}
          onChange={(e) => setTeacherSubject(e.target.value)}
          placeholder="Subject"
          className="border p-3 rounded w-full mb-3"
        />
        <input
          type="text"
          value={teacherDepartment}
          onChange={(e) => setTeacherDepartment(e.target.value)}
          placeholder="Department"
          className="border p-3 rounded w-full mb-3"
        />
        <input
          type="email"
          value={teacherEmail}
          onChange={(e) => setTeacherEmail(e.target.value)}
          placeholder="Teacher Email"
          className="border p-3 rounded w-full mb-3"
        />
        <input
          type="password"
          value={teacherPassword}
          onChange={(e) => setTeacherPassword(e.target.value)}
          placeholder="Password"
          className="border p-3 rounded w-full mb-3"
        />
        <button
          onClick={handleAddOrEditTeacher}
          className={`px-4 py-2 rounded ${
            editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
          } text-white`}
        >
          {editId ? "Update Teacher" : "Add Teacher"}
        </button>
      </div>

      {/* Teacher List */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Teacher List</h3>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr className="text-center">
                <th className="border border-gray-200 px-4 py-2">S.NO</th>
                <th className="border border-gray-200 px-4 py-2">Name</th>
                <th className="border border-gray-200 px-4 py-2">Subject</th>
                <th className="border border-gray-200 px-4 py-2">Department</th>
                <th className="border border-gray-200 px-4 py-2">Email</th>
                <th className="border border-gray-200 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher , index) => (
                <tr key={teacher.id} className="bg-white hover:bg-gray-100 text-center">
                  <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">{teacher.name}</td>
                  <td className="border border-gray-200 px-4 py-2">{teacher.subject}</td>
                  <td className="border border-gray-200 px-4 py-2">{teacher.department}</td>
                  <td className="border border-gray-200 px-4 py-2">{teacher.email}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEditTeacher(teacher)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(teacher.id)}
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
    </div>
  );
};

export default ManageTeachers;
