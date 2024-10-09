"use client";

import PropTypes from "prop-types";
import Blockies from "react-blockies"; 
import "./styles/avatar.css";
import { useState } from "react";

Avatar.propTypes = {
  size: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  onImageChange: PropTypes.func.isRequired, 
};

export default function Avatar({ size, username, imageUrl, onImageChange }) {
  const [previewImage, setPreviewImage] = useState(imageUrl);

  const handleAvatarClick = () => {
    console.log("Avatar clicked");
    document.getElementById("avatar-upload").click(); 
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      onImageChange(file); 
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleAvatarClick();
    }
  };

  return (
    <div>
      <input
        type="file"
        id="avatar-upload"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
      {previewImage || imageUrl ? (
        <img
          src={previewImage || imageUrl}
          alt={`${username}'s avatar`}
          className="avatar"
          style={{ width: size, height: size, cursor: "pointer" }}
          onClick={handleAvatarClick}
          role="button"
          tabIndex="0"
          onKeyPress={handleKeyPress}
        />
      ) : (
        <div
          onClick={handleAvatarClick}
          onKeyPress={handleKeyPress}
          style={{ cursor: "pointer" }}
          role="button"
          tabIndex="0"
        >
          <Blockies
            seed={username}
            size={10} 
            scale={size / 10} 
            className="avatar"
          />
        </div>
      )}
    </div>
  );
}
