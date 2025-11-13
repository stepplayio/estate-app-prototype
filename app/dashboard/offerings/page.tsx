'use client';

import { offerings } from '@/lib/mock-data';
import { useState } from 'react';

export default function OfferingsPage() {
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOfferings = offerings.filter((o) => {
    return statusFilter === 'all' || o.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">물건 접수 (Sales Offering)</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + 접수 등록
        </button>
      </div>

      {/* Info 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl"></span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">물건 접수(Sales Offering)</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>목적:</strong> 매도인의 중개 의뢰 의사 확정 및 접수</li>
              <li><strong>주요 작업:</strong> 매도인 정보 입력, 서류 수집 (등기부, 건축물대장, 계약서)</li>
              <li><strong>담당:</strong> 에이전트 중심, 관리자 검토</li>
              <li><strong>다음 단계:</strong> 필수 서류 완료 후 매물 등록(4단계)로 전환</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex gap-2">
        <span className="text-sm font-medium text-gray-700 flex items-center">상태:</span>
        {[
          { value: 'all', label: '전체' },
          { value: 'document_pending', label: '서류 대기' },
          { value: 'completed', label: '접수 완료' },
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

      {/* 접수 목록 */}
      <div className="grid grid-cols-1 gap-6">
        {filteredOfferings.map((offering) => (
          <div
            key={offering.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {offering.propertyName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">접수일: {offering.createdAt}</p>
              </div>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  offering.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {offering.status === 'completed' ? '접수 완료' : '서류 대기'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">매도인</p>
                <p className="text-base font-medium text-gray-900">{offering.sellerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">연락처</p>
                <p className="text-base font-medium text-gray-900">{offering.sellerPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">주소</p>
                <p className="text-base font-medium text-gray-900">{offering.sellerAddress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">희망가</p>
                <p className="text-base font-medium text-gray-900">
                  {(offering.hopePrice / 100000000).toFixed(1)}억원
                </p>
              </div>
            </div>

            {/* 서류 체크리스트 */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-700">서류 진행률</p>
                <p className="text-sm font-semibold text-blue-600">
                  {offering.completionRate}%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className={`h-2 rounded-full ${
                    offering.completionRate === 100 ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${offering.completionRate}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div
                  className={`flex items-center gap-2 p-3 rounded ${
                    offering.documents.registry
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="text-lg">
                    {offering.documents.registry ? '✅' : '⬜'}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">등기부등본</p>
                    <p className="text-xs text-gray-500">필수</p>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-2 p-3 rounded ${
                    offering.documents.buildingLedger
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="text-lg">
                    {offering.documents.buildingLedger ? '✅' : '⬜'}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">건축물대장</p>
                    <p className="text-xs text-gray-500">필수</p>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-2 p-3 rounded ${
                    offering.documents.contract
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="text-lg">
                    {offering.documents.contract ? '✅' : '⬜'}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">매매계약서</p>
                    <p className="text-xs text-gray-500">선택</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex gap-3 mt-4">
              <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                서류 업로드
              </button>
              {offering.status === 'completed' && (
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  4단계 전환 (매물 등록)
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">총 접수 건수</h3>
          <p className="text-3xl font-bold text-gray-900">{offerings.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">서류 대기</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {offerings.filter((o) => o.status === 'document_pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">접수 완료</h3>
          <p className="text-3xl font-bold text-green-600">
            {offerings.filter((o) => o.status === 'completed').length}
          </p>
        </div>
      </div>
    </div>
  );
}

