import { CampaignObj } from "@/types/repository/campaign";
import { useRoute, useFetch } from "@/node_modules/nuxt/dist/app";

export const useCampaign = (ApiBaseUrl: string) => {
  const route = useRoute();

  const fetchCampaign = async () => {
    return useFetch<Promise<CampaignObj>>(
      `${ApiBaseUrl}campaign/${route.params.id}`
    );
  };

  const createCampaign = async () => {
    return useFetch<Promise<CampaignObj>>(`${ApiBaseUrl}campaign`, {
      method: "POST",
    });
  };

  return {
    fetchCampaign,
    createCampaign,
  };
};
