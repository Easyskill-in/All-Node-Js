const { EMAIL } = require("../Config/Config");
const transporter = require("../Config/Mail");

async function SendEmail(to, subject, text, html) {

    try {
        const info = await transporter.sendMail({
            from: EMAIL,
            to,
            cc: "",
            bcc: ["idkxyz001@gmail.com"],
            subject,
            text,
            html
        });

        console.log(info)
        return info.messageId

    } catch (error) {
        console.log("Mail Error ", error.message)
        return false;
    }
}


module.exports = SendEmail