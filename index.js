const { error, info } = require("console");
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
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
    const verificationCode = 123456;
    const mailOptions = {
        from: "sanjaypathak2022@gmail.com",
        to: email,
        subject: "Your verification code",
        text: "Your verification code is 123456"
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ error: "Failed to send code" });
        }
        res.status(200).send({
            message: "Code sent successfully!",
            code: verificationCode
        })
    })
})
app.listen(3000, () => {
    console.log("server started");
})