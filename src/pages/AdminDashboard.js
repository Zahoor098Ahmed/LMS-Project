import React, { useState } from "react";
import ManageTeachers from "../Admin/ManageTeachers";
import ManageStudents from "../Admin/ManageStudents";

const AdminDashboard = () => {
  const [currentTab, setCurrentTab] = useState("teachers");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Fixed Header Section */}
      <nav className="bg-blue-700 text-white py-4 shadow fixed top-0 left-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <ul className="flex space-x-4">
            <li>
              <button
                className={`px-4 py-2 ${
                  currentTab === "teachers"
                    ? "bg-white text-blue-700"
                    : "hover:bg-blue-600 hover:text-white"
                } rounded-md transition duration-200`}
                onClick={() => setCurrentTab("teachers")}
              >
                Manage Teachers
              </button>
            </li>
            <li>
              <button
                className={`px-4 py-2 ${
                  currentTab === "students"
                    ? "bg-white text-blue-700"
                    : "hover:bg-blue-600 hover:text-white"
                } rounded-md transition duration-200`}
                onClick={() => setCurrentTab("students")}
              >
                Manage Students
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="bg-blue-100 text-blue-700 py-12 mt-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <div className="w-full md:w-2/3 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-4xl font-extrabold mb-4">Welcome, Dear Admin!</h2>
            <p className="text-lg">
              Your dashboard is ready to help you manage teachers and students effectively. Switch tabs to get started.
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Admin Illustration"
              className="w-40 h-40"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-6 px-6">
        {currentTab === "teachers" ? <ManageTeachers /> : <ManageStudents />}
      </div>
    </div>
  );
};

export default AdminDashboard;
