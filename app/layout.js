import "./globals.css";
import MuiThemeProvider from "./components/theme/MuiThemeProvider";
import Navbar from "./components/UI/navbar/Navbar";
import Footer from "./components/UI/footer/Footer";
import Progress from "./components/UI/nprogress/Progress";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/session/SessionProvider";
import { BookmarkProvider } from "./context/BookmarkContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "TrailerView",
  description: "Watch movie & TV trailers",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
 

  return (
    <html lang="en">
      <body className="relative font-roboto">
        <MuiThemeProvider>
          <SessionProvider session={session}>
            <BookmarkProvider userEmail={session?.user.email}>
              <Navbar />
              <Progress>{children}</Progress>
            </BookmarkProvider>
          </SessionProvider>
          <Footer />
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </MuiThemeProvider>
      </body>
    </html>
  );
}
