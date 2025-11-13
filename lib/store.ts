import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'leader' | 'agent';
}

interface AuthStore {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (email: string, password: string) => {
    // 가짜 로그인
    const users = [
      { id: 1, email: 'admin@reai.com', password: 'admin123', name: '관리자', role: 'admin' as const },
      { id: 2, email: 'leader@reai.com', password: 'leader123', name: '팀장', role: 'leader' as const },
      { id: 3, email: 'agent@reai.com', password: 'agent123', name: '에이전트', role: 'agent' as const },
    ];
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      set({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
      return true;
    }
    
    return false;
  },
  logout: () => set({ user: null }),
}));

