const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like SendGrid, Mailgun, etc.
    auth: {
        user: 'subratadhibargcsj@gmail.com', // Your email address
        pass: 'egao uabe xrdd ajcb' // Your email password or app password
    }
});

// Triggered when a new user is created in Firestore
exports.sendConfirmationEmail = functions.firestore.document('users/{userId}')
    .onCreate((snap, context) => {
        const data = snap.data();
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: data.email,
            subject: 'Application Confirmation - NOVAin',
            html: `
                <p>Dear ${data.fullName},</p>
                <p>Congratulations on applying for the internship program at NOVAin!</p>
                <p>You have successfully applied for the ${data.domain} domain.</p>
                <p>Our team will review your application and contact you soon.</p>
                <p>Best regards,<br>NOVAin Developers Team</p>
            `
        };

        return transporter.sendMail(mailOptions)
            .then(() => console.log('Confirmation email sent to:', data.email))
            .catch((error) => console.error('Error sending email:', error));
    });