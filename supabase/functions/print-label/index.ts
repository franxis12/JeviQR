import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

serve(async (req) => {
  try {
    // Verificar si el cuerpo está vacío
    const text = await req.text();
    if (!text) {
      return new Response("No se recibió ningún cuerpo en la petición.", { status: 400 });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return new Response("El cuerpo no es JSON válido.", { status: 400 });
    }

    const { zpl } = data;
    if (!zpl) {
      return new Response("No se encontró el campo 'zpl' en el JSON.", { status: 400 });
    }

    // --- hasta aquí validamos bien ---

    const printerIp = "640zebra1"; //640zebra1
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