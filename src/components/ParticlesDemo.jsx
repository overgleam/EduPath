import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import { Particles } from "@/components/ui/particles";

export function ParticlesDemo() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <Particles
    className="absolute inset-0 -z-50 overflow-hidden"
    quantity={100}
    ease={80}
    color={color}
    refresh
/>
  );
}
