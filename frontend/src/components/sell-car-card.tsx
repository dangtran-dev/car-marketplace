import { Car } from "@/types";
import { formatCurrency } from "@/utils";
import Link from "next/link";
import { MdDateRange, MdLocalGasStation, MdSpeed } from "react-icons/md";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function SellCarCard({ car }: { car: Car }) {
    return (
        <Link href={"#"}>
            <Card className="group pt-0 border-none overflow-hidden">
                <div className="w-full h-50 overflow-hidden relative">
                    <img
                        src={car.images[0]}
                        alt={`${car.Brand.name} ${car.model}`}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <CardContent>
                    <h3 className="text-lg font-bold line-clamp-1">{`${car.Brand.name} ${car.model}`}</h3>

                    <p className="mt-2 text-primary font-semibold text-xl">
                        {formatCurrency(car.price)}
                    </p>

                    <div className="flex items-center justify-between gap-2 py-3 border-b">
                        <div className="flex items-center gap-1">
                            <MdDateRange className="text-primary" size={16} />

                            <span className="text-sm">{car.year}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <MdSpeed className="text-primary" size={16} />

                            <span className="text-sm">
                                {car.mileage.toLocaleString("vi-VN", {
                                    style: "decimal",
                                })}{" "}
                                km
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <MdLocalGasStation
                                className="text-primary"
                                size={16}
                            />

                            <span className="text-sm">
                                {car.fuelType.charAt(0).toUpperCase() +
                                    car.fuelType.slice(1).toLowerCase()}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt={car.User.name}
                            />

                            <AvatarFallback>{car.User.name}</AvatarFallback>
                        </Avatar>

                        <span className="text-sm">{car.User.name}</span>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        className="w-full border-primary text-primary font-semibold hover:border-accent"
                        variant="outline"
                    >
                        View detail
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
