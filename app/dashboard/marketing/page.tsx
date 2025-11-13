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
          {/* 헤더: 매물명 + 매매금액 */}
          <div className="mb-6 pb-4 border-b-2 border-red-600 bg-red-50 p-4 rounded">
            <div className="flex items-center justify-between">
              <input
                type="text"
                defaultValue="가평 그라데 호텔 매매"
                className="text-xl font-bold border-b-2 border-gray-300 px-2 py-1 flex-1 mr-4"
                placeholder="매물명"
              />
              <div className="text-right">
                <p className="text-sm text-gray-600">매매금액</p>
                <input
                  type="text"
                  defaultValue="31억원"
                  className="text-2xl font-bold text-red-600 border-b-2 border-gray-300 px-2 py-1 w-32 text-right"
                />
              </div>
            </div>
          </div>

          {/* 2단 레이아웃 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* 왼쪽: PROPERTY INFORMATION */}
            <div className="space-y-4">
              {/* 매물 사진 */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                <p className="text-sm font-bold text-gray-700 mb-2">PROPERTY INFORMATION</p>
                <div className="aspect-video bg-gray-200 rounded flex items-center justify-center text-gray-400 mb-3">
                  <div className="text-center">
                    <p className="text-4xl mb-2">📷</p>
                    <p className="text-xs">사진 첨부 (사용자 업로드)</p>
                  </div>
                </div>
                
                {/* 자동 생성 테이블 */}
                <div className="bg-blue-50 border border-blue-200 rounded p-2">
                  <p className="text-xs font-semibold text-blue-900 mb-2">아래 테이블: 자동 생성</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-600">위치:</span>
                      <span className="font-medium">강남구 조선일보 1297-1</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-600">대지면적:</span>
                      <span className="font-medium">2,319㎡ (701평)</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-600">건축면적:</span>
                      <span className="font-medium">312.92㎡ (94평)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">용도지역:</span>
                      <span className="font-medium">자연공간지역</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* LOCATION */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                <p className="text-sm font-bold text-gray-700 mb-2">LOCATION</p>
                <div className="aspect-video bg-gray-200 rounded flex items-center justify-center text-gray-400 mb-3">
                  <div className="text-center">
                    <p className="text-4xl mb-2">🗺️</p>
                    <p className="text-xs">지도 캡처 (사용자 첨부)</p>
                  </div>
                </div>
                
                {/* 입지 특성 (사용자 복붙) */}
                <div>
                  <p className="text-xs font-semibold text-gray-700 mb-1">입지 특성 (사용자 복붙)</p>
                  <textarea
                    className="w-full h-20 border border-gray-300 rounded p-2 text-xs"
                    placeholder="입지 특성을 붙여넣기 하세요..."
                    defaultValue="인지특성: 가맹점성 인근 위치, 주변 골프장 및 관광지를 기반으로 20-40대 여행객과 골프 이용객 등 특화된 수요층 확보."
                  />
                </div>
              </div>
            </div>

            {/* 오른쪽: 수익률 + 예상 월매출 */}
            <div className="space-y-4">
              {/* 수익률 (프로그램 계산) */}
              <div className="border-2 border-blue-500 rounded-lg p-4">
                <p className="text-sm font-bold text-blue-900 mb-2">수익률 (자동 계산)</p>
                <div className="bg-blue-50 p-2 rounded mb-2">
                  <p className="text-xs text-blue-800">
                    ✅ 프로그램이 자동 계산하여 생성
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="border p-1"></th>
                        <th className="border p-1">직영수익률</th>
                        <th className="border p-1">투자수익률</th>
                        <th className="border p-1">임차인수익률</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr>
                        <td className="border p-1 bg-gray-100 text-xs">연평균 매출</td>
                        <td className="border p-1 text-right">660</td>
                        <td className="border p-1 text-right">209</td>
                        <td className="border p-1 text-right">660</td>
                      </tr>
                      <tr>
                        <td className="border p-1 bg-gray-100 text-xs">Cap rate</td>
                        <td className="border p-1 text-right font-semibold">11.71%</td>
                        <td className="border p-1 text-right font-semibold">6.75%</td>
                        <td className="border p-1 text-right font-semibold">4.95%</td>
                      </tr>
                      <tr>
                        <td className="border p-1 bg-gray-100 text-xs">ROE</td>
                        <td className="border p-1 text-right font-semibold text-blue-600">15.34%</td>
                        <td className="border p-1 text-right font-semibold text-blue-600">11.46%</td>
                        <td className="border p-1 text-right font-semibold text-blue-600">36.68%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 예상 월매출 (프로그램 계산) */}
              <div className="border-2 border-blue-500 rounded-lg p-4">
                <p className="text-sm font-bold text-blue-900 mb-2">예상 월매출 (자동 계산)</p>
                <div className="bg-blue-50 p-2 rounded mb-2">
                  <p className="text-xs text-blue-800">
                    ✅ 프로그램이 자동 계산하여 생성
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="border p-1">구분</th>
                        <th className="border p-1">평일</th>
                        <th className="border p-1">DAY</th>
                        <th className="border p-1">ADR</th>
                        <th className="border p-1">OCC</th>
                        <th className="border p-1">계</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr>
                        <td className="border p-1">숙박</td>
                        <td className="border p-1 text-center">22</td>
                        <td className="border p-1 text-right">65,000</td>
                        <td className="border p-1 text-right">50%</td>
                        <td className="border p-1 text-right">64,445</td>
                      </tr>
                      <tr>
                        <td className="border p-1">주말</td>
                        <td className="border p-1 text-center">8</td>
                        <td className="border p-1 text-right">115,000</td>
                        <td className="border p-1 text-right">90%</td>
                        <td className="border p-1 text-right">19,044</td>
                      </tr>
                      <tr>
                        <td className="border p-1 bg-blue-50 font-semibold">합계</td>
                        <td className="border p-1"></td>
                        <td className="border p-1"></td>
                        <td className="border p-1 text-right font-semibold">78.7%</td>
                        <td className="border p-1 text-right font-semibold text-blue-600">39,951</td>
                      </tr>
                    </tbody>
                  </table>
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

