const express = require("express");
const router = express.Router();
const pool = require("../db");

// Save Student
router.post("/", async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    const {
      fullname,
      dob,
      gender,
      contact,
      alternate_contact,
      address,
      college,
      degree,
      branch,
      year,
      semester,
      email,
    } = req.body;

    // Generate Registration ID
    const currentYear = new Date().getFullYear();

    const lastStudent = await pool.query(
      `SELECT registration_id
       FROM studentdetails
       WHERE registration_id LIKE $1
       ORDER BY registration_id DESC
       LIMIT 1`,
      [`ARI${currentYear}%`]
    );

    let registrationId;

    if (lastStudent.rows.length === 0) {
      registrationId = `ARI${currentYear}001`;
    } else {
      const lastId = lastStudent.rows[0].registration_id;
      const lastNumber = parseInt(lastId.slice(-3));

      registrationId =
        `ARI${currentYear}${String(lastNumber + 1).padStart(3, "0")}`;
    }

    const result = await pool.query(
      `INSERT INTO studentdetails
      (
        fullname,
        dob,
        gender,
        contact,
        alternate_contact,
        address,
        college,
        degree,
        branch,
        year,
        semester,
        registration_id,
        email
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *`,
      [
        fullname,
        dob,
        gender,
        contact,
        alternate_contact,
        address,
        college,
        degree,
        branch,
        year,
        semester,
        registrationId,
        email,
      ]
    );

    res.status(201).json({
      success: true,
      student: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Get All Students
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM studentdetails ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});
// Update Student
router.put("/:id", async (req, res) => {
  try {
    const { attendance, result, payment_status } = req.body;

    const updatedStudent = await pool.query(
      `
      UPDATE studentdetails
      SET attendance = $1,
          result = $2,
          payment_status = $3
      WHERE id = $4
      RETURNING *
      `,
      [attendance, result, payment_status, req.params.id]
    );

    res.json(updatedStudent.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;