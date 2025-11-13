import { Brand } from "@/types";
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
