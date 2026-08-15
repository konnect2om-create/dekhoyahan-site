const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

async function handleJoin(request, env) {
  if (!env.DB) {
    console.error("D1 binding DB is unavailable.");

    return json(
      {
        ok: false,
        message: "Joining is not working right now. Please try again later.",
      },
      503,
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return json(
      {
        ok: false,
        message: "Please check your email address.",
      },
      400,
    );
  }

  const email =
    typeof body?.email === "string"
      ? body.email.trim().toLowerCase()
      : "";

  if (
    !email ||
    email.length > 254 ||
    !EMAIL_PATTERN.test(email)
  ) {
    return json(
      {
        ok: false,
        message: "Please check your email address.",
      },
      400,
    );
  }

  try {
    await env.DB.prepare(
      `
        INSERT INTO members (email, status)
        VALUES (?, 'active')
        ON CONFLICT(email) DO UPDATE SET
          status = 'active'
      `,
    )
      .bind(email)
      .run();

    return json({
      ok: true,
      message: "Done. We will email you when the next topic is ready.",
    });
  } catch (error) {
    console.error("Join request failed:", error);

    return json(
      {
        ok: false,
        message: "Something went wrong. Please try again.",
      },
      500,
    );
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/join") {
      if (request.method !== "POST") {
        return json(
          {
            ok: false,
            message: "Method not allowed.",
          },
          405,
        );
      }

      return handleJoin(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};