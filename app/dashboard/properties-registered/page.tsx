'use client';

import { properties, matchingResults } from '@/lib/mock-data';
import { useState } from 'react';

export default function RegisteredPropertiesPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);

  // 승인 완료된 매물만 (4단계 이상)
  const registeredProperties = properties.filter((p) => p.status === 'approved');

  const filteredProperties = registeredProperties.filter((p) => {
    return statusFilter === 'all';
  });

  const propertyMatches = selectedProperty
    ? matchingResults.filter((m) => m.propertyId === selectedProperty)
    : [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">등록 매물 관리</h2>

      {/* Info 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl"></span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">등록 매물 관리</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>목적:</strong> 결재 승인 완료된 매물의 마케팅/매칭/영업 현황 통합 관리</li>
              <li><strong>대상:</strong> 4단계 승인 완료 → 5단계(마케팅) → 6단계(매칭) → 7단계(영업) 진행 중인 매물</li>
              <li><strong>주요 기능:</strong> 매칭된 매수자 조회, 마케팅 상태 확인, 영업 현황 추적</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 매물 목록 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">등록 매물 목록</h3>
          
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div
                key={property.id}
                onClick={() => setSelectedProperty(property.id)}
                className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-all ${
                  selectedProperty === property.id
                    ? 'ring-2 ring-blue-500'
                    : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">
                      {property.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{property.address}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    등록 승인
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-500">가격:</span>{' '}
                    <span className="font-medium text-gray-900">
                      {(property.price / 100000000).toFixed(1)}억원
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">면적:</span>{' '}
                    <span className="font-medium text-gray-900">{property.area}㎡</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                    ✅ 마케팅 완료
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                    🎯 매칭 {matchingResults.filter((m) => m.propertyId === property.id).length}건
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">등록 승인된 매물이 없습니다</p>
            </div>
          )}
        </div>

        {/* 매물 상세 (매칭된 매수자) */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {selectedProperty
              ? `${properties.find((p) => p.id === selectedProperty)?.name} - 매칭된 매수자`
              : '매물을 선택하세요'}
          </h3>

          {selectedProperty ? (
            <div className="space-y-3">
              {propertyMatches.length > 0 ? (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-3">
                    <p className="text-sm text-blue-800">
                      <strong>총 {propertyMatches.length}명</strong>의 매수자가 이 매물에 매칭되었습니다
                    </p>
                  </div>

                  {propertyMatches
                    .sort((a, b) => b.matchScore - a.matchScore)
                    .map((match) => (
                      <div
                        key={match.id}
                        className="bg-white rounded-lg shadow p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-base font-semibold text-gray-900">
                              {match.buyerName}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              매칭일: {match.matchedAt}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">매칭 점수</p>
                            <p className="text-2xl font-bold text-blue-600">
                              {match.matchScore}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {match.contacted ? (
                            <>
                              <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                                ✅ 연락 완료
                              </span>
                              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                                영업 시작 (7단계 전환)
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                                고객 연락
                              </button>
                              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm">
                                매수자 상세
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">매칭된 매수자가 없습니다</p>
                  <p className="text-sm text-gray-400 mt-2">
                    매수자 관리에서 매칭을 실행하세요
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">
                왼쪽에서 매물을 선택하면 매칭된 매수자가 표시됩니다
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">등록 매물 수</h3>
          <p className="text-3xl font-bold text-gray-900">{registeredProperties.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">평균 매칭 건수</h3>
          <p className="text-3xl font-bold text-purple-600">
            {registeredProperties.length > 0
              ? (
                  matchingResults.length / registeredProperties.length
                ).toFixed(1)
              : 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">마케팅 완료</h3>
          <p className="text-3xl font-bold text-green-600">{registeredProperties.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">영업 진행</h3>
          <p className="text-3xl font-bold text-blue-600">
            {matchingResults.filter((m) => m.contacted).length}
          </p>
        </div>
      </div>
    </div>
  );
}

