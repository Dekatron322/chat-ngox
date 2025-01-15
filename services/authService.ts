import apiClient from "./apiService";

interface SignUpRequest {
	email: string;
	password1: string;
	meter_number: string;
}

interface LoginRequest {
	user_id: string;
	password: string;
}

interface ForgotPasswordRequest {
	email: string;
}

interface ForgotPasswordResponse {
	email: string;
}

interface SignUpResponse {
	id: string; // Example; adjust based on your API response structure
	email: string;
}

interface LoginResponse {
	// token: string;
	user_id: string; // Adjust the type based on the API response
}

export const signUp = async (
	credentials: SignUpRequest
): Promise<SignUpResponse> => {
	try {
		const response = await apiClient.post<SignUpResponse>(
			"/vendor/auth/sign-up/",
			credentials
		);
		return response.data; // Return only the data part of the AxiosResponse
	} catch (error: any) {
		if (error.response) {
			// Handle API response errors
			throw new Error(error.response.data.message || "Failed to sign up");
		}
		throw error;
	}
};

export const forgotPassword = async (
	credentials: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
	try {
		const response = await apiClient.post<SignUpResponse>(
			"/vendor/forgot-password/",
			credentials
		);
		return response.data; // Return only the data part of the AxiosResponse
	} catch (error: any) {
		if (error.response) {
			// Handle API response errors
			throw new Error(error.response.data.message || "Failed to sign up");
		}
		throw error;
	}
};

export const signIn = async (
	credentials: LoginRequest
): Promise<LoginResponse> => {
	try {
		// Directly destructure `response` to access the payload
		const response = await apiClient.post<LoginResponse>(
			"/vendor/auth/sign-in/",
			credentials
		);
		console.log("Full API Response:", response); // Log the complete response
		return response as unknown as LoginResponse; // Cast response to LoginResponse type
	} catch (error) {
		console.error("API Error:", error);
		throw error;
	}
};
