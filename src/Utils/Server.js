import axiosInstance from "./axiosInstance"

export const fetchUser = async () => {
    try {
        const response = await axiosInstance.get("/api/auth/me")
        return response.data.user || null;
    } catch (error) {
        if(error.response.data.error) {
            console.log("User is not authenticated");
        }
        return null;
    }
}

export const login = async(identifier, password) => {
    try {
        const response = await axiosInstance.post("/api/auth/login", { identifier, password });
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

export const logout = async () => {
    try {
        const response = await axiosInstance.get("/api/auth/logout");
        return response.data;
    } catch (error) {
        console.error("Error logging out", error);
        return null;
    }
}

export const updateUserProfile = async (userId, updatedData) => {
    try{
        const response = await axiosInstance.put(`/api/user/${userId}`, updatedData);
        return response.data;
    }catch(error){
        console.error("Error updating user profile", error);
        return null;
    }
}