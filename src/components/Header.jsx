import ThemeToggle from "@/components/ThemeToggle";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FaGithub} from "react-icons/fa6";

const Header = () => {


    return (
        <header className="flex items-center justify-between gap-2">
            <ThemeToggle/>
            <div className="flex items-center gap-2">
                <Input placeholder="输入城市..." className="!px-2"/>
                <Button variant="outline" className="font-[500]  !px-3 cursor-pointer">搜索</Button>
                <a href="https://github.com/Westcatboy/easy-weather" target="_blank">
                    <Button className="!px-3 cursor-pointer font-[500]"><FaGithub/> Look At GitHub</Button>
                </a>
            </div>
        </header>
    )
}
export default Header;