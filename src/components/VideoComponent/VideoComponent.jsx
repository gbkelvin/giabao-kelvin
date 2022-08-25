import React, { useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import * as FB_SERVICES from "../../FirebaseServices/FirebaseService";
import VideoSlider from "./VideoSlider/VideoSlider";
import VideoDots from "./VideoDots/VideoDots";
import "./VideoComponent.css";

const VideoComponent = () => {
  const [isPlayVideo, setIsPlayVideo] = useState(true);
  const [current, setCurrent] = useState(0);
  const [videoList, setVideoList] = useState([]);

  const handlePlayVideoClick = () => {
    setIsPlayVideo(!isPlayVideo);
  };
  const handleDotClick = (selectedIndex) => {
    setCurrent(selectedIndex);
  };

  const getVideoData = async () => {
    FB_SERVICES.getVideoDocument().then((videos) => setVideoList(videos));
  };
  useEffect(() => {
    getVideoData();
  }, [current]);

  return (
    <div className="video-slider__container">
      <VideoSlider
        videoSlider={videoList}
        activeIndex={current}
        isPlay={isPlayVideo}
      />
      <VideoDots
        activeIndex={current}
        videoSlider={videoList}
        onSelectedDot={handleDotClick}
      />
      <div className="pause-video__container" onClick={handlePlayVideoClick}>
        {isPlayVideo ? (
          <FaPause className="pause-video__icon" />
        ) : (
          <FaPlay className="pause-video__icon" />
        )}
      </div>
    </div>
  );
};

export default VideoComponent;
