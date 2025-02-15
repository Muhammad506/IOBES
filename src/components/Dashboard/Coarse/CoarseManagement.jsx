import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";


const CoarseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [courseForm, setCourseForm] = useState({
        name: "",
        code: "",
        teacher: "",
        creditHours: "",
        semester: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
        setCourses(savedCourses);
        setFilteredCourses(savedCourses);
    }, []);

    useEffect(() => {
        localStorage.setItem("courses", JSON.stringify(courses));
        filterCourses(searchQuery);
    }, [courses]);

    const filterCourses = (query) => {
        const filtered = courses.filter((course) =>
            [course.name, course.code, course.teacher]
                .join(" ")
                .toLowerCase()
                .includes(query.toLowerCase())
        );
        setFilteredCourses(filtered);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        filterCourses(query);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseForm({ ...courseForm, [name]: value });
    };

    const openPopup = (isEdit = false, course = null) => {
        if (isEdit && course) {
            setIsEditing(true);
            setEditId(course.id);
            setCourseForm(course);
        } else {
            setIsEditing(false);
            setEditId(null);
            setCourseForm({
                name: "",
                code: "",
                teacher: "",
                creditHours: "",
                semester: "",
            });
        }
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setCourseForm({
            name: "",
            code: "",
            teacher: "",
            creditHours: "",
            semester: "",
        });
    };

    const handleSaveCourse = () => {
        if (
            !courseForm.name ||
            !courseForm.code ||
            !courseForm.teacher ||
            !courseForm.creditHours ||
            !courseForm.semester
        ) {
            alert("Please fill out all fields.");
            return;
        }

        if (isEditing) {
            setCourses(
                courses.map((course) =>
                    course.id === editId ? { ...course, ...courseForm } : course
                )
            );
        } else {
            const newCourse = { ...courseForm, id: Date.now() };
            setCourses([...courses, newCourse]);
        }

        closePopup();
    };

    const handleDeleteCourse = (id) => {
        const updatedCourses = courses.filter((course) => course.id !== id);
        setCourses(updatedCourses);
    };

    return (
        <div className="min-h-screen ">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 px-6 rounded-sm shadow-lg flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Course Management</h1>
                <div className="flex items-center space-x-4">

                    {/* search bar  */}
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search courses..."
                            className="py-2 px-3 border border-gray-300 rounded-sm text-black shadow-md focus:outline-none pl-10"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    {/* button  */}
                    <button
                        onClick={() => openPopup()}
                        className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded-sm shadow-lg border border-white duration-300"
                    >
                        Create Course
                    </button>
                </div>
            </header>

            {/* Course Table */}
            <div className="overflow-x-auto shadow-lg rounded-sm border border-blue-300 mt-6">
                <table className="min-w-full bg-white text-center">
                    <thead>
                        <tr className="bg-blue-100 text-blue-700">
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">Course Name</th>
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 ">Course Code</th>
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">Teacher</th>
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">Credit Hours</th>
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">Semester</th>
                            <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                                <tr key={course.id} className="hover:bg-blue-50 border border-blue-300 transition-all">
                                    <td className="py-2 px-6 border-r-2 border-blue-300">{course.name}</td>
                                    <td className="py-2 px-6 border-x-2 border-blue-300">{course.code}</td>
                                    <td className="py-2 px-6 border-x-2 border-blue-300 ">{course.teacher}</td>
                                    <td className="py-2 px-6 border-x-2 border-blue-300">{course.creditHours}</td>
                                    <td className="py-2 px-6 border-x-2 border-blue-300">{course.semester}</td>
                                    <td className="py-2 px-6  flex justify-center gap-6 border-blue-300">
                                        <FaEdit
                                            onClick={() => openPopup(true, course)}
                                            className="text-blue-600 cursor-pointer hover:text-blue-700 transform transition duration-150 size-5"
                                        />
                                        <FaTrash
                                            onClick={() => handleDeleteCourse(course.id)}
                                            className="text-red-600 cursor-pointer hover:text-red-700 transform transition duration-150 size-4"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-8 px-6 text-gray-500">
                                    No courses available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Popup Modal */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-full max-w-xl shadow-md border-4 border-blue-500"> {/* Added border to popup */}

                        {/* Header  */}
                        <div className="px-4 py-3 bg-blue-500 text-white text-center">
                            <h2 className="text-2xl font-bold">
                                {isEditing ? "Edit Course" : "Create Course"}
                            </h2>
                        </div>

                        {/* Form Fields */}
                        <div className="px-4 py-3">
                            <div className="grid gap-3">
                                {[
                                    { name: "name", label: "Course Name", placeholder: "Enter Course Name", value: courseForm.name },
                                    { name: "code", label: "Course Code", placeholder: "Enter Course Code", value: courseForm.code },
                                    { name: "teacher", label: "Teacher", placeholder: "Enter Teacher Name", value: courseForm.teacher },
                                    { name: "creditHours", label: "Credit Hours", placeholder: "Enter Credit Hours", value: courseForm.creditHours, type: "number" },
                                    { name: "semester", label: "Semester", placeholder: "Enter Semester", value: courseForm.semester },
                                ].map(({ name, label, placeholder, value, type = "text" }, index) => (
                                    <div key={index} className="flex flex-col">
                                        <label className="text-gray-700 font-medium">{label}</label>
                                        <input
                                            type={type}
                                            name={name}
                                            value={value}
                                            onChange={handleInputChange}
                                            placeholder={placeholder}
                                            className="p-2 border border-gray-400 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition duration-300 w-full"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="px-4 py-3 flex justify-end gap-3">
                            <button
                                onClick={closePopup}
                                className="bg-gray-500 text-white px-4 py-2 hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveCourse}
                                className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
                            >
                                {isEditing ? "Update Course" : "Save Course"}
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default CoarseManagement;
