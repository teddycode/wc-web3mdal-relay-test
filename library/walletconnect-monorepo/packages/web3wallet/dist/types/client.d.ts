import { IWeb3Wallet, Web3WalletTypes } from "./types";
export declare class Web3Wallet extends IWeb3Wallet {
    name: IWeb3Wallet["name"];
    core: IWeb3Wallet["core"];
    logger: IWeb3Wallet["logger"];
    events: IWeb3Wallet["events"];
    engine: IWeb3Wallet["engine"];
    metadata: IWeb3Wallet["metadata"];
    static notifications: Web3WalletTypes.INotifications;
    signConfig: IWeb3Wallet["signConfig"];
    static init(opts: Web3WalletTypes.Options): Promise<Web3Wallet>;
    constructor(opts: Web3WalletTypes.Options);
    on: IWeb3Wallet["on"];
    once: IWeb3Wallet["once"];
    off: IWeb3Wallet["off"];
    removeListener: IWeb3Wallet["removeListener"];
    pair: IWeb3Wallet["pair"];
    approveSession: IWeb3Wallet["approveSession"];
    rejectSession: IWeb3Wallet["rejectSession"];
    updateSession: IWeb3Wallet["updateSession"];
    extendSession: IWeb3Wallet["extendSession"];
    respondSessionRequest: IWeb3Wallet["respondSessionRequest"];
    disconnectSession: IWeb3Wallet["disconnectSession"];
    emitSessionEvent: IWeb3Wallet["emitSessionEvent"];
    getActiveSessions: IWeb3Wallet["getActiveSessions"];
    getPendingSessionProposals: IWeb3Wallet["getPendingSessionProposals"];
    getPendingSessionRequests: IWeb3Wallet["getPendingSessionRequests"];
    respondAuthRequest: IWeb3Wallet["respondAuthRequest"];
    getPendingAuthRequests: IWeb3Wallet["getPendingAuthRequests"];
    formatMessage: IWeb3Wallet["formatMessage"];
    registerDeviceToken: IWeb3Wallet["registerDeviceToken"];
    approveSessionAuthenticate: IWeb3Wallet["approveSessionAuthenticate"];
    rejectSessionAuthenticate: IWeb3Wallet["rejectSessionAuthenticate"];
    formatAuthMessage: IWeb3Wallet["formatAuthMessage"];
    private initialize;
}
//# sourceMappingURL=client.d.ts.map