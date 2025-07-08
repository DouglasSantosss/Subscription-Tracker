import React, { useEffect, useState } from 'react';

const Subscription = ({ user }) => {
  const [subs, setSubs] = useState([]);
  const [form, setForm] = useState({
    name: '',
    category: '',
    cost: '',
    notes: '',
  });

  useEffect(() => {
    if (user && user._id) {
      fetch(`/subscription/${user._id}`)
        .then(res => res.json())
        .then(data => setSubs(data))
        .catch(err => console.error('Error loading subscriptions:', err));
    }
  }, [user]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (user || user._id) return alert("You must be logged in");

    const newSub = {
      userId: user._id,
      name: form.name,
      category: form.category,
      cost: parseFloat(form.cost),
      notes: form.notes
    };

    try {
      const res = await fetch('/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSub)
      });

      if (!res.ok) throw new Error("Failed to add subscription");
      const added = await res.json();
      setSubs(prev => [...prev, added]);
      setForm({ name: '', category: '', cost: '', notes: '' });
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  

  return (
    <div className="container mt-4">
      <h2>{user}'s Profile</h2>

      <form onSubmit={onSubmit} className="mb-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={onChange}
          required
        />
        <input
          name="cost"
          type="number"
          placeholder="Cost"
          value={form.cost}
          onChange={onChange}
          required
        />
        <input
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={onChange}
        />
        <button type="submit">Add Subscription</button>
      </form>

      <ul className="list-group">
        {subs.map(sub => (
          <li key={sub._id} className="list-group-item">
            <strong>{sub.name}</strong> — ${sub.cost} ({sub.category})<br />
            {sub.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subscription;
