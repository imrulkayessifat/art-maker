import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(
    req: Request
) {
    try {

        const body = await req.json();
        const output = await replicate.run(
            "twn39/lama:2b91ca2340801c2a5be745612356fac36a17f698354a07f48a62d564d3b3a7a0",
            body
        );
        return NextResponse.json(output)
    } catch (error) {
        console.log('[IMAGE_REMIX]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}