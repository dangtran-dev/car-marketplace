"use client";

import Link from "next/link";
import { TiFlashOutline } from "react-icons/ti";

import { useAuth } from "@/hooks";
import { usePathname } from "next/navigation";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { PiChatBold } from "react-icons/pi";
import { Button } from "./ui/button";

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

    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 lg:px-8">
                <section className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                            <TiFlashOutline className="w-7 h-7 text-white" />
                        </div>

                        <span className="text-xl text-gray-900">
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
                                        ? "text-emerald-600"
                                        : "text-gray-600 hover:text-emerald-600"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {user ? (
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

                            <Link href={"/"}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hidden sm:inline-flex text-gray-600 hover:text-emerald-600"
                                >
                                    <FaRegUser className="w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 lg:gap-4">
                            <Link href={"/signin"}>
                                <Button
                                    variant="outline"
                                    className="border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50"
                                >
                                    Sign In
                                </Button>
                            </Link>

                            <Link href={"/signup"}>
                                <Button className="font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/30">
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
