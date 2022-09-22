const nodemailer = require('nodemailer')
const createPDF = require('./createPDF')
const { Company } = require('../models')

const { env: { NODEMAILER_USER, NODEMAILER_PASS } } = process

async function sendInvoiceEmail(userId, companyId, invoiceId, receiver) {
    const { pdfOutputStream, pdfFileName } = await createPDF(userId, companyId, invoiceId)

    const company = await Company.findById(companyId)
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.eu",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: NODEMAILER_USER,
            pass: NODEMAILER_PASS,
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `${company.name} <erp.adrianruiz@zohomail.eu>`, // sender address
        to: receiver, // list of receivers
        subject: `Your invoice from ${company.name}`, // Subject line
        /* text: "Hello world?", */ // plain text body
        html: `
        <div style="background-color:#42538D;height: 100px; color: white; display:flex; flex-direction: column; align-items:center; justify-content: center">
        <h1>New invoice from ${company.name}</h1>
        </div>
        <p>Thank you for providing us the opportunity to do business with you. You will find the invoice for the recent services or products provided by us, attached with this mail.</p>
        <p>If you have any questions about this invoice, please contact us by email at : (TODO, put company face email)</p>
        <p>Please, keep in mind that this invoice was generated automatically by <b><i>Amazing ERP online</i></b> So, if you see any error with the document (Not pricing or product errors) contact suppor team at: erp@inventedemail.com</p>
        <p>Best regards,</p>
        <p>${company.name}'s Team </p>`,
        attachments: [
            {     // binary buffer as an attachment
                filename: pdfFileName,
                content: pdfOutputStream,
                contentType: "application/pdf"
            },
        ]
    });
}

module.exports = sendInvoiceEmail




