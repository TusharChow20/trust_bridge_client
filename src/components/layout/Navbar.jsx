import Image from "next/image";
import React from "react";
import logo from "@/../public/logo.png";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
export default function Navbar() {
  const navLinks = [
    {
      label: "About Us",
      href: "/about",
    },
    { label: "All Products", href: "/products" },
    {
      label: "Login",
      href: "/login",
    },
  ];
  return (
    <div className="mt-5 mx-5 md:mx-1 flex justify-between items-center shadow-md rounded-md px-3">
      <div className="w-20 md:w-80 ">
        <Image
          className="rounded-full"
          src={logo}
          alt="Logo"
          width={60}
          height={80}
        ></Image>
      </div>
      <div className="hidden md:flex">
        {navLinks.map((link, index) => (
          <Link href={link.href}>
            <Button key={index} variant="ghost">
              {link.label}
            </Button>
          </Link>
        ))}
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              {navLinks.map((link, index) => (
                <DropdownMenuItem key={index}>{link.label}</DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
