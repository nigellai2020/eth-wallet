export declare const EIP712DomainAbi: {
    name: string;
    type: string;
}[];
export declare const TYPED_MESSAGE_SCHEMA: {
    type: string;
    properties: {
        types: {
            type: string;
            additionalProperties: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        name: {
                            type: string;
                        };
                        type: {
                            type: string;
                        };
                    };
                    required: string[];
                };
            };
        };
        primaryType: {
            type: string;
        };
        domain: {
            type: string;
        };
        message: {
            type: string;
        };
    };
    required: string[];
};
