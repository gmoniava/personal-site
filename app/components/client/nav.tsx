"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Toggle from "./theme-toggle";

const navItems = {
  "/": { name: "Home" },
  "/about": { name: "About" },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav className="flex flex-row items-center relative px-0 pb-0 fade scroll-pr-6 md:relative" id="nav">
          <div className="flex-1">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  href={path}
                  className={`transition-all hover:text-neutral-800 dark:hover:text-neutral-200 relative py-1 px-2 m-1 ${
                    isActive ? "underline underline-offset-4 font-medium" : ""
                  }`}
                >
                  {name}
                </Link>
              );
            })}
          </div>
          <div>
            <Toggle />
          </div>
        </nav>
      </div>
    </aside>
  );
}
