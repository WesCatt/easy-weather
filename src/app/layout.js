import "./globals.css";
import "qweather-icons/font/qweather-icons.css"
import {ThemeProvider} from "next-themes";
import {WeatherContextProvider} from "@/context/WeatherContext";
import {Toaster} from "@/components/ui/sonner";
import localFont from "next/font/local"


const noto = localFont({
    src: "../assets/NotoSansSC-Regular.ttf",
});


export default function RootLayout({children}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`!p-4 ${noto.className}`}
        >
        <ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem>
            <WeatherContextProvider>
                <div className={"container h-full !m-auto !py-5 flex flex-col"}>
                    {children}
                </div>
            </WeatherContextProvider>
        </ThemeProvider>
        <Toaster/>
        </body>
        </html>
    );
}
