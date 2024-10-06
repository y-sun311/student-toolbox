"use client";

import { useSession } from "next-auth/react";
import Avatar from "./avatar";
import "./styles/avatar.css";
import { useEffect, useState } from "react";

export default function LayoutAvatar() {
  const session = useSession();
  const [avatarSize, setAvatarSize] = useState(48);

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
    handleResize(); // Call once to set initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!session?.data?.user?.name) return null;

  return (
    <div className="layout-avatar">
      <Avatar size={avatarSize} username={session.data.user.name} />
    </div>
  );
}