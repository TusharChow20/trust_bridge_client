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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="mt-1 mx-5 md:mx-1 flex justify-between items-center shadow-md rounded-md px-3">
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
        <Link href={"/"}>
          <Button variant="ghost">Home</Button>
        </Link>
        <Link href="/about">
          <Button variant="ghost">About Us</Button>
        </Link>
        <Link href="/products">
          <Button variant="ghost">All Products</Button>
        </Link>
        {session ? (
          <>
            <Link href="/sell-item">
              <Button variant="ghost">Sell Item</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      session?.user?.image || "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{session?.user?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>

                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/${session?.user?.role}`}>
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="text-red-500"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
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
                <Link href={"/"}>Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/about">About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/products">All Products</Link>
              </DropdownMenuItem>
              {session ? (
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut({ callbackUrl: "/login" });
                  }}
                >
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
