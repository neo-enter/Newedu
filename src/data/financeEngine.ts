import { SimulationParams, YearFinancials } from '../types/finance';

export const DEFAULT_PARAMS: SimulationParams = {
  initialCapital: 300_000_000,      // 초기 자본금 3억 원
  grantPerTrainee: 30_000,          // 오프라인 1인당 지원금 3만 원
  offlineTraineeCount: 5_000,       // 연간 오프라인 5,000명
  eventCost: 2_000_000,             // 1회당 행사비용 200만 원
  traineesPerEvent: 100,            // 회당 100명 (50회)

  // 인력 계획 및 급여 (사용자 최종 확정안 반영)
  managerMonthlySalary: 3_000_000,        // 전담관리자 기본급 월 300만 (연 3,600만)
  educatorMonthlySalary: 3_000_000,       // 평생교육사 기본급 2차년도부터 월 300만 (연 3,600만)
  regularStaff1StartingSalary: 2_700_000, // 일반직원 1 신규채용 (2차년도 세전 월 270만)
  regularStaff2StartingSalary: 2_700_000, // 일반직원 2 신규채용 (3차년도 세전 월 270만)
  wageHikeRate: 0.05,                     // 일반직원 2명 3년간 매년 5% 임금 인상률
  socialInsuranceRate: 0.095,             // 4대 보험 사측 부담금 정산 요율 9.5%
  managerCorporateCardMonthly: 800_000,   // 전담관리자 법카 (식대, 음료, 접대) 월 80만원
  educatorMealMonthly: 200_000,           // 평생교육사 비과세 식대보조금 월 20만원

  // 온라인 원격 교육 확정 조건 (수강료 6만원, 투자자 배당 1인당 2.5만원)
  annualContentDevCost: 20_000_000,       // 매년 콘텐츠 1개 개발비 2,000만 원
  traineesPerContent: 2_000,             // 콘텐츠 1개당 연간 수강생 2,000명
  contentRevenuePerTrainee: 60_000,       // 30시간 온라인 콘텐츠 수강료 (60,000원)
  contentDividendPerTrainee: 25_000,      // 온라인 콘텐츠 투자자 배당 (수강생 1인당 25,000원)
  contentMarginalCost: 2_000,            // 온라인 플랫폼 변동원가 2,000원
  contentLaunchSpeed: 'conservative',    // 보수적(전년도 개발분 당해연도 론칭)

  // 인프라 및 운영비
  serverFixedCost: 20_000_000,
  year1ServerSetupCost: 15_000_000,

  // 오프라인 투자자 배당 (행사 잉여금 50% = 연 2,500만 원)
  dividendRateOnSurplus: 0.50,
};

