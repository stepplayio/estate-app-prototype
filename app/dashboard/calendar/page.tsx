'use client';

import { useAuthStore } from '@/lib/store';

export default function CalendarPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">일정 캘린더</h2>

      {/* Info 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl"></span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">일정 캘린더</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>목적:</strong> 활동 일정, 미팅 일정 통합 관리</li>
              <li><strong>권한:</strong> {user?.role === 'admin' ? '전체 일정 조회' : user?.role === 'leader' ? '팀 일정 조회' : '본인 일정만 조회'}</li>
              <li><strong>알림:</strong> D-1일, 당일 아침 자동 알림 발송</li>
              <li><strong>연동:</strong> 2단계(활동), 7단계(영업), 9단계(사후관리) 일정 통합</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 캘린더 (구현 예정) */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="aspect-video bg-gray-50 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl mb-4">📅</p>
            <p className="text-xl font-semibold text-gray-700 mb-2">
              캘린더 뷰 (구현 예정)
            </p>
            <p className="text-sm text-gray-500 mb-4">
             
            </p>
            <div className="space-y-1 text-xs text-gray-400">
              <p>• 월/주/일 뷰 전환</p>
      
              <p>• 일정 클릭 시 상세 모달</p>
            </div>
          </div>
        </div>
      </div>

      {/* 최근 일정 목록 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">최근 일정</h3>
        <div className="space-y-3">
          {[
            { id: 1, title: '강남구 역삼동 상가 현장 방문', date: '2025-01-28', time: '14:00', type: 'visit' },
            { id: 2, title: '송파구 잠실동 근린상가 매도인 미팅', date: '2025-01-29', time: '10:00', type: 'meeting' },
            { id: 3, title: '서초구 서초동 오피스텔 계약 상담', date: '2025-01-30', time: '15:00', type: 'contract' },
          ].map((schedule) => (
            <div
              key={schedule.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  schedule.type === 'visit'
                    ? 'bg-blue-100'
                    : schedule.type === 'meeting'
                    ? 'bg-green-100'
                    : 'bg-purple-100'
                }`}
              >
                {schedule.type === 'visit' && '🚗'}
                {schedule.type === 'meeting' && '👥'}
                {schedule.type === 'contract' && '📄'}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{schedule.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {schedule.date} {schedule.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

