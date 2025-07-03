import { Resend } from 'resend';
import ResetPasswordEmail from '../../../emails/ResetPasswordEmail';

export async function POST(req) {
  const { email, code, user } = await req.json();
  if (!email || !code) {
    return new Response(JSON.stringify({ error: 'Missing email or code' }), { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Checkmate <onboarding@resend.dev>',
      to: email,
      subject: 'Your Checkmate Password Reset Code',
      react: ResetPasswordEmail({ user, code }),
    });
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
