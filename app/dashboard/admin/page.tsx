'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'batch'>('batch');

  const batchJobs = [
    {
      id: 1,
      name: '국토부 실거래가 수집',
      type: 'schedule',
      cron: '0 2 1 * *',
      cronText: '매월 1일 02:00',
      lastRun: '2025.01.25 02:00',
      status: 'success',
      processedCount: 1250,
      duration: '45분',
    },
    {
      id: 2,
      name: '네이버 크롤링',
      type: 'schedule',
      cron: '0 3 * * 1,4',
      cronText: '매주 월/목 03:00',
      lastRun: '2025.01.26 03:00',
      status: 'success',
      processedCount: 320,
      duration: '22분',
    },
    {
      id: 3,
      name: 'Signal 점수 계산',
      type: 'event',
      cron: '-',
      cronText: '데이터 수집 시 자동',
      lastRun: '2025.01.26 03:30',
      status: 'success',
      processedCount: 320,
      duration: '3분',
    },
    {
      id: 4,
      name: '품질 점수 자동 계산',
      type: 'event',
      cron: '-',
      cronText: '매물 등록 시 자동',
      lastRun: '2025.01.26 14:15',
      status: 'success',
      processedCount: 1,
      duration: '1초',
    },
    {
      id: 5,
      name: '매칭 로직 실행',
      type: 'event',
      cron: '-',
      cronText: '매수자 등록 시 자동',
      lastRun: '2025.01.26 15:32',
      status: 'success',
      processedCount: 4,
      duration: '2초',
    },
    {
      id: 6,
      name: '일정 알림 발송',
      type: 'schedule',
      cron: '0 18 * * *',
      cronText: '매일 18:00',
      lastRun: '2025.01.26 18:00',
      status: 'success',
      processedCount: 5,
      duration: '5초',
    },
    {
      id: 7,
      name: 'DB 백업',
      type: 'schedule',
      cron: '0 4 * * *',
      cronText: '매일 04:00',
      lastRun: '2025.01.26 04:00',
      status: 'success',
      processedCount: 1,
      duration: '12분',
    },
  ];

  const adminFeatures = [
    {
      id: 1,
      title: '배치 Job 관리',
      icon: '⚙️',
      description: '국토부 API, 네이버 크롤링, Signal 계산 등 자동 실행 작업 관리',
      features: [
        'Job 목록 및 실행 이력',
        '수동 실행 / 재실행',
        '에러 로그 조회',
        'Cron 스케줄 설정',
      ],
      priority: 'high',
    },
    {
      id: 2,
      title: '시스템 설정',
      icon: '🔧',
      description: '배치 실행 주기, Signal 가중치, 품질 점수 기준 등 시스템 설정',
      features: [
        '배치 실행 주기 설정',
        'Signal 가중치 설정',
        '품질 점수 기준 설정',
        '대상 지역 설정',
      ],
      priority: 'medium',
    },
    {
      id: 3,
      title: '사용자 관리',
      icon: '👤',
      description: '시스템 사용자 및 권한 관리',
      features: [
        '사용자 목록 조회',
        '신규 사용자 등록',
        '권한 변경 (에이전트/팀장/관리자)',
        '활성/비활성 관리',
      ],
      priority: 'medium',
    },
    {
      id: 4,
      title: '에러 로그',
      icon: '⚠️',
      description: '시스템 에러 발생 이력 및 상세 로그 조회',
      features: [
        '에러 로그 목록',
        '에러 타입별 필터',
        '날짜 범위 검색',
        '상세 스택 트레이스',
      ],
      priority: 'low',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">관리자 메뉴</h2>

      {/* 탭 */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('batch')}
          className={`px-4 py-2 rounded text-sm font-medium ${
            activeTab === 'batch'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          ⚙️ 배치 Job 관리
        </button>
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded text-sm font-medium ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          📋 전체 기능 (구현 예정)
        </button>
      </div>

      {/* 배치 Job 관리 */}
      {activeTab === 'batch' && (
        <>
          {/* Info 메시지 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-blue-500 text-xl"></span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">배치 Job 관리</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li><strong>목적:</strong> 자동화 작업 모니터링 및 수동 실행</li>
                  <li><strong>유형:</strong> 스케줄 기반 (Cron) / 이벤트 기반 (Trigger)</li>
                  <li><strong>관리:</strong> 실행 이력, 에러 로그, 수동 실행</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 배치 Job 목록 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Job 이름
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    유형
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    실행 주기
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    마지막 실행
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    처리 건수
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    소요 시간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {batchJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {job.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          job.type === 'schedule'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {job.type === 'schedule' ? '스케줄' : '이벤트'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.cronText}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.lastRun}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          job.status === 'success'
                            ? 'bg-green-100 text-green-800'
                            : job.status === 'failed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {job.status === 'success' ? '✅ 성공' : job.status === 'failed' ? '❌ 실패' : '⏳ 진행 중'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.processedCount.toLocaleString()}건
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs">
                        수동 실행
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">총 Job 수</h3>
              <p className="text-3xl font-bold text-gray-900">{batchJobs.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">스케줄 Job</h3>
              <p className="text-3xl font-bold text-blue-600">
                {batchJobs.filter((j) => j.type === 'schedule').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">이벤트 Job</h3>
              <p className="text-3xl font-bold text-green-600">
                {batchJobs.filter((j) => j.type === 'event').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">성공률</h3>
              <p className="text-3xl font-bold text-green-600">100%</p>
            </div>
          </div>
        </>
      )}

      {/* 전체 기능 (구현 예정) */}
      {activeTab === 'overview' && (
        <>
          {/* 기능 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminFeatures.map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-lg shadow-lg p-6 border-2 border-dashed border-gray-300 relative"
          >
            {/* 구현 예정 뱃지 */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                구현 예정
              </span>
            </div>

            {/* 헤더 */}
            <div className="flex items-start gap-3 mb-4">
              <span className="text-4xl">{feature.icon}</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>

            {/* 우선순위 */}
            <div className="mb-4">
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  feature.priority === 'high'
                    ? 'bg-red-100 text-red-800'
                    : feature.priority === 'medium'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                우선순위:{' '}
                {feature.priority === 'high'
                  ? '높음'
                  : feature.priority === 'medium'
                  ? '중간'
                  : '낮음'}
              </span>
            </div>

            {/* 주요 기능 */}
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">주요 기능</p>
              <ul className="space-y-1">
                {feature.features.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">▪</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
          </div>

          {/* 안내 메시지 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3">개발 계획</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Phase 1 (MVP):</strong> 배치 Job 관리 기능 우선 개발
              </p>
              <p>
                <strong>Week 1-2:</strong> 배치 Job 인프라 구축 (Railway + Bull Queue + Redis)
              </p>
              <p>
                <strong>Week 3-4:</strong> 국토부 API 연동 및 크롤링 구현
              </p>
              <p>
                <strong>Week 5-6:</strong> 관리자 UI 개발 (Job 모니터링, 수동 실행, 에러 로그)
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

