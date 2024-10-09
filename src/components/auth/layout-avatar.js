"use client";

import Avatar from "./avatar";
import "./styles/avatar.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function LayoutAvatar() {
  const { data: session } = useSession();
  const [avatarSize, setAvatarSize] = useState(48);
  const [customImage, setCustomImage] = useState(null); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 515) {
        setAvatarSize(30);
      } else if (window.innerWidth <= 800) {
        setAvatarSize(40);
      } else {
        setAvatarSize(48);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!session?.user?.name) return null;

  const handleImageChange = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setCustomImage(imageUrl);
  };

  return (
    <div className="layout-avatar">
      <Avatar
        size={avatarSize}
        username={session.user.name}
        imageUrl={customImage || session.user.image} 
        onImageChange={handleImageChange} 
      />
    </div>
  );
}
