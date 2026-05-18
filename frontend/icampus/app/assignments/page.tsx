"use client";

import { useState } from "react";

type AssignmentItem = {
  type: "pdf" | "ppt" | "doc" | "zip";
  name: string;
  meta: string;
  badge: { label: string; className: string };
};

type AssignmentModule = {
  title: string;
  code: string;
  items: AssignmentItem[];
};

const ASSIGNMENTS: AssignmentModule[] = [
  {
    title: "Thermodynamics",
    code: "ENG2301 · 3 tasks",
    items: [
      {
        type: "pdf",
        name: "Assignment 1 – Energy Systems Brief.pdf",
        meta: "Due May 22, 2026",
        badge: { label: "Due soon", className: "badge-due" },
      },
      {
        type: "pdf",
        name: "Lab Report Template.pdf",
        meta: "Submitted May 8, 2026",
        badge: { label: "Done", className: "badge-done" },
      },
      {
        type: "doc",
        name: "Tutorial Quiz 2 – Attempt Sheet.docx",
        meta: "Due Jun 3, 2026",
        badge: { label: "Pending", className: "badge-pending" },
      },
    ],
  },
  {
    title: "Business Analytics",
    code: "BUS3102 · 3 tasks",
    items: [
      {
        type: "pdf",
        name: "Group Project Brief – Market Analysis.pdf",
        meta: "Due Jun 10, 2026",
        badge: { label: "Pending", className: "badge-pending" },
      },
      {
        type: "doc",
        name: "Individual Reflection Essay.docx",
        meta: "Submitted Apr 28, 2026",
        badge: { label: "Done", className: "badge-done" },
      },
      {
        type: "pdf",
        name: "Data Analysis Task 3 – Brief.pdf",
        meta: "Due May 30, 2026",
        badge: { label: "Due soon", className: "badge-due" },
      },
    ],
  },
];

function ClipboardIcon() {
  return (
    <svg
      width="22"
      height="22"
      fill="none"
      stroke="#0F6E56"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      style={{
        transition: "transform 0.2s",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        color: "#9ca3af",
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function AssignmentCard({ module }: { module: AssignmentModule }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="folder-card">
      {/* Header */}
      <div
        className="flex items-center gap-3 cursor-pointer select-none"
        style={{ padding: "14px 16px" }}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="folder-icon-wrap">
          <ClipboardIcon />
        </div>
        <div className="flex-1">
          <div style={{ fontSize: 14.5, fontWeight: 550, color: "#1f2937" }}>
            {module.title}
          </div>
          <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 2 }}>
            {module.code}
          </div>
        </div>
        <ChevronIcon open={open} />
      </div>

      {/* Body */}
      {open && (
        <div style={{ borderTop: "1px solid #f0f4f2" }}>
          <div
            className="flex flex-col gap-0.5"
            style={{ padding: "6px 8px 8px" }}
          >
            {module.items.map((item, i) => (
              <div key={i} className="file-item">
                <div className={`file-icon ${item.type}`}>
                  {item.type.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="file-name">{item.name}</div>
                  <div
                    style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 1 }}
                  >
                    {item.meta}
                  </div>
                </div>
                <span className={`file-badge ${item.badge.className}`}>
                  {item.badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Assignments() {
  return (
    <div className="flex-1 overflow-y-auto" style={{ padding: "2rem 2.5rem" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1
          style={{
            fontSize: 21,
            fontWeight: 600,
            color: "#111827",
            letterSpacing: "-0.3px",
          }}
        >
          Assignments
        </h1>
        <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 4 }}>
          Track and access all your assignment briefs and submissions
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 14,
        }}
      >
        {ASSIGNMENTS.map((mod, i) => (
          <AssignmentCard key={i} module={mod} />
        ))}
      </div>
    </div>
  );
}
