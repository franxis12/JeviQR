// supabase/functions/print-label/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const { zpl } = await req.json();

    if (!zpl) {
      return new Response("Missing ZPL data", { status: 400 });
    }

    // Dirección IP de la impresora (ajústala a la de la empresa)
    const printerIp = "192.168.1.115";
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