import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Server, 
  Building, 
  Clock,
  Award
} from 'lucide-react';

export const AdministrativeRoadmap: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            『평생교육법』 기반 인허가 행정 요건 및 5개년 마일스톤 로드맵
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          평생교육법 제36조(지식인력개발사업 관련 평생교육시설) 및 제33조(원격교육 형태의 평생교육시설) 기반 5개년 행정 스케줄
        </p>
      </div>

      {/* Two Facility Types Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: 지식인력개발사업 관련 평생교육시설 */}
        <div className="bg-white border border-blue-200 rounded-xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                1단계: 지식인력개발 평생교육시설
              </h3>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              평생교육법 제36조
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">자본금 또는 자산 3억 원 이상 (법정 요건 충족)</strong>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  법인등기부등본상 자본금 3억 원으로 법정 요건 100% 충족. 5개년 동안 자본금 잔액이 최저 1.88억 원 이상 안전하게 유지되어 결격 사유 없음.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">전담 관리자 1명 상근 배치</strong>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  지식인력개발사업 전담 상근 관리자 1명(월 300만원, 4대보험 취득) 배치 신고 완료.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">평생교육사 1명 법정 필수 배치 (2차년도, 월 300만 원)</strong>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  2차년도 신고 시점에 평생교육사 1명(월 300만 원으로 상향 + 식대보조 20만원 + 4대보험) 상근 배치 신고 완료.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">일반 행정·운영 직원 2명 단계적 확충 (총 4인 조직화)</strong>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  2차년도 일반직원 1명(월 270만) + 3차년도 일반직원 1명(월 270만) 추가 채용 및 매년 5% 임금 인상, 4대 보험 전원 가입으로 교육청 실사 및 인허가 기준 완벽 통과.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: 원격교육 형태의 평생교육시설 */}
        <div className="bg-white border border-emerald-200 rounded-xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                2단계: 원격교육 평생교육시설 (3차년도 추가)
              </h3>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              평생교육법 제33조
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">원격교육 설비 (LMS 및 대용량 웹서버)</strong>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  1차년도에 구축 완료한 LMS 솔루션 및 서버 인프라를 증빙하여 원격교육시설 인허가 즉시 획득.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">매년 30시간 이상 신규 콘텐츠 탑재</strong>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  매년 2,000만 원 R&D 투자로 30시간 이상 정규 교육과정을 1개씩 추가 개발하여 라이브러리 확장.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">학습비 반환 보증보험 가입</strong>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  평생교육법 시행령 [별표 3]에 따른 수강료 반환규정 제정 및 배상책임보험/학습비 반환보증보험 유지.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Year Administrative Timeline */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-600" />
          <span>5개년 연차별 행정 절차 및 사업 고도화 마일스톤</span>
        </h3>

        <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 pl-6 text-xs sm:text-sm">
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-xs" />
            <div className="font-bold text-blue-700 text-xs">1차년도: 법인 설립 및 1차 과정 R&D (공단 지원금 개시)</div>
            <p className="text-slate-600 text-xs mt-0.5">
              자본금 3억 원 법인 설립 등기, 전담관리자 1명 채용, 1차 30시간 콘텐츠 개발(2,000만 원), LMS 서버 구축(1,500만 원), 공단 지원금 5,000명(1.5억 원) 수령 개시.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-xs" />
            <div className="font-bold text-amber-700 text-xs">2차년도: 지식인력개발시설 신고 및 1개 과정 서비스 (적자 66% 축소)</div>
            <p className="text-slate-600 text-xs mt-0.5">
              관할 교육지원청 평생교육시설 정식 신고, 평생교육사 1명 필수 채용, 1차 콘텐츠 온라인 2,000명(6,000만 원) 론칭, 2번째 콘텐츠 개발(2,000만 원) 착수.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow-xs" />
            <div className="font-bold text-emerald-700 text-xs">3차년도: 원격평생교육시설 승인 및 2개 과정 누적 (완전 흑자 전환)</div>
            <p className="text-slate-600 text-xs mt-0.5">
              원격교육 평생교육시설 추가 신고 수리, 온라인 2개 과정 누적 4,000명(1.2억 원) 수료, 3번째 콘텐츠 개발(2,000만 원), 영업이익 +3,273만 원 및 현금 순유입 반등.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow-xs" />
            <div className="font-bold text-indigo-700 text-xs">4차년도: 원격센터 안정화 및 3개 과정 누적 (영업이익 8,773만 원)</div>
            <p className="text-slate-600 text-xs mt-0.5">
              전국 온라인 수강생 6,000명(1.8억 원) 유치, 4번째 콘텐츠 개발(2,000만 원), 총 수강생 11,000명 달성, 자본금 잔액 2억 5,817만 원으로 회복.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow-xs" />
            <div className="font-bold text-emerald-800 text-xs flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>5차년도: 플랫폼 완성기 (영업이익 1.42억 및 자본금 잔액 3.76억 돌파)</span>
            </div>
            <p className="text-slate-600 text-xs mt-0.5">
              온라인 4개 과정 누적 8,000명(2.4억 원) 유치, 연간 총매출 3억 9,000만 원 달성, 영업이익 1억 4,273만 원 돌파, 5개년 누적 배당 1.25억 원 전액 지급 완료 후 자본금 잔액 3억 7,590만 원 원금 초과 달성.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
