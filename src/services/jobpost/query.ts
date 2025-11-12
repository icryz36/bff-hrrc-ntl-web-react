// ----------------------------------------------------------------------

const useJobpostQuery = {
  keys: () => ['jobpost'] as const,

  // postStatus: () =>
  //   queryOptions({
  //     queryKey: [...useMasterDataQuery.keys(), endpoint.masterData.postStatus],
  //     queryFn: () => fetchPostStatus(),
  //     select: (response) => response.data,
  //   }),
};

export { useJobpostQuery };
