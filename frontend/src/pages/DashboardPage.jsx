import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAccount } from "../context/AccountContext.jsx";
import AccountSummaryCard from "../components/AccountSummaryCard.jsx";
import EligibilityCard from "../components/EligibilityCard.jsx";
import TradeInCard from "../components/TradeInCard.jsx";
import DeviceCard from "../components/DeviceCard.jsx";
import UpgradeForm from "../components/UpgradeForm.jsx";

/**
 * Main workspace shown after a successful lookup. Composes every card:
 * account summary, eligibility, trade-in estimator, recommended devices,
 * and the upgrade submission form.
 */
export default function DashboardPage() {
  const { account, eligibility } = useAccount();
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [tradeIn, setTradeIn] = useState(null);

  // No account loaded (e.g. direct navigation / refresh) — send back to lookup.
  if (!account || !eligibility) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <AccountSummaryCard account={account} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <EligibilityCard eligibility={eligibility} />
        <TradeInCard
          defaultModel={account.device.model}
          onValueResolved={setTradeIn}
        />
      </div>

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="text-lg font-bold text-ink">Recommended Upgrades</h3>
          <p className="text-sm text-gray-500">Select a device to continue</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {eligibility.recommendedDevices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              selected={selectedDevice?.id === device.id}
              onSelect={setSelectedDevice}
            />
          ))}
        </div>
      </section>

      <UpgradeForm account={account} selectedDevice={selectedDevice} tradeIn={tradeIn} />
    </div>
  );
}
