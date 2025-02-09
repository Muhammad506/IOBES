// import { useState } from "react";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";

// const QuizQuestions = () => {
//     const [questions, setQuestions] = useState(() => {
//         const storedQuestions = localStorage.getItem("questions");
//         return storedQuestions ? JSON.parse(storedQuestions) : [];
//     });

//     const [questionText, setQuestionText] = useState("");
//     const [questionType, setQuestionType] = useState("");
//     const [cloType, setCloType] = useState("1");

//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editingIndex, setEditingIndex] = useState(null); // Track the index of the question being edited

//     // Add or Update Question
//     const handleSaveQuestion = () => {
//         if (questionText && questionType) {
//             if (editingIndex !== null) {
//                 // Update existing question
//                 const updatedQuestions = [...questions];
//                 updatedQuestions[editingIndex] = { questionText, questionType, cloType };
//                 setQuestions(updatedQuestions);
//                 localStorage.setItem("questions", JSON.stringify(updatedQuestions));
//             } else {
//                 // Add new question
//                 const newQuestion = { questionText, questionType, cloType };
//                 const updatedQuestions = [...questions, newQuestion];
//                 setQuestions(updatedQuestions);
//                 localStorage.setItem("questions", JSON.stringify(updatedQuestions));
//             }

//             // Reset modal and state
//             setQuestionText("");
//             setQuestionType("");
//             setCloType("1");
//             setEditingIndex(null);
//             setIsModalVisible(false);
//         } else {
//             alert("Please fill in all fields.");
//         }
//     };

//     const handleEditQuestion = (index) => {
//         // Populate fields with the selected question
//         const question = questions[index];
//         setQuestionText(question.questionText);
//         setQuestionType(question.questionType);
//         setCloType(question.cloType);

//         setEditingIndex(index); // Set the index of the question being edited
//         setIsModalVisible(true); // Show the modal
//     };

//     const handleDeleteQuestion = (index) => {
//         const updatedQuestions = questions.filter((_, i) => i !== index);
//         setQuestions(updatedQuestions);
//         localStorage.setItem("questions", JSON.stringify(updatedQuestions));
//     };

//     return (
//         <div className="min-h-screen p-6 ">
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-xl font-bold text-blue-600">Create Question</h1>
//                 <button
//                     onClick={() => setIsModalVisible(true)}
//                     className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
//                 >
//                     Create Question
//                 </button>
//             </div>

//             <div className="overflow-x-auto mt-6 border border-gray-300 rounded-lg">
//                 <table className="table-auto w-full text-sm text-gray-800 bg-white shadow rounded-lg">
//                     <thead>
//                         <tr className="bg-blue-100 text-blue-700 border-b">
//                             <th className="px-4 py-2 text-center">Question Text</th>
//                             <th className="px-4 py-2 text-center">Question Type</th>
//                             <th className="px-4 py-2 text-center">CLO Type</th>
//                             <th className="px-4 py-2 text-center">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {questions.length > 0 ? (
//                             questions.map((question, index) => (
//                                 <tr key={index} className="border-b hover:bg-blue-50 text-center">
//                                     <td className="px-4 py-2">{question.questionText}</td>
//                                     <td className="px-4 py-2">{question.questionType}</td>
//                                     <td className="px-4 py-2">{question.cloType}</td>
//                                     <td className="px-4 py-2">
//                                         <button
//                                             onClick={() => handleEditQuestion(index)}
//                                             className="text-yellow-500 hover:text-yellow-600 mr-2"
//                                         >
//                                             <FaEdit className="w-6 h-6" />
//                                         </button>
//                                         <button
//                                             onClick={() => handleDeleteQuestion(index)}
//                                             className="text-red-500 hover:text-red-600"
//                                         >
//                                             <FaTrashAlt className="w-6 h-6" />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="4" className="text-center py-4">
//                                     No questions added yet.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Modal */}
//             {isModalVisible && (
//                 <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg shadow-lg p-6 w-[40%]">
//                         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                             {editingIndex !== null ? "Edit Question" : "Create Question"}
//                         </h2>

//                         <div className="space-y-4">
//                             <div className="border border-gray-300 rounded-lg p-4">
//                                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                     Question Text
//                                 </label>
//                                 <textarea
//                                     value={questionText}
//                                     onChange={(e) => setQuestionText(e.target.value)}
//                                     placeholder="Enter the question text"
//                                     className=" rounded-lg p-3 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                                 ></textarea>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                     Question Type
//                                 </label>
//                                 <select
//                                     value={questionType}
//                                     onChange={(e) => setQuestionType(e.target.value)}
//                                     className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                                 >
//                                     <option value="" disabled>Select Question Type</option>
//                                     <option value="Objective">Objective</option>
//                                     <option value="Subjective">Subjective</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                     CLO Type
//                                 </label>
//                                 <select
//                                     value={cloType}
//                                     onChange={(e) => setCloType(e.target.value)}
//                                     className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                                 >
//                                     <option value="1">CLO 1</option>
//                                     <option value="2">CLO 2</option>
//                                     <option value="3">CLO 3</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <button
//                                     onClick={handleSaveQuestion}
//                                     className="w-full bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
//                                 >
//                                     {editingIndex !== null ? "Update Question" : "Save Question"}
//                                 </button>
//                             </div>
//                         </div>

