export interface YearFinancials {
  year: number;
  label: string;
  stage: string;
  keyActivities: string[];
  
  // Personnel & Headcount
  staffCount: number;                 // 연도별 총 임직원 수 (1명 -> 3명 -> 4명 -> 4명 -> 4명)
  
  // Offline Events Revenue & COGS
  offlineTraineeCount: number;
  grantPerTrainee: number;
  offlineRevenue: number;
  eventCount: number;
  traineesPerEvent: number;
  costPerEvent: number;
  offlineCogs: number;
  offlineSurplus: number; // 오프라인 행사 잉여금 (지원금 - 행사비)
  offlineInvestorDividend: number; // 오프라인 잉여금의 50% 배당 (연 2,500만)

  // Online Cumulative Content Model (원격교육)
  activeContentCount: number;        // 누적 가동 콘텐츠 수 (1~4개)
  contentTraineeCount: number;       // 온라인 수강생 (과정당 2,000명 누적)
  contentRevenuePerTrainee: number;  // 원격교육 1인당 수강료/지원금 단가 (60,000원)
  contentRevenue: number;            // 온라인 총매출
  contentCogs: number;               // 온라인 플랫폼 변동원가 (인당 2,000원)
  contentGrossProfit: number;

  // Investor Dividends (오프라인 + 온라인 분리 집계)
  contentDividendPerTrainee: number; // 온라인 1인당 투자자 배당금 (25,000원)
  contentInvestorDividend: number;   // 온라인 콘텐츠 누적 배당금 (수강생 × 인당 배당)
  totalInvestorDividend: number;     // 총 투자자 배당금 (오프라인 + 온라인)

  // Total Consolidated Revenue & COGS
  totalTraineeCount: number;
  totalRevenue: number;
  totalCogs: number;
  totalGrossProfit: number;
  grossMarginPct: number;

  // SG&A (판관비 상세 내역)
  dedicatedManagerBaseSalary: number; // 전담 관리자 기본급 (3,600만)
  lifelongEducatorBaseSalary: number;  // 평생교육사 기본급 (2차년도부터 300만 = 연 3,600만)
  regularStaff1BaseSalary: number;    // 일반직원 1 기본급 (2차년 270만, 매년 5% 인상)
  regularStaff2BaseSalary: number;    // 일반직원 2 기본급 (3차년 270만, 매년 5% 인상)
  totalGrossPayroll: number;          // 총 급여액 (4대 보험 산정 기준)
  socialInsuranceCost: number;        // 4대 보험 사측 부담금 (9.5% 정산)
  managerCorporateCardCost: number;   // 전담관리자 법카 (식대, 음료, 접대)
  educatorMealAllowance: number;      // 평생교육사 비과세 식대보조금
  totalLaborAndWelfareCost: number;   // 인건비 및 복리후생비 소계
  
  annualContentDevCost: number;       // 매년 콘텐츠 1개 추가 개발비 (2,000만 원)
  initialServerSetupCost: number;     // 1차년 초기 서버구축비 (1,500만 원)
  serverAndFixedCost: number;         // 서버 유지보수 및 고정 운영비
  totalSga: number;

  // Operating Profit & Net Income
  operatingProfit: number;
  operatingMarginPct: number;
  netProfit: number;
  
  // Cash Flow (오프라인+온라인 배당 유출 전액 반영)
  cashInflow: number;
  cashOutflow: number;
  netCashFlow: number;
  closingCashBalance: number;
  capitalDepletionRate: number; // 누적 자본잠식률 (%)
}

export interface SimulationParams {
  initialCapital: number;
  grantPerTrainee: number;
  offlineTraineeCount: number; // 연간 5,000명
  eventCost: number;           // 1회당 200만 원
  traineesPerEvent: number;    // 회당 100명 (50회)
  
  // Labor & Welfare
  managerMonthlySalary: number;        // 전담관리자 월 급여 (300만 원)
  educatorMonthlySalary: number;       // 평생교육사 월 급여 (2차년도부터 300만 원)
  regularStaff1StartingSalary: number; // 일반직원 1 초기 월급 (2차년 270만 원)
  regularStaff2StartingSalary: number; // 일반직원 2 초기 월급 (3차년 270만 원)
  wageHikeRate: number;                // 일반직원 매년 임금 인상률 (5%)
  socialInsuranceRate: number;         // 4대보험 요율 (9.5%)
  managerCorporateCardMonthly: number; // 법카 (월 80만)
  educatorMealMonthly: number;         // 식대보조 (월 20만)

  // Online Content & Dividend Model (원격교육 수강료 6만원, 배당 2.5만원)
  annualContentDevCost: number;        // 매년 콘텐츠 1개 개발비 (2,000만 원)
  traineesPerContent: number;          // 콘텐츠 1개당 연간 수강생 (2,000명)
  contentRevenuePerTrainee: number;    // 원격교육 1인당 수강료/지원금 (60,000원)
  contentDividendPerTrainee: number;   // 온라인 콘텐츠 1인당 투자자 배당금 (25,000원)
  contentMarginalCost: number;         // 온라인 플랫폼 변동원가 (2,000원)
  contentLaunchSpeed: 'conservative' | 'immediate'; // 보수적 vs 적극

  // Infrastructure & Overhead
  serverFixedCost: number;
  year1ServerSetupCost: number;

  // Offline Investor Dividend
  dividendRateOnSurplus: number; // 오프라인 행사 잉여금 대비 배당율 (50% = 연 2,500만)
}
