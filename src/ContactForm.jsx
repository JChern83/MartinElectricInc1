import { useState } from "react";

export default function ContactForm({ endpoint }) {
  const [status, setStatus] = useState({ sending: false, ok: false, error: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ sending: true, ok: false, error: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Simple client-side validation
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();
    if (!name || !email || !message) {
      setStatus({ sending: false, ok: false, error: "Please fill out name, email, and message." });
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        form.reset();
        setStatus({ sending: false, ok: true, error: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus({
          sending: false,
          ok: false,
          error: data?.errors?.[0]?.message || "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      setStatus({ sending: false, ok: false, error: "Network error. Please try again." });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-lg max-w-2xl">
      {/* Honeypot to reduce spam */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" name="name" type="text" placeholder="Jane Smith" required />
        <Field label="Phone" name="phone" type="tel" placeholder="(555) 555-1234" />
      </div>
      <Field label="Email" name="email" type="email" placeholder="you@email.com" className="mt-4" required />
      <Field label="Message" name="message" type="textarea" placeholder="Tell us about your project…" className="mt-4" required />

      {/* Optional metadata */}
      <input type="hidden" name="_subject" value="New inquiry from Martin Electric website" />
      <input type="hidden" name="source" value="martin-electric-onepage" />

      <button
        type="submit"
        disabled={status.sending}
        className="mt-5 w-full rounded-xl px-5 py-3 bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-60"
      >
        {status.sending ? "Sending..." : "Send Message"}
      </button>

      {status.ok && (
        <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-400">Thanks! We’ll get back to you shortly.</p>
      )}
      {status.error && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{status.error}</p>
      )}

      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
        CA C-10 #0000000 • Licensed & Insured
      </p>
    </form>
  );
}

/* Reuse your Field component locally for convenience */
function Field({ label, name, type = "text", className = "", ...props }) {
  if (type === "textarea") {
    return (
      <label className={`block ${className}`}>
        <span className="text-sm mb-1 block">{label}</span>
        <textarea
          name={name}
          rows={5}
          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          {...props}
        />
      </label>
    );
  }
  return (
    <label className={`block ${className}`}>
      <span className="text-sm mb-1 block">{label}</span>
      <input
        name={name}
        type={type}
        className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        {...props}
      />
    </label>
  );
}
