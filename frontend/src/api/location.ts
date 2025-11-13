import axios from "axios";

export const getLocation = async (): Promise<string[]> => {
    try {
        const response = await axios.get(
            "https://provinces.open-api.vn/api/v2/"
        );

        return response.data?.map((p: any) => p.name) ?? [];
    } catch (error: any) {
        console.log(error);
        throw error;
    }
};
