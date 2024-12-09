import { Open_Sans, Montserrat, Inter } from "next/font/google";

export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
