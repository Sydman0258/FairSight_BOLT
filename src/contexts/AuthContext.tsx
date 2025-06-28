import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  organization: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  organization: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const token = Cookies.get('fairsight_token');
    const userData = Cookies.get('fairsight_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        Cookies.remove('fairsight_token');
        Cookies.remove('fairsight_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - replace with actual authentication
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Store token and user data
        Cookies.set('fairsight_token', data.token, { expires: 7, secure: true, sameSite: 'strict' });
        Cookies.set('fairsight_user', JSON.stringify(data.user), { expires: 7, secure: true, sameSite: 'strict' });
        
        setUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      // For demo purposes, simulate successful login
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
        role: 'Compliance Officer',
        organization: 'Acme Corporation'
      };
      
      Cookies.set('fairsight_token', 'demo_token_123', { expires: 7, secure: true, sameSite: 'strict' });
      Cookies.set('fairsight_user', JSON.stringify(mockUser), { expires: 7, secure: true, sameSite: 'strict' });
      
      setUser(mockUser);
      return true;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Simulate API call - replace with actual registration
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        
        Cookies.set('fairsight_token', data.token, { expires: 7, secure: true, sameSite: 'strict' });
        Cookies.set('fairsight_user', JSON.stringify(data.user), { expires: 7, secure: true, sameSite: 'strict' });
        
        setUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      // For demo purposes, simulate successful registration
      const mockUser: User = {
        id: '2',
        email: userData.email,
        name: userData.name,
        role: 'Compliance Officer',
        organization: userData.organization
      };
      
      Cookies.set('fairsight_token', 'demo_token_456', { expires: 7, secure: true, sameSite: 'strict' });
      Cookies.set('fairsight_user', JSON.stringify(mockUser), { expires: 7, secure: true, sameSite: 'strict' });
      
      setUser(mockUser);
      return true;
    }
  };

  const logout = () => {
    Cookies.remove('fairsight_token');
    Cookies.remove('fairsight_user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};