import React from 'react';
import { SimulationParams } from '../types/finance';
import { calculateBEP } from '../data/financeEngine';
import { 
  Sliders, 
  Target, 
  Calculator, 
  RotateCcw,
  CheckCircle,
  PiggyBank,
  Sparkles,
  Coins
} from 'lucide-react';

interface BEPSimulatorProps {
  params: SimulationParams;
  setParams: React.Dispatch<React.SetStateAction<SimulationParams>>;
  onReset: () => void;
}

export const BEPSimulator: React.FC<BEPSimulatorProps> = ({
  params,
  setParams,
  onReset,
}) => {
  const bep = calculateBEP(params);

  const formatKRW = (num: number) => {
    return num.toLocaleString('ko-KR') + '원';
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

  const applyPreset = (type: 'default' | 'min_div' | 'max_div' | 'high_rev') => {
    if (type === 'default') {
      onReset();
    } else if (type === 'min_div') {
      // 온라인 배당 20,000원 적용
      setParams(prev => ({
        ...prev,
        contentDividendPerTrainee: 20_000,
        contentRevenuePerTrainee: 60_000
      }));
    } else if (type === 'max_div') {
      // 온라인 배당 35,000원 적용
      setParams(prev => ({
        ...prev,
        contentDividendPerTrainee: 35_000,
        contentRevenuePerTrainee: 60_000
      }));
    } else if (type === 'high_rev') {
      // 수강생 3,000명 확대
      setParams(prev => ({
        ...prev,
        traineesPerContent: 3_000
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Presets */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-600" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                손익분기점(BEP) 분석 및 온라인 콘텐츠 배당 시뮬레이터
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              온라인 원격교육 수강료(기본 6만 원)와 1인당 배당금(기본 2.5만 원)을 조절하여 투자자 배당 규모와 회사 잔여 마진을 실시간 시뮬레이션합니다.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold">배당 프리셋:</span>
            <button
              onClick={() => applyPreset('default')}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-semibold transition"
            >
              기본안 (수강 6만 / 배당 2.5만)
            </button>
            <button
              onClick={() => applyPreset('min_div')}
              className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-medium transition"
            >
              낮은 배당 (인당 2.0만)
            </button>
            <button
              onClick={() => applyPreset('max_div')}
              className="px-2.5 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-medium transition"
            >
              높은 배당 (인당 3.5만)
            </button>
            <button
              onClick={() => applyPreset('high_rev')}
              className="px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-medium transition"
            >
              수강생 3,000명 확대
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Controls & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>온라인 배당 및 단가 조정</span>
            </h3>
            <button
              onClick={onReset}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" /> 초기화
            </button>
          </div>

          {/* Slider 1: 온라인 콘텐츠 1인당 투자자 배당금 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-700 font-bold flex items-center gap-1">
                <PiggyBank className="w-3.5 h-3.5 text-amber-600" />
                <span>온라인 콘텐츠 1인당 투자자 배당금</span>
              </span>
              <span className="font-mono font-bold text-amber-700">{formatKRW(params.contentDividendPerTrainee)}</span>
            </div>
            <input
              type="range"
              min="15000"
              max="45000"
              step="2500"
              value={params.contentDividendPerTrainee}
              onChange={(e) => setParams(prev => ({ ...prev, contentDividendPerTrainee: Number(e.target.value) }))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>최소 15,000원</span>
              <span>기준 25,000원</span>
              <span>최대 45,000원</span>
            </div>
          </div>

          {/* Slider 2: 온라인 원격교육 수강료 단가 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-700 font-medium">원격교육 1인당 수강료/지원금 단가</span>
              <span className="font-mono font-bold text-blue-700">{formatKRW(params.contentRevenuePerTrainee)}</span>
            </div>
            <input
              type="range"
              min="40000"
              max="80000"
              step="5000"
              value={params.contentRevenuePerTrainee}
              onChange={(e) => setParams(prev => ({ ...prev, contentRevenuePerTrainee: Number(e.target.value) }))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>40,000원</span>
              <span>기준 60,000원</span>
              <span>80,000원</span>
            </div>
          </div>

          {/* Slider 3: 콘텐츠 1개당 연간 수강 인원 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-700 font-medium">콘텐츠 1개당 연간 수강 인원</span>
              <span className="font-mono font-bold text-emerald-700">{params.traineesPerContent.toLocaleString()}명/개</span>
            </div>
            <input
              type="range"
              min="1000"
              max="4000"
              step="200"
              value={params.traineesPerContent}
              onChange={(e) => setParams(prev => ({ ...prev, traineesPerContent: Number(e.target.value) }))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1,000명</span>
              <span>기본 2,000명</span>
              <span>4,000명</span>
            </div>
          </div>

          {/* Slider 4: 오프라인 행사비 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-700 font-medium">오프라인 1회당 행사비용</span>
              <span className="font-mono font-bold text-rose-600">{formatKRW(params.eventCost)}</span>
            </div>
            <input
              type="range"
              min="1500000"
              max="2500000"
              step="100000"
              value={params.eventCost}
              onChange={(e) => setParams(prev => ({ ...prev, eventCost: Number(e.target.value) }))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>150만원</span>
              <span>기본 200만원</span>
              <span>250만원</span>
            </div>
          </div>
        </div>

        {/* Right Column: Breakdown */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium block">1인당 수강단가</span>
              <span className="text-sm font-bold font-mono text-blue-700">{formatKRW(params.contentRevenuePerTrainee)}</span>
              <span className="text-[10px] text-slate-400 block">원격 훈련비 환급액</span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-amber-300 shadow-2xs bg-amber-50/20">
              <span className="text-[11px] text-amber-800 font-bold block">1인당 투자자 배당</span>
              <span className="text-sm font-bold font-mono text-amber-700">
                {formatKRW(params.contentDividendPerTrainee)}
              </span>
              <span className="text-[10px] text-amber-700 block">기본 25,000원 설정</span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium block">1인당 회사 순마진</span>
              <span className="text-sm font-bold font-mono text-emerald-700">
                {formatKRW(bep.onlineRetainedCM)}
              </span>
              <span className="text-[10px] text-slate-400 block">배당 차감 후 유보액</span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium block">2차년 영업이익</span>
              <span className={`text-sm font-bold font-mono ${bep.y2OperatingProfit >= 0 ? 'text-emerald-700' : 'text-slate-800'}`}>
                {bep.y2OperatingProfit >= 0 ? `+${formatEok(bep.y2OperatingProfit)}` : formatEok(bep.y2OperatingProfit)}
              </span>
              <span className="text-[10px] text-blue-600 block">
                {bep.y2OperatingProfit >= 0 ? '2차년 흑자 달성' : '2차년 손익분기점(BEP) 근접'}
              </span>
            </div>
          </div>

          {/* Analysis Note */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-600" />
              <span>CFO 배당 스프레드(Spread) 및 인력 확충 분석</span>
            </h4>
            <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <p>
                · <strong>배당 스프레드 원칙:</strong> 온라인 원격교육 수강료 <strong>60,000원</strong>에서 투자자에게 1인당 <strong>25,000원의 배당</strong>을 지급하고 변동비(2,000원)를 제외하더라도, 회사에는 <strong>1인당 33,000원의 막대한 공헌이익</strong>이 유보됩니다.
              </p>
              <p>
                · <strong>4인 조직 확충 및 5개년 누적 성과:</strong> 2차년도 평생교육사(300만) 및 일반직원(270만) 채용으로 판관비가 증가하나 손익분기점에 근접(△32만 원)하며, 3차년도부터 <strong>+7,343만 원으로 본격 흑자 전환</strong>합니다. 5개년 누적으로 투자자에게 <strong>총 6억 2,500만 원(원금 대비 208.3%)</strong>의 배당을 환원하면서도 회사 기말 자본금을 <strong>1억 8,486만 원</strong>으로 안정적으로 방어합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
