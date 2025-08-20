import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './reels.css';
import Footer from '../../Components/Footer/footer';

// ✅ Environment-aware backend URL
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://instagridzzbackend.onrender.com'
    : 'http://localhost:2025';

const VideoReelsPage = () => {
  const [videos, setVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef([]);

  // ✅ Fetch videos from backend
  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/Datas`);
        const filteredVideos = response.data.filter(
          (item) => item.category?.toLowerCase() === 'video'
        );
        setVideos(filteredVideos);
      } catch (err) {
        console.error('Failed to fetch videos', err);
      }
    };
    getVideos();
  }, []);

  // ✅ Detect which video is visible
  useEffect(() => {
    const handleScroll = () => {
      let currentVisibleIndex = null;

      videoRefs.current.forEach((video, index) => {
        if (video) {
          const rect = video.getBoundingClientRect();
          const visibleHeight =
            Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          const percentageVisible = visibleHeight / rect.height;

          if (percentageVisible > 0.7 && currentVisibleIndex === null) {
            currentVisibleIndex = index;
          }
        }
      });

      setActiveIndex(currentVisibleIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [videos]);

  // ✅ Control video play/pause
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.currentTime = 0; // restart when active
        video.muted = muted;
        video
          .play()
          .catch((err) => console.warn('Autoplay failed:', err));
      } else {
        video.pause();
        video.currentTime = 0;
        video.muted = true; // keep inactive videos muted
      }
    });
  }, [activeIndex, muted]);

  const toggleMute = () => setMuted((prev) => !prev);

  return (
    <>
      <div className="video-reels-wrapper">
        {videos.map((item, index) => (
          <div className="video-container" key={item._id || index}>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={item.video}
              className="video-player"
              loop
              playsInline
              muted={index !== activeIndex || muted}
              onClick={() => {
                if (index === activeIndex) toggleMute();
              }}
            />

            {/* 🔇 Volume Icon */}
            {index === activeIndex && (
              <i
                className={`fa-solid ${
                  muted ? 'fa-volume-xmark' : 'fa-volume-high'
                }`}
                onClick={toggleMute}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  fontSize: 22,
                  color: '#fff',
                  zIndex: 10,
                  cursor: 'pointer',
                }}
              ></i>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default VideoReelsPage;
