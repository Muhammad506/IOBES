import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";

const QuizManagement = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState(""); // New state for course code
  const [quizNo, setQuizNo] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("examData")) || [];
    setData(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("examData", JSON.stringify(data));
  }, [data]);

  const handleAddQuiz = () => {
    if (courseName && courseCode && quizNo && totalMarks) {
      const newQuiz = { id: Date.now(), courseName, courseCode, quizNo, totalMarks }; // Include courseCode
      setData([...data, newQuiz]);
      setCourseName("");
      setCourseCode(""); // Clear the courseCode field
      setQuizNo("");
      setTotalMarks("");
      setShowForm(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEdit = (id) => {
    const quizToEdit = data.find((quiz) => quiz.id === id);
    if (quizToEdit) {
      setCourseName(quizToEdit.courseName);
      setCourseCode(quizToEdit.courseCode); // Set courseCode in the edit modal
      setQuizNo(quizToEdit.quizNo);
      setTotalMarks(quizToEdit.totalMarks);
      setEditId(id);
      setShowEditModal(true);
    }
  };

  const handleUpdateQuiz = () => {
    if (courseName && courseCode && quizNo && totalMarks) {
      const updatedData = data.map((quiz) =>
        quiz.id === editId ? { ...quiz, courseName, courseCode, quizNo, totalMarks } : quiz // Include courseCode in the update
      );
      setData(updatedData);
      setCourseName("");
      setCourseCode(""); // Clear courseCode after update
      setQuizNo("");
      setTotalMarks("");
      setEditId(null);
      setShowEditModal(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      const updatedData = data.filter((quiz) => quiz.id !== id);
      setData(updatedData);
    }
  };

  const handleView = (id) => {
    navigate(`/dashboard/quiz-questions/${id}`);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4 px-6 rounded-lg shadow-lg flex justify-between items-center">
        <h1 className="text-xl font-bold">Quiz Management</h1>
      </header>

      {/* Create Quiz Button */}
      <div className="mt-6 text-right">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          {showForm ? "Close Form" : "Create Quiz"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 mt-6 border shadow-md rounded-md border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
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
              onChange={(e) => setCourseCode(e.target.value)} // Add courseCode input
              className="p-2 border rounded-md"
              placeholder="Enter Course Code"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-blue-700">Quiz No</label>
            <input
              type="text"
              value={quizNo}
              onChange={(e) => setQuizNo(e.target.value)}
              className="p-2 border rounded-md"
              placeholder="Enter Quiz No"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-blue-700">Total Marks</label>
            <input
              type="text"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              className="p-2 border rounded-md"
              placeholder="Enter Total Marks"
            />
          </div>
          <button
            onClick={handleAddQuiz}
            className="md:col-span-4 w-fit bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Add Quiz
          </button>
        </div>
      )}

      {/* Quiz Table */}
      <div className="mt-6 overflow-x-auto bg-white">
        <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-md text-gray-700 text-sm">
          <thead>
            <tr className="bg-blue-100 text-blue-700">
              <th className="p-2 border">Course Name</th>
              <th className="p-2 border">Course Code</th> {/* New column for course code */}
              <th className="p-2 border">Quiz No</th>
              <th className="p-2 border">Total Marks</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50 text-center">
                  <td className="p-2 border">{item.courseName}</td>
                  <td className="p-2 border">{item.courseCode}</td> {/* Display course code */}
                  <td className="p-2 border">{item.quizNo}</td>
                  <td className="p-2 border">{item.totalMarks}</td>
                  <td className="px-4 py-2 flex gap-3 items-center border-b justify-center">
                    <AiFillEye
                      className="text-blue-500 size-5 cursor-pointer hover:text-blue-700"
                      onClick={() => handleView(item.id)}
                    />
                    <AiFillEdit
                      className="text-green-500 size-5 cursor-pointer hover:text-green-700"
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
                <td colSpan="5" className="text-center p-4">
                  No quizzes available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Edit Quiz</h2>
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
              <label className="text-gray-700">Course Code</label> {/* Add courseCode input */}
              <input
                type="text"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">Quiz No</label>
              <input
                type="text"
                value={quizNo}
                onChange={(e) => setQuizNo(e.target.value)}
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">Total Marks</label>
              <input
                type="text"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleUpdateQuiz}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
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

export default QuizManagement;
