"use client";

import { FiSearch } from "react-icons/fi";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

export default function SearchBar() {
    return (
        <Card className="w-full max-w-5xl mx-auto rounded-3xl shadow-lg p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">
                        Brand
                    </Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="All Brands" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="tesla">Tesla</SelectItem>
                            <SelectItem value="bmw">BMW</SelectItem>
                            <SelectItem value="mercedes">
                                Mercedes-Benz
                            </SelectItem>
                            <SelectItem value="audi">Audi</SelectItem>
                            <SelectItem value="toyota">Toyota</SelectItem>
                            <SelectItem value="honda">Honda</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">
                        Year
                    </Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Any Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2022">2022</SelectItem>
                            <SelectItem value="2021">2021</SelectItem>
                            <SelectItem value="older">Cũ hơn</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">
                        Type
                    </Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Any Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="truck">Truck</SelectItem>
                            <SelectItem value="coupe">Coupe</SelectItem>
                            <SelectItem value="convertible">
                                Convertible
                            </SelectItem>
                            <SelectItem value="electric">Electric</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="mt-4 flex gap-2">
                <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="Search by model, keyword..."
                        className="pl-10"
                    />
                </div>
                <Button className="px-8 font-semibold">Search</Button>
            </div>
        </Card>
    );
}
