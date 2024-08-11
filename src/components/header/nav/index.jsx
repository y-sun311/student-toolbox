import styles from "./style.module.scss";
import Link from "./link/index";
import { menuSlide } from "../anim";
import { motion } from "framer-motion";

export default function Index() {
  const navItems = [
    { title: "Home", href: "/" },
    { title: "GPA Calculator", href: "/calculator" },
    { title: "To-Do List", href: "/todo" },
    {
      title: "Time Table Planner",
      href: "/timetable",
    },
  ];

  return (
    <motion.div
      variants={menuSlide}
      animate="enter"
      exit="exit"
      initial="initial"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div className={styles.nav}>
          <div className={styles.header}>
            <p>Put search bar here</p>
          </div>
          {navItems.map((item, index) => {
            return <Link key={item.href} data={{ ...item, index }} />;
          })}
        </div>
      </div>
    </motion.div>
  );
}
