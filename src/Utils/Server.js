import axiosInstance from "./axiosInstance"

export const fetchUser = async () => {
    try {
        const response = await axiosInstance.get("/api/me")
        return response.data.user || null;
    } catch (error) {
        console.error("Error fetching user", error);
        return null;
    }
}

export const login = async(email, password) => {
    try {
        const response = await axiosInstance.post("/api/auth/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Error logging in", error);
        return null;
    }
}

export const signup = async(email, password, name, phone_number) => {
    try {
        const response = await axiosInstance.post("/api/auth/signup", { email, password, name, phone_number });
        return response.data;
    } catch (error) {
        console.error("Error signing up", error);
        return null;
    }
}