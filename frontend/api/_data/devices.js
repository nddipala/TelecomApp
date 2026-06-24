/**
 * Device eligibility, trade-in, and catalog data (deployment copy).
 * Mirrors backend/device-service/src/data/devices.js.
 */

export const eligibilityByAccount = {
  "ACC-100245": {
    eligible: true,
    reason: "Device fully paid off and contract within upgrade window.",
    eligibleDate: "2025-05-01",
    currentDevice: "iPhone 13 Pro",
    upgradeProgramPercentComplete: 100
  },
  "ACC-100246": {
    eligible: false,
    reason: "Device payment plan still active. Eligible after 50% paid off.",
    eligibleDate: "2025-11-15",
    currentDevice: "Samsung Galaxy S22",
    upgradeProgramPercentComplete: 42
  },
  "ACC-100247": {
    eligible: true,
    reason: "Enrolled in Go5G Next — upgrade available every year.",
    eligibleDate: "2025-02-01",
    currentDevice: "iPhone 14",
    upgradeProgramPercentComplete: 100
  },
  "ACC-100248": {
    eligible: false,
    reason: "Recent device purchase. Trade-in upgrade available after 12 months.",
    eligibleDate: "2026-08-01",
    currentDevice: "Google Pixel 7",
    upgradeProgramPercentComplete: 18
  }
};

export const accountIdByPhone = {
  "2065550142": "ACC-100245",
  "3125550188": "ACC-100246",
  "6465550107": "ACC-100247",
  "4155550173": "ACC-100248"
};

export const tradeInValues = {
  "iphone 13 pro": { model: "iPhone 13 Pro", baseValue: 430, condition: "Good", currency: "USD" },
  "iphone 14": { model: "iPhone 14", baseValue: 480, condition: "Good", currency: "USD" },
  "samsung galaxy s22": { model: "Samsung Galaxy S22", baseValue: 310, condition: "Good", currency: "USD" },
  "google pixel 7": { model: "Google Pixel 7", baseValue: 260, condition: "Good", currency: "USD" },
  "iphone 12": { model: "iPhone 12", baseValue: 240, condition: "Good", currency: "USD" },
  "samsung galaxy s21": { model: "Samsung Galaxy S21", baseValue: 200, condition: "Good", currency: "USD" }
};

export const recommendedDevices = [
  {
    id: "DEV-IP16PRO",
    name: "iPhone 16 Pro",
    brand: "Apple",
    storage: "256GB",
    color: "Desert Titanium",
    retailPrice: 1099.99,
    monthlyPrice: 45.83,
    promo: "Up to $830 off with eligible trade-in",
    image: "📱"
  },
  {
    id: "DEV-S24ULTRA",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    storage: "256GB",
    color: "Titanium Black",
    retailPrice: 1299.99,
    monthlyPrice: 54.16,
    promo: "Up to $1000 off with eligible trade-in",
    image: "📱"
  },
  {
    id: "DEV-PIX9PRO",
    name: "Google Pixel 9 Pro",
    brand: "Google",
    storage: "128GB",
    color: "Obsidian",
    retailPrice: 999.99,
    monthlyPrice: 41.66,
    promo: "Up to $700 off with eligible trade-in",
    image: "📱"
  },
  {
    id: "DEV-IP16",
    name: "iPhone 16",
    brand: "Apple",
    storage: "128GB",
    color: "Ultramarine",
    retailPrice: 829.99,
    monthlyPrice: 34.58,
    promo: "Up to $730 off with eligible trade-in",
    image: "📱"
  }
];

export function resolveAccountId(identifier) {
  if (!identifier) return undefined;
  const normalized = String(identifier).trim();
  if (eligibilityByAccount[normalized.toUpperCase()]) {
    return normalized.toUpperCase();
  }
  const digitsOnly = normalized.replace(/\D/g, "");
  return accountIdByPhone[digitsOnly];
}

export function lookupTradeIn(model) {
  if (!model) return undefined;
  const key = String(model).trim().toLowerCase();
  return tradeInValues[key];
}
