import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { TodoProvider } from "@/context/TodoContext";
import "./globals.scss";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The classic todo app with a few twists!",
  description: "The classic todo app with a few twists!",
  metadataBase: new URL("https://demo-todo-nu.vercel.app/"),
  openGraph: {
    title: "The classic todo app with a few twists!",
    siteName: "The classic todo app with a few twists!",
    type: "website",
    url: "https://demo-todo-nu.vercel.app/",
    images: [
      {
        url: "/images/og-img.png",
        width: 1200,
        height: 600,
        alt: "Todo App",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
    >
      <body className={josefinSans.className}>
        <TodoProvider>{children}</TodoProvider>
      </body>
    </html>
  );
}
