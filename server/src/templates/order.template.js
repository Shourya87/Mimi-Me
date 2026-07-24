const orderTemplate = (order) => {
  const items = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;color:#555;">
            ${item.title} × ${item.quantity}
          </td>
          <td align="right" style="padding:8px 0;color:#222;font-weight:bold;">
            ₹${item.discountPrice * item.quantity}
          </td>
        </tr>
      `
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Order Confirmation</title>
    </head>

    <body style="margin:0;padding:2px;background:#f5f5f5;font-family:Arial,sans-serif;">

      <table
        align="center"
        width="600"
        cellpadding="0"
        cellspacing="0"
        style="background:#ffffff;border-radius:12px;padding:15px;"
      >

        <tr>
          <td align="center">
            <h2 style="margin:0;color:#222;">
              Thank You for Your Order 💛
            </h2>

            <p style="margin-top:8px;color:#666;font-size:16px;">
              Your order has been placed successfully.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding-top:25px;color:#555;font-size:16px;line-height:1.7;">

            <p>
              Hi <strong>${order.shippingAddress.fullName}</strong>,
            </p>

            <p>
              We've received your order and it's now being processed.
            </p>

            <table width="100%" style="margin:25px 0;border-collapse:collapse;">

              <tr>
                <td><strong>Order Number</strong></td>
                <td align="right">${order.orderNumber}</td>
              </tr>

              <tr>
                <td><strong>Payment Method</strong></td>
                <td align="right">${order.paymentMethod}</td>
              </tr>

            </table>

            <hr style="border:none;border-top:1px solid #eee;">

            <h3 style="color:#222;">Order Summary</h3>

            <table width="100%" style="border-collapse:collapse;">

              ${items}

              <tr>
                <td style="padding-top:15px;">
                  <strong>Subtotal</strong>
                </td>

                <td align="right" style="padding-top:15px;">
                  ₹${order.subtotal}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Shipping</strong>
                </td>

                <td align="right">
                  ${
                    order.shippingFee === 0
                      ? "Free"
                      : `₹${order.shippingFee}`
                  }
                </td>
              </tr>

              <tr>
                <td style="padding-top:10px;font-size:18px;">
                  <strong>Total</strong>
                </td>

                <td
                  align="right"
                  style="padding-top:10px;font-size:18px;font-weight:bold;"
                >
                  ₹${order.totalAmount}
                </td>
              </tr>

            </table>

            <hr style="border:none;border-top:1px solid #eee;margin:25px 0;">

            <h3 style="color:#222;">Shipping Address</h3>

            <p>
              ${order.shippingAddress.address}<br>
              ${order.shippingAddress.city},
              ${order.shippingAddress.state} -
              ${order.shippingAddress.pincode}
            </p>

            <p>
              We'll send you another email as soon as your order is shipped.
            </p>

            <p style="margin-top:30px;">
              Thank you for choosing <strong>Mimi & Me</strong>. 🌸
            </p>

            <p>
              — Mimi & Me Team
            </p>

          </td>
        </tr>

      </table>

    </body>
  </html>
  `;
};

module.exports = orderTemplate;