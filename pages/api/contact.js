import nodemailer from 'nodemailer'

export default async function handler (req, res) {
  const { name, email, mensaje } = req.body

  // const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'andresweeks10@gmail.com',
      pass: 'sqcy uiqk xczj lxkr'
    }
  })

  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: email,
      to: 'andresweeks16@gmail.com',
      subject: `QUIEROMIPRACTICA - Contacto de ${name}`,
      html: `<h1>Contacto de ${name}</h1><br /><p>${mensaje}</p>`
    })

    console.log(req.body)

    console.log('Message sent: %s', info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  } catch (err) {
    console.error(err)
  }

  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  res.status(200).json(req.body)
}
