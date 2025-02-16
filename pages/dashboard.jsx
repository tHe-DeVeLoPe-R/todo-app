
import Nav from "@/components/Nav";
import Todos from "@/components/Todos";
import { Geist, Geist_Mono } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Dashboard() {
  return (
    <>
      <Nav/>
      <Todos/>
    </>
  );
}
