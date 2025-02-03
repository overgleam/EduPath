import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "@/components/theme-provider";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";
import { Particles } from "@/components/ui/particles";

export function DarkModeToggle() {
    const { theme, setTheme } = useTheme();
    
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(theme === "dark" ? "#ffffff" : "#000000");
    }, [theme]);

    return (
        <>
            <Particles
            className="absolute inset-0 -z-50 overflow-hidden"
            quantity={100}
            ease={80}
            color={color}
            refresh />

            <div className="absolute top-5 right-5">
                <Toggle onClick={toggleTheme} aria-label="Toggle italic" size="lg">
                    {theme === "light" ? <MoonIcon /> : <SunIcon />}
                </Toggle>
            </div>
        </>
    )
}
