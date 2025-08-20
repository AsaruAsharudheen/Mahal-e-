import { useEffect, useState } from "react";
import axios from "axios";
import "./listnercha.css";
import AdminNavbar from "../AdminNavbar/adminnavbar";
import AdminFooter from "../AdminFooter/adminfooter";

// ✅ Environment-aware backend URL
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://instagridzzbackend.onrender.com"
    : "http://localhost:2025";

const ListNercha = () => {
  const [nerchaList, setNerchaList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedToken, setSelectedToken] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", address: "", amount: "" });

  // ✅ Fetch all entries
  useEffect(() => {
    fetchNercha();
  }, []);

  const fetchNercha = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/nercha`);
      setNerchaList(res.data);
      setFilteredList(res.data);
    } catch (err) {
      console.error("Error fetching Nercha list:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filter handler
  const handleTokenChange = async (token) => {
    setSelectedToken(token);
    if (token === "All") {
      setFilteredList(nerchaList);
    } else {
      try {
        const res = await axios.get(`${BASE_URL}/api/nercha/${token}`);
        setFilteredList([res.data]);
      } catch (err) {
        console.error("Error fetching entry:", err);
        setFilteredList([]);
      }
    }
  };

  // ✅ Delete entry
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await axios.delete(`${BASE_URL}/api/nercha/${id}`);
        fetchNercha(); // refresh list
      } catch (err) {
        console.error("Error deleting entry:", err);
      }
    }
  };

  // ✅ Enable edit mode
  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setEditForm({
      name: entry.name,
      address: entry.address,
      amount: entry.amount,
    });
  };

  // ✅ Save edit
  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`${BASE_URL}/api/nercha/${id}`, editForm);
      setEditingId(null);
      fetchNercha();
    } catch (err) {
      console.error("Error updating entry:", err);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="list-nercha-container">
        <h2 className="title">📋 Nercha Entries</h2>

        {/* 🔽 Filter Dropdown */}
        <div className="filter-container">
          <label htmlFor="tokenSelect">Filter by Token:</label>
          <select
            id="tokenSelect"
            value={selectedToken}
            onChange={(e) => handleTokenChange(e.target.value)}
          >
            <option value="All">All</option>
            {nerchaList.map((entry) => (
              <option key={entry._id} value={entry.token}>
                {entry.token}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : filteredList.length === 0 ? (
          <p className="no-data">No entries found</p>
        ) : (
          <table className="nercha-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Name</th>
                <th>Address</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((entry) => (
                <tr key={entry._id}>
                  <td data-label="Token">#{entry.token}</td>

                  {/* ✅ Editable row */}
                  {editingId === entry._id ? (
                    <>
                      <td data-label="Name">
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      </td>
                      <td data-label="Address">
                        <input
                          type="text"
                          value={editForm.address}
                          onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        />
                      </td>
                      <td data-label="Amount">
                        <input
                          type="number"
                          value={editForm.amount}
                          onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                        />
                      </td>
                      <td className="actions">
                        <button onClick={() => handleSaveEdit(entry._id)}>💾 Save</button>
                        <button onClick={() => setEditingId(null)}>❌ Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td data-label="Name">{entry.name}</td>
                      <td data-label="Address">{entry.address}</td>
                      <td data-label="Amount">₹{entry.amount}</td>
                      <td className="actions">
                        <button className="edit-btn" onClick={() => handleEdit(entry)}>✏️ Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(entry._id)}>🗑️ Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <AdminFooter />
    </>
  );
};

export default ListNercha;
