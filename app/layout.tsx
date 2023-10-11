import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ISBS - Reservation events",
  openGraph: {
    title: "ISBS - Reservation events",
    description:
      "ISBS is a new reservation universities parties and events .",
    images: [
      {
        url: "https://progress-e7yl.onrender.com/static/media/logo.e1911ee6.svg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ISBS - Reservation events",
    description:
      "ISBS is a new reservation universities parties and events .",
    images: ["https://pbs.twimg.com/profile_images/1530653913074081794/FmXeflr8_400x400.jpg"],
    creator: "@raedrdhaounia",
  },
  metadataBase: new URL("https://isbs-next-front.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scroll-smooth antialiased [font-feature-settings:'ss01']">
        {children}
        <ToastContainer 
         
        />
      </body>
    </html>
  );
}
