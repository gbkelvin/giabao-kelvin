import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../../Context/LanguageContext";
import * as FB_SERVICES from "../../../FirebaseServices/FirebaseService";
const VideoSlider = ({ activeIndex, videoSlider, isPlay }) => {
  const playVideo = useRef([]);
  const languageTypeValue = useContext(LanguageContext);
  const { t, i18n } = useTranslation("translation");
  let navigate = useNavigate();
  if (playVideo.current[activeIndex]) {
    if (isPlay) {
      playVideo.current[activeIndex].play();
    } else {
      playVideo.current[activeIndex].pause();
    }
  }

  const onLearnMoreClick = (projectID) => {
    FB_SERVICES.getProjectByID(projectID, languageTypeValue).then(
      (projectItem) => {
        navigate(`/projects/${projectItem.project_url}`, {
          state: { proDocumentID: projectItem.id },
        });
      }
    );
  };
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
        <div
          className="video-learn-more__button"
          onClick={() => onLearnMoreClick(videoItem.id_project)}
        >
          <span>{t("learnMore")}</span>
        </div>
        <span className="video-title">{videoTitle.title_video}</span>
        <span className="video-description">
          {videoTitle.description_video}
        </span>
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
