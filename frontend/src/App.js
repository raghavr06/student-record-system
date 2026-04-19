import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

/* const API = 'http://localhost:5000/students'; */
const API = 'http://YOUR_PUBLIC_IP:5000/students';

const emptyForm = { name: '', rollNumber: '', course: '', age: '' };

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null); // null = add mode, string = edit mode
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // ── Fetch all students ────────────────────────────────────────────────────
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setStudents(res.data);
    } catch (err) {
      setError('Failed to load students. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ── Clear flash messages ──────────────────────────────────────────────────
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  // ── Handle form input changes ─────────────────────────────────────────────
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ── Submit: Add or Update ─────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!form.name || !form.rollNumber || !form.course || !form.age) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      if (editId) {
        // UPDATE
        await axios.put(`${API}/${editId}`, form);
        setSuccess('Student updated successfully!');
      } else {
        // CREATE
        await axios.post(API, form);
        setSuccess('Student added successfully!');
      }
      setForm(emptyForm);
      setEditId(null);
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  // ── Load student into form for editing ────────────────────────────────────
  const handleEdit = (student) => {
    clearMessages();
    setForm({
      name: student.name,
      rollNumber: student.rollNumber,
      course: student.course,
      age: student.age,
    });
    setEditId(student._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Cancel edit ───────────────────────────────────────────────────────────
  const handleCancel = () => {
    setForm(emptyForm);
    setEditId(null);
    clearMessages();
  };

  // ── Delete a student ──────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    clearMessages();
    try {
      await axios.delete(`${API}/${id}`);
      setSuccess('Student deleted successfully!');
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete student.');
    }
  };

  // ── Format date ───────────────────────────────────────────────────────────
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 Student Record Management</h1>
        <p>A simple MERN CRUD application</p>
      </header>

      <main className="container">
        {/* ── Flash messages ── */}
        {error && (
          <div className="alert alert-error">
            ⚠️ {error}
            <button className="close-btn" onClick={clearMessages}>✕</button>
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            ✅ {success}
            <button className="close-btn" onClick={clearMessages}>✕</button>
          </div>
        )}

        {/* ── Add / Edit Form ── */}
        <section className="card">
          <h2>{editId ? '✏️ Edit Student' : '➕ Add New Student'}</h2>
          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Riya Sharma"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rollNumber">Roll Number</label>
              <input
                id="rollNumber"
                name="rollNumber"
                type="text"
                placeholder="e.g. CS2024001"
                value={form.rollNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="course">Course</label>
              <input
                id="course"
                name="course"
                type="text"
                placeholder="e.g. B.Tech Computer Science"
                value={form.course}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                placeholder="e.g. 20"
                min="1"
                max="100"
                value={form.age}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editId ? 'Update Student' : 'Add Student'}
              </button>
              {editId && (
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* ── Student List ── */}
        <section className="card">
          <h2>📋 All Students ({students.length})</h2>

          {loading ? (
            <p className="loading-text">Loading students...</p>
          ) : students.length === 0 ? (
            <p className="empty-text">No students found. Add one above!</p>
          ) : (
            <div className="table-wrapper">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Roll Number</th>
                    <th>Course</th>
                    <th>Age</th>
                    <th>Added On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, idx) => (
                    <tr key={s._id} className={editId === s._id ? 'row-editing' : ''}>
                      <td>{idx + 1}</td>
                      <td>{s.name}</td>
                      <td>{s.rollNumber}</td>
                      <td>{s.course}</td>
                      <td>{s.age}</td>
                      <td>{formatDate(s.createdAt)}</td>
                      <td className="action-cell">
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(s)}
                          title="Edit student"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(s._id)}
                          title="Delete student"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with MongoDB · Express · React · Node.js</p>
      </footer>
    </div>
  );
}

export default App;
