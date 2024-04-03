import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Provider from "./components/Provider/Provider";
import { ReduxProvider } from "@/redux/provider";
import { ThemeProvider } from "./components/Provider/ThemeProvider";
import ThemeSwitch from "@/components/ui/ThemeButton";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lusi-Ecommerce",
    template: "%s - Lusi-Ecommerce",
  },
  description: "Shoes store",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-white dark:bg-navy-900 ${poppins.className}`}>
        <ThemeProvider>
          <ReduxProvider>
            <Provider>
              <Toaster position="bottom-right" />
              <div className="hidden md:flex items-center justify-center fixed bottom-12 right-8 bg-navy-800 dark:bg-white text-white dark:text-black border dark:border-navy-700 rounded-full w-12 h-12 z-[9999]">
                <ThemeSwitch />
              </div>
              {children}
            </Provider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
