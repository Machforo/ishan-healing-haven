import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://ishan-backend-g096.onrender.com/api/hospital";

export function useHospitalData(endpoint: string) {
  return useQuery({
    queryKey: ["hospital", endpoint],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
      }
      const data = await response.json();
      return data.data || data; // Backend usually wraps responses in { data: ... }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
