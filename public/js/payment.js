function payMembershipFee(clientReferenceId, customerEmail, apiKey, productId) {
  const stripe = window.Stripe(apiKey);
  stripe.redirectToCheckout({
    items: [{
      sku: productId,
      quantity: 1
    }],
    clientReferenceId,
    customerEmail,
    successUrl: `${window.location.origin}`,
    cancelUrl: `${window.location.origin}`
  });
}
