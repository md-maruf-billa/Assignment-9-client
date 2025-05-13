import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const bodyText = await req.text();
    const params = new URLSearchParams(bodyText);
    const transId = params.get('tran_id');

    // ✅ Construct absolute URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const redirectUrl = `${baseUrl}/payment/success/${transId}`;

    return NextResponse.redirect(redirectUrl, 303);
}