//                         <button
//                             onClick={() => {
//                                 setIsModalVisible(false);
//                                 setEditingIndex(null);
//                             }}
//                             className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//                         >
//                             ✕
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default QuizQuestions;


import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

const QuizQuestions = () => {
    const { courseName, quizNo } = useParams(); // Get dynamic parameters from the URL
    const [questions, setQuestions] = useState(() => {
        // Get questions from localStorage
        const storedQuestions = localStorage.getItem("questions");
        return storedQuestions ? JSON.parse(storedQuestions) : [];
    });

    const [questionText, setQuestionText] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [cloType, setCloType] = useState("1");

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null); // Track the index of the question being edited

    useEffect(() => {
        // Optionally filter or load quiz-specific questions if needed
        console.log(`Course Name: ${courseName}, Quiz Number: ${quizNo}`);
    }, [courseName, quizNo]);

    // Add or Update Question
    const handleSaveQuestion = () => {
        if (questionText && questionType) {
            if (editingIndex !== null) {
                // Update existing question
                const updatedQuestions = [...questions];
                updatedQuestions[editingIndex] = { questionText, questionType, cloType, courseName, quizNo };
                setQuestions(updatedQuestions);
                localStorage.setItem("questions", JSON.stringify(updatedQuestions));
            } else {
                // Add new question
                const newQuestion = { questionText, questionType, cloType, courseName, quizNo };
                const updatedQuestions = [...questions, newQuestion];
                setQuestions(updatedQuestions);
                localStorage.setItem("questions", JSON.stringify(updatedQuestions));
            }

            // Reset modal and state
            setQuestionText("");
            setQuestionType("");
            setCloType("1");
            setEditingIndex(null);
            setIsModalVisible(false);
        } else {
            alert("Please fill in all fields.");
        }
    };

    const handleEditQuestion = (index) => {
        // Populate fields with the selected question
        const question = questions[index];
        setQuestionText(question.questionText);
        setQuestionType(question.questionType);
        setCloType(question.cloType);

        setEditingIndex(index); // Set the index of the question being edited
        setIsModalVisible(true); // Show the modal
    };

    const handleDeleteQuestion = (index) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
        localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    };

    return (
        <div className="min-h-screen p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold text-blue-600">Create Question - {courseName} - Quiz {quizNo}</h1>
                <button
                    onClick={() => setIsModalVisible(true)}
                    className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Create Question
                </button>
            </div>

            <div className="overflow-x-auto mt-6 border border-gray-300 rounded-lg">
                <table className="table-auto w-full text-sm text-gray-800 bg-white shadow rounded-lg">
                    <thead>
                        <tr className="bg-blue-100 text-blue-700 border-b">
                            <th className="px-4 py-2 text-center">Question Text</th>
                            <th className="px-4 py-2 text-center">Question Type</th>
                            <th className="px-4 py-2 text-center">CLO Type</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.length > 0 ? (
                            questions.map((question, index) => (
                                (question.courseName === courseName && question.quizNo === quizNo) && (
                                    <tr key={index} className="border-b hover:bg-blue-50 text-center">
                                        <td className="px-4 py-2">{question.questionText}</td>
                                        <td className="px-4 py-2">{question.questionType}</td>
                                        <td className="px-4 py-2">{question.cloType}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleEditQuestion(index)}
                                                className="text-yellow-500 hover:text-yellow-600 mr-2"
                                            >
                                                <FaEdit className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteQuestion(index)}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                <FaTrashAlt className="w-6 h-6" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">
                                    No questions added yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalVisible && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[40%]">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            {editingIndex !== null ? "Edit Question" : "Create Question"}
                        </h2>

                        <div className="space-y-4">
                            <div className="border border-gray-300 rounded-lg p-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Question Text
                                </label>
                                <textarea
                                    value={questionText}
                                    onChange={(e) => setQuestionText(e.target.value)}
                                    placeholder="Enter the question text"
                                    className=" rounded-lg p-3 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Question Type
                                </label>
                                <select
                                    value={questionType}
                                    onChange={(e) => setQuestionType(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="" disabled>Select Question Type</option>
                                    <option value="Objective">Objective</option>
                                    <option value="Subjective">Subjective</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    CLO Type
                                </label>
                                <select
                                    value={cloType}
                                    onChange={(e) => setCloType(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="1">CLO 1</option>
                                    <option value="2">CLO 2</option>
                                    <option value="3">CLO 3</option>
                                </select>
                            </div>

                            <div>
                                <button
                                    onClick={handleSaveQuestion}
                                    className="w-full bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                                >
                                    {editingIndex !== null ? "Update Question" : "Save Question"}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setIsModalVisible(false);
                                setEditingIndex(null);
                            }}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizQuestions;
