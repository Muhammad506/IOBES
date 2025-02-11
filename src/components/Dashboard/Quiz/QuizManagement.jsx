import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [quizForm, setQuizForm] = useState({
    courseName: "",
    courseCode: "",
    creditHours: "",
    quizNo: "",
    totalMarks: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate(); // Initialize navigate for routing

  // Load quizzes from localStorage on mount
  useEffect(() => {
    const savedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    setQuizzes(savedQuizzes);
    setFilteredQuizzes(savedQuizzes);
  }, []);

  // Update localStorage and filter when quizzes or search change
  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    filterQuizzes(searchQuery);
  }, [quizzes, searchQuery]); // Add proper dependencies here

  const filterQuizzes = (query) => {
    const filtered = quizzes.filter((quiz) =>
      [quiz.courseName, quiz.courseCode, quiz.quizNo]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredQuizzes(filtered);
  };
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterQuizzes(query);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizForm({ ...quizForm, [name]: value });
  };

  const openPopup = (isEdit = false, quiz = null) => {
    if (isEdit && quiz) {
      setIsEditing(true);
      setEditId(quiz.id);
      setQuizForm(quiz);
    } else {
      setIsEditing(false);
      setEditId(null);
      setQuizForm({
        courseName: "",
        courseCode: "",
        creditHours: "",
        quizNo: "",
        totalMarks: "",
      });
    }
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setQuizForm({
      courseName: "",
      courseCode: "",
      creditHours: "",
      quizNo: "",
      totalMarks: "",
    });
  };

  const handleSaveQuiz = () => {
    if (
      !quizForm.courseName ||
      !quizForm.courseCode ||
      !quizForm.creditHours ||
      !quizForm.quizNo ||
      !quizForm.totalMarks
    ) {
      alert("Please fill out all fields.");
      return;
    }

    let updatedQuizzes;

    if (isEditing) {
      updatedQuizzes = quizzes.map((quiz) =>
        quiz.id === editId ? { ...quiz, ...quizForm } : quiz
      );
    } else {
      const newQuiz = { ...quizForm, id: Date.now() };
      updatedQuizzes = [...quizzes, newQuiz];
    }

    setQuizzes(updatedQuizzes);
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes)); // Update localStorage immediately

    closePopup();
  };

  const handleDeleteQuiz = (id) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
    setQuizzes(updatedQuizzes);
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes)); // Update localStorage after deletion
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 rounded-sm shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Quiz Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search quizzes..."
              className="py-2 px-3 border border-gray-300 rounded-sm text-black shadow-md focus:outline-none pl-10"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <button
            onClick={() => openPopup()}
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded-sm shadow-lg border border-white duration-500"
          >
            Create Quiz
          </button>
        </div>
      </header>

      {/* Quiz Table */}
      <div className="overflow-x-auto shadow-lg rounded-sm border border-blue-300 mt-6">
        <table className="min-w-full bg-white text-center">
          <thead>
            <tr className="bg-blue-100 text-blue-700">
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Course Name
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Course Code
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Credit Hours
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Quiz No
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Total Marks
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz) => (
                <tr
                  key={quiz.id}
                  className="hover:bg-blue-50 border border-blue-300 transition-all"
                >
                  <td className="px-6 border-r-2 border-blue-300">
                    {quiz.courseName}
                  </td>
                  <td className="px-6 border-x-2 border-blue-300">
                    {quiz.courseCode}
                  </td>
                  <td className="px-6 border-x-2 border-blue-300">
                    {quiz.creditHours}
                  </td>
                  <td className="px-6 border-x-2 border-blue-300">
                    {quiz.quizNo}
                  </td>
                  <td className="px-6 border-x-2 border-blue-300">
                    {quiz.totalMarks}
                  </td>
                  <td className="py-3 px-6 flex justify-center gap-6 border-blue-300">
                    <AiFillEye
                      onClick={() =>
                        navigate(
                          `/dashboard/quiz-questions/${quiz.courseName}/${quiz.quizNo}`
                        )
                      }
                      className="text-green-600 cursor-pointer hover:text-green-700 transform transition duration-150 size-4"
                    />
                    <AiFillEdit
                      onClick={() => openPopup(true, quiz)}
                      className="text-blue-600 cursor-pointer hover:text-blue-700 transform transition duration-150 size-4"
                    />
                    <AiFillDelete
                      onClick={() => handleDeleteQuiz(quiz.id)}
                      className="text-red-600 cursor-pointer hover:text-red-700 transform transition duration-150 size-4"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 px-6 text-gray-500">
                  No quizzes available.
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
              {isEditing ? "Edit Quiz" : "Create Quiz"}
            </h2>
            <div className="grid gap-4">
              {[
                "courseName",
                "courseCode",
                "creditHours",
                "quizNo",
                "totalMarks",
              ].map((field, index) => (
                <input
                  key={index}
                  type="text"
                  name={field}
                  value={quizForm[field]}
                  onChange={handleInputChange}
                  placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                  className="p-4 border border-blue-600 rounded-sm focus:outline-none shadow-sm"
                />
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={closePopup}
                className="bg-gray-500 text-white px-6 py-2 hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveQuiz}
                className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-sm shadow-md"
              >
                {isEditing ? "Update Quiz" : "Save Quiz"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizManagement;
