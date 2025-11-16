"use client";

import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { LuLeaf } from "react-icons/lu";

export default function HomePage() {
    return (
        <main>
            <section className="relative bg-gradient-to-br from-emerald-50 via-white to-emerald-50 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full mb-6">
                                <LuLeaf className="w-4 h-4" />

                                <span className="text-sm">
                                    Drive Sustainable, Drive Smart
                                </span>
                            </div>

                            <h1 className="text-4xl lg:text-[54px] font-bold text-gray-900 mb-6">
                                Find Your Perfect
                                <span className="block text-emerald-600">
                                    Eco-Friendly Vehicle
                                </span>
                            </h1>

                            <p className="text-lg text-gray-600 font-medium mb-8">
                                Join thousands of drivers making smart,
                                sustainable choices. Browse verified listings,
                                connect with trusted sellers, and drive into a
                                greener future.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href={"/listings"}>
                                    <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-emerald-500/30 px-8 h-12">
                                        Browsers Car
                                        <FaArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>

                                <Link href={"/sell"}>
                                    <Button
                                        variant="outline"
                                        className="border-2 border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 h-12 px-8"
                                    >
                                        Sell Your Car
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-3xl blur-3xl"></div>

                            <img
                                src={"/images/home-hero-image.jpg"}
                                alt="Luxury car showroom"
                                className="relative rounded-3xl shadow-2xl w-full"
                            />
                        </div>
                    </div>

                    <div className="mt-12 lg:mt-16">
                        <SearchBar />
                    </div>
                </div>
            </section>
        </main>
    );
}
