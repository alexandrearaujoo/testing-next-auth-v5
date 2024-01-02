import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

interface SendVerificationEmailProps {
  email: string;
  token: string;
}

type SendResetPasswordEmailProps = SendVerificationEmailProps;
type SendTwoFactorTokenEmailProps = SendVerificationEmailProps;

export const sendVerificationEmail = async (
  data: SendVerificationEmailProps
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${data.token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: data.email,
    subject: 'Confirm your email',
    html: `<p>Click <a href=${confirmLink}>here</a> to confirm email. </p>`
  });
};

export const sendPasswordResetEmail = async (
  data: SendResetPasswordEmailProps
) => {
  const resetLink = `${domain}/auth/new-password?token=${data.token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: data.email,
    subject: 'Reset your password',
    html: `<p>Click <a href=${resetLink}>here</a> to reset your password. </p>`
  });
};

export const sendTwoFactorTokenEmail = async (
  data: SendTwoFactorTokenEmailProps
) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: data.email,
    subject: '2FA Code',
    html: `<p>Your 2FA Code: ${data.token}</p>`
  });
};
