import AuthLoader from "@/components/global/Data loader/AuthLoader";
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
        <html lang="en" className="h-full w-full">
            <body className="overflow-hidden m-0 w-full h-full">
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
                    <AuthLoader>
                        <Header />
                        <main className="w-full h-full px-4 sm:px-6 md:px-8 overflow-y-auto">
                            {children}
                        </main>
                    </AuthLoader>
                </StoreProvider>
            </body>
        </html>
    );
}
