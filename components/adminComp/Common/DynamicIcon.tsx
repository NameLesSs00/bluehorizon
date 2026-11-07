"use client";

import { resolveIcon } from "@/shared/utils/iconRegistry";
import { LuLayoutGrid } from "react-icons/lu";

interface DynamicIconProps {
  name?: string | null;
  className?: string;
  fallbackClassName?: string;
}

export default function DynamicIcon({
  name,
  className = "h-5 w-5",
  fallbackClassName,
}: DynamicIconProps) {
  const IconComponent = resolveIcon(name);

  if (IconComponent) {
    return <IconComponent className={className} />;
  }

  return (
    <LuLayoutGrid
      className={fallbackClassName || className || "h-5 w-5 text-[#65706B]"}
    />
  );
}

