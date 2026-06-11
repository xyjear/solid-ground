import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, phone, email, comment } = await request.json();

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone required" }, { status: 400 });
    }

    const message = [
      "🔨 Новая заявка SolidGround",
      "",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      email ? `Email: ${email}` : null,
      comment ? `Комментарий: ${comment}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");

    const token = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json({ error: `Telegram API: ${body}` }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
