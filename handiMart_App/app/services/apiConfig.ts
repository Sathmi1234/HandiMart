// apiConfig.ts
export const API_CONFIG = {
  BASE_URL: __DEV__ 
    ? 'http://localhost:5454' 
    : 'https://your-production-url.com', // For production
  
  
  ENDPOINTS: {
    CONTENT_POSTS: '/content-posts/',
    CONTENT_POST_BY_ID: '/content-posts/{id}',
    CONTENT_URLS: '/content-urls/',
    CONTENT_URLS_BY_POST: '/content-urls/content-post/{contentPostId}',
  },
  
  TIMEOUT: 10000, // 10 seconds
};

// API service class
export class ContentPostService {
  private static async makeRequest(url: string, options?: RequestInit) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
  
  static async getAllContentPosts() {
    const response = await this.makeRequest(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTENT_POSTS}`);
    console.log('Response from getAllContentPosts:', response);
    return response.json();
  }
  
  static async getContentPostById(id: number) {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTENT_POST_BY_ID.replace('{id}', id.toString())}`;
    const response = await this.makeRequest(url);
    return response.json();
  }
  
  static async getContentUrlsByPostId(contentPostId: number) {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTENT_URLS_BY_POST.replace('{contentPostId}', contentPostId.toString())}`;
    const response = await this.makeRequest(url);
    return response.json();
  }
  
  static async createContentPost(data: {
    title: string;
    description?: string;
    productId: number;
  }) {
    const response = await this.makeRequest(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTENT_POSTS}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }
  
  static async updateContentPost(id: number, data: {
    title?: string;
    description?: string;
    productId?: number;
  }) {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTENT_POST_BY_ID.replace('{id}', id.toString())}`;
    const response = await this.makeRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  }
  
  static async deleteContentPost(id: number) {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTENT_POST_BY_ID.replace('{id}', id.toString())}`;
    await this.makeRequest(url, {
      method: 'DELETE',
    });
  }
}