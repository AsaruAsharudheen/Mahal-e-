import { useState, useEffect } from "react";
import axios from "axios";
import "./addnercha.css";
import AdminNavbar from "../AdminNavbar/adminnavbar";
import AdminFooter from "../AdminFooter/adminfooter";

// ✅ Environment-aware backend URL
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://instagridzzbackend.onrender.com"
    : "http://localhost:2025";

const AddNercha = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    amount: "",
  });

  const [message, setMessage] = useState("");
  const [nextToken, setNextToken] = useState(null);

  // ✅ Fetch the next token on page load
  useEffect(() => {
    const fetchNextToken = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/nercha/next-token`);
        setNextToken(res.data.nextToken);
      } catch (error) {
        console.error("Error fetching next token:", error);
      }
    };
    fetchNextToken();
  }, []);

  // ✅ handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(`${BASE_URL}/api/nercha`, formData);

      setMessage("✅ Nercha entry added successfully");

      // clear form
      setFormData({ name: "", address: "", amount: "" });

      // fetch next token for next entry
      const res = await axios.get(`${BASE_URL}/api/nercha/next-token`);
      setNextToken(res.data.nextToken);
    } catch (error) {
      console.error("Error adding Nercha entry:", error);
      setMessage(error.response?.data?.message || "❌ Failed to add entry");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="add-nercha-container">
        <h2>Add Nercha Entry</h2>
        <form className="add-nercha-form" onSubmit={handleSubmit}>
          {/* Token display */}
          <div className="form-group">
            <label>Token:</label>
            <input
              type="text"
              value={nextToken ? `#${nextToken}` : "Loading..."}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
            />
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter address"
            />
          </div>

          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="1"
              placeholder="Enter amount"
            />
          </div>

          <button type="submit">Add Entry</button>
        </form>

        {message && <p className="form-message">{message}</p>}
      </div>
      <AdminFooter/>
    </>
  );
};

export default AddNercha;
