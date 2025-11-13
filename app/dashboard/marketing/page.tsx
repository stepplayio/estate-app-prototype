'use client';

import { marketingItems } from '@/lib/mock-data';
import { useState } from 'react';

export default function MarketingPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingIM, setEditingIM] = useState<number | null>(null);

  const filteredItems = marketingItems.filter((m) => {
    return statusFilter === 'all' || m.imStatus === statusFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">마케팅 (Marketing)</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + IM 생성
        </button>
      </div>

      {/* Info 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl"></span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">마케팅 (Marketing) ★중요★</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>목적:</strong> 승인된 매물을 IM 생성 및 다채널 마케팅으로 매수자 발굴</li>
              <li><strong>IM 생성:</strong> 수동 입력 (MVP) / 자동 생성 (확장)</li>
              <li><strong>발송 대상:</strong> VIP 고객 리스트</li>
              <li><strong>체크리스트:</strong> 10~20개 항목으로 마케팅 활동 추적</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex gap-2">
        <span className="text-sm font-medium text-gray-700 flex items-center">상태:</span>
        {[
          { value: 'all', label: '전체' },
          { value: 'draft', label: 'IM 작성 중' },
          { value: 'completed', label: '발송 완료' },
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

      {/* 마케팅 목록 */}
      <div className="grid grid-cols-1 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.propertyName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">등록일: {item.createdAt}</p>
              </div>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  item.imStatus === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {item.imStatus === 'completed' ? '발송 완료' : 'IM 작성 중'}
              </span>
            </div>

            {/* IM 체크리스트 진행률 */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">마케팅 체크리스트</p>
                <p className="text-sm font-semibold text-blue-600">
                  {item.checklistProgress} / {item.checklistTotal}
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-blue-500"
                  style={{
                    width: `${(item.checklistProgress / item.checklistTotal) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* VIP 발송 현황 */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">VIP 발송 현황</p>
                <p className="text-sm font-semibold text-green-600">
                  {item.vipSent} / {item.vipTotal}명
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-green-500"
                  style={{
                    width: `${(item.vipSent / item.vipTotal) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex gap-3">
              <button
                onClick={() => setEditingIM(item.id)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                IM 편집 [클릭]
              </button>
              {item.imStatus === 'draft' && (
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  VIP 발송
                </button>
              )}
              {item.imStatus === 'completed' && (
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  체크리스트 관리
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">총 마케팅 건수</h3>
          <p className="text-3xl font-bold text-gray-900">{marketingItems.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">IM 작성 중</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {marketingItems.filter((m) => m.imStatus === 'draft').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">발송 완료</h3>
          <p className="text-3xl font-bold text-green-600">
            {marketingItems.filter((m) => m.imStatus === 'completed').length}
          </p>
        </div>
      </div>

      {/* IM 편집 모달 */}
      {editingIM && (
        <IMEditorModal
          itemId={editingIM}
          onClose={() => setEditingIM(null)}
        />
      )}
    </div>
  );
}

function IMEditorModal({ itemId, onClose }: { itemId: number; onClose: () => void }) {
  const item = marketingItems.find((m) => m.id === itemId);

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">IM 편집 - {item.propertyName}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* 6분할 레이아웃 */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* 왼쪽 상단 - 매물 사진 */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-2">왼쪽 상단 - 매물 사진</p>
              <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <p className="text-4xl mb-2">📷</p>
                  <p className="text-xs">이미지 업로드</p>
                </div>
              </div>
            </div>

            {/* 중앙 상단 - 지도 */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-2">중앙 상단 - 지도</p>
              <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <p className="text-4xl mb-2">🗺️</p>
                  <p className="text-xs">지도 캡처</p>
                </div>
              </div>
            </div>

            {/* 오른쪽 상단 - 시뮬레이션 1 */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-2">오른쪽 상단 - 시뮬레이션 1</p>
              <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <p className="text-4xl mb-2">📊</p>
                  <p className="text-xs">수익률 계산</p>
                </div>
              </div>
            </div>

            {/* 왼쪽 하단 - 건축물대장 */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">왼쪽 하단 - 건축물대장</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">건물명:</span>
                  <input
                    type="text"
                    defaultValue="상암동 건물"
                    className="border border-gray-300 rounded px-2 py-1 w-32 text-right"
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">면적:</span>
                  <input
                    type="text"
                    defaultValue="350㎡"
                    className="border border-gray-300 rounded px-2 py-1 w-32 text-right"
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">용도:</span>
                  <input
                    type="text"
                    defaultValue="근린생활시설"
                    className="border border-gray-300 rounded px-2 py-1 w-32 text-right"
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">준공:</span>
                  <input
                    type="text"
                    defaultValue="2015년"
                    className="border border-gray-300 rounded px-2 py-1 w-32 text-right"
                  />
                </div>
              </div>
            </div>

            {/* 중앙 하단 - GPT 요약문 */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">중앙 하단 - GPT 요약문</p>
              <textarea
                className="w-full h-32 border border-gray-300 rounded p-2 text-sm"
                placeholder="매물 요약문을 입력하세요..."
                defaultValue="강남 핵심 상권 위치한 프리미엄 상업시설입니다. 대로변 접근성이 우수하며, 주변 유동인구가 많아 안정적인 임대 수익이 예상됩니다."
              />
              <button className="mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                GPT 요약 생성 (확장 기능)
              </button>
            </div>

            {/* 오른쪽 하단 - 시뮬레이션 2 */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-2">오른쪽 하단 - 시뮬레이션 2</p>
              <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <p className="text-4xl mb-2">💰</p>
                  <p className="text-xs">ROI 계산</p>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 액션 */}
          <div className="flex gap-3 pt-4 border-t">
            <button className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              미리보기
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              PDF 저장
            </button>
            <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              VIP 발송
            </button>
            <button
              onClick={onClose}
              className="ml-auto px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

