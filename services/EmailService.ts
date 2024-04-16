import nodemailer from "nodemailer";
const emailService = {
  sendMail(to: string, subject: string, html: any) {
    try {
      const transport = nodemailer.createTransport({
        service: "gmail",
        // port: 587,
        auth: {
          user: `${process.env.MAIL_USER}`,
          pass: `${process.env.MAIL_PASS}`,
        },
      });
      const mailOptions = {
        from: `"E-Shop Support Team" <${process.env.MAIL_USER}>`,
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
    } catch (error) {
      throw error;
    }
  },
};
export default emailService;
