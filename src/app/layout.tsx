import { Josefin_Sans } from "next/font/google";
import { TodoProvider } from "@/context/TodoContext";
import "./globals.scss";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={josefinSans.className}>
        <TodoProvider>{children}</TodoProvider>
      </body>
    </html>
  );
}
