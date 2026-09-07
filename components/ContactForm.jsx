"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import styles from "./ContactForm.module.css";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  company: "", // honeypot — real users never fill this in
};

const LIMITS = {
  name: 100,
  email: 150,
  phone: 30,
  subject: 150,
  message: 3000,
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length > LIMITS.name) errors.name = "Name is too long.";

  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";

  if (!values.subject.trim()) errors.subject = "Please enter a subject.";
  else if (values.subject.trim().length > LIMITS.subject) errors.subject = "Subject is too long.";

  if (!values.message.trim()) errors.message = "Please enter a message.";
  else if (values.message.trim().length > LIMITS.message)
    errors.message = "Message is too long — please shorten it.";

  if (values.phone && values.phone.trim().length > LIMITS.phone)
    errors.phone = "Phone number is too long.";

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState("");
  const lastSubmitRef = useRef(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent rapid duplicate submissions
    const now = Date.now();
    if (status === "submitting" || now - lastSubmitRef.current < 4000) return;
    lastSubmitRef.current = now;

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setServerMessage(data.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setValues(initialValues);
    } catch (err) {
      setStatus("error");
      setServerMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.successCard}
      >
        <CheckCircle2 size={34} className={styles.successIcon} />
        <h3>Thanks for reaching out!</h3>
        <p>I&rsquo;ll get back to you soon.</p>
        <button className="btn btn-ghost" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Honeypot field — hidden from real users, bots tend to fill it in */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={handleChange}
        />
      </div>

      <div className={styles.row}>
        <Field
          label="Full Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          maxLength={LIMITS.name}
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          maxLength={LIMITS.email}
          required
        />
      </div>

      <div className={styles.row}>
        <Field
          label="Phone Number (optional)"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          maxLength={LIMITS.phone}
        />
        <Field
          label="Subject"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          error={errors.subject}
          maxLength={LIMITS.subject}
          required
        />
      </div>

      <Field
        label="Message"
        name="message"
        as="textarea"
        rows={6}
        value={values.message}
        onChange={handleChange}
        error={errors.message}
        maxLength={LIMITS.message}
        required
      />

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={styles.errorBanner}
          >
            <AlertCircle size={16} /> {serverMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className={styles.spinner} /> Sending...
          </>
        ) : (
          <>
            Send Message <Send size={15} />
          </>
        )}
      </button>
    </form>
  );
}

function Field({ label, name, error, as = "input", ...props }) {
  const Tag = as;
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <Tag
        id={name}
        name={name}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      <AnimatePresence>
        {error && (
          <motion.span
            id={`${name}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={styles.fieldError}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
