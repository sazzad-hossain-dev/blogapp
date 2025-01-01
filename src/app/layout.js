import Header from "@/components/global/header/Header";
import StoreProvider from "@/lib/storeProvider";
import "./globals.css";

export const metadata = {
    title: "Blog App",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>
                    <Header />
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
