"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import "./styles.css";
import { MainLogo } from "@/assets/logos/main-logo";

export function Header() {
  return (
    <NavigationMenu className="main-nav">
      <NavigationMenuList style={{ width: "100%", maxWidth: "896px" }}>
        <Link href="/" className="text-3xl font-semibold">
          <MainLogo />
        </Link>
        <NavigationMenuItem>
          <Link href="/system-design">
            <Button>Create</Button>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
