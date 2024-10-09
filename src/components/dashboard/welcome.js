"use client";

import { useSession } from "next-auth/react";

import "./styles/dashboard.css";
import Title from "../title/title";

export default function Welcome() {
  const session = useSession();
  const username = session?.data?.user?.name;

  return <div className="welcome-text"><Title text={`👋 Welcome, ${username || "student"}!`}  /></div>;

}
