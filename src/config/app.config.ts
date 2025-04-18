
export const AppConfig = {
    endpoints: [
        "/open-finance/account-information/v1.1/account-access-consents:GET",
        "/open-finance/payment/v1.1/payment-consents:GET",
        "/open-finance/payment/v1.1/payments:GET",
        "/open-finance/payment/v1.1/file-payments:GET",
        "/open-finance/confirmation-of-payee/v1.1/discovery:POST",
        "/open-finance/insurance/v1.1/insurance-consents:GET",
    ],
    peerToPeerTypes: [
        "Collection",
        "LargeValueCollection",
        "PushP2P",
        "PullP2PPayment",
    ],
    paymentTypeConsents: [
        "single-immediate-payment",
        "multi-payment",
        "future-dated-payment",
    ],
    discount: 200,
    aedConstant: 100,
};
