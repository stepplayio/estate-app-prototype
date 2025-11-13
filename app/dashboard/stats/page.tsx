'use client';

export default function StatsPage() {
  const statsFeatures = [
    {
      id: 1,
      title: '전체 통계',
      icon: '📊',
      description: '단계별 진행 건수 및 전체 전환율, 월별 추이 그래프',
      features: [
        '단계별 진행 건수 (1~9단계)',
        '전체 전환율 (잠재매물 → 계약)',
        '총 매물/매수자 수',
        '월별 추이 그래프',
      ],
      priority: 'high',
    },
    {
      id: 2,
      title: '단계별 통계',
      icon: '📈',
      description: '각 단계별 상세 통계 및 분석',
      features: [
        '1단계: Signal 점수 분포, 데이터 출처별 현황',
        '2단계: 활동 건수, 활동 유형별 비율, 전환율',
        '4단계: 품질 점수 분포, 결재 소요 시간',
        '5단계: 마케팅 채널별 성과 (조회수, 클릭수)',
        '6단계: 매칭 정확도, 평균 매칭 점수',
        '7단계: 영업 전환율, 평균 영업 기간, 성사율',
      ],
      priority: 'high',
    },
    {
      id: 3,
      title: '담당자별 성과',
      icon: '👤',
      description: '에이전트/팀장별 활동 및 성과 분석',
      features: [
        '에이전트별 활동 건수',
        '에이전트별 전환율',
        '에이전트별 계약 건수',
        '에이전트별 평균 계약 금액',
        '성과 순위 (TOP 5)',
      ],
      priority: 'medium',
    },
    {
      id: 4,
      title: '매물별 분석',
      icon: '🏢',
      description: '매물별 마케팅 효과 및 거래 소요 기간 분석',
      features: [
        '매물별 마케팅 조회수/클릭수',
        '매물별 평균 거래 소요 기간',
        '지역별 성사율',
        '종류별 성사율',
      ],
      priority: 'low',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">통계 / 리포트</h2>

      {/* Info 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl"></span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">통계 / 리포트</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>목적:</strong> 9단계 프로세스 전체 현황 및 성과 분석</li>
              <li><strong>권한:</strong> 팀장/관리자만 접근 (에이전트는 본인 통계만 조회)</li>
              <li><strong>주요 지표:</strong> 전환율, 성사율, 평균 소요 기간, 담당자별 성과</li>
              <li>상세 통계 내용은 협의필요</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 기능 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statsFeatures.map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-lg shadow-lg p-6 border-2 border-dashed border-gray-300 relative"
          >
            {/* 구현 예정 뱃지 */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                구현 예정
              </span>
            </div>

            {/* 헤더 */}
            <div className="flex items-start gap-3 mb-4">
              <span className="text-4xl">{feature.icon}</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>

            {/* 우선순위 */}
            <div className="mb-4">
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  feature.priority === 'high'
                    ? 'bg-red-100 text-red-800'
                    : feature.priority === 'medium'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                우선순위:{' '}
                {feature.priority === 'high'
                  ? '높음'
                  : feature.priority === 'medium'
                  ? '중간'
                  : '낮음'}
              </span>
            </div>

            {/* 주요 기능 */}
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">주요 지표</p>
              <ul className="space-y-1">
                {feature.features.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">▪</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}

