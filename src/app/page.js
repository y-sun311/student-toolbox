import Title from "@/components/title"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <Title text="👋 Welcome, student!" />
      <ul>
        <li>
          <Link href="/calculator">Grade calculator</Link>
        </li>
        <li>
          <Link href="/timetable">Timetable</Link>
        </li>
        <li>
          <Link href="/todo">To-do list</Link>
        </li>
      </ul>
    </main>
  )
}
