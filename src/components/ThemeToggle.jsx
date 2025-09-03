"use client"
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Sun, Moon} from "lucide-react";
import {useTheme} from "next-themes";

const ThemeToggle = () => {
    const {setTheme} = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="cursor-pointer md:static z-[99] bg-white hover:!bg-slate-200 dark:!bg-zinc-950 dark:hover:!bg-zinc-800  fixed bottom-[20px] right-[20px]" variant={"outline"} size={"icon"}>
                    <Sun
                        className={"h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"}/>
                    <Moon
                        className={"absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"}/>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"!p-1"}>
                <DropdownMenuItem className={"!p-2 cursor-pointer"} onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem className={"!p-2 cursor-pointer"} onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem className={"!p-2 cursor-pointer"} onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default ThemeToggle;