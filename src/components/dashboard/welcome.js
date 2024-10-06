"use client";

import { useSession } from "next-auth/react";
import Title from "../title";
import "./styles/welcome.css";

export default function Welcome() {
  const session = useSession();
  const username = session?.data?.user?.name;

  return <div className="welcome-text"><Title text={`👋 Welcome, ${username || "student"}!`}  /></div>;

}
