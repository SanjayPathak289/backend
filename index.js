const { error, info } = require("console");
const express = require("express");
const nodemailer = require("nodemailer");
const job = require("./cron");
const app = express();
job.start();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sanjaypathak2022@gmail.com",
        pass: "eebv vvto gwcw ekfm"
    }
})
app.use(express.json());
const generateEmailTemplate = (code) => {
    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            }
            .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
            text-align: center;
            padding: 10px 0;
            }
            .header h1 {
            color: #333;
            }
            .content {
            text-align: center;
            margin: 20px 0;
            }
            .code {
            font-size: 24px;
            color: #3A86FF;
            margin: 20px 0;
            font-weight: bold;
            }
            .footer {
            text-align: center;
            margin-top: 30px;
            color: #777;
            font-size: 14px;
            
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
            <h1>Verify Your Email</h1>
            </div>
            <div class="content">
            <p>Use the code below to verify your email address</p>
            <div class="code">${code}</div>
            <p>If you didn’t request this, please ignore this email.</p>
            </div>
            <div class="footer">
            <p>Regards</p>
            </div>
        </div>
        </body>
        </html>`
    )
}
app.post("/sendcode", (req, res) => {
    const { email } = req.body;
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const mailOptions = {
        from: "sanjaypathak2022@gmail.com",
        to: email,
        subject: "Your verification code",
        html: generateEmailTemplate(verificationCode)
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ error: "Failed to send code" });
        }
        return res.status(200).send({
            code: verificationCode
        })
    })
})
app.listen(3000, () => {
    console.log("server started");
})