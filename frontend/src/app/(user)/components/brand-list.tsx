"use client";

import { getCarBrands } from "@/api/cars";
import LogoLoop from "@/components/LogoLoop";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function BrandListSection() {
    const { data: brands } = useQuery({
        queryFn: getCarBrands,
        queryKey: ["car-brands"],
    });

    const brandLogos = useMemo(() => {
        return brands?.map((brand) => brand.logoUrl);
    }, [brands]);

    return (
        <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl text-foreground font-bold mb-4">
                    Browse by Brand
                </h2>

                <p className="max-w-2xl mx-auto text-muted-foreground text-base">
                    Find cars from the brands available on our marketplace
                </p>
            </div>

            <div>
                <LogoLoop
                    logos={
                        (brandLogos?.filter(Boolean).map((u) => ({ src: u })) ??
                            []) as any
                    }
                    speed={120}
                    direction="left"
                    logoHeight={60}
                    gap={40}
                    hoverSpeed={20}
                    scaleOnHover
                    fadeOut
                    fadeOutColor="transparent"
                    ariaLabel="Car Brands Logo Loop"
                />
            </div>
        </section>
    );
}
