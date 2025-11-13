'use client';

import { properties } from '@/lib/mock-data';
import { useState } from 'react';

export default function PropertiesPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  const filteredProperties = properties.filter((p) => {
    const statusMatch = statusFilter === 'all' || p.status === statusFilter;
    const sourceMatch = sourceFilter === 'all' || p.dataSource === sourceFilter;
    return statusMatch && sourceMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">잠재매물 관리</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + 신규 등록
        </button>
      </div>

      {/* Info 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl"></span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">잠재매물</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>데이터 출처:</strong> 국토부 API + 네이버 크롤링 (시스템 자동 수집)</li>
              <li><strong>특징:</strong> Signal 분석으로 발굴한 "가능성 있는" 부동산</li>
              <li><strong>담당:</strong> 주로 관리자/팀장이 검토</li>
              <li><strong>다음 단계:</strong> 에이전트가 현장 방문 후 활동 관리(2단계)로 전환</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-700 flex items-center">단계:</span>
          {[
            { value: 'all', label: '전체' },
            { value: 'pre-farming', label: 'Pre-Farming' },
            { value: 'farming', label: 'Farming' },
            { value: 'approved', label: '등록 승인' },
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
          <span className="text-sm font-medium text-gray-700 flex items-center">출처:</span>
          {[
            { value: 'all', label: '전체' },
            { value: 'molit_api', label: '국토부 API' },
            { value: 'naver_crawling', label: '네이버 크롤링' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setSourceFilter(item.value)}
              className={`px-4 py-2 rounded text-sm ${
                sourceFilter === item.value
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 매물 목록 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                매물명
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                주소
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                데이터 출처
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                종류
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                면적(㎡)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                가격(억)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Signal 점수
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                등록일
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProperties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {property.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      property.dataSource === 'molit_api'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {property.dataSource === 'molit_api' ? '국토부 API' : '네이버 크롤링'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.area}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(property.price / 100000000).toFixed(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-2 rounded-full ${
                          property.signalScore >= 90
                            ? 'bg-green-500'
                            : property.signalScore >= 80
                            ? 'bg-blue-500'
                            : 'bg-yellow-500'
                        }`}
                        style={{ width: `${property.signalScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {property.signalScore}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      property.status === 'pre-farming'
                        ? 'bg-yellow-100 text-yellow-800'
                        : property.status === 'farming'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {property.status === 'pre-farming'
                      ? 'Pre-Farming'
                      : property.status === 'farming'
                      ? 'Farming'
                      : '등록 승인'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signal 분석 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">평균 Signal 점수</h3>
          <p className="text-3xl font-bold text-gray-900">
            {(
              properties.reduce((sum, p) => sum + p.signalScore, 0) / properties.length
            ).toFixed(1)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">평균 공시지가배율</h3>
          <p className="text-3xl font-bold text-gray-900">
            {(
              properties.reduce(
                (sum, p) => sum + p.realTransactionPrice / p.publicLandPrice,
                0
              ) / properties.length
            ).toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">총 매물 수</h3>
          <p className="text-3xl font-bold text-gray-900">{properties.length}</p>
        </div>
      </div>
    </div>
  );
}

