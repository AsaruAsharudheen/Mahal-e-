import { useState, useEffect } from 'react';
import axios from 'axios';
import './fundlist.css';
import AdminFooter from '../AdminFooter/adminfooter';
import AdminNavbar from '../AdminNavbar/adminnavbar';

// ✅ Environment-aware backend URL
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://instagridzzbackend.onrender.com'
    : 'http://localhost:2025';

const FundList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    // Fetch categories with persons and expenses populated
    axios
      .get(`${BASE_URL}/api/funds/categories/details`)
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  // Find selected category or null
  const selectedCategory = categories.find(c => c._id === selectedCategoryId) || null;

  // Calculate totals
  const totalFund = selectedCategory
    ? selectedCategory.persons.reduce((sum, p) => sum + (p.amount || 0), 0)
    : 0;

  const totalExpenses = selectedCategory
    ? selectedCategory.expenses.reduce((sum, e) => sum + (e.amount || 0), 0)
    : 0;

  const balance = totalFund - totalExpenses;

  return (
    <>
      <AdminNavbar />
      <div className="fund-container">
        <h1>Fund List</h1>

        {/* Category Selection */}
        <div className="fund-categories">
          {categories.map(cat => (
            <button
              key={cat._id}
              className={selectedCategoryId === cat._id ? 'active' : ''}
              onClick={() => setSelectedCategoryId(cat._id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Details Section */}
        {selectedCategory ? (
          <div className="fund-details">
            <h2>{selectedCategory.name}</h2>

            {/* Persons Table */}
            <h3>Persons (Fund Contributors)</h3>
            {selectedCategory.persons.length === 0 ? (
              <p>No persons added yet.</p>
            ) : (
              <table className="persons-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCategory.persons.map(person => (
                    <tr key={person._id}>
                      <td>{person.name}</td>
                      <td>{person.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Expenses Table */}
            <h3>Expenses (Company)</h3>
            {selectedCategory.expenses.length === 0 ? (
              <p>No expenses recorded yet.</p>
            ) : (
              <table className="expenses-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount (₹)</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCategory.expenses.map(expense => (
                    <tr key={expense._id}>
                      <td>{expense.description}</td>
                      <td>{expense.amount.toLocaleString()}</td>
                      <td>{new Date(expense.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Summary */}
            <div className="fund-summary">
              <p>
                <strong>Total Fund:</strong> ₹{totalFund.toLocaleString()}
              </p>
              <p>
                <strong>Total Expenses:</strong> ₹{totalExpenses.toLocaleString()}
              </p>
              <p>
                <strong>Balance:</strong> ₹{balance.toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <p>Select a category to view details.</p>
        )}
      </div>
      <AdminFooter />
    </>
  );
};

export default FundList;
