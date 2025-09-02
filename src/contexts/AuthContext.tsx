import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'owner' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: 'user' | 'owner') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session on mount
    const storedUser = localStorage.getItem('smartrent_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - replace with real API call
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        role: email.includes('owner') ? 'owner' : email.includes('admin') ? 'admin' : 'user'
      };
      
      setUser(mockUser);
      localStorage.setItem('smartrent_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string, role: 'user' | 'owner'): Promise<boolean> => {
    // Mock signup - replace with real API call
    if (name && email && password) {
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role
      };
      
      setUser(mockUser);
      localStorage.setItem('smartrent_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartrent_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};