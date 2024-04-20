import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import User from "@/models/userModel";
interface sendEmailProps {
  email: string;
  emailType: "verify" | "forgotPassword";
  userId: string;
}
export async function sendEmail({email, emailType, userId}: sendEmailProps) {
try {
    
    let emailTemplate
    let emailSubject
    const hashedUserId = await bcrypt.hash(userId.toString(), 10);

    if(emailType === "verify"){

      //* Create hashed user id and save in database
      await User.findByIdAndUpdate(userId,
        {
          verfiyToken: hashedUserId,
          verfiyTokenExpiry: Date.now() + 10 * 60 * 1000
        }
      )

      //* Email HTML template
      emailTemplate = `
      <p> Click the <a href="${process.env.DOMAIN}/api/users/verify?token=${hashedUserId}">Verify Email</a> to verify. Or copy the link and paste in your browser
      <br/>
      ${process.env.DOMAIN}/api/users/verify?token=${hashedUserId}
      </p>
      `

      emailSubject = "Verify Email"

    }else if(emailType === "forgotPassword"){
      await User.findByIdAndUpdate(userId,
        {
          forgetPasswordToken: hashedUserId,
          forgetPsswordExpiry: Date.now() + 10 * 60 * 1000
        }
      )
      //* Email HTML template
      emailTemplate = `
      <p> Click <a href="${process.env.DOMAIN}/api/users/forgotPassword?token=${hashedUserId}">Verify</a> to verify. Or copy the link and paste in your browser
      <br/>
      ${process.env.DOMAIN}/api/users/forgotPassword?token=${hashedUserId}
      </p>
      `

      emailSubject = "To reset your password"
    }


    //* Send Email part
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ddca5ff7694800",
        pass: "da4322e485fc7b"
      }
    });

      const info = await transporter.sendMail({
        from: 'hitesh@hitesh.ai', // sender address
        to: email, // list of receivers
        subject: emailSubject, // Subject line
        html: emailTemplate, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
} catch (error: any) {
    throw new Error(error.massage)
}
}