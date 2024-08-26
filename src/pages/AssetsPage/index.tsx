import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCompanies } from "@api/get-companies";

import Header from "./Header";
import { Content } from "./Content";

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

  const selectedCompanyName = useMemo(() => {
    if (!selectedCompany) return null;

    return (
      companies?.find((company) => company.id === selectedCompany)?.name ?? null
    );
  }, [companies, selectedCompany]);

  useEffect(() => {
    if (getCompaniesStatus === "error") {
      console.error("Failed to fetch companies");
    }
  }, [getCompaniesStatus]);

  return (
    <main className="h-screen w-sc bg-gray-lightest flex flex-col">
      <Header
        companies={companies ?? []}
        isLoading={companiesIsLoading}
        refetch={refetchCompanies}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />
      <section className="rounded-md border border-gray-light m-2 bg-white h-10 flex-1 overflow-auto p-4 font-inter flex flex-col gap-3">
        <Content
          company={{
            id: selectedCompany,
            name: selectedCompanyName,
          }}
        />
      </section>
    </main>
  );
}
