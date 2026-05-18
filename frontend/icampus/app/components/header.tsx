"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// --- Sub-component: Modal ---
function Modal({
  id,
  open,
  onClose,
  title,
  desc,
  fields,
  submitLabel,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  title: string;
  desc: string;
  fields: { label: string; type: string; placeholder: string }[];
  submitLabel: string;
}) {
  if (!open) return null;

  return (
    <div
      id={id}
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <div
          style={{
            fontSize: 17,
            fontWeight: 600,
            color: "#111827",
            marginBottom: 6,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 13.5,
            color: "#6b7280",
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          {desc}
        </div>
        {fields.map((f, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <label
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#374151",
                marginBottom: 5,
                display: "block",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {f.label}
            </label>
            <input
              className="modal-input"
              type={f.type}
              placeholder={f.placeholder}
            />
          </div>
        ))}
        <div className="flex gap-2 justify-end" style={{ marginTop: 20 }}>
          <button className="btn-ghost" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" type="button">
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Navigation Tabs Config ---
const NAV_TABS = [
  { label: "Chat", href: "/" },
  { label: "Materials", href: "/materials" },
  { label: "Assignments", href: "/assignments" },
];

// --- Main Header Component ---
export default function Header() {
  const pathname = usePathname();
  const [signinOpen, setSigninOpen] = useState(false);
  const [keysOpen, setKeysOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5ede9",
          display: "flex",
          alignItems: "center",
          padding: "0 1.5rem",
          height: 56,
          gap: 0,
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: 17,
            fontWeight: 600,
            color: "var(--teal-600)",
            letterSpacing: "-0.3px",
            marginRight: "2rem",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: "var(--teal-200)",
              borderRadius: "50%",
            }}
          />
          ChutesCampus
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 flex-1">
          {NAV_TABS.map((tab) => (
            <Link key={tab.href} href={tab.href}>
              <button
                className={`nav-tab ${pathname === tab.href ? "active" : ""}`}
              >
                {tab.label}
              </button>
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            className="btn-ghost"
            onClick={() => {
              setKeysOpen(true);
              console.log("Keys are now open");
            }}
          >
            <svg
              style={{
                display: "inline",
                width: 14,
                height: 14,
                verticalAlign: -2,
                marginRight: 5,
              }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>
            API Keys
          </button>
          <button className="btn-primary" onClick={() => setSigninOpen(true)}>
            Sign in
          </button>
        </div>
      </nav>

      {/* Sign In Modal */}
      <Modal
        id="signin"
        open={signinOpen}
        onClose={() => setSigninOpen(false)}
        title="Sign in to ChutesCampus"
        desc="Access your personalised dashboard and sync with your institution."
        fields={[
          { label: "Email", type: "email", placeholder: "you@university.edu" },
          { label: "Password", type: "password", placeholder: "••••••••" },
        ]}
        submitLabel="Sign in"
      />

      {/* API Keys Modal */}
      <Modal
        id="keys"
        open={keysOpen}
        onClose={() => setKeysOpen(false)}
        title="Manage API Keys"
        desc="Add key pairs stored securely. These will be saved to Supabase under your account."
        fields={[
          {
            label: "Key Name",
            type: "text",
            placeholder: "e.g. OPENAI_API_KEY",
          },
          { label: "Key Value", type: "password", placeholder: "sk-…" },
        ]}
        submitLabel="Save Key"
      />
    </>
  );
}
