import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function StudentDashboard() {
  const location = useLocation();
  const student = location.state?.student;

  const [activePage, setActivePage] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  useEffect(() => {
  fetch("http://localhost:5000/api/students")
    .then((res) => res.json())
    .then((data) => setStudents(data))
    .catch((err) => console.error(err));
}, []);
  if (!student) {
    return (
      <div className="min-h-screen bg-[#0b1324] flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">
          No Student Data Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0b1324]">

      {/* HEADER */}
      <header className="bg-white shadow-md">
        <div className="w-full px-10 py-3 flex justify-between items-center">

          <img src="/logo.png" alt="AR INFOTEK" className="h-12" />

          <nav className="hidden md:flex gap-10 text-gray-700 font-semibold">
            <a href="#">Home</a>
            <a href="#">Courses</a>
            <a href="#">Why Us</a>
            <a href="#">Innovation Labs</a>
            <a href="#">Internship</a>
          </nav>

          <div className="flex gap-4">
            <button className="border-2 border-blue-800 text-blue-800 px-5 py-2 rounded-lg font-bold">
              Talk to Us
            </button>

            <button className="bg-orange-500 text-white px-5 py-2 rounded-lg font-bold">
              View Courses
            </button>
          </div>

        </div>
      </header>

      <div className="flex w-full min-h-screen">

        {/* SIDEBAR */}
        <aside className="w-72 min-h-screen flex-shrink-0 bg-black/20 border-r border-white/10">

          <div className="p-6">

            <h2 className="text-white text-xl font-bold mb-8">
              Student Panel
            </h2>

            <ul className="space-y-3">

              <li
  className={`text-white p-4 rounded-2xl cursor-pointer ${
    activePage === "dashboard" ? "bg-[#1e5aa8]" : ""
  }`}
  onClick={() => setActivePage("dashboard")}
>
  Dashboard
</li>

              <li
               className="text-white p-4 rounded-2xl cursor-pointer hover:bg-[#1e5aa8]"
               onClick={() => setActivePage("students")}
              >
               Student List
              </li>

              <li className="text-white p-4 rounded-2xl">
                Profile
              </li>

              <li className="text-white p-4 rounded-2xl">
                Courses
              </li>

              <li className="text-white p-4 rounded-2xl">
                Results
              </li>

              <li className="text-white p-4 rounded-2xl">
                Attendance
              </li>

              <li className="text-white p-4 rounded-2xl">
                Settings
              </li>

              <li className="bg-red-600 text-white p-4 rounded-2xl mt-6">
                Logout
              </li>

            </ul>

          </div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8 w-full">

        {activePage === "dashboard" && (
        <>

                    {/* WELCOME CARD */}
          <div className="rounded-3xl bg-gradient-to-r from-[#1e5aa8] to-blue-700 p-10 shadow-2xl mb-8">

            <h2 className="text-4xl font-black text-white">
              Welcome Back 👋
            </h2>

            <p className="text-blue-100 mt-3 text-xl">
              {student.fullname}
            </p>

          </div>


          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">

            <div className="bg-white/10 border border-white/20 rounded-3xl p-6">
              <h4 className="text-blue-200">
                Semester
              </h4>

              <p className="text-white text-4xl font-black mt-2">
                {student.semester}
              </p>
            </div>


            <div className="bg-white/10 border border-white/20 rounded-3xl p-6">
              <h4 className="text-blue-200">
                Year
              </h4>

              <p className="text-green-400 text-4xl font-black mt-2">
                {student.year}
              </p>
            </div>


            <div className="bg-white/10 border border-white/20 rounded-3xl p-6">
              <h4 className="text-blue-200">
                Degree
              </h4>

              <p className="text-orange-400 text-2xl font-black mt-2">
                {student.degree}
              </p>
            </div>


            <div className="bg-white/10 border border-white/20 rounded-3xl p-6">
              <h4 className="text-blue-200">
                Branch
              </h4>

              <p className="text-purple-400 text-xl font-black mt-2">
                {student.branch}
              </p>
            </div>

          </div>


          {/* STUDENT INFORMATION */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">

            <h2 className="text-2xl font-black text-[#1e5aa8] mb-8">
              Student Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <Info label="Full Name" value={student.fullname} />
              <Info label="Registration ID" value={student.registration_id} />

              <Info label="Date Of Birth" value={student.dob} />
              <Info label="Gender" value={student.gender} />

              <Info label="Contact Number" value={student.contact} />
              <Info label="Alternate Number" value={student.alternate_contact} />

              <Info label="Email Address" value={student.email} />
              <Info label="College Name" value={student.college} />

              
            </div>


            <div className="mt-8">

              <h4 className="font-bold text-slate-700 mb-2">
                Home Address
              </h4>

              <div className="bg-slate-100 rounded-2xl p-4">
                {student.address}
              </div>

            </div>

          </div>
          </>
)}
          {activePage === "students" && (
  <div className="bg-white rounded-3xl p-8 shadow-2xl">
    <h2 className="text-3xl font-bold mb-6">
      Student List
    </h2>

    <table className="w-full border">
      <thead>
  <tr className="bg-blue-600 text-white">
    <th className="p-3 text-left">Name</th>
    <th className="p-3 text-left">Registration ID</th>
    <th className="p-3 text-left">Degree</th>
    <th className="p-3 text-left">Contact</th>
    <th className="p-3 text-center">Action</th>
  </tr>
</thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id} className="border-b">
            <td className="p-3">{s.fullname}</td>
            <td className="p-3">{s.registration_id}</td>
            <td className="p-3">{s.degree}</td>
            <td className="p-3">{s.contact}</td>
            <td className="p-3 text-center">
  <button
    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center justify-center"
    onClick={() => {
      console.log(s);
      setSelectedStudent(s);
    }}
  >
    👁 View
  </button>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
{selectedStudent && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-3xl p-8 w-[700px] max-h-[90vh] overflow-y-auto shadow-2xl">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">
          Student Details
        </h2>

        <button
          onClick={() => setSelectedStudent(null)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">

        <Info label="Full Name" value={selectedStudent.fullname} />
        <Info label="Registration ID" value={selectedStudent.registration_id} />

        <Info label="Date Of Birth" value={selectedStudent.dob} />
        <Info label="Gender" value={selectedStudent.gender} />

        <Info label="Contact" value={selectedStudent.contact} />
        <Info label="Alternate Contact" value={selectedStudent.alternate_contact} />

        <Info label="Email" value={selectedStudent.email} />
        <Info label="College" value={selectedStudent.college} />

        

      </div>

      <div className="mt-6">
        <h3 className="font-bold text-gray-700 mb-2">
          Address
        </h3>

        <div className="bg-slate-100 p-4 rounded-xl">
          {selectedStudent.address}
        </div>
      </div>

    </div>
  </div>
)}
                  </main>

      </div>


      {/* FOOTER */}
      <footer className="bg-[#1e5aa8] text-white">

        <div className="grid md:grid-cols-4 gap-10 px-12 py-12">

          <div>
            <h2 className="text-4xl font-black mb-4">
              AR INFOTEK
            </h2>

            <p className="text-blue-100">
              Practical, mentor-led online IT training to accelerate your career.
            </p>
          </div>


          <div>
            <h3 className="text-orange-400 font-bold mb-4">
              Programs
            </h3>

            <ul className="space-y-2 text-blue-100">
              <li>AWS Architect</li>
              <li>Data Science</li>
              <li>DevOps</li>
            </ul>
          </div>


          <div>
            <h3 className="text-orange-400 font-bold mb-4">
              Company
            </h3>

            <ul className="space-y-2 text-blue-100">
              <li>Why Us</li>
              <li>Instructors</li>
              <li>Testimonials</li>
            </ul>
          </div>


          <div>
            <h3 className="text-orange-400 font-bold mb-4">
              Legal
            </h3>

            <ul className="space-y-2 text-blue-100">
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>

        </div>


        <div className="border-t border-blue-400 text-center py-5 text-blue-200">
          © 2025 AR INFOTEK — All rights reserved.
        </div>

      </footer>

    </div>
  );
}


/* INFO CARD FUNCTION */
function Info({ label, value }) {
  return (
    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">

      <p className="text-slate-500 text-sm">
        {label}
      </p>

      <p className="font-bold text-slate-800 mt-1">
        {value || "N/A"}
      </p>

    </div>
  );
}