import Footer from "@/components/shared/Footer/Footer";
import Nav from "@/components/shared/Nav/Nav";
import SecondNav from "@/components/shared/SecondNav/SecondNav";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function GlobalLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-col h-screen"}>
        <Nav />
        <SecondNav />
        {children}

        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
