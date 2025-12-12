"use client";

import Link from "next/link";
import { TiFlashOutline } from "react-icons/ti";

import { logoutUser } from "@/api/auth";
import { AuthContext } from "@/providers";
import { useTokensStore } from "@/stores";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
    FaCog,
    FaRegHeart,
    FaRegListAlt,
    FaRegUser,
    FaRegUserCircle,
    FaSignOutAlt,
} from "react-icons/fa";
import { PiChatBold } from "react-icons/pi";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
    const pathname = usePathname();
    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/listings", label: "Browse Cars" },
        { path: "/sell", label: "Sell Car" },
        { path: "/news", label: "News" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact" },
    ];

    const isActive = (path: string) => pathname === path;

    const clearTokens = useTokensStore((state) => state.clearTokens);

    const user = useContext(AuthContext);

    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        setSignedIn(!!user);
    }, [user]);

    const { mutateAsync: logout } = useMutation({
        mutationFn: logoutUser,
        mutationKey: ["logout"],
        onSuccess: () => {
            clearTokens();
        },
    });

    return (
        <header className="sticky top-0 z-50 w-full bg-background backdrop-blur-sm shadow-sm">
            <div className="container mx-auto px-4 lg:px-8">
                <section className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary shadow-lg">
                            <TiFlashOutline className="w-7 h-7 text-white" />
                        </div>

                        <span className="text-xl text-foreground">
                            <span className="font-semibold">Eco</span>

                            <span>Drive</span>
                        </span>
                    </div>

                    <nav className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`transition-colors font-medium ${
                                    isActive(link.path)
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-primary"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {signedIn ? (
                        <div className="flex items-center gap-2 lg:gap-4">
                            <Link href={"/"}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hidden sm:inline-flex text-gray-600 hover:text-emerald-600"
                                >
                                    <FaRegHeart className="w-5 h-5" />
                                </Button>
                            </Link>

                            <Link href={"/"}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hidden sm:inline-flex text-gray-600 hover:text-emerald-600"
                                >
                                    <PiChatBold className="w-5 h-5" />
                                </Button>
                            </Link>

                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="hidden sm:inline-flex text-gray-600 hover:text-emerald-600"
                                    >
                                        <FaRegUser className="w-5 h-5" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    sideOffset={8}
                                    className="w-48"
                                >
                                    <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold text-gray-800 border-b border-gray-100">
                                        My Account
                                    </DropdownMenuLabel>

                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 font-medium text-gray-600 cursor-pointer">
                                            <FaRegUserCircle className="w-4 h-4" />

                                            <span>Profile</span>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 font-medium text-gray-600 cursor-pointer">
                                            <FaRegListAlt className="w-4 h-4" />

                                            <span>My Listings</span>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 font-medium text-gray-600 cursor-pointer">
                                            <FaRegHeart className="w-4 h-4" />
                                            <span>Favorites</span>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 font-medium text-gray-600 cursor-pointer">
                                            <FaCog className="w-4 h-4" />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator className="my-1" />

                                    <DropdownMenuItem
                                        className="flex items-center gap-2 px-3 py-2 font-medium text-gray-600 cursor-pointer"
                                        onClick={() => logout()}
                                    >
                                        <FaSignOutAlt className="w-4 h-4" />

                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 lg:gap-4">
                            <Link href={"/signin"}>
                                <Button
                                    variant="outline"
                                    className="border-primary text-primary font-semibold hover:border-accent"
                                >
                                    Sign In
                                </Button>
                            </Link>

                            <Link href={"/signup"}>
                                <Button className="font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </header>
    );
}
