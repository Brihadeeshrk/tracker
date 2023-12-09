"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import cn from "classnames";

interface NavBarProps {}

interface NavLinks {
  href: string;
  title: string;
}

const Links: Array<NavLinks> = [
  { href: "/", title: "Dashboard" },
  { href: "/issues", title: "Issues" },
];

const NavBar: React.FC<NavBarProps> = () => {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-7 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-7">
        {Links.map((link) => (
          <li key={link.title}>
            <Link
              className={cn({
                "text-blue-700": link.href === pathname,
                "text-zinc-500": link.href !== pathname,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default NavBar;
