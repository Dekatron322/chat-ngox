import apiClient from "./apiService";

export interface User {
  id?: any;
  transactions?: any[];
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  lga?: string;
  state?: string;
  pin?: string;
  status?: boolean;
}

export const getUserDetails = async (userId: string): Promise<User | null> => {
    try {
      console.log("Fetching details for user ID:", userId);
      const response = await apiClient.get<User>(`/custom-user/get-user-detail/${userId}/`);
      
      // Check if the response has the correct structure
      console.log("Full API Response:", response);
  
      // Ensure response and response.data exist and are valid
      if (!response || !response.data) {
        console.error("No data in response or response is undefined");
        return null; // If no data exists, return null
      }
  
      // Check the structure of the data being returned
      console.log("User data:", response.data);
  
      return response.data; // Return user data if it's valid
    } catch (error: any) {
      if (error.response) {
        console.error("API Error Response:", error.response.data);
        throw new Error(error.response.data.message || "Failed to fetch user details");
      }
      console.error("Network/Other Error:", error);
      throw error;
    }
  };
  
  
