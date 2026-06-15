import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentRegistration() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    contact: "",
    alternate: "",
    address: "",
    college: "",
    degree: "",
    branch: "",
    year: "",
    semester: "",
    
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:5000/api/students",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: formData.fullName,
          dob: formData.dob,
          gender: formData.gender,
          contact: formData.contact,
          alternate_contact: formData.alternate,
          address: formData.address,
          college: formData.college,
          degree: formData.degree,
          branch: formData.branch,
          year: formData.year,
          semester: formData.semester,
          email: formData.email,
        }),
      }
    );

    const data = await response.json();
    if (data.success) {
  navigate("/dashboard", {
    state: {
      student: data.student,
    },
  });
}
     else {
      alert("Failed to save data");
    }
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
};

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-xl">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#1e5aa8] to-[#ff891c] bg-clip-text text-transparent">
          Application Submitted Successfully!
        </h2>

        <div className="space-y-2">
          <p><b>Name:</b> {formData.fullName}</p>
          <p><b>Email:</b> {formData.email}</p>
          <p><b>College:</b> {formData.college}</p>
          <p><b>Degree:</b> {formData.degree}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="border rounded-2xl p-4"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dob"
            className="border rounded-2xl p-4"
            onChange={handleChange}
            required
          />

        </div>

        <select
          name="gender"
          className="border rounded-2xl p-4 w-full"
          onChange={handleChange}
          required
        >
          <option value="">Choose Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            className="border rounded-2xl p-4"
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="alternate"
            placeholder="Alternate Number"
            className="border rounded-2xl p-4"
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          name="address"
          placeholder="Home Address"
          rows="3"
          className="border rounded-2xl p-4 w-full"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="college"
          placeholder="College Name"
          className="border rounded-2xl p-4 w-full"
          onChange={handleChange}
          required
        />

        

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="border rounded-2xl p-4 w-full"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full py-5 bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-2xl font-bold text-lg"
        >
          Student Register
        </button>
      </form>
    </div>
  );
}