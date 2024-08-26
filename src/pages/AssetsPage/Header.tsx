import { useCallback, useState } from "react";
import capitalize from "lodash.capitalize";

import Company from "@models/Company";
import { ToggleButton } from "@components/ToggleButton";
import { Loader } from "@components/Loader";

import TractianLogo from "@assets/logo.svg";
import GoldIcon from "@assets/icons/Gold.svg";
import RetryIcon from "@assets/icons/retry.svg";

interface HeaderProps {
  companies: Company[];
  isLoading: boolean;
  refetch: () => void;
  selectedCompany: string | null;
  setSelectedCompany: (company: string) => void;
}

function RetryButton({
  isLoading,
  onClick,
}: Readonly<{
  isLoading: boolean;
  onClick: () => void;
}>) {
  const [cooldown, setCooldown] = useState(0);

  const countDown = (seconds: number) => {
    setCooldown(seconds);

    if (seconds === 0) {
      return;
    }

    setTimeout(() => {
      countDown(seconds - 1);
    }, 1000);
  };

  const handleClick = () => {
    if (!isLoading || cooldown === 0) onClick();
    countDown(9);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader key={"header-refresh-button"} />;
    }

    if (cooldown > 0) {
      return (
        <span className="font-inter font-semibold text-xs text-gray-darker">
          {cooldown}
        </span>
      );
    }

    return <img src={RetryIcon} alt="Unit" className="size-2.5" />;
  };

  return (
    <button
      className="py-1 px-2.5 flex items-center justify-center bg-blue-secondary rounded-sm disabled:bg-gray-300"
      disabled={isLoading || cooldown > 0}
      onClick={handleClick}
    >
      {renderContent()}
    </button>
  );
}

export default function Header({
  companies,
  isLoading,
  refetch,
  setSelectedCompany,
  selectedCompany,
}: Readonly<HeaderProps>) {
  const companyButtons = useCallback(() => {
    if (!companies) return null;

    const sortedCompanies = [...companies].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return sortedCompanies.map((company) => (
      <ToggleButton
        key={company.id}
        className="text-xs"
        onClick={() => {
          setSelectedCompany(company.id);
          localStorage.setItem("@tractian/selectedCompany", company.id);
        }}
        toggled={company.id === selectedCompany}
      >
        <img src={GoldIcon} alt="Unit" /> {`${capitalize(company.name)} Unit`}
      </ToggleButton>
    ));
  }, [companies, setSelectedCompany, selectedCompany]);

  return (
    <header className="bg-blue-dark px-4 py-3 flex items-center justify-between">
      <img src={TractianLogo} alt="Tractian" />
      <div className="flex gap-2.5">
        <RetryButton isLoading={isLoading} onClick={refetch} />
        {companyButtons()}
      </div>
    </header>
  );
}
