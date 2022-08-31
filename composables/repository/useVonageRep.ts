import { GenerateTokenType } from "@/types/repository/vonageRep";

export const useVonageRep = (ApiBaseUrl: string, sessionId: string) => {
  const generateToken = async () => {
    return useFetch<GenerateTokenType>(`${ApiBaseUrl}/vonage/generate-token`, {
      method: "POST",
      body: {
        sessionId: sessionId,
        role: "moderator",
      },
    });
  };

  return {
    generateToken,
  };
};
