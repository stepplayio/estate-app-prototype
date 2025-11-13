'use client';

import { activities, properties } from '@/lib/mock-data';
import { useState } from 'react';

export default function ActivitiesPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredActivities = activities.filter((a) => {
    const statusMatch = statusFilter === 'all' || a.status === statusFilter;
    const typeMatch = typeFilter === 'all' || a.type === typeFilter;
    return statusMatch && typeMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">활동 관리 (Farming)</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + 활동 등록
        </button>
      </div>

      {/* Info 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl"></span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">활동 관리(Farming)</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>목적:</strong> 1단계에서 걸러진 잠재 매물 현장 방문 및 매도인 접촉</li>
              <li><strong>활동 유형:</strong> 방문 / 통화 / 내방</li>
              <li><strong>담당:</strong> 에이전트가 직접 수행, 관리자 검토</li>
              <li><strong>다음 단계:</strong> 매도 의사 확인 후 물건 접수(3단계)로 전환</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-700 flex items-center">상태:</span>
          {[
            { value: 'all', label: '전체' },
            { value: 'scheduled', label: '예정' },
            { value: 'completed', label: '완료' },
            { value: 'cancelled', label: '중단' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setStatusFilter(item.value)}
              className={`px-4 py-2 rounded text-sm ${
                statusFilter === item.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-700 flex items-center">유형:</span>
          {[
            { value: 'all', label: '전체' },
            { value: 'visit', label: '방문' },
            { value: 'call', label: '통화' },
            { value: 'office_visit', label: '내방' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setTypeFilter(item.value)}
              className={`px-4 py-2 rounded text-sm ${
                typeFilter === item.value
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 활동 목록 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                일자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                매물명
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                활동 유형
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                담당자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                활동 내용
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                사진
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                상태
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredActivities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {activity.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {activity.propertyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      activity.type === 'visit'
                        ? 'bg-blue-100 text-blue-800'
                        : activity.type === 'call'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {activity.type === 'visit'
                      ? '현장 방문'
                      : activity.type === 'call'
                      ? '전화 통화'
                      : '내방'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {activity.agentName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-md">
                  {activity.content}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {activity.photos > 0 ? (
                    <span className="flex items-center gap-1">
                      📷 {activity.photos}장
                    </span>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      activity.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : activity.status === 'scheduled'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {activity.status === 'completed'
                      ? '완료'
                      : activity.status === 'scheduled'
                      ? '예정'
                      : '중단'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">총 활동 건수</h3>
          <p className="text-3xl font-bold text-gray-900">{activities.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">완료</h3>
          <p className="text-3xl font-bold text-green-600">
            {activities.filter((a) => a.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">예정</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {activities.filter((a) => a.status === 'scheduled').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">전환율</h3>
          <p className="text-3xl font-bold text-blue-600">
            {((activities.filter((a) => a.status === 'completed').length / activities.length) * 100).toFixed(0)}%
          </p>
        </div>
      </div>
    </div>
  );
}

