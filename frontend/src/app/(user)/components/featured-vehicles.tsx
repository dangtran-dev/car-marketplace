"use client";

import { getAllCars } from "@/api/cars";
import SellCarCard from "@/components/sell-car-card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function FeaturedVehiclesSection() {
    const { data: featuredCars } = useQuery({
        queryFn: () => getAllCars({ page: 1, limit: 4 }),
        queryKey: ["featured-cars"],
    });

    return (
        <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl text-foreground font-bold mb-4">
                    Featured Vehicles
                </h2>

                <p className="max-w-2xl mx-auto text-muted-foreground text-base">
                    Handpicked selection of premium eco-friendly vehicles
                </p>
            </div>

            <div className="grid grid-cols-4 gap-7 mb-8">
                {featuredCars &&
                    featuredCars.data.map((car) => (
                        <SellCarCard key={car.id} car={car} />
                    ))}
            </div>

            <div className="flex justify-center">
                <Button className="w-50 h-12 font-semibold">
                    View All Listings
                </Button>
            </div>
        </section>
    );
}
