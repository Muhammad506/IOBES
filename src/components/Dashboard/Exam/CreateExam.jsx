import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const CreateExam = () => {
    const { id } = useParams();

    const [questions, setQuestions] = useState(() => {
        const storedQuestions = localStorage.getItem("questions");
        return storedQuestions ? JSON.parse(storedQuestions) : [];
    });

    const [examType, setExamType] = useState("midterm");
    const [questionType, setQuestionType] = useState("objective");
    const [questionText, setQuestionText] = useState("");
    const [clo, setClo] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    useEffect(() => {
        localStorage.setItem("questions", JSON.stringify(questions));
    }, [questions]);

    const handleAddQuestion = () => {
        if (questionText && clo) {
            const newQuestion = {
                id: Date.now(),
                examType,
                questionType,
                text: questionText,
                clo,
            };
            setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
            setQuestionText("");
            setClo("");
            setShowDropdown(false);
        } else {
            alert("Please fill in all fields.");
        }
    };

    const handleDeleteQuestion = (id) => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
    };

    const handleEditClick = (question) => {
        setCurrentQuestion(question);
        setIsEditModalOpen(true);
    };

    const handleUpdateQuestion = () => {
        if (currentQuestion.text && currentQuestion.clo) {
            setQuestions((prevQuestions) =>
                prevQuestions.map((q) =>
                    q.id === currentQuestion.id ? currentQuestion : q
                )
            );
            setIsEditModalOpen(false);
            setCurrentQuestion(null);
        } else {
            alert("Please fill in all fields.");
        }
    };

    // const renderTable = (questions, examType) => (
    //     <div className="mb-8">
    //         <h2 className="text-lg font-semibold mb-4">
    //             {examType.charAt(0).toUpperCase() + examType.slice(1)} Questions
    //         </h2>
    //         <div className="overflow-x-auto">
    //             <table className="min-w-full border border-gray-200 rounded-lg shadow">
    //                 <thead>
    //                     <tr className="bg-blue-100 text-blue-700 text-left">
    //                         <th className="p-3 border">Question</th>
    //                         <th className="p-3 border">Question Type</th>
    //                         <th className="p-3 border">CLO</th>
    //                         <th className="p-3 border text-center">Actions</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {questions.length > 0 ? (
    //                         questions.map((q) => (
    //                             <tr key={q.id} className="hover:bg-blue-50">
    //                                 <td className="p-3 border">{q.text}</td>
    //                                 <td className="p-3 border">{q.questionType}</td>
    //                                 <td className="p-3 border">{q.clo}</td>
    //                                 <td className="p-3 border text-center">
    //                                     <button
    //                                         onClick={() => handleEditClick(q)}
    //                                         className="text-blue-500 hover:text-blue-700 mr-2"
    //                                     >
    //                                         <FaEdit />
    //                                     </button>
    //                                     <button
    //                                         onClick={() => handleDeleteQuestion(q.id)}
    //                                         className="text-red-500 hover:text-red-700"
    //                                     >
    //                                         <FaTrash />
    //                                     </button>
    //                                 </td>
    //                             </tr>
    //                         ))
    //                     ) : (
    //                         <tr>
    //                             <td colSpan="4" className="p-4 text-gray-500 text-center">
    //                                 No questions added yet for {examType}.
    //                             </td>
    //                         </tr>
    //                     )}
    //                 </tbody>
    //             </table>
    //         </div>
    //     </div>
    // );


    const renderTable = (questions, examType) => (
        <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
                {examType.charAt(0).toUpperCase() + examType.slice(1)} Questions
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg shadow">
                    <thead>
                        <tr className="bg-blue-100 text-blue-700 text-left">
                            <th className="p-3 border border-gray-400 w-[70%]"> {/* 60% width */}
                                Question
                            </th>
                            <th className="p-3 border border-gray-400 w-1/5"> {/* Equal width */}
                                Question Type
                            </th>
                            <th className="p-3 border border-gray-400 w-1/5"> {/* Equal width */}
                                CLO
                            </th>
                            <th className="p-3 border border-gray-400 text-center w-1/5"> {/* Equal width */}
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.length > 0 ? (
                            questions.map((q) => (
                                <tr key={q.id} className="hover:bg-blue-50">
                                    <td className="p-3 border border-gray-400">{q.text}</td>
                                    <td className="p-3 border border-gray-400">{q.questionType}</td>
                                    <td className="p-3 border border-gray-400">{q.clo}</td>
                                    <td className="p-3 border border-gray-400 text-center">
                                        <button
                                            onClick={() => handleEditClick(q)}
                                            className="text-blue-500 hover:text-blue-700 mr-2"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteQuestion(q.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-4 text-gray-500 text-center">
                                    No questions added yet for {examType}.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen">
            <header className="bg-blue-600 text-white py-4 px-6 rounded-lg shadow-lg mb-6">
                <h1 className="text-2xl font-semibold">Create Exam</h1>
            </header>

            <div className="bg-white p-4 rounded-lg border border-blue-300 shadow-lg mb-6">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="bg-blue-600 text-white px-6 py-2 font-semibold rounded-lg shadow-md hover:bg-blue-800 transition"
                >
                    {showDropdown ? "Close Form" : "Create Question"}
                </button>

                {showDropdown && (
                    <div className="mt-6 transition-all duration-300 ease-in-out">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-blue-700 font-semibold mb-2">
                                    Exam Type:
                                </label>
                                <select
                                    value={examType}
                                    onChange={(e) => setExamType(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="midterm">Midterm</option>
                                    <option value="final">Final</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-blue-700 font-semibold mb-2">
                                    CLO:
                                </label>
                                <select
                                    value={clo}
                                    onChange={(e) => setClo(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="">Select CLO</option>
                                    <option value="CLO1">CLO1</option>
                                    <option value="CLO2">CLO2</option>
                                    <option value="CLO3">CLO3</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-blue-700 font-semibold mb-2">
                                    Question Type:
                                </label>
                                <select
                                    value={questionType}
                                    onChange={(e) => setQuestionType(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="objective">Objective</option>
                                    <option value="subjective">Subjective</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-blue-700 font-semibold mb-2">
                                Question Text:
                            </label>
                            <textarea
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                                className="w-full p-2 border rounded-md"
                                placeholder="Enter the question text"
                            />
                        </div>

                        <button
                            onClick={handleAddQuestion}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
                        >
                            Add Question
                        </button>
                    </div>
                )}
            </div>

            {renderTable(questions.filter((q) => q.examType === "midterm"), "midterm")}
            {renderTable(questions.filter((q) => q.examType === "final"), "final")}


            {/* Modal */}
            {isEditModalOpen && currentQuestion && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[40%]">
                        <h2 className="text-lg font-semibold mb-4">Edit Question</h2>
                        <div className="mb-4">
                            <label className="block text-blue-700 font-semibold mb-2">
                                Question Text:
                            </label>
                            <textarea
                                value={currentQuestion.text}
                                onChange={(e) =>
                                    setCurrentQuestion({ ...currentQuestion, text: e.target.value })
                                }
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-blue-700 font-semibold mb-2">
                                CLO:
                            </label>
                            <select
                                value={currentQuestion.clo}
                                onChange={(e) =>
                                    setCurrentQuestion({ ...currentQuestion, clo: e.target.value })
                                }
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="CLO1">CLO1</option>
                                <option value="CLO2">CLO2</option>
                                <option value="CLO3">CLO3</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-blue-700 font-semibold mb-2">
                                Question Type:
                            </label>
                            <select
                                value={currentQuestion.questionType}
                                onChange={(e) =>
                                    setCurrentQuestion({
                                        ...currentQuestion,
                                        questionType: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="objective">Objective</option>
                                <option value="subjective">Subjective</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateQuestion}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateExam;
