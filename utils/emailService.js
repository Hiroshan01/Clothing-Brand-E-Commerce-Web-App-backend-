import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

function formatCurrency(amount) {
    return `Rs. ${amount.toFixed(2)}`;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Generate order confirmation email HTML
export default function generateOrderEmailHTML(orderData) {
    const { name, orderId, orderDate, products, total, address, phone } = orderData;

    const productRows = products.map(item => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
                ${item.productInfo.name}
                ${item.productInfo.altName ? `<br><small style="color: #666;">${item.productInfo.altName}</small>` : ''}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.productInfo.size}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(item.productInfo.price)}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${formatCurrency(item.productInfo.price * item.quantity)}</td>
        </tr>
    `).join('');

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <!-- Header -->
                            <tr>
                                <td style="background-color: #4CAF50; padding: 30px; text-align: center;">
                                    <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Order Confirmation</h1>
                                </td>
                            </tr>
                            
                            <!-- Content -->
                            <tr>
                                <td style="padding: 30px;">
                                    <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear ${name},</p>
                                    <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Thank you for your order! We're excited to confirm that we've received your order and it's being processed.</p>
                                    
                                    <!-- Order Details -->
                                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0; background-color: #f9f9f9; border-radius: 4px; padding: 15px;">
                                        <tr>
                                            <td style="padding: 5px 0;"><strong>Order ID:</strong></td>
                                            <td style="padding: 5px 0; text-align: right;">${orderId}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 5px 0;"><strong>Order Date:</strong></td>
                                            <td style="padding: 5px 0; text-align: right;">${formatDate(orderDate)}</td>
                                        </tr>
                                        ${address ? `
                                        <tr>
                                            <td style="padding: 5px 0;"><strong>Delivery Address:</strong></td>
                                            <td style="padding: 5px 0; text-align: right;">${address}</td>
                                        </tr>
                                        ` : ''}
                                        ${phone ? `
                                        <tr>
                                            <td style="padding: 5px 0;"><strong>Contact Number:</strong></td>
                                            <td style="padding: 5px 0; text-align: right;">${phone}</td>
                                        </tr>
                                        ` : ''}
                                    </table>
                                    
                                    <!-- Order Items -->
                                    <h2 style="color: #333; font-size: 20px; margin-top: 30px; margin-bottom: 15px;">Order Summary</h2>
                                    <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
                                        <thead>
                                            <tr style="background-color: #f5f5f5;">
                                                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
                                                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Size</th>
                                                <th style="padding: 12px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                                                <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                                                <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${productRows}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colspan="4" style="padding: 15px; text-align: right; font-size: 18px; font-weight: bold;">Total:</td>
                                                <td style="padding: 15px; text-align: right; font-size: 18px; font-weight: bold; color: #4CAF50;">${formatCurrency(total)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    
                                    <p style="font-size: 14px; color: #666; margin-top: 30px;">We'll send you another email when your order ships. If you have any questions, please don't hesitate to contact us.</p>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 12px;">
                                    <p style="margin: 0;">Thank you for shopping with us!</p>
                                    <p style="margin: 10px 0 0 0;">&copy; ${new Date().getFullYear()} Your Store. All rights reserved.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;
}

// Send order confirmation email
export async function sendOrderConfirmationEmail(orderData) {
    const mailOptions = {
        from: `"Your Store" <${process.env.EMAIL_USER}>`,
        to: orderData.email,
        subject: `Order Confirmation - ${orderData.orderId}`,
        html: generateOrderEmailHTML(orderData)
    };

    return await transporter.sendMail(mailOptions);
}