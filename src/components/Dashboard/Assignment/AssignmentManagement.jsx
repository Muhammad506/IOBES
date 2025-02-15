import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const AssignmentManagement = () => {
    const [assignments, setAssignments] = useState([]);
    const [filteredAssignments, setFilteredAssignments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [assignmentForm, setAssignmentForm] = useState({
        courseName: "",
        courseCode: "",
        creditHours: "",
        assignmentNo: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const savedAssignments = JSON.parse(localStorage.getItem("assignments")) || [];
        setAssignments(savedAssignments);
        setFilteredAssignments(savedAssignments);  // Initialize filtered assignments from localStorage
    }, []);

    useEffect(() => {
        if (assignments.length > 0) {
            localStorage.setItem("assignments", JSON.stringify(assignments));
        }
        filterAssignments(searchQuery);
    }, [assignments]);  // Synchronize state changes with localStorage

    const filterAssignments = (query) => {
        const filtered = assignments.filter((assignment) =>
            [assignment.courseName, assignment.courseCode, assignment.assignmentNo]
                .join(" ")
                .toLowerCase()
                .includes(query.toLowerCase())
        );
        setFilteredAssignments(filtered);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        filterAssignments(query);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssignmentForm({ ...assignmentForm, [name]: value });
    };

    const openPopup = (isEdit = false, assignment = null) => {
        if (isEdit && assignment) {
            setIsEditing(true);
            setEditId(assignment.id);
            setAssignmentForm(assignment);
        } else {
            setIsEditing(false);
            setEditId(null);
            setAssignmentForm({
                courseName: "",
                courseCode: "",
                creditHours: "",
                assignmentNo: "",
            });
        }
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setAssignmentForm({
            courseName: "",
            courseCode: "",
            creditHours: "",
            assignmentNo: "",
        });
    };

    const handleSaveAssignment = () => {
        if (
            !assignmentForm.courseName ||
            !assignmentForm.courseCode ||
            !assignmentForm.creditHours ||
            !assignmentForm.assignmentNo
        ) {
            alert("Please fill out all fields.");
            return;
        }

        if (isEditing) {
            setAssignments(
                assignments.map((assignment) =>
                    assignment.id === editId ? { ...assignment, ...assignmentForm } : assignment
                )
            );
        } else {
            const newAssignment = { ...assignmentForm, id: Date.now() };
            setAssignments([...assignments, newAssignment]);
        }

        closePopup();
    };

    const handleDeleteAssignment = (id) => {
        const updatedAssignments = assignments.filter((assignment) => assignment.id !== id);
        setAssignments(updatedAssignments);
    };

    return (
        <div className="min-h-screen font-inter ">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 px-6  shadow-lg flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Assignment Management</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search assignments..."
                            className="py-2 px-3 border border-gray-300  text-black shadow-md focus:outline-none pl-10"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    <button
                        onClick={() => openPopup()}
                        className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6  shadow-lg border border-white duration-300"
                    >
                        Create Assignment
                    </button>
                </div>
            </header>

            {/* Assignment Table */}
            <div className="overflow-x-auto shadow-lg  border font-inter border-blue-300 mt-6">
                <table className="min-w-full bg-white text-center">
                    <thead>
                        <tr className="bg-blue-100 text-blue-700">
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">Course Name</th>
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">Course Code</th>
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">Credit Hours</th>
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">Assignment No</th>
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">Marks</th>
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssignments.length > 0 ? (
                            filteredAssignments.map((assignment) => (
                                <tr key={assignment.id} className="hover:bg-blue-50 border border-blue-300 transition-all">
                                    <td className=" px-6 border-r-2 border-blue-300">{assignment.courseName}</td>
                                    <td className=" px-6 border-x-2 border-blue-300">{assignment.courseCode}</td>
                                    <td className=" px-6 border-x-2 border-blue-300">{assignment.creditHours}</td>
                                    <td className=" px-6 border-x-2 border-blue-300">{assignment.assignmentNo}</td>
                                    <td className=" px-6 border-x-2 border-blue-300">{assignment.marks}</td>
                                    <td className="py-3 px-6 flex justify-center gap-6 border-blue-300">
                                        <FaEdit
                                            onClick={() => openPopup(true, assignment)}
                                            className="text-blue-600 cursor-pointer hover:text-blue-700 transform transition duration-150 size-4"
                                        />
                                        <FaTrash
                                            onClick={() => handleDeleteAssignment(assignment.id)}
                                            className="text-red-600 cursor-pointer hover:text-red-700 transform transition duration-150 size-4"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-8 px-6 text-gray-500">
                                    No assignments available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Popup Modal */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white shadow-2xl  w-full max-w-lg border-4 border-blue-500">
                        <h2 className="text-2xl font-bold text-white bg-blue-500 py-4 text-center">
                            {isEditing ? "Edit Assignment" : "Create Assignment"}
                        </h2>
                        <div className="p-6 space-y-4">
                            {[
                                { label: "Course Name", name: "courseName", type: "text", placeholder: "Enter course name" },
                                { label: "Course Code", name: "courseCode", type: "text", placeholder: "Enter course code" },
                                { label: "Credit Hours", name: "creditHours", type: "number", placeholder: "Enter credit hours" },
                                { label: "Assignment No", name: "assignmentNo", type: "text", placeholder: "Enter assignment number" },
                                { label: "Marks", name: "marks", type: "text", placeholder: "Enter marks" },
                            ].map((field, index) => (
                                <div key={index}>
                                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={assignmentForm[field.name]}
                                        onChange={handleInputChange}
                                        placeholder={field.placeholder}
                                        className="w-full p-2 border border-gray-300  focus:ring-2 focus:ring-blue-400 outline-none shadow-sm transition-all duration-300"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-4 pb-4 px-6 ">
                            <button
                                onClick={closePopup}
                                className="bg-gray-500 text-white px-5 py-2  hover:bg-gray-600 transition-transform duration-500 ease-in-out transform hover:scale-105"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveAssignment}
                                className="bg-blue-600 text-white px-5 py-2  hover:bg-blue-700 transition-transform duration-500 ease-in-out transform hover:scale-105 shadow-md"
                            >
                                {isEditing ? "Update Assignment" : "Save Assignment"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignmentManagement;
