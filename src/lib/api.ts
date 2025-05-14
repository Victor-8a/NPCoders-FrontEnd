const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {},
  authToken?: string
): Promise<ApiResponse<T>> => {
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        error: errorData.message || `Error ${response.status}: ${response.statusText}` 
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API Error:', error);
    return { error: 'Error de conexión con el servidor' };
  }
};

// Profile endpoints
export const getProfileData = async (username: string, token?: string) => {
  return fetchApi<{
    id: string;
    username: string;
    bio: string;
    profilePic: string;
    createdAt: string;
    privacidad: string;
    _count: {
      publicaciones: number;
      followers: number;
      following: number;
    };
  }>(`/users/${username}`, {}, token);
};

export const getUserStories = async (username: string, token?: string) => {
  return fetchApi<Array<{
    id: string;
    imagenes: string[];
    createdAt: string;
  }>>(`/users/${username}/stories`, {}, token);
};

// Post endpoints
export const getUserPosts = async (
  username: string, 
  page = 1, 
  limit = 10, 
  token?: string
) => {
  return fetchApi<Array<{
    id: string;
    content: string;
    imagenes: string[];
    videos: string[];
    createdAt: string;
    autor: {
      id: string;
      username: string;
      profilePic: string;
    };
    reacciones: Array<{
      id: string;
      tipoReaccion: string;
      user: {
        id: string;
        username: string;
      };
    }>;
    comentarios: Array<{
      id: string;
      text: string;
      createdAt: string;
      user: {
        id: string;
        username: string;
        profilePic: string;
      };
    }>;
  }>>(`/posts/userPosts?username=${username}&page=${page}&limit=${limit}`, {}, token);
};