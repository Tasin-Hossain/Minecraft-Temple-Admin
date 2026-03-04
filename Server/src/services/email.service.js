import nodemailer from "nodemailer";
import {config} from '../config/env.js'

export const sendEmail = async (to, template)=>{
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // বা অন্য SMTP
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `Minecraft Temple ${config.EMAIL_USER}`,
      to,
      subject: template.subject, // 🟢
      text: template.text,       // 🟢
      html: template.html,       // 🟢
    })
    console.log("Email sent to", to);

  } catch (error) {
    console.error("Email sending failed:", error);
  }
}