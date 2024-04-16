import nodemailer from "nodemailer";
const emailService = {
  sendMail(to: string, subject: string, html: any) {
    try {
      console.log({ to });
      const transport = nodemailer.createTransport({
        service: "gmail",
        // port: 587,
        auth: {
          user: `${process.env.MAIL_USER}`,
          pass: `${process.env.MAIL_PASS}`,
        },
      });
      console.log({
        // transport,
        MAIL: process.env.MAIL_USER,
        PASS: process.env.MAIL_PASS,
        HOST: process.env.HOST,
      });
      const mailOptions = {
        from: `"Example Team" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
      };
      console.log({ mailOptions });
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log({ error });
          throw error;
        }
        console.log("Successfully sent");
      });
      console.log("after send");
    } catch (error) {
      throw error;
    }
  },
};
export default emailService;
