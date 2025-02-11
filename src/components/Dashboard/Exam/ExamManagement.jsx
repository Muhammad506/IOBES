import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const ExamManagement = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [midtermMarks, setMidtermMarks] = useState("");
  const [finalMarks, setFinalMarks] = useState("");
  const [internalMarks, setInternalMarks] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
    return (
      parseFloat(midterm || 0) +
      parseFloat(final || 0) +
      parseFloat(internal || 0)
    );
  };

  const handleAddExam = () => {
    if (
      courseName &&
      courseCode &&
      midtermMarks &&
      finalMarks &&
      internalMarks
    ) {
      const totalMarks = calculateTotalMarks(
        midtermMarks,
        finalMarks,
        internalMarks
      );
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
      resetForm();
      setShowModal(false);
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
      setShowModal(true);
    }
  };

  const handleUpdateExam = () => {
    if (
      courseName &&
      courseCode &&
      midtermMarks &&
      finalMarks &&
      internalMarks
    ) {
      const totalMarks = calculateTotalMarks(
        midtermMarks,
        finalMarks,
        internalMarks
      );
      const updatedData = data.map((exam) =>
        exam.id === editId
          ? {
              ...exam,
              courseName,
              courseCode,
              midtermMarks,
              finalMarks,
              internalMarks,
              totalMarks,
            }
          : exam
      );
      setData(updatedData);
      resetForm();
      setShowModal(false);
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
    const exam = data.find((exam) => exam.id === id);
    if (exam) {
      navigate(
        `/dashboard/exam-questions/${id}/${encodeURIComponent(exam.courseName)}`
      );
    }
  };
  const resetForm = () => {
    setCourseName("");
    setCourseCode("");
    setMidtermMarks("");
    setFinalMarks("");
    setInternalMarks("");
    setEditId(null);
  };

  // Search by both course name and course code
  const filteredData = data.filter(
    (exam) =>
      exam.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Exam Management</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 pl-10 border border-gray-300 w-full text-black focus:outline-none focus:border-blue-500"
              placeholder="Search by course name or code"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded-sm shadow-lg border border-white duration-500"
          >
            Create Exam
          </button>
        </div>
      </header>

      {/* Exam Table */}
      <div className="mt-6 overflow-x-auto bg-white shadow-md">
        <table className="w-full border-blue-300 border ">
          <thead>
            <tr className=" bg-blue-100 text-blue-700">
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Course Name
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2 text-nowrap">
                Course Code
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2 text-nowrap">
                Midterm Marks
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2 text-nowrap">
                Final Marks
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2 text-nowrap">
                Internal Marks
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2 text-nowrap">
                Total Marks
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-blue-50 border border-blue-300 transition-all"
                >
                  <td className="px-6 border-r-2 border-blue-300 text-nowrap">
                    {item.courseName}
                  </td>
                  <td className="px-6 border-r-2 border-blue-300">
                    {item.courseCode}
                  </td>
                  <td className="px-6 border-r-2 border-blue-300">
                    {item.midtermMarks}
                  </td>
                  <td className="px-6 border-r-2 border-blue-300">
                    {item.finalMarks}
                  </td>
                  <td className="px-6 border-r-2 border-blue-300">
                    {item.internalMarks}
                  </td>
                  <td className="px-6 border-r-2 border-blue-300">
                    {item.totalMarks}
                  </td>
                  <td className="py-3 px-6 flex justify-center gap-6 border-blue-300">
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

      {/* Modal for Create/Edit Exam */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg shadow-md">
            <div className="p-6 border-b border-gray-300">
              <h2 className="text-xl font-bold justify-center flex items-center text-blue-700">
                {editId ? "Edit Exam" : "Create Exam"}
              </h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  {/* <label className="text-gray-700">Course Name</label> */}
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Enter Course Name"
                  />
                </div>
                <div className="flex flex-col">
                  {/* <label className="text-gray-700">Course Code</label> */}
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Enter Course Code"
                  />
                </div>
                <div className="flex flex-col">
                  {/* <label className="text-gray-700">Midterm Marks</label> */}
                  <input
                    type="number"
                    value={midtermMarks}
                    onChange={(e) => setMidtermMarks(e.target.value)}
                    className="p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Enter Midterm Marks"
                  />
                </div>
                <div className="flex flex-col">
                  {/* <label className="text-gray-700">Final Marks</label> */}
                  <input
                    type="number"
                    value={finalMarks}
                    onChange={(e) => setFinalMarks(e.target.value)}
                    className="p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Enter Final Marks"
                  />
                </div>
                <div className="flex flex-col">
                  {/* <label className="text-gray-700">Internal Marks</label> */}
                  <input
                    type="number"
                    value={internalMarks}
                    onChange={(e) => setInternalMarks(e.target.value)}
                    className="p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Enter Internal Marks"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-300 flex justify-end gap-4">
              <button
                onClick={editId ? handleUpdateExam : handleAddExam}
                className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 transition"
              >
                {editId ? "Update" : "Create"}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="bg-gray-500 text-white px-6 py-2 hover:bg-gray-600 transition"
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
