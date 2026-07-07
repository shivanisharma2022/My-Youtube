import React from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const [searchParams] = useSearchParams(); // searchParams is a hook that returns a tuple of the search params and a function to update the search params
  const videoId = searchParams.get("v"); // get the video id from the search params, v is the video id

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  return (
    <div className="flex flex-col w-full">
    <div className="px-5 flex">
      <div>
      <iframe
        width="1200"
        height="675"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      </div>
      <div className="w-full">
        <LiveChat />
      </div>
    </div>
    <CommentsContainer />
    </div>
  );
};

export default WatchPage;
