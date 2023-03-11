const nodemailer = require("nodemailer");
const sendMail = async(req,res)=>{
    let transporter = await nodemailer.createTransport(
        {
            service: "outlook",
            auth: {
                user: "TheSqlSquad.HMS@outlook.com",
                pass: "HMS@1234", 
            }
        });
    let info = await transporter.sendMail({
        from: "TheSqlSquad.HMS@outlook.com",
        to: "abhiroom012@gmail.com",
        subject: "Regarding Appointment",
        text:"Successfully done."
    });
    transporter.sendMail(info,(err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log('email sent '+data.response);
        }
    });
};
module.exports=sendMail;