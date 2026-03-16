import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import type { IEmailService } from "@/application/services/iemail.service";
import "dotenv/config";

export class NodeMailerService implements IEmailService {
  async Send(params: Mail.Options): Promise<boolean> {
    try {
      const config = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      };

      const data = {
        from: process.env.EMAIL,
        ...params,
      };

      const transport = nodemailer.createTransport(config);
      await transport.sendMail(data);

      return true;
    } catch (_error) {
      return false;
    }
  }
}
