import Header from "@/components/global/header/Header";
import StoreProvider from "@/lib/storeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata = {
    title: "Blog App",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="overflow-x-hidden">
                {/* ToastContainer for notifications */}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <StoreProvider>
                    <Header />
                    <div className="overflow-x-hidden">{children}</div>
                </StoreProvider>
            </body>
        </html>
    );
}
