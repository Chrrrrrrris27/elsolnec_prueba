import { QueryFunction, QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QUERY_CONFIG } from "src/config/queryConfig";

export function useFetchQuery<T>(
  queryKey: QueryKey,
  queryFn: QueryFunction<T>,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) {
  return useQuery<T>({
    queryKey,
    queryFn,
    staleTime: QUERY_CONFIG.STALE_TIME,
    retry: QUERY_CONFIG.RETRY,
    ...options,
  });
}