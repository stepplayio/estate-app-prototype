'use client';

import { approvals } from '@/lib/mock-data';
import { useAuthStore } from '@/lib/store';
import { useState } from 'react';

export default function RegisterPage() {
  const user = useAuthStore((state) => state.user);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredApprovals = approvals.filter((a) => {
    return statusFilter === 'all' || a.status === statusFilter;
  });

  const canApprove = user?.role === 'leader' || user?.role === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">매물 등록 (Register)</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + 매물 등록
        </button>
      </div>

      {/* Info 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl"></span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">
              매물 등록(Register) ★중요★
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                <strong>목적:</strong> 3단계 데이터를 검증하여 품질이 담보된 매물만 공식 등록
              </li>
              <li>
                <strong>핵심:</strong> 다단계 결재 워크플로우 (에이전트 → 팀장 → 경영진)
              </li>
              <li>
                <strong>품질 점수:</strong> 70점 이상 통과 (데이터 완성도 자동 계산)
              </li>
              <li>
                <strong>다음 단계:</strong> 승인 완료 시 마케팅(5단계)으로 자동 전환
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex gap-2">
        <span className="text-sm font-medium text-gray-700 flex items-center">상태:</span>
        {[
          { value: 'all', label: '전체' },
          { value: 'pending', label: '결재 대기' },
          { value: 'approved', label: '승인 완료' },
          { value: 'rejected', label: '반려' },
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

      {/* 결재 목록 */}
      <div className="grid grid-cols-1 gap-6">
        {filteredApprovals.map((approval) => (
          <div
            key={approval.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  매물 ID: {approval.propertyId}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  요청자: {approval.requesterName} | 요청일: {approval.requestedAt}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  approval.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : approval.status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {approval.status === 'approved'
                  ? '승인 완료'
                  : approval.status === 'rejected'
                  ? '반려'
                  : '결재 대기'}
              </span>
            </div>

            {/* 품질 점수 */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">품질 점수</p>
                <p
                  className={`text-sm font-semibold ${
                    approval.qualityScore >= 70 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {approval.qualityScore}점 {approval.qualityScore >= 70 ? '(통과)' : '(미달)'}
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    approval.qualityScore >= 70 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${approval.qualityScore}%` }}
                />
              </div>
            </div>

            {/* 결재 단계 */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-3">결재 진행 단계</p>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div
                    className={`p-3 rounded text-center ${
                      approval.stage === 'team_leader' || approval.stage === 'executive'
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-blue-100 border-2 border-blue-500'
                    }`}
                  >
                    <p className="text-xs font-medium text-gray-600">1단계</p>
                    <p className="text-sm font-semibold text-gray-900">에이전트</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {approval.stage === 'requester' ? '진행 중' : '✅ 완료'}
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
                <div className="flex-1">
                  <div
                    className={`p-3 rounded text-center ${
                      approval.stage === 'team_leader'
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : approval.stage === 'executive'
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-gray-100 border border-gray-300'
                    }`}
                  >
                    <p className="text-xs font-medium text-gray-600">2단계</p>
                    <p className="text-sm font-semibold text-gray-900">팀장</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {approval.stage === 'team_leader'
                        ? '진행 중'
                        : approval.stage === 'executive'
                        ? '✅ 완료'
                        : '대기'}
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
                <div className="flex-1">
                  <div
                    className={`p-3 rounded text-center ${
                      approval.stage === 'executive'
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : approval.status === 'approved'
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-gray-100 border border-gray-300'
                    }`}
                  >
                    <p className="text-xs font-medium text-gray-600">3단계</p>
                    <p className="text-sm font-semibold text-gray-900">경영진</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {approval.status === 'approved'
                        ? '✅ 완료'
                        : approval.stage === 'executive'
                        ? '진행 중'
                        : '대기'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 코멘트 */}
            {approval.comment && (
              <div className="mb-4 p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-700">
                  <strong>코멘트:</strong> {approval.comment}
                </p>
              </div>
            )}

            {/* 액션 버튼 */}
            {canApprove && approval.status === 'pending' && (
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  승인
                </button>
                <button className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                  보완 요청
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  반려
                </button>
              </div>
            )}

            {approval.status === 'approved' && (
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                5단계 전환 (마케팅)
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">총 등록 건수</h3>
          <p className="text-3xl font-bold text-gray-900">{approvals.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">결재 대기</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {approvals.filter((a) => a.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">승인 완료</h3>
          <p className="text-3xl font-bold text-green-600">
            {approvals.filter((a) => a.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">평균 품질 점수</h3>
          <p className="text-3xl font-bold text-blue-600">
            {(
              approvals.reduce((sum, a) => sum + a.qualityScore, 0) / approvals.length
            ).toFixed(0)}
          </p>
        </div>
      </div>

      {/* 권한 안내 */}
      {!canApprove && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            💡 <strong>안내:</strong> 결재 승인은 팀장/관리자만 가능합니다.
          </p>
        </div>
      )}
    </div>
  );
}

