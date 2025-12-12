import instance from "@/lib/interceptor";
import { BodyType, Brand, Car, CreateCar, getCar } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const carsInstance = axios.create({
    baseURL: `${API_URL}/cars`,
});

export const getCarBrands = async (): Promise<Brand[]> => {
    try {
        const response = await carsInstance.get("/brands");

        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.message);
        }
        throw new Error(
            "Unable to load car manufacturer list. Please try again!"
        );
    }
};

export const getCarBodyTypes = async (): Promise<BodyType[]> => {
    try {
        const response = await carsInstance.get("/body-types");

        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.message);
        }
        throw new Error(
            "Unable to load car body types list. Please try again!"
        );
    }
};

export const getAllCars = async ({
    page,
    limit,
}: {
    page?: number;
    limit?: number;
}): Promise<{
    data: Car[];
    currentPage: number;
    nextPage: number | null;
}> => {
    try {
        const response = await carsInstance.get<getCar>("/", {
            params: { page, limit },
        });

        return {
            data: response.data.data,
            currentPage: response.data.page,
            nextPage:
                response.data.page * response.data.limit < response.data.total
                    ? response.data.page + 1
                    : null,
        };
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ||
                    "Unable to load cars. Please try again!"
            );
        }

        throw new Error("Unable to load cars. Please try again!");
    }
};

export const sellCar = async (createCar: CreateCar) => {
    try {
        const formData = new FormData();
        Object.entries(createCar).forEach(([key, value]) => {
            if (key === "images" && Array.isArray(value)) {
                value.forEach((file) => {
                    formData.append("images", file);
                });
            } else {
                formData.append(key, value as string);
            }
        });

        console.log(formData);

        const response = await instance.post("/cars/sell", formData);

        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.message);
        }

        throw new Error("Unable to sell car. Please try again!");
    }
};
