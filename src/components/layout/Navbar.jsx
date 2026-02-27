"use client";
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
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="mt-5 mx-5 md:mx-1 flex justify-between items-center shadow-md rounded-md px-3">
      <div className="w-20 md:w-80">
        <Image
          className="rounded-full"
          src={logo}
          alt="Logo"
          width={60}
          height={80}
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex">
        <Link href="/about">
          <Button variant="ghost">About Us</Button>
        </Link>
        <Link href="/products">
          <Button variant="ghost">All Products</Button>
        </Link>
        {session ? (
          <Button variant="ghost" onClick={() => signOut()}>
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/about">About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/products">All Products</Link>
              </DropdownMenuItem>
              {session ? (
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem>
                  <Link href="/login">Login</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
