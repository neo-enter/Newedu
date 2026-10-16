import React, { useState } from 'react';
import { Header } from './components/Header';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { IncomeStatementTable } from './components/IncomeStatementTable';
import { CashFlowRunway } from './components/CashFlowRunway';
import { BEPSimulator } from './components/BEPSimulator';
import { AdministrativeRoadmap } from './components/AdministrativeRoadmap';
import { CFOStrategicReport } from './components/CFOStrategicReport';
import { DEFAULT_PARAMS, calculateFinancials, calculateBEP } from './data/financeEngine';
import { SimulationParams } from './types/finance';

export default function App() {
  const [params, setParams] = useState<SimulationParams>(DEFAULT_PARAMS);
  const [activeTab, setActiveTab] = useState<string>('statement');

  const financials = calculateFinancials(params);
  const bepData = calculateBEP(params);

  const handleReset = () => {
    setParams(DEFAULT_PARAMS);
  };

  const handleSetLaunchSpeed = (speed: 'conservative' | 'immediate') => {
    setParams(prev => ({ ...prev, contentLaunchSpeed: speed }));
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        contentLaunchSpeed={params.contentLaunchSpeed}
        setContentLaunchSpeed={handleSetLaunchSpeed}
        onReset={handleReset}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Executive KPI summary always visible */}
        <ExecutiveSummary
          financials={financials}
          bepData={bepData}
          initialCapital={params.initialCapital}
        />

        {/* Tab Specific Views */}
        {activeTab === 'statement' && (
          <div className="space-y-6">
            <IncomeStatementTable financials={financials} />
          </div>
        )}

        {activeTab === 'cashflow' && (
          <CashFlowRunway
            financials={financials}
            initialCapital={params.initialCapital}
          />
        )}

        {activeTab === 'bep' && (
          <BEPSimulator
            params={params}
            setParams={setParams}
            onReset={handleReset}
          />
        )}

        {activeTab === 'roadmap' && (
          <AdministrativeRoadmap />
        )}

        {activeTab === 'advisory' && (
          <CFOStrategicReport />
        )}

        {/* Bank & Board Printable Section */}
        <section className="hidden print:block space-y-8 pt-6 border-t border-slate-300">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-slate-900">
              [평생교육시설 3개년 추정 재무계획서 및 종합 진단 보고서]
            </h1>
            <p className="text-sm text-slate-600">
              지식인력개발사업 관련 평생교육시설 및 원격교육평생교육시설 인허가 기반 (CFO 감수)
            </p>
          </div>
          <IncomeStatementTable financials={financials} />
          <CashFlowRunway financials={financials} initialCapital={params.initialCapital} />
          <CFOStrategicReport />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>평생교육시설 설립 및 인허가 재무 자문 시스템 · CFO Financial Engineering</span>
          <span>기준: 자본금 3억 | 매년 콘텐츠 2,000만 R&D | 과정당 2,000명 누적 수익 | 투자자 50% 배당</span>
        </div>
      </footer>
    </div>
  );
}
