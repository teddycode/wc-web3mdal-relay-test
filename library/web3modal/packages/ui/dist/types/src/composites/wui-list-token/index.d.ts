import { LitElement } from 'lit';
import '../../components/wui-text/index.js';
import '../../components/wui-image/index.js';
import '../../layout/wui-flex/index.js';
export declare class WuiListToken extends LitElement {
    static styles: import("lit").CSSResult[];
    tokenName: string;
    tokenImageUrl: string;
    tokenValue: number;
    tokenAmount: string;
    tokenCurrency: string;
    clickable: boolean;
    render(): import("lit-html").TemplateResult<1>;
    visualTemplate(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-list-token': WuiListToken;
    }
}
