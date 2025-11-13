'use client';

import { buyers, matchingResults } from '@/lib/mock-data';
import { useState } from 'react';

export default function BuyersPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBuyer, setSelectedBuyer] = useState<number | null>(null);

  const filteredBuyers = buyers.filter((b) => {
    return statusFilter === 'all' || b.status === statusFilter;
  });

  const buyerMatches = selectedBuyer
    ? matchingResults.filter((m) => m.buyerId === selectedBuyer)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">매수자 관리 (Buyer Contact)</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + 매수자 등록
        </button>
      </div>

      {/* Info 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl"></span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">매수자 관리 (Buyer Contact)</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>목적:</strong> 매수자 조건 입력 후 등록 매물과 자동 매칭</li>
              <li><strong>매칭 기준:</strong> 예산, 지역, 면적, 용도 (점수 자동 계산)</li>
              <li><strong>담당:</strong> 에이전트 중심, 시스템 자동 매칭 지원</li>
              <li><strong>다음 단계:</strong> 매칭 완료 시 영업 관리(7단계)로 자동 전환</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 매수자 목록 */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <span className="text-sm font-medium text-gray-700 flex items-center">상태:</span>
            {[
              { value: 'all', label: '전체' },
              { value: 'active', label: '활성' },
              { value: 'inactive', label: '비활성' },
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

          <div className="space-y-3">
            {filteredBuyers.map((buyer) => (
              <div
                key={buyer.id}
                onClick={() => setSelectedBuyer(buyer.id)}
                className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-all ${
                  selectedBuyer === buyer.id
                    ? 'ring-2 ring-blue-500'
                    : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {buyer.name}
                    </h3>
                    <p className="text-sm text-gray-500">{buyer.phone}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      buyer.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {buyer.status === 'active' ? '활성' : '비활성'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">예산:</span>{' '}
                    <span className="font-medium text-gray-900">
                      {(buyer.budget.min / 100000000).toFixed(1)}~
                      {(buyer.budget.max / 100000000).toFixed(1)}억
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">지역:</span>{' '}
                    <span className="font-medium text-gray-900">
                      {buyer.preferredLocation}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">종류:</span>{' '}
                    <span className="font-medium text-gray-900">
                      {buyer.preferredType}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">등록일:</span>{' '}
                    <span className="font-medium text-gray-900">{buyer.createdAt}</span>
                  </div>
                </div>

                {selectedBuyer === buyer.id && (
                  <div className="mt-3 pt-3 border-t">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                      매칭 실행
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 매칭 결과 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedBuyer
              ? `${buyers.find((b) => b.id === selectedBuyer)?.name} - 매칭 결과`
              : '매수자를 선택하세요'}
          </h3>

          {selectedBuyer ? (
            <div className="space-y-3">
              {buyerMatches.length > 0 ? (
                buyerMatches.map((match) => (
                  <div
                    key={match.id}
                    className="bg-white rounded-lg shadow p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">
                          {match.propertyName}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          매칭일: {match.matchedAt}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">매칭 점수</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {match.matchScore}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {match.contacted ? (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                          ✅ 연락 완료
                        </span>
                      ) : (
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                          고객 연락
                        </button>
                      )}
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm">
                        매물 상세
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">매칭된 매물이 없습니다</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">
                왼쪽에서 매수자를 선택하면 매칭 결과가 표시됩니다
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">총 매수자</h3>
          <p className="text-3xl font-bold text-gray-900">{buyers.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">활성 매수자</h3>
          <p className="text-3xl font-bold text-green-600">
            {buyers.filter((b) => b.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">총 매칭 건수</h3>
          <p className="text-3xl font-bold text-blue-600">{matchingResults.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">평균 매칭 점수</h3>
          <p className="text-3xl font-bold text-purple-600">
            {(
              matchingResults.reduce((sum, m) => sum + m.matchScore, 0) /
              matchingResults.length
            ).toFixed(0)}
          </p>
        </div>
      </div>
    </div>
  );
}

