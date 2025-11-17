import instance from "@/lib/interceptor";
import { AuthSignIn, AuthSignUp } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authInstance = axios.create({
    baseURL: API_URL,
});

export const signUpLocal = async (auth: AuthSignUp) => {
    try {
        const response = await authInstance.post("/auth/local/signup", auth);
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const message =
                error.response?.data?.message ||
                "Sign up failed. Please try again.";

            throw new Error(message);
        }

        throw new Error("An error occurred during sign up.");
    }
};

export const signInLocal = async (auth: AuthSignIn) => {
    try {
        const response = await authInstance.post("/auth/local/signin", auth);
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401) {
                throw new Error("Invalid email or password.");
            } else {
                throw new Error("Sign in failed. Please try again.");
            }
        }

        throw new Error("An error occurred during sign up.");
    }
};

export const checkAuth = async (): Promise<AuthSignUp> => {
    try {
        const response = await instance.get("/auth/me");
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401) {
                throw new Error("Access token invalid or expired.");
            }
        }

        throw new Error("Unexpected error while checking authentication.");
    }
};

export const logoutUser = async () => {
    try {
        const response = await instance.post("/auth/logout");
        console.log(response.data);
        return response.data.message;
    } catch (error: any) {
        throw new Error("An error occurred during logout");
    }
};
