import React from "react";
import SideBar from "./SideBar.js";
import MainContainer from "./MainContainer.js";

const Body = () => {
  return (
    <div className="flex">
      <SideBar />
      <MainContainer />
    </div>
  );
};

export default Body;
