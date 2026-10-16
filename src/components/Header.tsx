import React from 'react';
import { 
  Building2, 
  FileText, 
  Sliders, 
  Printer, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  contentLaunchSpeed: 'conservative' | 'immediate';
  setContentLaunchSpeed: (speed: 'conservative' | 'immediate') => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  contentLaunchSpeed,
  setContentLaunchSpeed,
  onReset
}) => {
  return (
    <header className="bg-white border-b border-slate-200 text-slate-800 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-3">
          {/* Brand & Badges */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  평생교육시설 5개년 추정 손익 및 재무계획서
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  5개년(1차~5차년) 풀 스케일 모델
                </span>
              </div>
              <p className="text-xs text-slate-500">
                초기 자본금 3억 원 · 온라인 수강료 6만 원 · 투자자 배당 2.5만 원 · 4인 조직 확충(5% 임금인상/4대보험 정산) · 자본 잔액 추적
              </p>
            </div>
          </div>

          {/* Action buttons & Cumulative Mode Switch */}
          <div className="flex items-center flex-wrap gap-2.5">
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setContentLaunchSpeed('conservative')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  contentLaunchSpeed === 'conservative'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="1년차 개발분 2년차 론칭(1개 2,000명), 2년차 개발분 3년차 론칭(2개 4,000명)"
              >
                표준 누적안 (보수적)
              </button>
              <button
                onClick={() => setContentLaunchSpeed('immediate')}
                className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1 transition-all ${
                  contentLaunchSpeed === 'immediate'
                    ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="개발 즉시 당해 연도 론칭"
              >
                <Sparkles className="w-3.5 h-3.5" />
                적극 론칭안
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-300 shadow-xs transition"
              title="은행 제출 및 내부 보고용 5개년 인쇄/PDF 저장"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>5개년 보고서 인쇄</span>
            </button>

            <button
              onClick={onReset}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 border border-slate-300 shadow-xs transition"
              title="가정 초기화"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-2 border-t border-slate-100 pt-1 overflow-x-auto text-xs sm:text-sm font-medium">
          {[
            { id: 'statement', label: '📊 5개년 추정 손익계산서', icon: FileText },
            { id: 'cashflow', label: '💰 5개년 자본금 잔액 & 자금수지', icon: TrendingUp },
            { id: 'bep', label: '⚖️ 손익분기점(BEP) 시뮬레이터', icon: Sliders },
            { id: 'roadmap', label: '🏛️ 평생교육법 인허가 로드맵', icon: ShieldCheck },
            { id: 'advisory', label: '📋 CFO 종합 평가 & 제언', icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-700 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
