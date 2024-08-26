import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCompanies } from "@api/get-companies";
import { getCompanyLocations } from "@api/get-company-locations";
import { getCompanyAssets } from "@api/get-company-assets";

import Header from "./Header";
import capitalize from "lodash.capitalize";
import { ToggleButton } from "@components/ToggleButton";

import ThunderboltIcon from "@assets/icons/Thunderbolt.svg";
import ExclamationCircleIcon from "@assets/icons/ExclamationCircle.svg";

export function AssetsPage() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(
    localStorage.getItem("@tractian/selectedCompany")
  );

  const {
    data: companies,
    isLoading: companiesIsLoading,
    status: getCompaniesStatus,
    refetch: refetchCompanies,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
    staleTime: Infinity,
  });

  const { data: locations, status: getLocationsStatus } = useQuery({
    queryKey: ["locations", selectedCompany],
    queryFn: () => getCompanyLocations(selectedCompany),
    staleTime: Infinity,
    enabled: !!selectedCompany,
  });

  const { data: assets, status: getAssetsStatus } = useQuery({
    queryKey: ["assets", selectedCompany],
    queryFn: () => getCompanyAssets(selectedCompany),
    staleTime: Infinity,
    enabled: !!selectedCompany,
  });

  const selectedCompanyName = useMemo(() => {
    if (!selectedCompany) return null;

    return companies?.find((company) => company.id === selectedCompany)?.name;
  }, [companies, selectedCompany]);

  useEffect(() => {
    if (getCompaniesStatus === "error") {
      console.error("Failed to fetch companies");
    }

    if (getLocationsStatus === "error" || getAssetsStatus === "error") {
      console.error("Failed to fetch locations or assets");
    }
  }, [getCompaniesStatus, getLocationsStatus, getAssetsStatus]);

  return (
    <main className="h-screen bg-gray-lightest flex flex-col">
      <Header
        companies={companies ?? []}
        isLoading={companiesIsLoading}
        refetch={refetchCompanies}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />
      <section className="rounded-md border border-gray-light m-2 bg-white h-10 flex-1 overflow-auto p-4 font-inter">
        <header className="flex justify-between items-center">
          {selectedCompany && (
            <>
              <h2 className="text-xl font-semibold text-gray-darkest">
                Ativos{" "}
                <span className="text-sm font-light text-gray-darker">
                  / {capitalize(selectedCompanyName as string)} Unit
                </span>
              </h2>
              <div className="flex items-center gap-2">
                <ToggleButton color="ghost" className="px-4 py-1.5 text-sm">
                  <img
                    src={ThunderboltIcon}
                    alt="Thunderbolt"
                    className="size-4"
                  />
                  <span>Sensor de Energia</span>
                </ToggleButton>
                <ToggleButton color="ghost" className="px-4 py-1.5 text-sm">
                  <img
                    src={ExclamationCircleIcon}
                    alt="ExclamationCircle"
                    className="size-4"
                  />
                  <span>Crítico</span>
                </ToggleButton>
              </div>
            </>
          )}
        </header>
        {/**
         * Render Asset Tree and Preview here
         */}
      </section>
    </main>
  );
}
