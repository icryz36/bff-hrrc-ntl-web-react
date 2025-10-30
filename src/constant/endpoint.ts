const endpoint = {
  exampleFeature: {
    list: `api/list`,
    create: `api/create`,
    detail: (id: string) => `api/${id}`,
    // etc..
  },
};

export { endpoint };
