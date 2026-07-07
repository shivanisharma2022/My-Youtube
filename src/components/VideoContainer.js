import React, { useEffect, useState } from "react";
import {
  YOUTUBE_API_KEY,
  YOUTUBE_SEARCH_RESULTS_API,
  YOUTUBE_VIDEO_API,
} from "../utils/constant";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const searchQuery = useSelector((store) => store.search.searchQuery);

  useEffect(() => {
    getVideos();
  }, [searchQuery]);

  const getVideos = async () => {
    if (searchQuery) {
      const data = await fetch(
        YOUTUBE_SEARCH_RESULTS_API +
          encodeURIComponent(searchQuery) +
          "&key=" +
          YOUTUBE_API_KEY
      );
      const json = await data.json();
      setVideos(json.items || []);
      return;
    }

    const data = await fetch(YOUTUBE_VIDEO_API);
    const json = await data.json();
    setVideos(json.items || []);
  };

  return (
    <div className="flex flex-wrap">
      {videos.map((video) => {
        const videoId = video.id?.videoId || video.id;
        return (
          <Link to={"/watch?v=" + videoId} key={videoId}>
            <VideoCard videoInfo={video} />
          </Link>
        );
      })}
    </div>
  );
};

export default VideoContainer;
