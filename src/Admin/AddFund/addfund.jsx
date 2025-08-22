// src/Pages/AddFund/AddFund.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import './addFund.css';
import AdminNavbar from '../AdminNavbar/adminnavbar';
import AdminFooter from '../AdminFooter/adminfooter';

// ✅ Environment-aware backend URL
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://instagridzzbackend.onrender.com'
    : 'http://localhost:2025';

const AddFund = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [personName, setPersonName] = useState('');
  const [personAmount, setPersonAmount] = useState('');

  const [expenseCategoryId, setExpenseCategoryId] = useState('');
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');

  // Fetch categories
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/funds/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add category
  const handleAddCategory = () => {
    if (!categoryName.trim()) return alert('Enter category name');
    axios
      .post(`${BASE_URL}/api/funds/categories`, { name: categoryName.trim() })
      .then(res => {
        setCategories(prev => [...prev, res.data]);
        setCategoryName('');
        alert('Category added');
      })
      .catch(() => alert('Failed to add category'));
  };

  // Add person
  const handleAddPerson = () => {
    if (!selectedCategoryId) return alert('Select category');
    if (!personName.trim() || !personAmount)
      return alert('Fill all person fields');

    axios
      .post(`${BASE_URL}/api/funds/categories/${selectedCategoryId}/persons`, {
        name: personName.trim(),
        amount: Number(personAmount),
      })
      .then(res => {
        const newPerson = res.data;
        setCategories(prevCategories =>
          prevCategories.map(cat =>
            cat._id === selectedCategoryId
              ? {
                  ...cat,
                  persons: Array.isArray(cat.persons)
                    ? [...cat.persons, newPerson]
                    : [newPerson],
                }
              : cat
          )
        );
        alert('Person added');
        setPersonName('');
        setPersonAmount('');
      })
      .catch(() => alert('Failed to add person'));
  };

  // Add expense
  const handleAddExpense = () => {
    if (!expenseCategoryId) return alert('Select category');
    if (!expenseDesc.trim() || !expenseAmount || !expenseDate)
      return alert('Fill all expense fields');

    axios
      .post(`${BASE_URL}/api/funds/categories/${expenseCategoryId}/expenses`, {
        description: expenseDesc.trim(),
        amount: Number(expenseAmount),
        date: expenseDate,
      })
      .then(() => {
        alert('Expense added');
        setExpenseDesc('');
        setExpenseAmount('');
        setExpenseDate('');
      })
      .catch(() => alert('Failed to add expense'));
  };

  const selectedCategory = categories.find(c => c._id === selectedCategoryId);
  const persons =
    selectedCategory && Array.isArray(selectedCategory.persons)
      ? selectedCategory.persons
      : [];

  return (
    <>
      <AdminNavbar />
      <div style={{ marginTop: '90px' }} className="addfund-container">
        <h1>Add Fund Details</h1>

        {/* Add Category */}
        <section>
          <h2>Add Category</h2>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
          />
          <button onClick={handleAddCategory}>Add Category</button>
        </section>

        {/* Add Person */}
        <section>
          <h2>Add Person</h2>
          <select
            value={selectedCategoryId}
            onChange={e => setSelectedCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Person Name"
            value={personName}
            onChange={e => setPersonName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={personAmount}
            onChange={e => setPersonAmount(e.target.value)}
          />
          <button onClick={handleAddPerson}>Add Person</button>
        </section>

        {/* Add Expense */}
        <section>
          <h2>Add Expense</h2>
          <select
            value={expenseCategoryId}
            onChange={e => setExpenseCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Expense Description"
            value={expenseDesc}
            onChange={e => setExpenseDesc(e.target.value)}
          />
          <input
            type="number"
            placeholder="Expense Amount"
            value={expenseAmount}
            onChange={e => setExpenseAmount(e.target.value)}
          />
          <input
            type="date"
            value={expenseDate}
            onChange={e => setExpenseDate(e.target.value)}
          />
          <button onClick={handleAddExpense}>Add Expense</button>
        </section>
      </div>
      <AdminFooter />
    </>
  );
};

export default AddFund;
