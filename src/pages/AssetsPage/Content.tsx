import { ToggleButton } from "@components/ToggleButton";
import capitalize from "lodash.capitalize";
import { useQuery } from "@tanstack/react-query";

import ThunderboltIcon from "@assets/icons/Thunderbolt.svg";
import ExclamationCircleIcon from "@assets/icons/ExclamationCircle.svg";

import { getCompanyLocations } from "@api/get-company-locations";
import { getCompanyAssets } from "@api/get-company-assets";
import { useSearchParams } from "react-router-dom";
import { Searchbar } from "./components/Searchbar";
import { twMerge } from "tailwind-merge";
import { EmptyContent } from "@pages/EmptyContent";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  AssetTree,
  AssetTreeBuilder,
  filterTree,
  TreeNode,
} from "@lib/utils";
import { AssetTreeView } from "./components/AssetTreeView";
import { DisplayComponent } from "./components/DisplayComponent";

interface ContentProps {
  company: {
    id: string | null;
    name: string | null;
  };
}

export function Content({ company }: Readonly<ContentProps>) {
  const [selectedCompany, setSelectedCompany] = useState<TreeNode | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: locations, status: getLocationsStatus } = useQuery({
    queryKey: ["locations", company.id],
    queryFn: () => getCompanyLocations(company.id),
    staleTime: Infinity,
    enabled: !!company.id,
  });

  const { data: assets, status: getAssetsStatus } = useQuery({
    queryKey: ["assets", company.id],
    queryFn: () => getCompanyAssets(company.id),
    staleTime: Infinity,
    enabled: !!company.id,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const assetTree = useMemo(() => {
    if (!locations || !assets) return [];

    const assetTreeBuilder = new AssetTreeBuilder()
    assetTreeBuilder.buildTree({
      data: [...locations, ...assets],
    });

    return assetTreeBuilder.outputTree
  }, [locations, assets]);

  const filteredTree = useMemo(() => {
    if (!assetTree?.length) return assetTree;

    const sensorType = searchParams.get("sensorType");
    const status = searchParams.get("status");
    const name = searchParams.get("name");

    if (!sensorType && !status && !name) return assetTree;

    // iterar sobre a árvore e filtrar os nós
    return assetTree
      .map((node) => filterTree(node, sensorType, status, name))
      .filter((node) => node !== null) as AssetTree;
  }, [assetTree, searchParams]);

  const handleNodeClick = useCallback((node: TreeNode) => {
    if (node.get("sensorType")) {
      return setSelectedCompany((prev) => {
        if (prev?.get("id") === node.get("id")) return null;
        return node;
      });
    }
  }, []);

  const setNameSearchParam = useCallback(() => {
    const inputValue = inputRef.current?.value;
    const currentName = searchParams.get("name");

    if (inputValue === currentName) return;

    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);

      if (!inputValue) {
        newParams.delete("name");
        return newParams;
      }

      newParams.set("name", inputValue);
      return newParams;
    });
  }, [searchParams, setSearchParams]);

  if (!company.id) {
    return (
      <div className="flex items-center justify-center size-full flex-col gap-6 ">
        <h3 className="text-lg font-semibold text-gray-darker">
          Selecione uma unidade
        </h3>
      </div>
    );
  }

  if (getLocationsStatus === "pending" || getAssetsStatus === "pending") {
    return (
      <div className="flex items-center justify-center size-full flex-col gap-6 ">
        <h3 className="text-lg font-semibold text-gray-darker">
          Carregando...
        </h3>
      </div>
    );
  }

  const toggleSensorType = () => {
    const sensorType = searchParams.get("sensorType");

    if (sensorType === "energy") {
      setSearchParams((params) => {
        params.delete("sensorType");
        return params;
      });
    } else {
      setSearchParams((params) => {
        const newParams = new URLSearchParams(params);
        newParams.set("sensorType", "energy");
        return newParams;
      });
    }
  };

  const toggleStatus = () => {
    const status = searchParams.get("status");

    if (status === "critical") {
      setSearchParams((params) => {
        params.delete("status");
        return params;
      });
    } else {
      setSearchParams((params) => {
        const newParams = new URLSearchParams(params);
        newParams.set("status", "critical");
        return newParams;
      });
    }
  };

  return (
    <>
      <header className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-darkest flex items-center justify-center gap-[7px]">
          Ativos{" "}
          <span className="text-sm font-light text-gray-darker">
            / {capitalize(company.name!)} Unit
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <ToggleButton
            color="ghost"
            toggled={searchParams.get("sensorType") === "energy"}
            onClick={toggleSensorType}
            className="px-4 py-1.5 text-sm"
          >
            <ThunderboltIcon
              className={twMerge(
                "size-4 ghost-toggle-button",
                searchParams.get("sensorType") === "energy" && "toggled"
              )}
            />
            <span>Sensor de Energia</span>
          </ToggleButton>
          <ToggleButton
            color="ghost"
            toggled={searchParams.get("status") === "critical"}
            onClick={toggleStatus}
            className="px-4 py-1.5 text-sm"
          >
            <ExclamationCircleIcon
              className={twMerge(
                "size-4 ghost-toggle-button",
                searchParams.get("status") === "critical" && "toggled"
              )}
            />
            <span>Crítico</span>
          </ToggleButton>
        </div>
      </header>
      <div className="flex items-center flex-1 gap-2">
        <div className="border border-gray-light rounded-sm flex-1 h-full">
          <Searchbar
            placeholder="Buscar Ativo ou Local"
            onChange={() => {}}
            submitFn={setNameSearchParam}
            inputRef={inputRef}
          />
          <AssetTreeView
            tree={filteredTree}
            onNodeClick={handleNodeClick}
            selectedComponentId={selectedCompany?.get("id") as string}
          />
        </div>
        <div className="border border-gray-light rounded-sm flex-[2] h-full">
          {selectedCompany ? (
            <DisplayComponent data={selectedCompany} />
          ) : (
            <EmptyContent
              message="Selecione um Ativo para visualizar mais detalhes"
              svgClassName="fill-gray-medium h-20 w-20"
            />
          )}
        </div>
      </div>
    </>
  );
}
