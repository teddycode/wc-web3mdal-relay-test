import { IJsonRpcConnection } from "@walletconnect/jsonrpc-types";
import { SignClientTypes, ISignClient, ProposalTypes } from "@walletconnect/types";
export declare const SIGNER_EVENTS: {
    init: string;
    uri: string;
    created: string;
    updated: string;
    deleted: string;
    event: string;
};
export declare type SignerConnectionClientOpts = ISignClient | SignClientTypes.Options;
export interface SignerConnectionOpts {
    requiredNamespaces?: ProposalTypes.RequiredNamespaces;
    client?: SignerConnectionClientOpts;
}
export declare class SignerConnection extends IJsonRpcConnection {
    events: any;
    requiredNamespaces: ProposalTypes.RequiredNamespaces;
    private pending;
    private session;
    private opts;
    private client?;
    private initializing;
    constructor(opts?: SignerConnectionOpts);
    get connected(): boolean;
    get connecting(): boolean;
    get chains(): string[];
    get accounts(): string[];
    on(event: string, listener: any): void;
    once(event: string, listener: any): void;
    off(event: string, listener: any): void;
    removeListener(event: string, listener: any): void;
    open(): Promise<void>;
    close(): Promise<void>;
    send(payload: any, context?: any): Promise<void>;
    private register;
    private onOpen;
    private onClose;
    private registerEventListeners;
}
export default SignerConnection;
//# sourceMappingURL=index.d.ts.map