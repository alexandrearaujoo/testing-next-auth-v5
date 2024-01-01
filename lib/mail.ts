import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendVerificationEmailProps {
  email: string;
  token: string;
}

export const sendVerificationEmail = async (
  data: SendVerificationEmailProps
) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${data.token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: data.email,
    subject: 'Confirm your email',
    html: `<p>Click <a href=${confirmLink}>here</a> to confirm email </p>`
  });
};
