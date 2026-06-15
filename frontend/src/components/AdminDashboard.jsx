import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1324] p-8">
      <h1 className="text-4xl font-bold text-white mb-6">
        Admin Dashboard
      </h1>

      <div className="bg-white rounded-3xl p-8 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">
            Student Management
          </h2>

          <span className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Total Students: {students.length}
          </span>
        </div>
        <div className="mb-6">
  <input
    type="text"
    placeholder="Search by Name or Registration ID..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full border p-3 rounded-xl"
  />
</div>

        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Registration ID</th>
              <th className="p-3">Degree</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

         <tbody>
  {students
    .filter(
      (student) =>
        student.fullname
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        student.registration_id
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .map((student) => (
      <tr key={student.id} className="border-b">
        <td className="p-3 text-left">{student.fullname}</td>
<td className="p-3 text-left">{student.registration_id}</td>
<td className="p-3 text-left">{student.degree}</td>
<td className="p-3 text-left">{student.contact}</td>
        <td className="p-3 flex gap-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setSelectedStudent(student)}
          >
            👁 View
          </button>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
            onClick={() =>
              setEditingStudent({
                ...student,
                attendance: student.attendance || "",
                result: student.result || "",
                payment_status: student.payment_status || "",
              })
            }
          >
            ✏️ Edit
          </button>
        </td>
      </tr>
    ))}
</tbody>
        </table>
      </div>

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

            <div className="grid md:grid-cols-2 gap-4">
              <Detail
                label="Full Name"
                value={selectedStudent.fullname}
              />

              <Detail
                label="Registration ID"
                value={selectedStudent.registration_id}
              />

              <Detail
                label="Date Of Birth"
                value={selectedStudent.dob}
              />

              <Detail
                label="Gender"
                value={selectedStudent.gender}
              />

              <Detail
                label="Contact"
                value={selectedStudent.contact}
              />

              <Detail
                label="Alternate Contact"
                value={selectedStudent.alternate_contact}
              />

              <Detail
                label="Email"
                value={selectedStudent.email}
              />

              <Detail
                label="College"
                value={selectedStudent.college}
              />

              <Detail
                label="Degree"
                value={selectedStudent.degree}
              />

              <Detail
                label="Branch"
                value={selectedStudent.branch}
              />

              <Detail
                label="Year"
                value={selectedStudent.year}
              />

              <Detail
                label="Semester"
                value={selectedStudent.semester}
              />

              <Detail
                label="Attendance"
                value={selectedStudent.attendance}
              />

              <Detail
                label="Result"
                value={selectedStudent.result}
              />

              <Detail
                label="Payment Status"
                value={selectedStudent.payment_status}
              />
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-gray-700 mb-2">
                Address
              </h3>

              <div className="bg-slate-100 p-4 rounded-xl">
                {selectedStudent.address || "Not Available"}
              </div>
            </div>
          </div>
        </div>
      )}
            

      {editingStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[600px]">

            <h2 className="text-3xl font-bold text-green-700 mb-6">
              Edit Student
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Attendance"
                value={editingStudent.attendance}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    attendance: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl"
              />

              <input
                type="text"
                placeholder="Result"
                value={editingStudent.result}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    result: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl"
              />

              <input
                type="text"
                placeholder="Payment Status"
                value={editingStudent.payment_status}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    payment_status: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl"
              />

              <div className="flex gap-3">

                <button
                  className="bg-green-600 text-white px-5 py-3 rounded-xl"
                  onClick={async () => {
                    try {
                      const res = await fetch(
                        `http://localhost:5000/api/students/${editingStudent.id}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            attendance: editingStudent.attendance,
                            result: editingStudent.result,
                            payment_status: editingStudent.payment_status,
                          }),
                        }
                      );

                      const updated = await res.json();

                      setStudents(
                        students.map((s) =>
                          s.id === updated.id ? updated : s
                        )
                      );

                      setEditingStudent(null);

                      alert("Student Updated Successfully");
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  Save Changes
                </button>

                <button
                  className="bg-red-500 text-white px-5 py-3 rounded-xl"
                  onClick={() => setEditingStudent(null)}
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="bg-slate-100 p-4 rounded-xl">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-bold">{value || "Not Available"}</p>
    </div>
  );
}