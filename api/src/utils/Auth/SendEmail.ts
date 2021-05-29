import * as nodemailer from "nodemailer";

export class Email {
  constructor(protected email: string, protected token: string) {
    this.email = email;
    this.token = token;
  }

  public createTransport() {
    return nodemailer.createTransport({
      pool: true,
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  // just for testing
  public verify() {
    this.createTransport().verify(function (err, success) {
      if (err) {
        console.log(err);
      } else {
        console.log("server is ready to take our message");
      }
    });
  }

  public async sendEmail() {
    return await this.createTransport().sendMail({
      from: process.env.GMAIL_USER!,
      to: this.email,
      subject: "Verification signin",
      html: `<b>please click this <a href="http://localhost:4000/api/v1/auth/confirmation/${this.token}">link</a> to activation account</b>`,
    });
  }
}
