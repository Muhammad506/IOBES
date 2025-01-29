import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Welcome from "./Welcome";
import ExamManagement from "./Exam/ExamManagement";
import QuizQuestions from "./Quiz/QuizQuestions";
import QuizManagement from "./Quiz/QuizManagement";
import CreateExam from "./Exam/CreateExam";
import AssignmentManagement from "./Assignment/AssignmentManagement";
import CoarseManagement from "./Coarse/CoarseManagement";

const Dashboard = () => {
    return (
        <div className="flex h-full">
            <div className="lg:w-[29%] xl:w-[22%]  lg:bg-gradient-to-br from-[#79A3FF] to-[#A8D8F0] text-white flex flex-col shadow-lg lg:px-2 py-6">
                <Sidebar />
            </div>
            <div className="flex-1 p-8">
                <Routes>
                    <Route index element={<Welcome />} />
                    {/* coarse */}
                    <Route path="coarse-management" element={<CoarseManagement />} />
                    {/* quiz  */}
                    <Route path="quiz-management" element={<QuizManagement />} />
                    <Route path="/quiz-questions/:id" element={<QuizQuestions />} />
                    {/* exam  */}
                    <Route path="exam-management" element={<ExamManagement />} />
                    <Route path="/exam-questions/:id" element={<CreateExam />} />
                    {/* assignment  */}
                    <Route path="assignment-management" element={<AssignmentManagement />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