export function calculateFinancials(params: SimulationParams): YearFinancials[] {
  const managerAnnual = params.managerMonthlySalary * 12; // 36,000,000원
  const managerCardAnnual = params.managerCorporateCardMonthly * 12; // 9,600,000원
  const educatorMealAnnual = params.educatorMealMonthly * 12; // 2,400,000원

  // 오프라인 기본 사업 (매년 동일: 5,000명 / 50회)
  const offlineTrainees = params.offlineTraineeCount; // 5,000명
  const offlineRev = offlineTrainees * params.grantPerTrainee; // 150,000,000원
  const eventCount = Math.ceil(offlineTrainees / params.traineesPerEvent); // 50회
  const offlineCogs = eventCount * params.eventCost; // 100,000,000원
  const offlineSurplus = Math.max(0, offlineRev - offlineCogs); // 50,000,000원
  const offlineInvestorDividend = offlineSurplus * params.dividendRateOnSurplus; // 25,000,000원

  const yearsData: YearFinancials[] = [];
  let prevClosingCash = params.initialCapital;

  for (let y = 1; y <= 5; y++) {
    let stage = '';
    let keyActivities: string[] = [];
    let activeContentCount = 0;
    let initialServerSetup = 0;
    let serverMaint = params.serverFixedCost;

    // 직원 급여 및 인력 계산
    let staffCount = 1;
    let managerSalary = managerAnnual;
    let educatorSalary = 0;
    let staff1Salary = 0;
    let staff2Salary = 0;
    let educatorMeal = 0;

    if (y === 1) {
      staffCount = 1; // 전담관리자 1명
      educatorSalary = 0;
      staff1Salary = 0;
      staff2Salary = 0;
      educatorMeal = 0;
      initialServerSetup = params.year1ServerSetupCost; // 15,000,000원
      serverMaint = 10_000_000;
      stage = '1차년도: 전담관리자 1명 + 1차 콘텐츠 R&D (오프라인 5천명 개시)';
      keyActivities = [
        '자본금 3억 원 법인 설립 등기 완료',
        '전담 관리자 1명 채용 (월 300만, 4대보험, 법카 80만)',
        '1차 30시간 온라인 콘텐츠 개발 (2,000만 원 R&D)',
        'LMS 시스템 및 웹서버 1차 구축 (1,500만 원)',
        '공단 지원금 수령 개시: 연인원 5,000명 (50회 교육)',
        '오프라인 행사 배당금 2,500만 원 지급 (온라인 배당 0원)'
      ];
      activeContentCount = 0;
    } else if (y === 2) {
      staffCount = 3; // 전담관리자 + 평생교육사(300만) + 일반직원1(270만)
      educatorSalary = params.educatorMonthlySalary * 12; // 36,000,000원
      staff1Salary = params.regularStaff1StartingSalary * 12; // 32,400,000원
      staff2Salary = 0;
      educatorMeal = educatorMealAnnual;
      serverMaint = 20_000_000;
      stage = '2차년도: 지식인력시설 신고 + 3인 체제(교육사 300만, 직원 270만) + 1개 과정 론칭';
      keyActivities = [
        '지식인력개발 평생교육시설 정식 신고 및 인허가 수리 완료',
        '평생교육사 1명 채용 (월 300만 원으로 상향 책정, 식대보조 20만)',
        '일반 직원 1명 신규 채용 (세전 월 270만 원 = 연 3,240만 원)',
        '총 3명 임직원 4대 보험(9.5%, 연 992만 원) 정산 납부',
        '1차 온라인 콘텐츠 서비스 개시 (2,000명 × 6만 원 = 1억 2,000만 원)',
        '2번째 추가 콘텐츠 개발 착수 (개발비 2,000만 원)',
        '투자자 배당: 오프라인 2,500만 + 온라인 5,000만(인당 2.5만) = 총 7,500만 원 지급'
      ];
      activeContentCount = params.contentLaunchSpeed === 'immediate' ? 2 : 1;
    } else if (y === 3) {
      staffCount = 4; // 전담관리자 + 평생교육사 + 일반직원1(5%인상) + 일반직원2(270만)
      educatorSalary = params.educatorMonthlySalary * 12; // 36,000,000원
      staff1Salary = Math.round(params.regularStaff1StartingSalary * Math.pow(1 + params.wageHikeRate, 1)) * 12; // 월 283.5만 = 34,020,000원
      staff2Salary = params.regularStaff2StartingSalary * 12; // 월 270만 = 32,400,000원
      educatorMeal = educatorMealAnnual;
      serverMaint = 25_000_000;
      stage = '3차년도: 원격시설 승인 + 4인 체제(직원2 추가, 직원1 5%인상) + 2개 과정 누적';
      keyActivities = [
        '원격교육 형태의 평생교육시설 추가 신고 수리 완료',
        '일반 직원 2 추가 채용 (세전 월 270만 원) 및 일반 직원 1 급여 5% 인상(월 283.5만)',
        '총 4명 전문 조직 확립 및 4대 보험(9.5%, 연 1,315만 원) 정산',
        '온라인 2개 과정 누적 (4,000명 × 6만 원 = 2억 4,000만 원)',
        '3번째 추가 콘텐츠 개발 (개발비 2,000만 원)',
        '투자자 배당: 오프라인 2,500만 + 온라인 1.0억 = 총 1억 2,500만 원 지급',
        '인력 확충에도 영업이익 +7,343만 원 흑자 달성'
      ];
      activeContentCount = params.contentLaunchSpeed === 'immediate' ? 3 : 2;
    } else if (y === 4) {
      staffCount = 4;
      educatorSalary = params.educatorMonthlySalary * 12; // 36,000,000원
      staff1Salary = Math.round(params.regularStaff1StartingSalary * Math.pow(1 + params.wageHikeRate, 2)) * 12; // 월 297.675만 = 35,721,000원
      staff2Salary = Math.round(params.regularStaff2StartingSalary * Math.pow(1 + params.wageHikeRate, 1)) * 12; // 월 283.5만 = 34,020,000원
      educatorMeal = educatorMealAnnual;
      serverMaint = 26_000_000;
      stage = '4차년도: 원격센터 안정화 + 일반직원 2명 매년 5% 인상 + 순현금 유입 반등';
      keyActivities = [
        '일반 직원 1 (2년차 5% 추가 인상, 연 3,572만) & 직원 2 (1년차 5% 인상, 연 3,402만)',
        '4명 임직원 4대 보험 정산 납부 (연 1,347만 원)',
        '온라인 3개 과정 누적 (6,000명 × 6만 원 = 3억 6,000만 원)',
        '4번째 추가 콘텐츠 개발 (개발비 2,000만 원)',
        '투자자 배당: 오프라인 2,500만 + 온라인 1.5억 = 총 1억 7,500만 원 지급',
        '연간 영업이익 1억 8,479만 원 달성 및 당기 순현금흐름(+979만 원) 반등 개시'
      ];
      activeContentCount = params.contentLaunchSpeed === 'immediate' ? 4 : 3;
    } else {
      staffCount = 4;
      educatorSalary = params.educatorMonthlySalary * 12; // 36,000,000원
      staff1Salary = Math.round(params.regularStaff1StartingSalary * Math.pow(1 + params.wageHikeRate, 3)) * 12; // 월 312.56만 = 37,507,050원 (3년 연속 5% 인상 완성)
      staff2Salary = Math.round(params.regularStaff2StartingSalary * Math.pow(1 + params.wageHikeRate, 2)) * 12; // 월 297.675만 = 35,721,000원
      educatorMeal = educatorMealAnnual;
      serverMaint = 27_000_000;
      stage = '5차년도: 플랫폼 완성기 + 직원 5% 인상 완성 + 연 영업이익 2.96억 원 달성';
      keyActivities = [
        '일반 직원 1 (3년간 매년 5% 인상 완성, 연 3,751만) & 직원 2 (2년차 5% 인상, 연 3,572만)',
        '4명 임직원 4대 보험 정산 납부 (연 1,380만 원)',
        '온라인 4개 과정 누적 (8,000명 × 6만 원 = 4억 8,000만 원)',
        '5번째 추가 콘텐츠 개발 (개발비 2,000만 원)',
        '투자자 배당: 오프라인 2,500만 + 온라인 2억 = 총 2억 2,500만 원 지급',
        '5개년 누적 투자자 배당 6억 2,500만 원 전액 환원 완료 (원금 3억 대비 208.3% 배당 회수)',
        '연간 영업이익 2억 9,598만 원 달성 및 기말 자본금 잔액 1억 8,486만 원 유지'
      ];
      activeContentCount = params.contentLaunchSpeed === 'immediate' ? 5 : 4;
    }

    // 총 급여액 및 4대 보험 정산 계산
    const grossPayroll = managerSalary + educatorSalary + staff1Salary + staff2Salary;
    const socialIns = Math.round(grossPayroll * params.socialInsuranceRate);
    const welfareAndCards = managerCardAnnual + educatorMeal;
    const laborAndWelfare = grossPayroll + socialIns + welfareAndCards;

    const contentTrainees = activeContentCount * params.traineesPerContent;
    const contentRev = contentTrainees * params.contentRevenuePerTrainee; // 수강료 6만 원
    const contentCogs = contentTrainees * params.contentMarginalCost; // 2,000원
    const contentGross = contentRev - contentCogs;

    // 온라인 콘텐츠 투자자 배당 (수강생 1인당 2.5만 원)
    const contentInvestorDividend = contentTrainees * params.contentDividendPerTrainee;
    const totalInvestorDividend = offlineInvestorDividend + contentInvestorDividend;

    const totalRev = offlineRev + contentRev;
    const totalCogs = offlineCogs + contentCogs;
    const totalGross = totalRev - totalCogs;
    const grossMargin = (totalGross / totalRev) * 100;

    const contentDevCost = params.annualContentDevCost; // 매년 2,000만 원
    const totalSga = laborAndWelfare + contentDevCost + initialServerSetup + serverMaint;

    const opProfit = totalGross - totalSga;
    const opMargin = (opProfit / totalRev) * 100;
    const netProfit = opProfit;

    // 현금흐름 (오프라인 배당 + 온라인 콘텐츠 배당 전액 현금 유출)
    const cashInflow = totalRev;
    const cashOutflow = totalCogs + totalSga + totalInvestorDividend;
    const netCash = cashInflow - cashOutflow;
    const closingCash = prevClosingCash + netCash;
    const depletion = ((params.initialCapital - closingCash) / params.initialCapital) * 100;

    prevClosingCash = closingCash;

    yearsData.push({
      year: y,
      label: `${y}차년도`,
      stage,
      keyActivities,
      staffCount,
      offlineTraineeCount: offlineTrainees,
      grantPerTrainee: params.grantPerTrainee,
      offlineRevenue: offlineRev,
      eventCount,
      traineesPerEvent: params.traineesPerEvent,
      costPerEvent: params.eventCost,
      offlineCogs,
      offlineSurplus,
      offlineInvestorDividend,
      activeContentCount,
      contentTraineeCount: contentTrainees,
      contentRevenuePerTrainee: params.contentRevenuePerTrainee,
      contentRevenue: contentRev,
      contentCogs,
      contentGrossProfit: contentGross,
      contentDividendPerTrainee: params.contentDividendPerTrainee,
      contentInvestorDividend,
      totalInvestorDividend,
      totalTraineeCount: offlineTrainees + contentTrainees,
      totalRevenue: totalRev,
      totalCogs: totalCogs,
      totalGrossProfit: totalGross,
      grossMarginPct: grossMargin,
      dedicatedManagerBaseSalary: managerSalary,
      lifelongEducatorBaseSalary: educatorSalary,
      regularStaff1BaseSalary: staff1Salary,
      regularStaff2BaseSalary: staff2Salary,
      totalGrossPayroll: grossPayroll,
      socialInsuranceCost: socialIns,
      managerCorporateCardCost: managerCardAnnual,
      educatorMealAllowance: educatorMeal,
      totalLaborAndWelfareCost: laborAndWelfare,
      annualContentDevCost: contentDevCost,
      initialServerSetupCost: initialServerSetup,
      serverAndFixedCost: serverMaint,
      totalSga,
      operatingProfit: opProfit,
      operatingMarginPct: opMargin,
      netProfit,
      cashInflow,
      cashOutflow,
      netCashFlow: netCash,
      closingCashBalance: closingCash,
      capitalDepletionRate: depletion
    });
  }

  return yearsData;
}

