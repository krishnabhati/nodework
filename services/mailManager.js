"use strict";

const nodemailer =require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');



let transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "krishnabhati64@gmail.com",
        pass: "@jaihanumanjI0"
    }
}));




exports.sendMailViaSmtp =async (params)=> {
    try {
        console.log(params,"GMAILLLLLLLLLLL");
        let mailOptions = {
            from: "krishnabhati64@gmail.com",
            to: params.email,
            subject: "Verify Email",
            // html: params.content,
            // bcc: config2.CONSTANT.EMAIL_TEMPLATE.BCC_MAIL
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Message sent: " + info.response);
            }
        });
    } catch (error) {
        console.log(error);
    }
    return {};
}



exports.sendMail=async (params) =>{
        return await this.sendMailViaSmtp(params);

};

exports.sendVerificationEmail= async (params)=> {
    console.log(params,"EMAIL DATAAAAAAAAAAAAAAAAa")
    await this.sendMail({ "email": params, "subject": "Verify Email", "content": "Mr. please verify your email." });
};

// async healthReportOnEmail(params) {
// let mailContent = await (new TemplateUtil(config.SERVER.TEMPLATE_PATH + "health-report.html"))
// .compileFile({
// "url": "http://localhost:3020/api/user" + "/deeplink/" + "?type=health-report & token=" + params.accessToken,
// "year": new Date().getFullYear(),
// "userName": params.userName
// });
// await this.sendMail({ "email": params.email, "subject": config2.CONSTANT.EMAIL_TEMPLATE.SUBJECT.HEALTH_REPORT_ON_EMAIL, "content": mailContent });
// };


// async sendForgotPasswordEmail(params) {
// let mailContent = await (new TemplateUtil(config.SERVER.TEMPLATE_PATH + "forgot-password2.html"))
// .compileFile({
// "userName": params.userName,
// "url": "http://3.92.170.227:7001/api/user" + "/deeplink/" + "?type= reset-password & token=" + params.accessToken,
// });
// await this.sendMail({ "email": params.email, "subject": config2.CONSTANT.EMAIL_TEMPLATE.SUBJECT.FORGOT_PWD_EMAIL, "content": mailContent });
// }

