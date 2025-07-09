import { fetchData } from "../../main.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Subscriptions=() => {
  const navigate = useNavigate();

  const [user] = useState(() => {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  });

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const [subs, setSubs] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', cost: '', notes: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (!user) return;
    fetchData(`/subscription/${user._id}`)
      .then(setSubs)
      .catch(console.error);
  }, [user]);

  
  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const onSubmit = async e => {
    e.preventDefault();
    const newSub = await fetchData('/subscription', { ...form, userId: user._id }, 'POST');
    setSubs(s => [...s, newSub]);
    setForm({ name: '', category: '', cost: '', notes: '' });
  };

  
  const handleDelete = async id => {
    if (!window.confirm('Delete this subscription?')) return;
    await fetchData(`/subscription/${id}`, {}, 'DELETE');
    setSubs(s => s.filter(x => x._id !== id));
  };

  
  const startEdit = sub => {
    setEditingId(sub._id);
    setEditForm({ ...sub }); 
  };
  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
  };
  
  const saveEdit = async e => {
    e.preventDefault();
    const updated = await fetchData(
      `/subscription/${editingId}`,
      editForm,
      'PUT'
    );
    setSubs(s => s.map(x => x._id === editingId ? updated : x));
    setEditingId(null);
  };

  return (
    <div className="container mt-4">
      <h2>Welcome, {user?.username}</h2>

      <h4 className="mt-4">Your Subscriptions</h4>
      {subs.length === 0 && <p><em>No subscriptions yet.</em></p>}
      <ul className="list-group mb-4">
        {subs.map(sub => (
          <li key={sub._id} className="list-group-item">
            {editingId === sub._id ? (
              <form onSubmit={saveEdit} className="row g-2 align-items-center">
                {['name','category','cost','notes'].map(field => (
                  <div className="col" key={field}>
                    <input
                      className="form-control"
                      name={field}
                      value={editForm[field]||''}
                      onChange={handleEditChange}
                    />
                  </div>
                ))}
                <div className="col-auto">
                  <button className="me-1">Save</button>
                  <button className="mb-1"
                    type="button"
                    onClick={() => setEditingId(null)}
                  >Cancel</button>
                </div>
              </form>
            ) : (
                < >
                <strong>{sub.name}</strong> — {sub.category} — ${sub.cost}
                <br/>
                <small>{sub.notes}</small>
                <div className="mb-1">
                  <button
                    className="mb-1 btn btn-sm btn-secondary me-1" 
                    onClick={() => startEdit(sub)}
                  >Edit</button>
                  <button
                    className="mb-1 btn btn-sm btn-danger"
                    onClick={() => handleDelete(sub._id)}
                  >Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <h4>Add New Subscription</h4>
      <form onSubmit={onSubmit} className="mb-2">
        <div className="mb-3">
          <input
            className="form-control"
            name="name"
            placeholder="Name*"
            value={form.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            name="cost"
            type="number"
            step="0.01"
            placeholder="Cost"
            value={form.cost}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <button className="w-100">Add</button>
        </div>
      </form>
    </div>
  );
}
export default Subscriptions;