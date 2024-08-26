import { api } from "@lib/axios";
import Asset from "@models/Asset";

type GetCompanyAssetsResponse = Asset[];

export async function getCompanyAssets(companyId: string | null) {
  if (!companyId) {
    throw new Error("Company ID is required");
  }

  const response = await api.get<GetCompanyAssetsResponse>(
    `/companies/${companyId}/assets`
  );

  return response.data;
}
