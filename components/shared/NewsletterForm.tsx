"use client";

import { useState } from "react";

interface NewsletterFormProps {
  source: string;
  placeholder?: string;
  buttonLabel?: string;
  formClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

export default function NewsletterForm({
  source,
  placeholder = "Your email address",
  buttonLabel = "Subscribe",
  formClassName = "flex gap-2",
  inputClassName = "flex-1 px-4 py-3 rounded-md bg-dark-light text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary",
  buttonClassName = "btn-primary whitespace-nowrap",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) return;

    setIsSubmitting(true);
    setMessage("");
    setStatus("idle");

    try {
      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Unable to subscribe right now.");
        return;
      }

      setStatus("success");
      setMessage("Thanks. You are now subscribed.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Unable to subscribe right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form className={formClassName} onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={placeholder}
          className={inputClassName}
          required
        />
        <button type="submit" className={buttonClassName} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : buttonLabel}
        </button>
      </form>
      {message && (
        <p
          className={`mt-3 text-sm ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
