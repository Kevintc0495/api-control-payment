import type Mail from "nodemailer/lib/mailer";

export interface IEmailService {
  Send(params: Mail.Options): Promise<boolean>;
}
