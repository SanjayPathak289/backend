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
app.post("/sendcode", (req, res) => {
    const { email } = req.body;
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const mailOptions = {
        from: "sanjaypathak2022@gmail.com",
        to: email,
        subject: "Your verification code",
        text: `Your verification code is ${verificationCode}`
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