import { NextRequest, NextResponse } from 'next/server';
import MailerLite from '@mailerlite/mailerlite-nodejs';

export async function POST (request: NextRequest) {
  const body = await request.json();
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Setup error.' }, { status: 400 });
  }
  const newsletterGroup = process.env.MAILERLITE_NEWSLETTER_GROUP;
  if (!newsletterGroup) {
    return NextResponse.json({ error: 'Setup error with group.' }, { status: 400 });
  }
  const mailerlite = new MailerLite({
    api_key: apiKey,
  });
  const { email, firstName, lastName } = body;
  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }
  try {
    // Uncomment this portion if you want to check for subscribers before creation:
    // Check if the email exists:
    // const isEmailExisting = await mailerlite.subscribers.find(email)
    //   .then((r: any) => {
    //     if (r?.data?.id) return true;
    //     return false;
    //   })
    //   .catch(() => false);
    // if (isEmailExisting) {
    //   return NextResponse.json({ error: 'Email already subscribed.' }, { status: 400 });
    // }
  
    // If the email doesn't exist, subscribe:
    const response = await mailerlite.subscribers.createOrUpdate({
      email,
      fields: {
        name: firstName,
        last_name: lastName,
      },
      groups: [newsletterGroup],
    });
    const { data } = response;
    return NextResponse.json({ data });
   } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error?.message;
    } else {
      errorMessage = errorMessage ?? error?.toString();
    }
    console.error(errorMessage);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
};
