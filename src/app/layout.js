
import AuthProvider from "@/services/AuthProvider";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme='scribbleNoteTheme'>
      <body>
        <ToastContainer/>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
