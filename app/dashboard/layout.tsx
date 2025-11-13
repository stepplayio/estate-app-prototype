'use client';

import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { dashboardStats } from '@/lib/mock-data';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);

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

  type MenuItem = {
    name: string;
    href: string;
    icon: string;
    access?: string[];
    sub?: boolean;
  };

  type MenuGroup = {
    label: string | null;
    items: MenuItem[];
  };

  const menuGroups: MenuGroup[] = [
    {
      label: null,
      items: [
        { name: '대시보드', href: '/dashboard', icon: '📊' },
      ],
    },
    {
      label: '매물 관리',
      items: [
        { name: '잠재매물', href: '/dashboard/properties', icon: '🏢', access: ['admin', 'leader', 'agent'] },
        { name: '활동 등록', href: '/dashboard/activity-add', icon: '➕', access: ['admin', 'leader', 'agent'], sub: true },
        { name: '활동 관리', href: '/dashboard/activities', icon: '📝', access: ['admin', 'leader', 'agent'], sub: true },
        { name: '일정 캘린더', href: '/dashboard/calendar', icon: '📅', access: ['admin', 'leader', 'agent'], sub: true },
        { name: '물건 접수', href: '/dashboard/offerings', icon: '📄', access: ['admin', 'leader', 'agent'] },
        { name: '매물 등록', href: '/dashboard/register', icon: '✅', access: ['admin', 'leader', 'agent'] },
        { name: '등록 매물 관리', href: '/dashboard/properties-registered', icon: '📋', access: ['admin', 'leader', 'agent'] },
      ],
    },
    {
      label: '영업 관리',
      items: [
        { name: '결재 관리', href: '/dashboard/approvals', icon: '📋', access: ['admin', 'leader'] },
        { name: '마케팅', href: '/dashboard/marketing', icon: '📢', access: ['admin', 'leader'] },
        { name: '매수자 관리', href: '/dashboard/buyers', icon: '👥', access: ['admin', 'leader', 'agent'] },
      ],
    },
    {
      label: '시스템',
      items: [
        { name: '통계', href: '/dashboard/stats', icon: '📈', access: ['admin', 'leader'] },
        { name: '관리자', href: '/dashboard/admin', icon: '⚙️', access: ['admin'] },
      ],
    },
  ];

  const accessibleMenuGroups = menuGroups.map((group) => ({
    ...group,
    items: group.items.filter(
      (item) => !item.access || item.access.includes(user.role)
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="shadow" style={{ backgroundColor: '#1e3a5f' }}>
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white"> 리맥스 REAI MVP</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">
              {user.name} ({user.role === 'admin' ? '관리자' : user.role === 'leader' ? '팀장' : '에이전트'})
            </span>
            
            {/* 알림 아이콘 */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-white hover:text-blue-200"
              >
                <span className="text-2xl">🔔</span>
                {dashboardStats.notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {dashboardStats.notifications.length}
                  </span>
                )}
              </button>

              {/* 알림 드롭다운 */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      알림 {dashboardStats.notifications.length}건
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {dashboardStats.notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-lg">
                            {notification.type === 'approval' && '📋'}
                            {notification.type === 'schedule' && '📅'}
                            {notification.type === 'match' && '🎯'}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200 text-center">
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      모두 확인
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="text-sm text-blue-300 hover:text-blue-100"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* 사이드바 */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4 space-y-4">
            {accessibleMenuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                {group.label && (
                  <div className="px-3 mb-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {group.label}
                    </p>
                  </div>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors ${
                        item.sub ? 'pl-8 text-gray-600' : ''
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
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

