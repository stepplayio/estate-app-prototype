'use client';

import { properties } from '@/lib/mock-data';
import { useState } from 'react';

export default function ActivityAddPage() {
  const [selectedProperty, setSelectedProperty] = useState('');

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-900">활동 등록 (간편 입력)</h2>

      {/* Info 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl"></span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">활동 등록 (모바일 최적화)</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>목적:</strong> 현장에서 모바일 기기로 빠르게 활동 기록</li>
              <li><strong>활동 유형:</strong> 방문 / 통화 / 내방</li>
              <li><strong>빠른 입력:</strong> 필수 항목만 간편하게 입력 가능</li>
              <li><strong>구현 예정:</strong> 사진 업로드, 음성 녹음, 위치 자동 기록</li>
              <li><strong>조사표 기능:</strong> 현장 방문 시 엑셀 조사표 기반 상세 입력 폼 추가 예정 (Phase 2)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 활동 등록 폼 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              매물 선택 <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">매물을 선택하세요</option>
              {properties
                .filter((p) => p.status === 'pre-farming' || p.status === 'farming')
                .map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name} - {property.address}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              활동 유형 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'visit', label: '현장 방문', icon: '🚗' },
                { value: 'call', label: '전화 통화', icon: '📞' },
                { value: 'office_visit', label: '내방', icon: '🏢' },
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  className="p-4 border-2 border-gray-300 rounded hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
                >
                  <p className="text-3xl mb-1">{type.icon}</p>
                  <p className="text-sm font-medium text-gray-900">{type.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              활동 일자 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              활동 내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              placeholder="활동 내용을 입력하세요..."
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 구현 예정 기능 */}
          <div className="border-2 border-dashed border-gray-300 rounded p-4 bg-gray-50">
            <p className="text-sm font-medium text-gray-700 mb-3">추가 기능 (구현 예정)</p>
            <div className="space-y-2">
              <button
                disabled
                className="w-full px-4 py-2 bg-gray-200 text-gray-500 rounded cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>📷</span>
                <span>사진 업로드</span>
              </button>
              <button
                disabled
                className="w-full px-4 py-2 bg-gray-200 text-gray-500 rounded cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>🎤</span>
                <span>음성 녹음 (STT + GPT 요약)</span>
              </button>
              <button
                disabled
                className="w-full px-4 py-2 bg-gray-200 text-gray-500 rounded cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>📍</span>
                <span>현재 위치 자동 기록</span>
              </button>
              <button
                disabled
                className="w-full px-4 py-2 bg-gray-200 text-gray-500 rounded cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>📋</span>
                <span>조사표 작성 (엑셀 기반 상세 폼)</span>
              </button>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-3 pt-4">
            <button className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
              취소
            </button>
            <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
              활동 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

