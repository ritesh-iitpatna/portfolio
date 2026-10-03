import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate incoming fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message content is required." },
        { status: 400 }
      );
    }

    // Read Formspree Form ID from secure server environment
    const formId = process.env.FORMSPREE_FORM_ID;
    if (!formId) {
      console.error("[Contact API] Missing FORMSPREE_FORM_ID in environment variables.");
      return NextResponse.json(
        {
          error:
            "Contact service is currently not configured. Please contact ritesh.iitpatna@gmail.com directly.",
        },
        { status: 500 }
      );
    }

    const endpoint = formId.startsWith("http")
      ? formId
      : `https://formspree.io/f/${formId}`;

    const formspreeRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        subject: subject?.trim() || "Portfolio Contact",
        _subject: subject?.trim()
          ? `[Portfolio Contact] ${subject.trim()}`
          : `[Portfolio Contact] New message from ${name.trim()}`,
        message: message.trim(),
      }),
    });

    if (!formspreeRes.ok) {
      const errorData = await formspreeRes.json().catch(() => null);
      let errorMsg = "Failed to deliver message. Please reach out via email directly.";
      if (errorData?.errors && Array.isArray(errorData.errors)) {
        errorMsg = errorData.errors
          .map((e: { message?: string }) => e.message)
          .filter(Boolean)
          .join(", ");
      }
      return NextResponse.json({ error: errorMsg }, { status: formspreeRes.status });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API Error]:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending your message. Please try again." },
      { status: 500 }
    );
  }
}
