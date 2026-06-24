/**
 * In-memory account store (deployment copy used by the Vercel functions).
 * Mirrors backend/account-service/src/data/accounts.js.
 */

export const accounts = [
  {
    accountId: "ACC-100245",
    phoneNumber: "206-555-0142",
    customer: {
      firstName: "Maria",
      lastName: "Hernandez",
      email: "maria.hernandez@example.com",
      memberSince: "2017-03-12",
      loyaltyTier: "Magenta Plus"
    },
    plan: { name: "Go5G Plus", monthlyPrice: 90.0, autopayDiscount: true },
    contract: { startDate: "2023-05-01", endDate: "2025-05-01", termMonths: 24 },
    billing: {
      currency: "USD",
      remainingDeviceBalance: 0.0,
      accountBalance: 0.0,
      lastPaymentDate: "2026-06-01"
    },
    device: {
      model: "iPhone 13 Pro",
      storage: "256GB",
      purchaseDate: "2023-05-01",
      imei: "356938035643809"
    }
  },
  {
    accountId: "ACC-100246",
    phoneNumber: "312-555-0188",
    customer: {
      firstName: "James",
      lastName: "Okafor",
      email: "james.okafor@example.com",
      memberSince: "2020-09-23",
      loyaltyTier: "Magenta"
    },
    plan: { name: "Go5G", monthlyPrice: 75.0, autopayDiscount: true },
    contract: { startDate: "2024-11-15", endDate: "2026-11-15", termMonths: 24 },
    billing: {
      currency: "USD",
      remainingDeviceBalance: 432.5,
      accountBalance: 75.0,
      lastPaymentDate: "2026-06-05"
    },
    device: {
      model: "Samsung Galaxy S22",
      storage: "128GB",
      purchaseDate: "2024-11-15",
      imei: "356938035643810"
    }
  },
  {
    accountId: "ACC-100247",
    phoneNumber: "646-555-0107",
    customer: {
      firstName: "Aisha",
      lastName: "Patel",
      email: "aisha.patel@example.com",
      memberSince: "2015-01-08",
      loyaltyTier: "Magenta Plus"
    },
    plan: { name: "Go5G Next", monthlyPrice: 100.0, autopayDiscount: true },
    contract: { startDate: "2024-02-01", endDate: "2026-02-01", termMonths: 24 },
    billing: {
      currency: "USD",
      remainingDeviceBalance: 0.0,
      accountBalance: 0.0,
      lastPaymentDate: "2026-06-02"
    },
    device: {
      model: "iPhone 14",
      storage: "128GB",
      purchaseDate: "2024-02-01",
      imei: "356938035643811"
    }
  },
  {
    accountId: "ACC-100248",
    phoneNumber: "415-555-0173",
    customer: {
      firstName: "Daniel",
      lastName: "Kim",
      email: "daniel.kim@example.com",
      memberSince: "2021-06-30",
      loyaltyTier: "Magenta"
    },
    plan: { name: "Essentials", monthlyPrice: 60.0, autopayDiscount: false },
    contract: { startDate: "2025-08-01", endDate: "2027-08-01", termMonths: 24 },
    billing: {
      currency: "USD",
      remainingDeviceBalance: 689.99,
      accountBalance: 120.0,
      lastPaymentDate: "2026-05-28"
    },
    device: {
      model: "Google Pixel 7",
      storage: "128GB",
      purchaseDate: "2025-08-01",
      imei: "356938035643812"
    }
  }
];

export function findAccount(identifier) {
  if (!identifier) return undefined;
  const normalized = String(identifier).trim();
  const digitsOnly = normalized.replace(/\D/g, "");

  return accounts.find((account) => {
    const accountMatch = account.accountId.toLowerCase() === normalized.toLowerCase();
    const phoneMatch =
      digitsOnly.length > 0 && account.phoneNumber.replace(/\D/g, "") === digitsOnly;
    return accountMatch || phoneMatch;
  });
}
