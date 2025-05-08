import { toast } from 'react-toastify';

export class APIError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'APIError';
  }
}

export const handleAPIError = (error) => {
  if (error instanceof APIError) {
    // Handle specific API errors
    switch (error.status) {
      case 401:
        toast.error('Please log in to continue');
        // Redirect to login if needed
        break;
      case 403:
        toast.error('You do not have permission to perform this action');
        break;
      case 404:
        toast.error('The requested resource was not found');
        break;
      case 422:
        // Handle validation errors
        if (error.data?.errors) {
          Object.values(error.data.errors).forEach(messages => {
            messages.forEach(message => toast.error(message));
          });
        } else {
          toast.error('Invalid data provided');
        }
        break;
      case 429:
        toast.error('Too many requests. Please try again later');
        break;
      default:
        toast.error(error.message || 'An unexpected error occurred');
    }
  } else {
    // Handle network or other errors
    toast.error('Network error. Please check your connection');
  }
  console.error('API Error:', error);
};

export const createAPIError = async (response) => {
  const data = await response.json().catch(() => null);
  throw new APIError(
    data?.message || 'An error occurred',
    response.status,
    data
  );
}; 