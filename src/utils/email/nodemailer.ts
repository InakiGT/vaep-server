import nodemailer from 'nodemailer'
import config from '../../config'

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: config.stmpUser,
		pass: config.stmpPass,
	},
})

export const sendEmail = async (toEmail: string, token: string) => {
	const info = await transporter.sendMail({
		from: 'VAEP <inaki.garcia@cua.uam.mx>',
		to: toEmail,
		subject: 'Recuperación de contraseña de VAEP',
		html: `<p>Utiliza el siguiente enlace para restablecer tu contraseña: ${ config.frontendServer }update-password?token=${ token }</p>`
	})

	return info
}
