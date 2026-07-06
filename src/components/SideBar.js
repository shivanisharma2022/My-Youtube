import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // useSelector is a hook that allows us to access the state from the store.
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);
  // if menu is not open, return null. This is early return pattern.
  if (!isMenuOpen) return null;

  return (
    <div className="p-5 shadow-lg w-48">
      <ul>
        <Link to="/">Home</Link>
        <li>Demo</li>
        <li> Shorts</li>
        <li> Videos</li>
        <li> Live</li>
      </ul>
      <h1 className="font-bold pt-5">Subscriptions</h1>
      <ul>
        <li> Music</li>
        <li> Sports</li>
        <li> Gaming</li>
        <li> Movies</li>
      </ul>
      <h1 className="font-bold pt-5">Watch Later</h1>
      <ul>
        <li> Music</li>
        <li> Sports</li>
        <li> Gaming</li>
        <li> Movies</li>
      </ul>
    </div>
  );
};

export default Sidebar;
