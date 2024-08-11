import "./globals.css";
import Header from "../components/header";

export const metadata = {
  title: "Student Toolbox",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
