"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Nav from "./nav/index";
import "./header.css"; // Import the plain CSS file

export default function Index() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        className="button" // Using a plain class name
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        <div
          className={`burger ${isActive ? "burgerActive" : ""}`}
        ></div>
      </button>
      <AnimatePresence mode="wait">
        {isActive && <Nav />}
      </AnimatePresence>
    </>
  );
}
