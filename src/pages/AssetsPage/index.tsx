import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCompanies } from "@api/get-companies";
import { getCompanyLocations } from "@api/get-company-locations";
import { getCompanyAssets } from "@api/get-company-assets";

import Header from "./Header";

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
      <section className="rounded-md border border-gray-light m-2 bg-white h-10 flex-1 overflow-auto">
        {/**
         * Render Asset Tree and Preview here
         */}
      </section>
    </main>
  );
}
