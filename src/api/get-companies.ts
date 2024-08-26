import { api } from "@lib/axios";
import Company from "@models/Company";

type GetCompaniesResponse = Company[];

export async function getCompanies() {
  const response = await api.get<GetCompaniesResponse>("/companies");

  return response.data;
}
