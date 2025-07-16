import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";

const AppLayout = () => {
  const [newsCategory, setNewsCategory] = useState("");

  return (
    <div className="app">
      <Header setNewsCategory={setNewsCategory} />
      <Body newsCategory={newsCategory} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);