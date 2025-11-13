'use client';

import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems = [
    { name: '대시보드', href: '/dashboard', icon: '📊' },
    { name: '잠재매물', href: '/dashboard/properties', icon: '🏢', access: ['admin', 'leader', 'agent'] },
    { name: '활동 관리', href: '/dashboard/activities', icon: '📝', access: ['admin', 'leader', 'agent'] },
    { name: '물건 접수', href: '/dashboard/offerings', icon: '📄', access: ['admin', 'leader', 'agent'] },
    { name: '매물 등록', href: '/dashboard/register', icon: '✅', access: ['admin', 'leader', 'agent'] },
    { name: '결재 관리', href: '/dashboard/approvals', icon: '📋', access: ['admin', 'leader'] },
    { name: '마케팅', href: '/dashboard/marketing', icon: '📢', access: ['admin', 'leader'] },
    { name: '매수자 관리', href: '/dashboard/buyers', icon: '👥', access: ['admin', 'leader', 'agent'] },
    { name: '통계', href: '/dashboard/stats', icon: '📈', access: ['admin', 'leader'] },
    { name: '관리자', href: '/dashboard/admin', icon: '⚙️', access: ['admin'] },
  ];

  const accessibleMenuItems = menuItems.filter(
    (item) => !item.access || item.access.includes(user.role)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow">
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900"> 리맥스 REAI MVP</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user.name} ({user.role === 'admin' ? '관리자' : user.role === 'leader' ? '팀장' : '에이전트'})
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* 사이드바 */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4 space-y-1">
            {accessibleMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* 메인 컨텐츠 */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