export function calculateBEP(params: SimulationParams) {
  // 2차년도 기준 고정비: 관리자(3,600만) + 평생교육사(3,600만) + 일반직원1(3,240만) = 급여 104,400,000원
  // 4대보험(9.5%): 9,918,000원 + 법카/식대(1,200만) = 인건비소계 126,318,000원
  const managerAnnual = params.managerMonthlySalary * 12;
  const educatorAnnual = params.educatorMonthlySalary * 12;
  const staff1Annual = params.regularStaff1StartingSalary * 12;
  const grossY2 = managerAnnual + educatorAnnual + staff1Annual;
  const socialIns = Math.round(grossY2 * params.socialInsuranceRate);
  const welfare = (params.managerCorporateCardMonthly * 12) + (params.educatorMealMonthly * 12);
  const totalLaborWelfareY2 = grossY2 + socialIns + welfare; // 126,318,000원
  
  const fixedCost = totalLaborWelfareY2 + params.annualContentDevCost + params.serverFixedCost; // 166,318,000원

  const offlineCM = params.grantPerTrainee - (params.eventCost / params.traineesPerEvent); // 10,000원
  // 온라인 1인당 공헌이익 (수강료 6만 - 플랫폼원가 2천)
  const onlineCM = params.contentRevenuePerTrainee - params.contentMarginalCost; // 58,000원
  // 1인당 2.5만 원 배당 지급 후 사내 유보 순마진
  const onlineRetainedCM = onlineCM - params.contentDividendPerTrainee; // 33,000원

  const y2OfflineCMTotal = params.offlineTraineeCount * offlineCM; // 50,000,000
  const y2OnlineCMTotal = 1 * params.traineesPerContent * onlineCM; // 116,000,000
  const y2TotalCM = y2OfflineCMTotal + y2OnlineCMTotal; // 166,000,000원

  const y2OperatingProfit = y2TotalCM - fixedCost; // -318,000원

  return {
    fixedCost,
    offlineCM,
    onlineCM,
    onlineRetainedCM,
    y2TotalCM,
    y2OperatingProfit,
    investorDividendPerTrainee: params.contentDividendPerTrainee,
  };
}
