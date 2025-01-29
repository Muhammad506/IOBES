import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";

const ExamManagement = () => {
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [midtermMarks, setMidtermMarks] = useState("");
    const [finalMarks, setFinalMarks] = useState("");
    const [internalMarks, setInternalMarks] = useState("");
    const [editId, setEditId] = useState(null);

    const navigate = useNavigate();

    // Load data from localStorage on component mount
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("examData")) || [];
        setData(storedData);
    }, []);

    // Save data to localStorage whenever the data changes
    useEffect(() => {
        if (data.length > 0) {
            localStorage.setItem("examData", JSON.stringify(data));
        }
    }, [data]);

    const calculateTotalMarks = (midterm, final, internal) => {
        return parseFloat(midterm || 0) + parseFloat(final || 0) + parseFloat(internal || 0);
    };

    const handleAddExam = () => {
        if (courseName && courseCode && midtermMarks && finalMarks && internalMarks) {
            const totalMarks = calculateTotalMarks(midtermMarks, finalMarks, internalMarks);
            const newExam = {
                id: Date.now(),
                courseName,
                courseCode,
                midtermMarks,
                finalMarks,
                internalMarks,
                totalMarks,
            };
            setData((prevData) => [...prevData, newExam]);
            setCourseName("");
            setCourseCode("");
            setMidtermMarks("");
            setFinalMarks("");
            setInternalMarks("");
            setShowForm(false);
        } else {
            alert("Please fill in all fields.");
        }
    };

    const handleEdit = (id) => {
        const examToEdit = data.find((exam) => exam.id === id);
        if (examToEdit) {
            setCourseName(examToEdit.courseName);
            setCourseCode(examToEdit.courseCode);
            setMidtermMarks(examToEdit.midtermMarks);
            setFinalMarks(examToEdit.finalMarks);
            setInternalMarks(examToEdit.internalMarks);
            setEditId(id);
            setShowEditModal(true);
        }
    };

    const handleUpdateExam = () => {
        if (courseName && courseCode && midtermMarks && finalMarks && internalMarks) {
            const totalMarks = calculateTotalMarks(midtermMarks, finalMarks, internalMarks);
            const updatedData = data.map((exam) =>
                exam.id === editId
                    ? { ...exam, courseName, courseCode, midtermMarks, finalMarks, internalMarks, totalMarks }
                    : exam
            );
            setData(updatedData);
            setCourseName("");
            setCourseCode("");
            setMidtermMarks("");
            setFinalMarks("");
            setInternalMarks("");
            setEditId(null);
            setShowEditModal(false);
        } else {
            alert("Please fill in all fields.");
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this exam?")) {
            const updatedData = data.filter((exam) => exam.id !== id);
            setData(updatedData);
        }
    };

    const handleView = (id) => {
        navigate(`/dashboard/exam-questions/${id}`);
    };

    return (
        <div className="min-h-screen p-6">
            {/* Header */}
            <header className="bg-blue-500 text-white py-4 px-6 rounded-lg shadow-lg flex justify-between items-center">
                <h1 className="text-xl font-bold">Exam Management</h1>
            </header>

            {/* Create Exam Button */}
            <div className="mt-6 text-right">
                <button
                    onClick={() => setShowForm((prev) => !prev)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    {showForm ? "Close Form" : "Create Exam"}
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white p-6 mt-6 border shadow-md rounded-md border-gray-200 grid grid-cols-1  md:grid-cols-5 gap-4">
                    <div className="flex flex-col">
                        <label className="text-blue-700">Course Name</label>
                        <input
                            type="text"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            className="p-2 border rounded-md"
                            placeholder="Enter Course Name"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-blue-700">Course Code</label>
                        <input
                            type="text"
                            value={courseCode}
                            onChange={(e) => setCourseCode(e.target.value)}
                            className="p-2 border rounded-md"
                            placeholder="Enter Course Code"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-blue-700">Midterm Marks</label>
                        <input
                            type="number"
                            value={midtermMarks}
                            onChange={(e) => setMidtermMarks(e.target.value)}
                            className="p-2 border rounded-md"
                            placeholder="Enter Midterm Marks"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-blue-700">Final Marks</label>
                        <input
                            type="number"
                            value={finalMarks}
                            onChange={(e) => setFinalMarks(e.target.value)}
                            className="p-2 border rounded-md"
                            placeholder="Enter Final Marks"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-blue-700">Internal Marks</label>
                        <input
                            type="number"
                            value={internalMarks}
                            onChange={(e) => setInternalMarks(e.target.value)}
                            className="p-2 border rounded-md"
                            placeholder="Enter Internal Marks"
                        />
                    </div>
                    <button
                        onClick={handleAddExam}
                        className="md:col-span-4 w-fit bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Add Exam
                    </button>
                </div>
            )}

            {/* Exam Table */}
            <div className="mt-6 overflow-x-auto bg-white">
                <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-md text-gray-700 text-sm">
                    <thead>
                        <tr className="bg-blue-100 text-blue-700">
                            <th className="p-2 border">Course Name</th>
                            <th className="p-2 border">Course Code</th>
                            <th className="p-2 border">Midterm Marks</th>
                            <th className="p-2 border">Final Marks</th>
                            <th className="p-2 border">Internal Marks</th>
                            <th className="p-2 border">Total Marks</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50 text-center">
                                    <td className="p-2 border">{item.courseName}</td>
                                    <td className="p-2 border">{item.courseCode}</td>
                                    <td className="p-2 border">{item.midtermMarks}</td>
                                    <td className="p-2 border">{item.finalMarks}</td>
                                    <td className="p-2 border">{item.internalMarks}</td>
                                    <td className="p-2 border">{item.totalMarks}</td>
                                    <td className="px-4 py-2 flex gap-3 items-center border-b justify-center">
                                        <AiFillEye
                                            className="text-green-500 size-5 cursor-pointer hover:text-green-700"
                                            onClick={() => handleView(item.id)}
                                        />
                                        <AiFillEdit
                                            className="text-blue-500 size-5 cursor-pointer hover:text-blue-700"
                                            onClick={() => handleEdit(item.id)}
                                        />
                                        <AiFillDelete
                                            className="text-red-500 size-5 cursor-pointer hover:text-red-700"
                                            onClick={() => handleDelete(item.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center p-4">
                                    No exams available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-gray-950  bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-[40%] shadow-md">
                        <h2 className="text-lg font-bold mb-4">Edit Exam</h2>
                        <div className="flex flex-col mb-4">
                            <label className="text-gray-700">Course Name</label>
                            <input
                                type="text"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                className="p-2 border rounded-md"
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="text-gray-700">Course Code</label>
                            <input
                                type="text"
                                value={courseCode}
                                onChange={(e) => setCourseCode(e.target.value)}
                                className="p-2 border rounded-md"
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="text-gray-700">Midterm Marks</label>
                            <input
                                type="number"
                                value={midtermMarks}
                                onChange={(e) => setMidtermMarks(e.target.value)}
                                className="p-2 border rounded-md"
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="text-gray-700">Final Marks</label>
                            <input
                                type="number"
                                value={finalMarks}
                                onChange={(e) => setFinalMarks(e.target.value)}
                                className="p-2 border rounded-md"
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="text-gray-700">Internal Marks</label>
                            <input
                                type="number"
                                value={internalMarks}
                                onChange={(e) => setInternalMarks(e.target.value)}
                                className="p-2 border rounded-md"
                            />
                        </div>
                        <div className="flex gap-4 justify-end">
                            <button
                                onClick={handleUpdateExam}
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamManagement;
