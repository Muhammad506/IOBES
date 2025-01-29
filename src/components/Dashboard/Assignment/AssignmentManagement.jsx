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
        setFilteredAssignments(savedAssignments);
    }, []);

    useEffect(() => {
        localStorage.setItem("assignments", JSON.stringify(assignments));
        filterAssignments(searchQuery);
    }, [assignments]);

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
        <div className="min-h-screen p-4">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 px-6 rounded-sm shadow-lg flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Assignment Management</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search assignments..."
                            className="py-2 px-3 border border-gray-300 rounded-sm text-black shadow-md focus:outline-none pl-10"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    <button
                        onClick={() => openPopup()}
                        className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded-sm shadow-lg border border-white duration-300"
                    >
                        Create Assignment
                    </button>
                </div>
            </header>

            {/* Assignment Table */}
            <div className="overflow-x-auto shadow-lg rounded-sm border border-blue-300 mt-6">
                <table className="min-w-full bg-white text-center">
                    <thead>
                        <tr className="bg-blue-100 text-blue-700">
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">Course Name</th>
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">Course Code</th>
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">Credit Hours</th>
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">Assignment No</th>
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
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-sm shadow-lg w-full max-w-xl">
                        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
                            {isEditing ? "Edit Assignment" : "Create Assignment"}
                        </h2>
                        <div className="grid gap-4">
                            <input
                                type="text"
                                name="courseName"
                                value={assignmentForm.courseName}
                                onChange={handleInputChange}
                                placeholder="Course Name"
                                className="p-4 border border-blue-600 rounded-sm focus:outline-none  shadow-sm"
                            />
                            <input
                                type="text"
                                name="courseCode"
                                value={assignmentForm.courseCode}
                                onChange={handleInputChange}
                                placeholder="Course Code"
                                className="p-4 border border-blue-600 rounded-sm focus:outline-none  shadow-sm"
                            />
                            <input
                                type="number"
                                name="creditHours"
                                value={assignmentForm.creditHours}
                                onChange={handleInputChange}
                                placeholder="Credit Hours"
                                className="p-4 border border-blue-600 rounded-sm focus:outline-none  shadow-sm"
                            />
                            <input
                                type="text"
                                name="assignmentNo"
                                value={assignmentForm.assignmentNo}
                                onChange={handleInputChange}
                                placeholder="Assignment No"
                                className="p-4 border border-blue-600 rounded-sm focus:outline-none  shadow-sm"
                            />
                        </div>
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={closePopup}
                                className="py-2 px-6 text-blue-600 hover:text-white border-blue-600 border hover:bg-blue-600 duration-500 rounded-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveAssignment}
                                className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white duration-500 rounded-sm shadow-md transition-transform"
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
