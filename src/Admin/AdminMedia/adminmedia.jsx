import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../../Pages/Home/home.css';
import AdminNavbar from '../AdminNavbar/adminnavbar';
import AdminFooter from '../AdminFooter/adminfooter';

// ✅ Environment-aware backend URL
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://instagridzzbackend.onrender.com'
    : 'http://localhost:2025';

const AdminMedia = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const videoRefs = useRef([]);

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/Datas`);
        setPosts(res.data.reverse());
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchPosts();
  }, []);

  // Toggle mute/unmute on video click
  const handleVideoClick = index => {
    const video = videoRefs.current[index];
    if (video) video.muted = !video.muted;
  };

  // Like handler
  const handleLike = async postId => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    try {
      await axios.post(`${BASE_URL}/api/Datas/${postId}/like`);
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  // Pause videos when out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target;
          if (video.tagName === 'VIDEO') {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach(video => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach(video => {
        if (video) observer.unobserve(video);
      });
    };
  }, [posts]);

  // Format timestamp
  const formatTimeAgo = iso => {
    const seconds = Math.floor((new Date() - new Date(iso)) / 1000);
    const intervals = [
      { label: 'year', sec: 31536000 },
      { label: 'month', sec: 2592000 },
      { label: 'day', sec: 86400 },
      { label: 'hour', sec: 3600 },
      { label: 'minute', sec: 60 },
    ];
    for (const i of intervals) {
      const val = Math.floor(seconds / i.sec);
      if (val >= 1) return `${val} ${i.label}${val > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
  };

  return (
    <>
      <AdminNavbar />
      <div className="post-feed">
        {posts.map((post, index) => (
          <div className="post-image-container" key={post._id}>
            {/* Media */}
            {post.category === 'image' && post.images?.length > 0 ? (
              <img src={post.images[0]} alt="Post" className="post-media" />
            ) : post.category === 'video' && post.video ? (
              <div className="video-wrapper">
                <video
                  ref={el => (videoRefs.current[index] = el)}
                  src={post.video}
                  className="post-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onClick={() => handleVideoClick(index)}
                />
              </div>
            ) : null}

            {/* Caption & timestamp */}
            <div className="caption-section">
              <p>
                <strong>{post.title || 'user'}</strong> {post.content}
              </p>
              <span className="timestamp">{formatTimeAgo(post.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminMedia;
