const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Define proper types for API responses
interface Task {
  taskId: string;
  title: string;
  description: string;
  points: number;
  maxCompletions: number;
  type: 'once' | 'daily' | 'limited';
  action: string;
  link?: string;
}

interface TaskProgress {
  taskId: string;
  completions: number;
  completed: boolean;
  lastCompleted?: string;
  canComplete: boolean;
}

interface TaskProgressResponse {
  taskProgress: TaskProgress[];
  totalPoints: number;
  currentTier: string;
}

interface TasksResponse {
  tasks: Task[];
}

interface TaskCompletionResponse {
  totalPoints: number;
  taskCompletion: {
    completions: number;
    completed: boolean;
  };
}

interface SpinnerResponse {
  spinResult: {
    points: number;
    description: string;
  };
  totalPoints: number;
  spinsToday: number;
}

interface SpinnerStatus {
  canSpin: boolean;
  spinsToday: number;
  lastSpinTime?: string;
}

interface User {
  id: string;
  walletAddress: string;
  displayName?: string;
  email?: string;
  avatar?: string;
  role: string;
  totalPoints: number;
  currentTier: string;
  referralCode: string;
  referralCount: number;
  totalReferralEarnings: number;
  isActive: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface ReferredUsersData {
  referredUsers: Array<{
    id: string;
    walletAddress: string;
    displayName?: string;
    joinedAt: string;
    earnedPoints: number;
  }>;
  totalReferred: number;
  totalEarnings: number;
}

interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
    value: string;
  }>;
}

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('spinloot-token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('spinloot-token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('spinloot-token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retries = 3
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // Handle non-JSON responses (like rate limit errors)
        const text = await response.text();
        throw new Error(`Server error: ${response.status} - ${text}`);
      }

      if (!response.ok) {
        if (data.errors && data.errors.length > 0) {
          const errorMessages = data.errors.map((err: any) => `${err.field}: ${err.message}`).join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(data.message || `API request failed with status ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      
      // Retry logic for rate limit errors
      if (retries > 0 && error instanceof Error && error.message.includes('429')) {
        console.log(`Retrying request (${retries} attempts left)...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries))); // Exponential backoff
        return this.request(endpoint, options, retries - 1);
      }
      
      throw error;
    }
  }

  // Authentication
  async connectWallet(walletAddress: string, referralCode?: string, displayName?: string, email?: string) {
    return this.request<AuthResponse>('/auth/connect-wallet', {
      method: 'POST',
      body: JSON.stringify({
        walletAddress,
        referralCode,
        displayName,
        email,
      }),
    });
  }

  async getProfile() {
    return this.request<User>('/auth/profile');
  }

  async updateProfile(updates: { displayName?: string; email?: string; avatar?: string }) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async getPointsHistory(page = 1, limit = 20) {
    return this.request(`/auth/points-history?page=${page}&limit=${limit}`);
  }

  async getCompletedTasks() {
    return this.request('/auth/completed-tasks');
  }

  // Tasks
  async getTasks() {
    return this.request<TasksResponse>('/tasks');
  }

  async getTaskById(taskId: string) {
    return this.request<Task>(`/tasks/${taskId}`);
  }

  async completeTask(taskId: string) {
    return this.request<TaskCompletionResponse>(`/tasks/${taskId}/complete`, {
      method: 'POST',
    });
  }

  async getTaskProgress() {
    return this.request<TaskProgressResponse>('/tasks/progress');
  }

  async getTaskStats() {
    return this.request('/tasks/stats');
  }

  // Referrals
  async getReferralInfo() {
    return this.request<{
      referralCode: string;
      referralCount: number;
      totalReferralEarnings: number;
      referralLink: string;
    }>('/referrals/info');
  }

  async getReferralsList(page = 1, limit = 20, status?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(status && { status }),
    });
    return this.request(`/referrals/list?${params}`);
  }

  async getReferralStats() {
    return this.request('/referrals/stats');
  }

  async validateReferralCode(referralCode: string) {
    return this.request('/referrals/validate', {
      method: 'POST',
      body: JSON.stringify({ referralCode }),
    });
  }

  async getReferralLeaderboard(page = 1, limit = 20) {
    return this.request(`/referrals/leaderboard?page=${page}&limit=${limit}`);
  }

  async getReferralRewards() {
    return this.request('/referrals/rewards');
  }

  async getReferredUsers() {
    return this.request<ReferredUsersData>('/referrals/referred-users');
  }

  // Daily Spinner
  async spinDailySpinner() {
    return this.request<SpinnerResponse>('/spinner/spin', {
      method: 'POST',
    });
  }

  async getSpinnerStatus() {
    return this.request<SpinnerStatus>('/spinner/status');
  }

  async getSpinnerHistory(page = 1, limit = 20) {
    return this.request(`/spinner/history?page=${page}&limit=${limit}`);
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export default apiService;
