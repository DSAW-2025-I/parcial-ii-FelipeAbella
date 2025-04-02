const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Students data stored in an array
const students_data = [
    {
        student: 1,
        name: "Felipe",
        lastNames: "Abella Ballesteros",
        email: "felipeabba@unisabana.edu.co",
        id: 291513
    },
    {
        student: 2,
        name: "Nestor Andres",
        lastNames: "Tabares David",
        email: "nestortada@unsiabana.edu.co",
        id: 287880
    }
];

// Default endpoint
app.get('/', (req, res) => {
    res.json({ message: "You are in the server. Add /user_info/student for more information about a student" });
});

// Student info endpoint
app.get('/user_info/:student', (req, res) => {
    try {
        const student = parseInt(req.params.student, 10); // Convert student to number

        // Validate that student is a number
        if (isNaN(student)) {
            return res.status(400).json({ error: "Invalid student format, must be a number." });
        }

        // Search for the student in the array
        const selected_student = students_data.find(s => s.student === student);

        if (selected_student) {
            res.json(selected_student);
        } else {
            res.status(404).json({ error: "Student not found" });
        }
    } catch (error) {
        // Server error handling
        res.status(500).json({ error: "Internal server error" });
    }
});

// Listen on port
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
