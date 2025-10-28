/**
 * تحويل الأرقام الكبيرة إلى صيغة مختصرة (K/M)
 * @param {number} num - الرقم المراد تنسيقه
 * @param {number} decimals - عدد الأرقام العشرية (افتراضي: 1)
 * @returns {string} الرقم المنسق
 */
export const formatNumber = (num, decimals = 1) => {
  if (num === null || num === undefined || isNaN(num)) return '$0';
  
  const absNum = Math.abs(num);
  
  if (absNum >= 1000000) {
    return `$${(num / 1000000).toFixed(decimals)}M`;
  } else if (absNum >= 1000) {
    return `$${(num / 1000).toFixed(decimals)}K`;
  } else {
    return `$${num.toLocaleString()}`;
  }
};

/**
 * تنسيق الأرقام في الجداول (مع فواصل)
 * @param {number} num - الرقم المراد تنسيقه
 * @returns {string} الرقم المنسق
 */
export const formatCurrency = (num) => {
  if (num === null || num === undefined || isNaN(num)) return '$0';
  return `$${num.toLocaleString()}`;
};

/**
 * تنسيق الأرقام في الـ Cards (تلقائي حسب الحجم)
 * @param {number} num - الرقم المراد تنسيقه
 * @returns {string} الرقم المنسق
 */
export const formatCardNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) return '$0';
  
  const absNum = Math.abs(num);
  
  if (absNum >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`;
  } else if (absNum >= 10000) {
    return `$${(num / 1000).toFixed(1)}K`;
  } else {
    return `$${num.toLocaleString()}`;
  }
};