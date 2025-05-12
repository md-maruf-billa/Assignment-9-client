import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const bodyText = await req.text();
    const params = new URLSearchParams(bodyText);
    const transId = params.get('tran_id');

    // ✅ Construct absolute URL
    const baseUrl = req.nextUrl.origin;
    const redirectUrl = `${baseUrl}/payment/success/${transId}`;

    return NextResponse.redirect(redirectUrl, 303);
}
