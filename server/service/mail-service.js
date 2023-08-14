const nodemailer = require('nodemailer')
class MailService{
  constructor(){
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // уточнить самостоятельно
      auth:{
          user: process.env.SMPT_USER,
          pass: process.env.SMPT_PASSWORD
      }
    })
  }
 async sendActivationMail(to, link) {
  await this.transporter.sendMail({
    from: process.env.SMPT_USER,
    to,
    subject: `Активація акаунта на ${process.env.API_URL}`,
    text:'',
    html:
    `
    <div>
    <h2>Активація акаунта</h2>    
    <p>Щоб завершити перейдить за поссилянням <a href="${link}">${link}</a></p>
    </div>
    `

  }) 
}
}
module.exports = new MailService()