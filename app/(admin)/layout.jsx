import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
function AdminLayout({ children }) {
  return (
    <html lang="en" className="overflow-hidden">
      <body
        className={inter.className + " flex flex-col h-screen overflow-hidden"}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

export default AdminLayout;
