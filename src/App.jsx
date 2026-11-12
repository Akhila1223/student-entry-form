import { useState, useRef } from "react";
import "./App.css";

const GRADES = Array.from({ length: 12 }, (_, i) => String(i + 1));

function App() {
  const [students, setStudents] = useState([]);
  const formRef = useRef(null);

  const addStudent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name").trim();
    if (!name) return;

    const student = {
      id: crypto.randomUUID(),
      name,
      age: formData.get("age"),
      grade: formData.get("grade"),
    };

    setStudents((prev) => [...prev, student]);
    formRef.current.reset();
  };

  const clearForm = () => {
    formRef.current.reset();
  };

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Student Entry Form</h1>
        <p className="subtitle">Add students and review the list below.</p>

        <form ref={formRef} className="student-form" onSubmit={addStudent}>
          <div className="form-item">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. MS Dhoni"
              required
            />
          </div>

          <div className="form-item">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="e.g. 14"
              min="1"
              max="100"
              required
            />
          </div>

          <div className="form-item">
            <label htmlFor="grade">Grade</label>
            <select id="grade" name="grade" defaultValue="" required>
              <option value="">Select grade</option>
              {GRADES.map((grade) => (
                <option key={grade} value={grade}>
                  Class {grade}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Add Student
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={clearForm}
            >
              Clear
            </button>
          </div>
        </form>

        {students.length === 0 ? (
          <div className="empty-state">No students added yet.</div>
        ) : (
          <div className="table-wrapper">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Grade</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>Class {student.grade}</td>
                    <td className="action-cell">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeStudent(student.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;