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
        const message = error.response?.data?.error || "Login failed";
        throw new Error(message);
    }
}

export const signup = async(email, password, name, phone_number, username) => {
    try {
        const response = await axiosInstance.post("/api/auth/signup", { email, password, name, phone_number, username });
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
    try {
        const formData = new FormData();
        
        // Add all text fields to FormData
        Object.keys(updatedData).forEach(key => {
            if (key === 'profile_picture') {
                // Handle file separately
                if (updatedData[key] instanceof File) {
                    formData.append('profile_picture_file', updatedData[key]);
                }
            } else if (key === 'social_links' || key === 'topics') {
                // Handle arrays by converting to JSON string
                formData.append(key, JSON.stringify(updatedData[key]));
            } else if (updatedData[key] !== null && updatedData[key] !== undefined) {
                formData.append(key, updatedData[key]);
            }
        });

        const response = await axiosInstance.put(`/api/user/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        return response.data;
    } catch (error) {
        if (error.response?.data?.error) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Failed to update profile');
    }
}

export const getBlogsByAuthorId = async (authorId) => {
    try {
        const response = await axiosInstance.get(`/api/blogs/${authorId}`);        
        return response.data.blogs || [];
    } catch (error) {
        console.error("Error fetching blogs by author ID", error);
        return [];
    }
}

export const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const pad = (n) => n.toString().padStart(2, '0');
    let hours = date.getHours();
    const minutes = pad(date.getMinutes());
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12hr format, 0 becomes 12
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear().toString().slice(-2);
    return `${pad(hours)}:${minutes} ${ampm} ${day}/${month}/${year}`;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const pad = (n) => n.toString().padStart(2, '0');
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
};

export const deleteBlogById = async (blogId, authorId) => {
    try {
        const response = await axiosInstance.delete(`/api/blogs/${blogId}`, {
            data: { authorId }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting blog", error);
        return null;
    }
};

export const createBlog = async (blogData) => {
    try {
        const response = await axiosInstance.post("/api/blogs", blogData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating blog", error);
        return null;
    }
}

export const checkUsernameAvailability = async (username) => {
    try {
        console.log("Checking availability for username:", username);
        
        const response = await axiosInstance.get(`/api/user/check-username/${username}`);
        console.log("Username availability check:", response.data);
        
        return response.data;
    } catch (error) {
        const message = error.response?.data?.error || "Error checking username availability";
        throw new Error(message);
    }
}