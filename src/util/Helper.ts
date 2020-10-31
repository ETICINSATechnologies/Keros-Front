import { Position } from "../models/core/Position";

export function queryStringify(data: any) {
  const ret = [];
  for (const d in data) {
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  }
  return ret.join("&");
}

export function isSGorRespHR(positions: Position[]) {
  return positions.some(function (pos: Position) {
    return 22 === pos.id || 19 === pos.id;
  });
}

// export function payment(memberId: string, memberEmail: string) {
//   // @ts-ignore
//   const stripe = window.Stripe("pk_test_UWQd9XAAsaeHLxDD6lQe7lVX");
//   stripe
//       .redirectToCheckout({
//         items: [{ sku: "sku_HEzuOFHM8WByb8", quantity: 1 }],
//         successUrl: "http://localhost:8080/paymentSuccessful",
//         cancelUrl: "http://localhost:8080/paymentCancelled",
//         clientReferenceId: memberId.toString(),
//         customerEmail: memberEmail
//       })
//       .then(function (result: any) {
//         result.error.message = "Il y avait une erreur dans la redirection vers le paiement";
//       });
// }

// export const payment = (member: any) => {
//   // @ts-ignore
//     const stripe = window.Stripe(Config.getStripeApiPK());
//   stripe
//       .redirectToCheckout({
//         items: [{ sku: Config.getSubscriptionFeeProductId(), quantity: 1 }],
//         successUrl: "/paymentSuccessful",
//         cancelUrl: "/paymentCancelled",
//         clientReferenceId: member.id.toString(),
//         customerEmail: member.email
//       })
//       .then(function (result: any) {
//         result.error.message = "Il y avait une erreur dans la redirection vers le paiement";
//       });
// };

