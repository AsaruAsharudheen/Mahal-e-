// src/Pages/AddImage/AddImage.jsx

import { useState } from 'react';
import axios from 'axios';
import './add.css';
import AdminNavbar from '../AdminNavbar/adminnavbar';
import AdminFooter from '../AdminFooter/adminfooter';

// ✅ Environment-aware backend URL
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://instagridzzbackend.onrender.com'
    : 'http://localhost:2025';

const AddImage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('image');
  const [images, setImages] = useState([]);

  // ✅ Handle image upload
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let file of files) {
      formData.append('images', file);
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/upload`, formData);
      setImages(res.data.urls); // expecting { urls: [ ... ] }
    } catch (err) {
      console.error('Image upload error:', err);
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) return alert('Title and content are required.');

    const newData = {
      title,
      content,
      category,
      images,
      video: null,
    };

    try {
      await axios.post(`${BASE_URL}/api/Datas`, newData);
      alert('Image post uploaded successfully!');
      setTitle('');
      setContent('');
      setImages([]);
    } catch (err) {
      console.error('Submit error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="add-container">
        <h2>Add Image Post</h2>
        <form onSubmit={handleSubmit} className="add-form">
          <input
            type="text"
            placeholder="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Content *"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <label>Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
          <button type="submit">Submit</button>
        </form>

        {images.length > 0 && (
          <div className="preview-section">
            <h4>Image Preview:</h4>
            {images.map((img, i) => (
              <img key={i} src={img} alt={`preview-${i}`} />
            ))}
          </div>
        )}
      </div>
      <AdminFooter />
    </>
  );
};

export default AddImage;
