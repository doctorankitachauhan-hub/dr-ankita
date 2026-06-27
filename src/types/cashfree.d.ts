declare module "@cashfreepayments/cashfree-js" {
    export interface CashfreeCheckoutOptions {
        paymentSessionId: string;
        redirectTarget?: "_self" | "_blank" | "_modal";
    }

    export interface CashfreeCheckoutResult {
        error?: {
            message: string;
            code?: string;
            type?: string;
        };
        redirect?: boolean;
        paymentDetails?: {
            paymentMessage: string;
        };
    }

    export interface CashfreeInstance {
        checkout(options: CashfreeCheckoutOptions): Promise<CashfreeCheckoutResult>;
    }

    export function load(options: {
        mode: "sandbox" | "production";
    }): Promise<CashfreeInstance>;
}