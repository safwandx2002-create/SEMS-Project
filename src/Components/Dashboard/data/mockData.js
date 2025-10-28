/* ==================== INITIAL EXPENSES DATA ==================== */
export const initialExpensesList = [];

/* ==================== EXPENSE TREND DATA (6 months) ==================== */
export const expenseData = [
  { month: "May", amount: 1200 },
  { month: "Jun", amount: 980 },
  { month: "Jul", amount: 1400 },
  { month: "Aug", amount: 1100 },
  { month: "Sep", amount: 1350 },
  { month: "Oct", amount: 850 },
];

/* ==================== CATEGORY BREAKDOWN DATA ==================== */
export const categoryData = [
  { name: "Travel", value: 450, color: "#6366f1" },
  { name: "Meals", value: 320, color: "#10b981" },
  { name: "Equipment", value: 280, color: "#f59e0b" },
  { name: "Office", value: 180, color: "#8b5cf6" },
];

/* ==================== STACKED AREA CHART DATA ==================== */
export const stackedData = [
  { month: "May", Travel: 450, Meals: 280, Equipment: 300, Office: 170 },
  { month: "Jun", Travel: 380, Meals: 250, Equipment: 220, Office: 130 },
  { month: "Jul", Travel: 520, Meals: 340, Equipment: 360, Office: 180 },
  { month: "Aug", Travel: 410, Meals: 290, Equipment: 280, Office: 120 },
  { month: "Sep", Travel: 490, Meals: 310, Equipment: 350, Office: 200 },
  { month: "Oct", Travel: 320, Meals: 230, Equipment: 200, Office: 100 },
];

/* ==================== CATEGORY COMPARISON DATA ==================== */
export const categoryComparison = [
  { category: "Travel", thisMonth: 450, lastMonth: 520, change: -13.5 },
  { category: "Meals", thisMonth: 320, lastMonth: 280, change: 14.3 },
  { category: "Equipment", thisMonth: 280, lastMonth: 300, change: -6.7 },
  { category: "Office", thisMonth: 180, lastMonth: 200, change: -10.0 },
];

/* ==================== HELPER: Parse Date ==================== */
export const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  return new Date(year, month, day);
};