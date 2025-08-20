// src/Pages/AddVideo/AddVideo.jsx

import { useState } from 'react';
import axios from 'axios';
import './addvideo.css';
import AdminNavbar from '../AdminNavbar/adminnavbar';
import AdminFooter from '../AdminFooter/adminfooter';

// ✅ Environment-aware backend URL
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://instagridzzbackend.onrender.com'
    : 'http://localhost:2025';

const AddVideo = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('video');
  const [video, setVideo] = useState(null);

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('video', file);

    try {
      const res = await axios.post(`${BASE_URL}/api/uploadVideo`, formData);
      setVideo(res.data.url);
    } catch (err) {
      console.error('Video upload error:', err);
      alert('Video upload failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert('Title and content are required.');

    try {
      await axios.post(`${BASE_URL}/api/Datas`, {
        title,
        content,
        category,
        images: [],
        video,
      });
      alert('Video post uploaded successfully!');
      setTitle('');
      setContent('');
      setVideo(null);
    } catch (err) {
      console.error('Submit error:', err);
      alert('Something went wrong while submitting.');
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="add-container">
        <h2>Add Video Post</h2>
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
          <label>Upload Video</label>
          <input type="file" accept="video/*" onChange={handleVideoUpload} />
          <button type="submit">Submit</button>
        </form>

        {video && (
          <div className="preview-section">
            <h4>Preview:</h4>
            <video src={video} controls width="300" />
          </div>
        )}
      </div>
      <AdminFooter />
    </>
  );
};

export default AddVideo;
