import Navbar from "@/components/Navbar";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContextProvider from "@/contexts/userContext/userContextProvider";

export const metadata = {
  title: "Buy-Now",
  description: "its an E-commerce app ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserContextProvider>
          <Navbar />
          {children}
          <ToastContainer position="top-right" autoClose={5000} />
        </UserContextProvider>
      </body>
    </html>
  );
}
