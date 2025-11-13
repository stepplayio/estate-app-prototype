'use client';

import { dashboardStats } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">대시보드</h2>

      {/* 9단계 프로세스 현황 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">9단계 프로세스 현황</h3>
        <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
          {[
            { step: 1, name: 'Pre-Farming', count: 15 },
            { step: 2, name: 'Farming', count: 8 },
            { step: 3, name: 'Offering', count: 6 },
            { step: 4, name: 'Register', count: 5 },
            { step: 5, name: 'Marketing', count: 3 },
            { step: 6, name: 'Buyer', count: 12 },
            { step: 7, name: 'Sales', count: 4 },
            { step: 8, name: 'Contract', count: 2 },
            { step: 9, name: 'After', count: 2 },
          ].map((stage) => (
            <div
              key={stage.step}
              className="bg-gray-50 p-3 rounded text-center"
            >
              <p className="text-xs text-gray-500">{stage.step}단계</p>
              <p className="text-lg font-bold text-gray-900">{stage.count}</p>
              <p className="text-xs text-gray-600">{stage.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="잠재매물"
          value={dashboardStats.potential}
          color="bg-blue-500"
        />
        <StatCard
          title="활동 중"
          value={dashboardStats.active}
          color="bg-green-500"
        />
        <StatCard
          title="등록 완료"
          value={dashboardStats.registered}
          color="bg-purple-500"
        />
        <StatCard
          title="마케팅 중"
          value={dashboardStats.marketing}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="매수자"
          value={dashboardStats.buyers}
          color="bg-indigo-500"
        />
        <StatCard
          title="영업 중"
          value={dashboardStats.deals}
          color="bg-pink-500"
        />
        <StatCard
          title="계약 완료"
          value={dashboardStats.contracts}
          color="bg-teal-500"
        />
        <StatCard
          title="사후관리"
          value={dashboardStats.contracts}
          color="bg-gray-500"
        />
      </div>

      {/* 데이터 업데이트 현황 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">매물 데이터 최신 업데이트</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded border border-green-200">
            <span className="text-2xl">🏛️</span>
            <div>
              <p className="text-sm font-medium text-gray-900">국토부 API</p>
              <p className="text-xs text-gray-500">2025.11.01 (월 1회 자동 수집)</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded border border-purple-200">
            <span className="text-2xl">🔍</span>
            <div>
              <p className="text-sm font-medium text-gray-900">네이버 크롤링</p>
              <p className="text-xs text-gray-500">2025.11.10(주 2~3회 자동 수집)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 알림 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">최근 알림</h3>
        <div className="space-y-3">
          {dashboardStats.notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded"
            >
              <span className="text-2xl">
                {notification.type === 'approval' && '📋'}
                {notification.type === 'schedule' && '📅'}
                {notification.type === 'match' && '🎯'}
              </span>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white text-xl`}>
          {title[0]}
        </div>
      </div>
    </div>
  );
}

