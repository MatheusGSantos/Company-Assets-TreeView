import { api } from "@lib/axios";
import Location from "@models/Location";

type GetCompanyLocationsResponse = Location[];

export async function getCompanyLocations(companyId: string | null) {
  if (!companyId) {
    throw new Error("Company ID is required");
  }

  const response = await api.get<GetCompanyLocationsResponse>(
    `/locations?companyId=${companyId}`
  );

  return response.data;
}
