'use client';

import { properties } from '@/lib/mock-data';
import { useState } from 'react';

export default function PropertiesPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredProperties = properties.filter((p) => {
    const statusMatch = statusFilter === 'all' || p.status === statusFilter;
    const sourceMatch = sourceFilter === 'all' || p.dataSource === sourceFilter;
    const regionMatch =
      regionFilter === 'all' || p.address.includes(regionFilter);
    return statusMatch && sourceMatch && regionMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">잠재매물 관리</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + 수동 입력
          </button>
          <button
            onClick={() => alert('엑셀 업로드 (구현 예정)\n\n고정 포맷 필요:\n- 매물명, 주소, 종류, 면적, 가격\n- 템플릿 다운로드 기능 제공')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            📊 엑셀 업로드
          </button>
        </div>
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

      {/* 뷰 전환 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('map')}
          className={`px-4 py-2 rounded text-sm font-medium ${
            viewMode === 'map'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          🗺️ 지도 뷰
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 rounded text-sm font-medium ${
            viewMode === 'list'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          📋 리스트 뷰
        </button>
      </div>

      {/* 필터 */}
      <div className="space-y-3">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex gap-2">
            <span className="text-sm font-medium text-gray-700 flex items-center">지역:</span>
            {[
              { value: 'all', label: '전체' },
              { value: '강남구', label: '강남구' },
              { value: '서초구', label: '서초구' },
              { value: '송파구', label: '송파구' },
              { value: '마포구', label: '마포구' },
              { value: '용산구', label: '용산구' },
              { value: '종로구', label: '종로구' },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setRegionFilter(item.value)}
                className={`px-3 py-1.5 rounded text-sm ${
                  regionFilter === item.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 items-center flex-wrap">
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
            { value: 'manual', label: '수동 업로드' },
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

        {/* 추가 필터 (구현 예정) */}
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-500">추가 필터 (구현 예정):</span>
          <div className="flex gap-2">
            {['가격대', '면적', 'Signal 점수', '등록일'].map((filter) => (
              <button
                key={filter}
                disabled
                className="px-3 py-1.5 rounded text-sm bg-gray-100 text-gray-400 border border-dashed border-gray-300 cursor-not-allowed"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 지도 뷰 */}
      {viewMode === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 지도 영역 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="aspect-video bg-gray-100 rounded flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <p className="text-6xl mb-4">🗺️</p>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  지도 뷰 (구현 예정)
                </p>
                <p className="text-sm text-gray-500">
                  Kakao Map API 연동
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  매물 위치를 지도에 마커로 표시
                </p>
              </div>
            </div>
            
            {/* 지도 범례 */}
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <p className="text-xs font-medium text-gray-700 mb-2">범례</p>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="text-gray-600">Pre-Farming</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-600">Farming</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-600">등록 승인</span>
                </div>
              </div>
            </div>
          </div>

          {/* 매물 목록 (카드형) */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    {property.name}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
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
                </div>

                <p className="text-sm text-gray-600 mb-3">{property.address}</p>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-500">종류:</span>{' '}
                    <span className="font-medium text-gray-900">{property.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">면적:</span>{' '}
                    <span className="font-medium text-gray-900">{property.area}㎡</span>
                  </div>
                  <div>
                    <span className="text-gray-500">가격:</span>{' '}
                    <span className="font-medium text-gray-900">
                      {(property.price / 100000000).toFixed(1)}억원
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">출처:</span>{' '}
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded ${
                        property.dataSource === 'molit_api'
                          ? 'bg-green-100 text-green-800'
                          : property.dataSource === 'naver_crawling'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {property.dataSource === 'molit_api'
                        ? '국토부'
                        : property.dataSource === 'naver_crawling'
                        ? '네이버'
                        : '수동'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Signal:</span>
                    {property.signalScore > 0 ? (
                      <>
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
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
                        <span className="text-sm font-semibold text-gray-900">
                          {property.signalScore}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400">미계산</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{property.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 리스트 뷰 (기존 테이블) */}
      {viewMode === 'list' && (
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
                        : property.dataSource === 'naver_crawling'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {property.dataSource === 'molit_api'
                      ? '국토부 API'
                      : property.dataSource === 'naver_crawling'
                      ? '네이버 크롤링'
                      : '수동 업로드'}
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
      )}

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
            {(() => {
              const validProperties = properties.filter(
                (p) => p.publicLandPrice > 0 && p.realTransactionPrice > 0
              );
              if (validProperties.length === 0) return '-';
              const avg =
                validProperties.reduce(
                  (sum, p) => sum + p.realTransactionPrice / p.publicLandPrice,
                  0
                ) / validProperties.length;
              return avg.toFixed(2);
            })()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">총 매물 수</h3>
          <p className="text-3xl font-bold text-gray-900">{properties.length}</p>
        </div>
      </div>

      {/* 수동 입력 모달 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">잠재매물 수동 입력</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    매물명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="예: 강남구 역삼동 상가"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    주소 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="예: 서울시 강남구 역삼동 123-45"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      종류 <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>상가</option>
                      <option>오피스텔</option>
                      <option>건물</option>
                      <option>근린상가</option>
                      <option>기타</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      면적 (㎡) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="예: 120"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    가격 (원) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="예: 1500000000"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    메모
                  </label>
                  <textarea
                    rows={3}
                    placeholder="추가 정보를 입력하세요..."
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>안내:</strong> 수동 업로드된 매물은 Signal 점수가 자동 계산되지 않습니다. 
                    필요 시 관리자가 수동으로 점수를 입력할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  취소
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  업로드
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

