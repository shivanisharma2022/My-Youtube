import React from "react";

const VideoCard = ({ videoInfo }) => {
  const { snippet, statistics } = videoInfo;
  const { title, thumbnails, channelTitle } = snippet;
  const { viewCount } = statistics;

  return (
    <div className="p-2 m-2 w-72 shadow-lg">
      <img 
      className="rounded-lg"
      alt="thumbnail" 
      src={thumbnails.medium.url} />
      <h3 className="font-bold py-2">{title}</h3>
      <p className="text-sm text-gray-500">{channelTitle}</p>
      <p className="text-sm text-gray-500">{viewCount} views</p>
    </div>
  );
};

export default VideoCard;
