import React, { useState, useEffect } from "react";
import { db } from "../config/firebase/firebaseconfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const ManageTeachers = () => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherSubject, setTeacherSubject] = useState("");
  const [teacherDepartment, setTeacherDepartment] = useState("");
  const [teachers, setTeachers] = useState([]);

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

  // Add Teacher
  const handleAddTeacher = async () => {
    if (!teacherName || !teacherSubject || !teacherDepartment) {
      alert("Please fill in all fields.");
      return;
    }

    await addDoc(collection(db, "teachers"), {
      name: teacherName,
      subject: teacherSubject,
      department: teacherDepartment,
    });

    setTeacherName("");
    setTeacherSubject("");
    setTeacherDepartment("");
    alert("Teacher added successfully!");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Teachers</h2>
      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-xl font-bold mb-4">Add a New Teacher</h3>
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
        <button
          onClick={handleAddTeacher}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Teacher
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Teacher List</h3>
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher.id} className="border-b py-2">
              {teacher.name} - {teacher.subject} ({teacher.department})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageTeachers;
