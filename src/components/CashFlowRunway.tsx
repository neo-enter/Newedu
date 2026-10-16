import React from 'react';
import { YearFinancials } from '../types/finance';
import { 
  Coins, 
  ArrowDownRight, 
  ArrowUpRight, 
  Layers, 
  Calendar, 
  PiggyBank, 
  Sparkles,
  Wallet,
  Award
} from 'lucide-react';

interface CashFlowRunwayProps {
  financials: YearFinancials[];
  initialCapital: number;
}

export const CashFlowRunway: React.FC<CashFlowRunwayProps> = ({
  financials,
  initialCapital,
}) => {
  const y5 = financials[4] || financials[financials.length - 1];

  const formatKRW = (num: number) => {
    const isNegative = num < 0;
    const abs = Math.abs(num);
    const absStr = abs.toLocaleString('ko-KR');
    return isNegative ? `△ ${absStr}원` : `${absStr}원`;
  };

  const formatEok = (num: number) => {
    const abs = Math.abs(num);
    const sign = num < 0 ? '△ ' : '';
    const eok = Math.floor(abs / 100_000_000);
    const man = Math.round((abs % 100_000_000) / 10_000);
    if (eok > 0 && man > 0) return `${sign}${eok}억 ${man.toLocaleString()}만원`;
    if (eok > 0) return `${sign}${eok}억원`;
    return `${sign}${man.toLocaleString()}만원`;
  };

  const cashPoints = [
    { label: '설립 시점 (초기 자본금)', amount: initialCapital, pct: 100, year: 0 },
    ...financials.map(f => ({
      label: `${f.year}차년도 기말`,
      amount: f.closingCashBalance,
      pct: (f.closingCashBalance / initialCapital) * 100,
      year: f.year
    }))
  ];

  const maxVal = Math.max(initialCapital, y5.closingCashBalance) * 1.15;
  const cumulativeDividends = financials.reduce((acc, curr) => acc + curr.totalInvestorDividend, 0);

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-500" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                자본금 3억 원 기준 5개년 연차별 자금수지 및 자본금 잔액 추이
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              4인 전문 인력 확충 및 4대 보험 정산, 5년간 총 6억 2,500만 원의 투자자 배당을 전액 지급하면서도, 3차년도 저점(1.04억 원)을 통과하여 5차년도에 자본금 잔액 1억 8,486만 원을 안정적으로 보존합니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-lg bg-amber-50 border border-amber-200 text-right">
              <div className="text-[11px] text-amber-800 font-medium">5개년 누적 투자자 배당</div>
              <div className="text-base font-bold font-mono text-amber-700">
                {formatEok(cumulativeDividends)}
              </div>
            </div>
            <div className="px-3.5 py-2 rounded-lg bg-emerald-50 border border-emerald-300 text-right">
              <div className="text-[11px] text-emerald-800 font-bold">5차년 기말 자본금 잔액</div>
              <div className="text-base font-bold font-mono text-emerald-700">
                {formatEok(y5.closingCashBalance)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Runway Progress & Bar Chart */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
        <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>5개년 자본금 잔액 추이 (Capital Balance Trajectory)</span>
          </span>
          <span className="text-xs text-slate-500 font-normal">
            기초 납입자본금: 300,000,000원 (100%)
          </span>
        </h3>

        {/* Step-by-Step Step Cards (6 cards: Initial + 5 Years) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {cashPoints.map((pt, idx) => {
            const isFirst = idx === 0;
            const diffFromPrev = isFirst ? 0 : pt.amount - cashPoints[idx - 1].amount;
            const isOverInitial = pt.amount >= initialCapital;
            return (
              <div 
                key={idx}
                className={`p-3 rounded-lg border flex flex-col justify-between relative overflow-hidden transition-all ${
                  isOverInitial ? 'bg-emerald-50/40 border-emerald-300' : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="font-bold text-slate-800 text-[11px] truncate">{pt.label}</span>
                  <span className="text-[10px] px-1 py-0.2 rounded bg-white text-slate-600 border border-slate-200">
                    Y{pt.year}
                  </span>
                </div>

                <div className={`text-base font-bold font-mono ${isOverInitial ? 'text-emerald-700' : 'text-slate-900'}`}>
                  {formatEok(pt.amount)}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  ({pt.amount.toLocaleString()}원)
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">자본 보존율</span>
                  <span className={`font-bold ${isOverInitial ? 'text-emerald-700' : pt.pct < 60 ? 'text-amber-600' : 'text-slate-800'}`}>
                    {pt.pct.toFixed(1)}%
                  </span>
                </div>

                {!isFirst && (
                  <div className="mt-0.5 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">당기 변동</span>
                    <span className={`font-semibold flex items-center gap-0.5 ${diffFromPrev >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {diffFromPrev >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {diffFromPrev >= 0 ? `+${formatEok(diffFromPrev)}` : formatEok(diffFromPrev)}
                    </span>
                  </div>
                )}

                {/* Progress bar */}
                <div className="mt-2 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      isOverInitial ? 'bg-emerald-600' : pt.pct < 65 ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(0, (pt.amount / maxVal) * 100))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Bar Chart (5 Years) */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
          <div className="h-44 w-full flex items-end justify-between gap-3 px-2 sm:px-6 pb-2">
            {cashPoints.map((pt, idx) => {
              const heightPct = Math.max(16, (pt.amount / maxVal) * 100);
              const isOver = pt.amount >= initialCapital;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className={`text-[10px] sm:text-[11px] font-mono font-bold ${isOver ? 'text-emerald-700' : 'text-slate-800'}`}>
                    {formatEok(pt.amount)}
                  </span>
                  <div 
                    className={`w-full max-w-[56px] rounded-t-lg transition-all duration-500 shadow-xs ${
                      idx === 0 
                        ? 'bg-blue-600' 
                        : isOver 
                          ? 'bg-emerald-600' 
                          : pt.amount < 190_000_000 
                            ? 'bg-amber-500' 
                            : 'bg-indigo-600'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[10px] sm:text-[11px] text-slate-600 text-center font-medium">
                    {idx === 0 ? '설립' : `${idx}차년`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cash Flow Statement Table (5 Years) */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>[5개년 자금수지표 및 자본금 잔액 명세표] (5-Year Cash Flow & Capital Statement)</span>
          </h3>
          <p className="text-xs text-slate-500">
            실제 현금 유입(매출)과 유출(원가+판관비+매년 콘텐츠 R&D 2천만+투자자 배당) 및 연차별 기말 자본금 잔액
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 text-xs font-bold">
                <th className="py-3 px-3.5 w-1/4">자금 수지 항목 (Cash Flow Item)</th>
                {financials.map((f) => (
                  <th key={f.year} className="py-3 px-3 text-right">
                    <span className={f.year >= 3 ? 'text-emerald-700 font-bold' : ''}>
                      {f.label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs sm:text-sm">
              <tr className="bg-slate-50/60 font-bold text-slate-900">
                <td className="py-2.5 px-3.5">1. 기초 현금 잔액 (Beginning Balance)</td>
                {financials.map((f, idx) => (
                  <td key={f.year} className="py-2.5 px-3 text-right font-mono">
                    {formatKRW(idx === 0 ? initialCapital : financials[idx - 1].closingCashBalance)}
                  </td>
                ))}
              </tr>

              <tr className="font-bold text-emerald-700 bg-emerald-50/30">
                <td className="py-2.5 px-3.5">2. 자금 유입액 계 (Total Inflows)</td>
                {financials.map((f) => (
                  <td key={f.year} className="py-2.5 px-3 text-right font-mono font-bold">
                    {formatKRW(f.cashInflow)}
                  </td>
                ))}
              </tr>
              <tr className="text-xs text-slate-600">
                <td className="py-1 px-6 pl-8">· 오프라인 공단 지원금 (5,000명)</td>
                {financials.map((f) => (
                  <td key={f.year} className="py-1 px-3 text-right font-mono">{formatKRW(f.offlineRevenue)}</td>
                ))}
              </tr>
              <tr className="text-xs text-emerald-800 bg-emerald-50/50">
                <td className="py-1 px-6 pl-8 font-medium">· 온라인 콘텐츠 수강료 (과정당 2,000명 누적)</td>
                {financials.map((f) => (
                  <td key={f.year} className="py-1 px-3 text-right font-mono font-bold">
                    {formatKRW(f.contentRevenue)}
                  </td>
                ))}
              </tr>

              <tr className="font-bold text-rose-700 bg-rose-50/30">
                <td className="py-2.5 px-3.5">3. 자금 유출액 계 (Total Outflows)</td>
                {financials.map((f) => (
                  <td key={f.year} className="py-2.5 px-3 text-right font-mono font-bold">
                    {formatKRW(f.cashOutflow)}
                  </td>
                ))}
              </tr>
              <tr className="text-xs text-slate-600">
                <td className="py-1 px-6 pl-8">· 매출원가 (오프라인 50회 + 온라인 플랫폼)</td>
                {financials.map((f) => (
                  <td key={f.year} className="py-1 px-3 text-right font-mono">{formatKRW(f.totalCogs)}</td>
                ))}
              </tr>
              <tr className="text-xs text-slate-600">
                <td className="py-1 px-6 pl-8">· 인건비 및 4대보험 정산, 복리후생비</td>
                {financials.map((f) => (
                  <td key={f.year} className="py-1 px-3 text-right font-mono">
                    {formatKRW(f.totalLaborAndWelfareCost)}
                    <span className="block text-[10px] text-blue-600 font-normal">({f.staffCount}명 체제)</span>
                  </td>
                ))}
              </tr>
              <tr className="text-xs text-indigo-900 bg-indigo-50/50 font-medium">
                <td className="py-1 px-6 pl-8">· 콘텐츠 추가 개발비 (매년 2,000만 원 R&D)</td>
                {financials.map((f) => (
                  <td key={f.year} className="py-1 px-3 text-right font-mono font-bold text-indigo-700">
                    {formatKRW(f.annualContentDevCost)}
                  </td>
                ))}
              </tr>
              <tr className="text-xs text-slate-600">
                <td className="py-1 px-6 pl-8">· 서버 구축비 및 고정 운영비</td>
                {financials.map((f) => (
                  <td key={f.year} className="py-1 px-3 text-right font-mono">
                    {formatKRW(f.serverAndFixedCost + f.initialServerSetupCost)}
                  </td>
                ))}
              </tr>
              <tr className="text-xs bg-amber-50 font-bold text-amber-950">
                <td className="py-1.5 px-3.5 flex items-center gap-1">
                  <PiggyBank className="w-3.5 h-3.5 text-amber-700" />
                  <span>· 투자자 배당금 총액 (오프라인+온라인)</span>
                </td>
                {financials.map((f) => (
                  <td key={f.year} className="py-1.5 px-3 text-right font-mono font-bold text-amber-900">
                    {formatKRW(f.totalInvestorDividend)}
                  </td>
                ))}
              </tr>
              <tr className="text-[11px] text-slate-500 bg-amber-50/30">
                <td className="py-1 px-6 pl-8">└ 오프라인 행사 잉여금 50% 배당</td>
                {financials.map((f) => (
                  <td key={f.year} className="py-1 px-3 text-right font-mono">
                    {formatKRW(f.offlineInvestorDividend)}
                  </td>
                ))}
              </tr>
              <tr className="text-[11px] text-amber-800 bg-amber-50/30 font-medium">
                <td className="py-1 px-6 pl-8">└ 온라인 콘텐츠 배당 (인당 2.5만)</td>
                {financials.map((f) => (
                  <td key={f.year} className="py-1 px-3 text-right font-mono font-semibold">
                    {formatKRW(f.contentInvestorDividend)}
                  </td>
                ))}
              </tr>

              {/* 당기 순현금흐름 */}
              <tr className="bg-slate-100 font-bold border-t border-b border-slate-300">
                <td className="py-2.5 px-3.5 text-slate-900">4. 당기 순현금흐름 (Net Cash Flow)</td>
                {financials.map((f) => (
                  <td key={f.year} className={`py-2.5 px-3 text-right font-mono font-bold ${f.netCashFlow >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {f.netCashFlow >= 0 ? `+${formatKRW(f.netCashFlow)}` : formatKRW(f.netCashFlow)}
                  </td>
                ))}
              </tr>

              {/* 기말 자본금 잔액 핵심 행 */}
              <tr className="bg-emerald-50/80 font-bold text-emerald-950 border-b-2 border-emerald-400">
                <td className="py-3 px-3.5 flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-emerald-700" />
                  <span>5. 기말 자본금/현금 잔액 (Capital Balance)</span>
                </td>
                {financials.map((f) => (
                  <td key={f.year} className="py-3 px-3 text-right font-mono text-base font-bold text-emerald-900">
                    {formatKRW(f.closingCashBalance)}
                    <span className="block text-[10px] font-normal text-emerald-700">
                      (자본의 {(100 - f.capitalDepletionRate).toFixed(1)}%)
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* CFO Insight Box */}
        <div className="p-4 bg-emerald-50/70 border-t border-emerald-200 flex items-start gap-3">
          <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-950 space-y-1">
            <span className="font-bold">
              [CFO 5개년 유동성 및 자본금 잔액 총평: 4인 전문 조직 확충 속 6.25억 배당 및 1.85억 잔액 방어]
            </span>
            <p className="text-emerald-900 leading-relaxed text-xs">
              초기 자본금 3억 원은 평생교육사(300만) 및 일반직원 2명(270만 시작, 매년 5% 인상)의 인력 확충과 4대 보험 정산, 그리고 <strong>총 6억 2,500만 원의 투자자 배당</strong>을 전액 지출하는 강력한 확장 정책 속에서도, <strong>3차년도 말 1억 409만 원(보존율 34.7%)으로 저점을 완벽히 방어</strong>합니다.
              이후 4차년도부터 순현금 유입(+979만 원)으로 반등하여, <strong>5차년도 말에는 자본금 잔액 1억 8,486만 원(자본 보존율 61.6%)</strong>의 탄탄한 유동성을 유지하며 무차입 자생 경영을 실현합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
