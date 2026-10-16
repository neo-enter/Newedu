import React from 'react';
import { YearFinancials } from '../types/finance';
import { 
  Wallet, 
  TrendingUp, 
  Clock, 
  PiggyBank, 
  Sparkles,
  Award,
  Layers
} from 'lucide-react';

interface ExecutiveSummaryProps {
  financials: YearFinancials[];
  bepData: {
    fixedCost: number;
    offlineCM: number;
    onlineCM: number;
    onlineRetainedCM: number;
    y2TotalCM: number;
    y2OperatingProfit: number;
    investorDividendPerTrainee: number;
  };
  initialCapital: number;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  financials,
  bepData,
  initialCapital,
}) => {
  const y5 = financials[4] || financials[financials.length - 1];

  const cumulativeOpProfit = financials.reduce((acc, curr) => acc + curr.operatingProfit, 0);
  const cumulativeDividends = financials.reduce((acc, curr) => acc + curr.totalInvestorDividend, 0);
  const finalCash = y5.closingCashBalance;
  const capitalRetentionRate = (finalCash / initialCapital) * 100;

  const formatEok = (num: number) => {
    const abs = Math.abs(num);
    const sign = num < 0 ? '△ ' : '';
    const eok = Math.floor(abs / 100_000_000);
    const man = Math.round((abs % 100_000_000) / 10_000);
    if (eok > 0 && man > 0) return `${sign}${eok}억 ${man.toLocaleString()}만원`;
    if (eok > 0) return `${sign}${eok}억원`;
    return `${sign}${man.toLocaleString()}만원`;
  };

  return (
    <div className="space-y-4">
      {/* Top 5 KPI Cards in Bright Clean Styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: 초기 자본금 */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span className="font-semibold text-slate-600">초기 납입자본금</span>
            <Wallet className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">
            {formatEok(initialCapital)}
          </div>
          <div className="mt-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium inline-block border border-emerald-200/60">
            평생교육법 36조(3억) 충족
          </div>
        </div>

        {/* Card 2: 5개년 누적 투자자 배당 총액 */}
        <div className="bg-white border border-amber-300 rounded-xl p-4 shadow-xs bg-amber-50/20">
          <div className="flex items-center justify-between text-amber-800 text-xs mb-1">
            <span className="font-bold text-amber-900">5개년 누적 투자자 배당</span>
            <PiggyBank className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-bold text-amber-700 font-mono">
            {formatEok(cumulativeDividends)}
          </div>
          <div className="mt-1.5 text-[11px] text-amber-800 font-semibold">
            원금 3억 대비 <span className="underline font-bold">{(cumulativeDividends / initialCapital * 100).toFixed(0)}% 배당 회수!</span>
          </div>
        </div>

        {/* Card 3: 5차년도 기말 자본금 잔액 */}
        <div className="bg-white border border-emerald-300 rounded-xl p-4 shadow-xs bg-emerald-50/20">
          <div className="flex items-center justify-between text-emerald-800 text-xs mb-1">
            <span className="font-bold text-emerald-900">5차년 기말 자본금 잔액</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-emerald-800 font-mono">
            {formatEok(finalCash)}
          </div>
          <div className="mt-1.5 text-[11px] text-emerald-700 font-semibold">
            배당 후에도 자본 <span className="font-bold">{capitalRetentionRate.toFixed(1)}%</span> 안전 보존
          </div>
        </div>

        {/* Card 4: 5차년도 연간 영업이익 */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span className="font-semibold text-slate-600">5차년도 영업이익</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-bold font-mono text-blue-700">
            +{formatEok(y5.operatingProfit)}
          </div>
          <div className="mt-1.5 text-[11px] text-slate-500 font-medium">
            이익률 <span className="font-bold text-blue-700">{y5.operatingMarginPct.toFixed(1)}%</span> (누적 4개 과정)
          </div>
        </div>

        {/* Card 5: 5개년 누적 영업손익 */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span className="font-semibold text-slate-600">5개년 누적 영업손익</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold font-mono text-emerald-700">
            +{formatEok(cumulativeOpProfit)}
          </div>
          <div className="mt-1.5 text-[11px] text-slate-500">
            초기 결손 전액 상각 및 회수 완료
          </div>
        </div>
      </div>

      {/* CFO Key Diagnostic Callout */}
      <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0 mt-0.5 shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span>CFO 정밀 진단: [사무실 개설 3천만 + 4인 조직 확충 + 4대보험 정산 + 투자자 6.25억 배당 종합 평가]</span>
            </h3>
            <p className="text-slate-700 leading-relaxed text-xs">
              1. <strong>초기 사무실 시설투자 및 운영비 현실화:</strong> 1차년도 사무실 임차보증금(1,000만 원, 자산)과 집기·비품(2,000만 원, 5년 상각) 총 3,000만 원, 전담관리자 법인카드 월 70만 원 한도(유류비·식대·접대비, 연 840만 원), 사무용품비(월 5만 원, 연 60만 원)를 전액 반영하여 실무 현장과 100% 일치시켰습니다.<br />
              2. <strong>4인 전문 조직 확충 및 임금 인상 반영:</strong> 2차년도 평생교육사(월 300만 원) 및 일반직원 1명(월 270만 원) 채용, 3차년도 일반직원 1명 추가(월 270만 원)와 3년간 매년 5% 임금 인상률, <strong>4대 보험 사측 부담금(9.5% 정산)</strong>을 전액 계상했습니다.<br />
              3. <strong>투자자 배당 6.25억 전액 환원 및 자본금 1.58억 견고한 방어:</strong> 초기 시설비 3,000만 원과 4인 인건비, 그리고 <strong>5년간 총 6억 2,500만 원(원금 대비 208.3%)의 투자자 배당</strong>을 전액 지출하고도, 온라인 수강료(60,000원)의 고마진(인당 33,000원 유보)에 힘입어 <strong>3차년도 저점(7,589만 원) 통과 후 5차년도 말 1억 5,786만 원(보존율 52.6% + 보증금 1천만 원 자산 보유)</strong>으로 유동성이 강력히 반등합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
