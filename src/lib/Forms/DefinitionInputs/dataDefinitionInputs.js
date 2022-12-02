export const dataDefinitionInputs = (dataParameters = []) => {
  return dataParameters.map((data) => ({
    name: data?.name,
    type: data?.type,
    label: data?.label,
    required: data?.required,
    layout: {
      write: 'gap-y-md'
    },
    ...data
  }));
};
