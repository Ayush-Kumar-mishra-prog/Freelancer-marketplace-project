import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { AuthProvider } from "@/context/AuthContext";

                  
import Providers from "./providers";

 

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GigSphere | Good work, together",
  description: "Find thoughtful projects and independent talent on GigSphere.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppRouterCacheProvider>
          <Providers />
          <AuthProvider>{children}</AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
