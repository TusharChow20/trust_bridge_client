"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard")) return null;
  return <Navbar></Navbar>;
}
