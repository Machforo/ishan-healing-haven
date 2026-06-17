import { useQuery } from "@tanstack/react-query";

export function useHospitalData(endpoint: string) {
  return useQuery({
    queryKey: ["hospital", endpoint],
    queryFn: async () => {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiBase}/hospital/${endpoint}`);
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
