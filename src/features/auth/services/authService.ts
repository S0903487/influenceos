import type { AuthResponse, LoginCredentials, PasswordResetRequest, RegisterCredentials, User } from '../types/auth';

// Fake auth service with mock data
// This is prepared for Cloudflare Workers backend integration
// Replace these mock implementations with actual API calls to CF Workers

const MOCK_USERS: Map<string, { user: User; password: string }> = new Map([
  [
    'demo@example.com',
    {
      user: {
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User',
        createdAt: new Date().toISOString(),
      },
      password: 'DemoPass123',
    },
  ],
]);

let CURRENT_TOKEN = 'mock_token_' + Date.now();

/**
 * Simulates an API call to login a user
 * Replace this with actual Cloudflare Workers endpoint:
 * POST /api/auth/login
 */
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockUser = MOCK_USERS.get(credentials.email);

  if (!mockUser || mockUser.password !== credentials.password) {
    throw new Error('Invalid email or password');
  }

  CURRENT_TOKEN = 'mock_token_' + Date.now();

  return {
    user: mockUser.user,
    token: CURRENT_TOKEN,
  };
}

/**
 * Simulates an API call to register a new user
 * Replace this with actual Cloudflare Workers endpoint:
 * POST /api/auth/register
 */
export async function registerUser(credentials: RegisterCredentials): Promise<AuthResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (MOCK_USERS.has(credentials.email)) {
    throw new Error('Email already registered');
  }

  const newUser: User = {
    id: 'user_' + Date.now(),
    email: credentials.email,
    name: credentials.name,
    createdAt: new Date().toISOString(),
  };

  MOCK_USERS.set(credentials.email, {
    user: newUser,
    password: credentials.password,
  });

  CURRENT_TOKEN = 'mock_token_' + Date.now();

  return {
    user: newUser,
    token: CURRENT_TOKEN,
  };
}

/**
 * Simulates an API call to verify the current token
 * Replace this with actual Cloudflare Workers endpoint:
 * GET /api/auth/me
 */
export async function verifyToken(token: string): Promise<User> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (token !== CURRENT_TOKEN) {
    throw new Error('Invalid or expired token');
  }

  // Return the currently "logged in" user
  const currentUser = Array.from(MOCK_USERS.values())[0]?.user;

  if (!currentUser) {
    throw new Error('User not found');
  }

  return currentUser;
}

/**
 * Simulates an API call to logout the user
 * Replace this with actual Cloudflare Workers endpoint:
 * POST /api/auth/logout
 */
export async function logoutUser(): Promise<void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  CURRENT_TOKEN = '';
}

/**
 * Simulates an API call to request password reset
 * Replace this with actual Cloudflare Workers endpoint:
 * POST /api/auth/forgot-password
 */
export async function requestPasswordReset(data: PasswordResetRequest): Promise<void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!MOCK_USERS.has(data.email)) {
    // Don't reveal if email exists for security
    return;
  }

  // In real implementation, send reset email via Cloudflare Workers
  console.log(`Password reset email sent to ${data.email}`);
}

/**
 * Simulates storing auth token in localStorage
 * Prepared for Cloudflare Workers session management
 */
export function setAuthToken(token: string): void {
  localStorage.setItem('auth_token', token);
}

/**
 * Simulates retrieving auth token from localStorage
 */
export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

/**
 * Simulates clearing auth token from localStorage
 */
export function clearAuthToken(): void {
  localStorage.removeItem('auth_token');
}
