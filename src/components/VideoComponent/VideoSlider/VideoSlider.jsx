import React, { useContext, useEffect, useRef } from "react";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../../Context/LanguageContext";

const VideoSlider = ({ activeIndex, videoSlider, isPlay }) => {
  const playVideo = useRef([]);
  const languageTypeValue = useContext(LanguageContext);
  const {t, i18n} = useTranslation("translation");

  if (playVideo.current[activeIndex]) {
    if (isPlay) {
      playVideo.current[activeIndex].play();
    } else {
      playVideo.current[activeIndex].pause();
    }
  }

  useEffect(() => {}, [languageTypeValue]);

  const renderVideoTitle = (videoItem) => {
    let videoTitle;
    switch (languageTypeValue) {
      case "vn":
        videoTitle = videoItem.vn_video_title;
        break;
      case "en":
        videoTitle = videoItem.en_video_title;
        break;
      default:
        break;
    }
    return (
      <div className="video-slider__title">
        <span className="video-title">{videoTitle.title_video}</span>
        <span className="video-description">
          {videoTitle.description_video}
        </span>

        <div className="video-learn-more__button">
          <span>{t("learnMore")}</span>
        </div>
      </div>
    );
  };

  return (
    <section>
      {videoSlider.map((video, index) => {
        return (
          <div
            key={video.id}
            className={
              index === activeIndex ? "video-slide active" : "video-slide"
            }
          >
            <video
              className="video-container"
              src={video.video_url}
              webkit-playsinline="true"
              playsInline
              autoPlay
              loop
              muted
              ref={(refItem) => (playVideo.current[index] = refItem)}
            />
            {renderVideoTitle(video)}
          </div>
        );
      })}
    </section>
  );
};

export default VideoSlider;
