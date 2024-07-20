import type { SIWECreateMessageArgs, SIWEVerifyMessageArgs, SIWEConfig, SIWEClientMethods, SIWESession, SIWEMessageArgs } from '../core/utils/TypeUtils.js';
import type { SIWEControllerClient } from '../core/controller/SIWEController.js';
export declare class Web3ModalSIWEClient {
    options: SIWEControllerClient['options'];
    methods: SIWEClientMethods;
    constructor(siweConfig: SIWEConfig);
    getNonce(address?: string): Promise<string>;
    getMessageParams?(): Promise<SIWEMessageArgs>;
    createMessage(args: SIWECreateMessageArgs): string;
    verifyMessage(args: SIWEVerifyMessageArgs): Promise<boolean>;
    getSession(): Promise<SIWESession>;
    signIn(): Promise<SIWESession>;
    signOut(): Promise<boolean>;
}
