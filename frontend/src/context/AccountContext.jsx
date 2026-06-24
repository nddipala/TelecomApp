import { createContext, useContext, useState, useCallback } from "react";
import { fetchAccount, fetchEligibility } from "../services/upgradeService.js";

/**
 * Holds the currently looked-up account and its eligibility data so the
 * dashboard, eligibility card, and upgrade form can all share one source of
 * truth without prop-drilling.
 */
const AccountContext = createContext(null);

export function AccountProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch account + eligibility together (calls two independent microservices).
  const lookupAccount = useCallback(async (identifier) => {
    setLoading(true);
    setError(null);
    try {
      const [accountData, eligibilityData] = await Promise.all([
        fetchAccount(identifier),
        fetchEligibility(identifier)
      ]);
      setAccount(accountData);
      setEligibility(eligibilityData);
      return accountData;
    } catch (err) {
      setAccount(null);
      setEligibility(null);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setAccount(null);
    setEligibility(null);
    setError(null);
  }, []);

  return (
    <AccountContext.Provider
      value={{ account, eligibility, loading, error, lookupAccount, reset }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
}
