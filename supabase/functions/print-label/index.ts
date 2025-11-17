import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

serve(async (req) => {
  try {
    // Verify that the request body isn't empty
    const text = await req.text();
    if (!text) {
      return new Response("No request body received.", { status: 400 });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return new Response("Request body is not valid JSON.", { status: 400 });
    }

    const { zpl } = data;
    if (!zpl) {
      return new Response("The 'zpl' field is missing from the JSON payload.", { status: 400 });
    }

    // All validation checks passed

    const printerIp = "640zebra1"; //640zebra1 10.91.161.105
    const printerPort = 9100;

    const conn = await Deno.connect({ hostname: printerIp, port: printerPort });
    const encoder = new TextEncoder();
    await conn.write(encoder.encode(zpl));
    conn.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
