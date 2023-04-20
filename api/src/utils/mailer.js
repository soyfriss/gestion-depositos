const nodemailer = require("nodemailer");
const MailGen = require('mailgen');
require('dotenv').config();
const { EMAIL_SMTP_SERVER, EMAIL_USER, EMAIL_PASS, EMAIL_SMTP_PORT } = process.env;

async function mailer(to, subject, body) {

  if (!EMAIL_SMTP_SERVER) {
    throw new Error('No SMTP server hostname configured');
  }

  const mailConfig = {
    host: EMAIL_SMTP_SERVER,
    port: EMAIL_SMTP_PORT,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  };

  const transporter = nodemailer.createTransport(mailConfig);

  let mailGen = new MailGen({
    theme: 'default',
    product: {
      name: 'GESTION-DEPOSITOS app',
      link: 'http://villaconstitucion.gob.ar',
      copyright: 'Municipio de Villa Constitución',
    }
  });

  transporter.sendMail({
    from: EMAIL_USER,
    to,
    subject,
    html: mailGen.generate({ body }),
  });
}

module.exports = mailer;
