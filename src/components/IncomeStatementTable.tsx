import React, { useState } from 'react';
import { YearFinancials } from '../types/finance';
import { Calculator, Info, ChevronDown, ChevronUp, Layers, Sparkles, Wallet, PiggyBank } from 'lucide-react';

interface IncomeStatementTableProps {
  financials: YearFinancials[];
}

export const IncomeStatementTable: React.FC<IncomeStatementTableProps> = ({
  financials,
}) => {
  const [showFormulas, setShowFormulas] = useState(true);

  const formatKRW = (num: number) => {
    if (num === 0) return '-';
    const isNegative = num < 0;
    const absStr = Math.abs(num).toLocaleString('ko-KR');
    return isNegative ? `△ ${absStr}원` : `${absStr}원`;
  };

  const formatPct = (pct: number) => {
    if (pct === 0) return '-';
    return `${pct.toFixed(1)}%`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header Bar */}
      <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>[5개년 추정 손익계산서 및 배당 명세표] (5-Year P&L & Dividend Statement)</span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shadow-2xs">
              온라인 수강료 6만 원 / 1인당 배당 2.5만 원 확정 모델
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            * 오프라인 배당(연 2,500만 원) + 온라인 콘텐츠 배당(수강생 × 25,000원) 분리 집계
          </p>
        </div>

        <button
          onClick={() => setShowFormulas(!showFormulas)}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white hover:bg-slate-50 text-blue-700 border border-slate-300 shadow-2xs transition"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>{showFormulas ? '산출 공식 숨기기' : '산출 공식 및 근거 보기'}</span>
          {showFormulas ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Main Financial Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse min-w-[950px]">
          <thead>
            <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 font-bold text-xs tracking-wider">
              <th className="py-3 px-3.5 w-[21%]">계정과목 (Account Title)</th>
              {showFormulas && <th className="py-3 px-2.5 text-slate-500 font-medium w-[17%]">산출 기준 및 공식</th>}
              {financials.map((f) => (
                <th key={f.year} className="py-3 px-2.5 text-right">
                  <div className={`font-bold ${f.year >= 2 ? 'text-emerald-700' : 'text-slate-800'}`}>
                    {f.label}
                  </div>
                  <div className="text-[10px] text-slate-500 font-normal">
                    {f.year === 1 ? '오프5천' : `온${(f.activeContentCount * 2000).toLocaleString()}+오프5천`}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
            {/* 누적 가동 콘텐츠 행 */}
            <tr className="bg-emerald-50/30">
              <td className="py-2 px-3.5 font-semibold text-emerald-950 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>누적 콘텐츠수 / 총 수강생</span>
              </td>
              {showFormulas && <td className="py-2 px-2.5 text-emerald-800 text-[11px]">오프라인 5,000명 + 과정당 2,000명</td>}
              {financials.map((f) => (
                <td key={f.year} className="py-2 px-2.5 text-right font-mono font-semibold text-emerald-900">
                  {f.activeContentCount}개 / {f.totalTraineeCount.toLocaleString()}명
                </td>
              ))}
            </tr>

            {/* I. 총매출액 */}
            <tr className="bg-slate-50/80 font-bold text-slate-900 border-t border-slate-200">
              <td className="py-2.5 px-3.5 flex items-center gap-1.5">
                <span className="text-blue-600">Ⅰ.</span>
                <span>총매출액 (Revenue)</span>
              </td>
              {showFormulas && (
                <td className="py-2.5 px-2.5 text-xs text-slate-500 font-normal">
                  오프라인 지원금 + 온라인 수강료(6만)
                </td>
              )}
              {financials.map((f) => (
                <td key={f.year} className={`py-2.5 px-2.5 text-right font-mono font-bold ${f.year >= 2 ? 'text-emerald-700' : 'text-slate-900'}`}>
                  {formatKRW(f.totalRevenue)}
                </td>
              ))}
            </tr>

            <tr className="text-slate-600">
              <td className="py-1.5 px-6 pl-8">1. 오프라인 공단 지원금</td>
              {showFormulas && <td className="py-1.5 px-2.5 text-slate-500">5,000명 × 30,000원 (50회)</td>}
              {financials.map((f) => (
                <td key={f.year} className="py-1.5 px-2.5 text-right font-mono">{formatKRW(f.offlineRevenue)}</td>
              ))}
            </tr>

            <tr className="text-emerald-900 bg-emerald-50/50">
              <td className="py-1.5 px-6 pl-8 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>2. 온라인 콘텐츠 수강 매출</span>
              </td>
              {showFormulas && <td className="py-1.5 px-2.5 text-emerald-700">과정수 × 2,000명 × 60,000원</td>}
              {financials.map((f) => (
                <td key={f.year} className="py-1.5 px-2.5 text-right font-mono font-bold text-emerald-700">
                  {formatKRW(f.contentRevenue)}
                </td>
              ))}
            </tr>

            {/* II. 매출원가 */}
            <tr className="bg-slate-50/80 font-bold text-slate-900">
              <td className="py-2.5 px-3.5 flex items-center gap-1.5">
                <span className="text-blue-600">Ⅱ.</span>
                <span>매출원가 (COGS)</span>
              </td>
              {showFormulas && (
                <td className="py-2.5 px-2.5 text-xs text-slate-500 font-normal">
                  행사비 1억 + 온라인 트래픽(인당 2천)
                </td>
              )}
              {financials.map((f) => (
                <td key={f.year} className="py-2.5 px-2.5 text-right font-mono font-bold text-rose-600">
                  {formatKRW(f.totalCogs)}
                </td>
              ))}
            </tr>

            {/* III. 매출총이익 */}
            <tr className="bg-slate-100 font-bold text-slate-900 border-t border-b border-slate-300">
              <td className="py-2.5 px-3.5">
                <span>Ⅲ. 매출총이익 (Gross Profit)</span>
              </td>
              {showFormulas && (
                <td className="py-2.5 px-2.5 text-xs text-slate-600 font-normal">
                  총매출액 - 매출원가
                </td>
              )}
              {financials.map((f) => (
                <td key={f.year} className="py-2.5 px-2.5 text-right font-mono font-bold text-slate-900">
                  {formatKRW(f.totalGrossProfit)}
                  <span className="block text-[10px] text-emerald-700 font-normal">
                    {formatPct(f.grossMarginPct)}
                  </span>
                </td>
              ))}
            </tr>

            {/* 투자자 배당 명세 (오프라인 + 온라인 분리) */}
            <tr className="bg-amber-50/70 text-amber-950 font-semibold border-b border-amber-200">
              <td className="py-2 px-3.5 flex items-center gap-1">
                <PiggyBank className="w-3.5 h-3.5 text-amber-700" />
                <span>★ 투자자 배당금 총액 (Total Dividends)</span>
              </td>
              {showFormulas && (
                <td className="py-2 px-2.5 text-amber-800 text-[11px]">
                  오프라인 2,500만 + 온라인(인당 2.5만)
                </td>
              )}
              {financials.map((f) => (
                <td key={f.year} className="py-2 px-2.5 text-right font-mono font-bold text-amber-800">
                  {formatKRW(f.totalInvestorDividend)}
                </td>
              ))}
            </tr>

            <tr className="text-slate-600 bg-amber-50/30">
              <td className="py-1 px-6 pl-8">· 오프라인 행사 잉여금 50% 배당</td>
              {showFormulas && <td className="py-1 px-2.5 text-slate-500">(1.5억 - 1억) × 50%</td>}
              {financials.map((f) => (
                <td key={f.year} className="py-1 px-2.5 text-right font-mono">{formatKRW(f.offlineInvestorDividend)}</td>
              ))}
            </tr>

            <tr className="text-amber-900 bg-amber-50/30 font-medium">
              <td className="py-1 px-6 pl-8">· 온라인 콘텐츠 투자자 배당 (인당 25,000원)</td>
              {showFormulas && <td className="py-1 px-2.5 text-amber-800">온라인 수강생 × 25,000원</td>}
              {financials.map((f) => (
                <td key={f.year} className="py-1 px-2.5 text-right font-mono font-semibold text-amber-800">
                  {formatKRW(f.contentInvestorDividend)}
                </td>
              ))}
            </tr>

            {/* IV. 판관비 */}
            <tr className="bg-slate-50/80 font-bold text-slate-900 border-t border-slate-200">
              <td className="py-2.5 px-3.5 flex items-center gap-1.5">
                <span className="text-blue-600">Ⅳ.</span>
                <span>판매비와관리비 (SG&A)</span>
              </td>
              {showFormulas && (
                <td className="py-2.5 px-2.5 text-xs text-slate-500 font-normal">
                  인건비+복지+매년콘텐츠R&D+서버운영
                </td>
              )}
              {financials.map((f) => (
                <td key={f.year} className="py-2.5 px-2.5 text-right font-mono font-bold text-slate-800">
                  {formatKRW(f.totalSga)}
                </td>
              ))}
            </tr>

            <tr className="bg-slate-50/50 font-semibold text-slate-800">
              <td className="py-2 px-6 pl-8 flex items-center justify-between">
                <span>1) 인건비 및 복리후생비 계</span>
              </td>
              {showFormulas && <td className="py-2 px-2.5 text-slate-500 text-xs">급여총액 + 4대보험(9.5%) + 법카·식대</td>}
              {financials.map((f) => (
                <td key={f.year} className="py-2 px-2.5 text-right font-mono font-bold text-slate-900">
                  {formatKRW(f.totalLaborAndWelfareCost)}
                  <span className="block text-[10px] text-blue-600 font-normal">({f.staffCount}명 체제)</span>
                </td>
              ))}
            </tr>

            <tr className="text-slate-500 text-[11px]">
              <td className="py-1 px-8 pl-10">· 전담관리자 기본급 (월 300만)</td>
              {showFormulas && <td className="py-1 px-2.5 text-slate-400">월 300만 × 12개월</td>}
              {financials.map((f) => (
                <td key={f.year} className="py-1 px-2.5 text-right font-mono">{formatKRW(f.dedicatedManagerBaseSalary)}</td>
              ))}
            </tr>

            <tr className="text-slate-500 text-[11px]">
              <td className="py-1 px-8 pl-10">· 평생교육사 기본급 (2차년~ 월 300만)</td>
              {showFormulas && <td className="py-1 px-2.5 text-slate-400">월 300만 × 12개월 (2차년도 상향)</td>}
              {financials.map((f) => (
                <td key={f.year} className="py-1 px-2.5 text-right font-mono">{formatKRW(f.lifelongEducatorBaseSalary)}</td>
              ))}
            </tr>

            <tr className="text-slate-500 text-[11px]">
              <td className="py-1 px-8 pl-10">· 일반직원 1 기본급 (2차년 270만, 매년 5% 인상)</td>
              {showFormulas && <td className="py-1 px-2.5 text-slate-400">270만 시작, 3년간 매년 5% 인상</td>}
              {financials.map((f) => (
                <td key={f.year} className="py-1 px-2.5 text-right font-mono">{formatKRW(f.regularStaff1BaseSalary)}</td>
              ))}
            </tr>

            <tr className="text-slate-500 text-[11px]">
              <td className="py-1 px-8 pl-10">· 일반직원 2 기본급 (3차년 270만, 매년 5% 인상)</td>
              {showFormulas && <td className="py-1 px-2.5 text-slate-400">3차년 270만 시작, 매년 5% 인상</td>}
              {financials.map((f) => (
                <td key={f.year} className="py-1 px-2.5 text-right font-mono">{formatKRW(f.regularStaff2BaseSalary)}</td>
              ))}
            </tr>

            <tr className="text-indigo-900 bg-indigo-50/30 text-[11px] font-semibold">
              <td className="py-1 px-8 pl-10">· 4대 보험 사측 부담금 (9.5% 정산)</td>
              {showFormulas && <td className="py-1 px-2.5 text-indigo-700">총 급여액 × 9.5% 연말 정산</td>}
              {financials.map((f) => (
                <td key={f.year} className="py-1 px-2.5 text-right font-mono font-bold text-indigo-800">
                  {formatKRW(f.socialInsuranceCost)}
                </td>
              ))}
            </tr>

            <tr className="text-slate-500 text-[11px]">
              <td className="py-1 px-8 pl-10">· 복리후생비 (전담관리자 법카 + 평생교육사 식대)</td>
              {showFormulas && <td className="py-1 px-2.5 text-slate-400">법카 월 80만(960만) + 식대 월 20만(240만)</td>}
              {financials.map((f) => (
                <td key={f.year} className="py-1 px-2.5 text-right font-mono">
                  {formatKRW(f.managerCorporateCardCost + f.educatorMealAllowance)}
                </td>
              ))}
            </tr>

            <tr className="text-indigo-950 bg-indigo-50/50 font-semibold">
              <td className="py-1.5 px-6 pl-8">2) 콘텐츠 추가 개발비 (R&D)</td>
              {showFormulas && <td className="py-1.5 px-2.5 text-indigo-700">매년 1개 과정 2,000만 원</td>}
              {financials.map((f) => (
                <td key={f.year} className="py-1.5 px-2.5 text-right font-mono font-bold text-indigo-700">
                  {formatKRW(f.annualContentDevCost)}
                </td>
              ))}
            </tr>

            <tr className="text-slate-600">
              <td className="py-1.5 px-6 pl-8">3) 서버 구축 및 고정운영비</td>
              {showFormulas && <td className="py-1.5 px-2.5 text-slate-500">서버 회선, 보안, 유지보수</td>}
              {financials.map((f) => (
                <td key={f.year} className="py-1.5 px-2.5 text-right font-mono">
                  {formatKRW(f.serverAndFixedCost + f.initialServerSetupCost)}
                </td>
              ))}
            </tr>

            {/* V. 영업이익 */}
            <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-b-2 border-slate-400">
              <td className="py-3 px-3.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-blue-600">Ⅴ.</span>
                  <span>영업이익 (Operating Profit)</span>
                </div>
              </td>
              {showFormulas && <td className="py-3 px-2.5 text-xs text-slate-600 font-normal">매출총이익 - 판관비</td>}
              {financials.map((f) => (
                <td key={f.year} className={`py-3 px-2.5 text-right font-mono font-bold text-sm ${f.operatingProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {f.operatingProfit >= 0 ? `+${formatKRW(f.operatingProfit)}` : formatKRW(f.operatingProfit)}
                  <span className="block text-[10px] font-normal">
                    {formatPct(f.operatingMarginPct)}
                  </span>
                </td>
              ))}
            </tr>

            {/* 당기순이익 */}
            <tr className="bg-slate-50 font-bold text-slate-900 border-b border-slate-300">
              <td className="py-2.5 px-3.5">
                <span>Ⅵ. 당기순이익 (Net Income)</span>
              </td>
              {showFormulas && <td className="py-2.5 px-2.5 text-xs text-slate-500 font-normal">영업이익 - 법인세(0원 결손이월)</td>}
              {financials.map((f) => (
                <td key={f.year} className={`py-2.5 px-2.5 text-right font-mono font-bold ${f.netProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {f.netProfit >= 0 ? `+${formatKRW(f.netProfit)}` : formatKRW(f.netProfit)}
                </td>
              ))}
            </tr>

            {/* 기말 자본금 잔액 */}
            <tr className="bg-emerald-50/80 font-bold text-emerald-950 border-t-2 border-b-2 border-emerald-400">
              <td className="py-3 px-3.5 flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-emerald-700" />
                <span className="text-emerald-900">★ 기말 자본금 잔액 (Capital Balance)</span>
              </td>
              {showFormulas && (
                <td className="py-3 px-2.5 text-xs text-emerald-800 font-normal">
                  기초자본 3억 ± 배당차감 후 순현금
                </td>
              )}
              {financials.map((f) => (
                <td key={f.year} className="py-3 px-2.5 text-right font-mono font-bold text-sm text-emerald-900">
                  {formatKRW(f.closingCashBalance)}
                  <span className="block text-[10px] font-semibold text-emerald-700">
                    ({(100 - f.capitalDepletionRate).toFixed(1)}% 보존)
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* CFO Audit Note */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 space-y-2">
        <div className="font-bold text-slate-800 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-blue-600" />
          <span>[전문 CFO 임직원 인력 확충 및 4대 보험 정산 반영 감사 주석]</span>
        </div>
        <p className="text-slate-600 leading-relaxed text-xs">
          <strong>인력 확충 및 임금 인상 반영:</strong> 2차년도 평생교육사(월 300만 원으로 상향) 및 일반직원 1명(월 270만 원) 신규 채용, 3차년도 일반직원 1명 추가(월 270만 원)와 3년간 매년 5% 임금 인상률, <strong>4대 보험 사측 부담금(9.5% 정산)</strong>을 전액 계상하였습니다.<br />
          판관비 인건비가 5차년도 기준 1.71억 원까지 증액되었음에도, 온라인 원격교육 수강생 누적(과정당 2,000명 × 6만 원)에 따른 <strong>인당 33,000원의 회사 유보 마진</strong> 덕분에 <strong>5년간 총 6억 2,500만 원의 투자자 배당</strong>을 전액 지급하고도 5차년도 말 자본금 잔액 <strong>1억 8,486만 원(자본 보존율 61.6%)</strong>을 확고하게 지켜냅니다.
        </p>
      </div>
    </div>
  );
};
