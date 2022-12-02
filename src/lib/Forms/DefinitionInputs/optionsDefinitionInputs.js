export const optionsDefinitionInputs = [
    {
        name: 'data.options',
        type: 'editableList',
        label: 'Options',
        required: true,
        layout: {
            write: 'gap-y-md'
        },
        data: {
            editItem: () => undefined,
            deleteItem: () => undefined,
            form: {
                inputs: [
                    {
                        name: 'label',
                        type: 'text',
                        label: 'Label'
                    },
                    {
                        name: 'value',
                        type: 'text',
                        label: 'Value'
                    }
                ]
            }
        }
    }
];
