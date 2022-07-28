const nodemailer = require('nodemailer')

const nodemailfunction = async(options) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 587,
        secure: false,
        auth: {
            user:  '73428317e47764',
            pass:   '60d796bb201f84'  
        }
    })
    let infor = await transporter.sendMail({
        from: '"Quan Doan" <ducquan1908@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: `<b>${options.message}</b>`
        
    })
}

module.exports = nodemailfunction