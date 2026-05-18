"use client";

import { useState } from "react";

type FileItem = {
  type: "pdf" | "ppt" | "doc" | "zip";
  name: string;
  meta: string;
  badge?: { label: string; className: string };
};

type Module = {
  title: string;
  code: string;
  files: FileItem[];
};

const MODULES: Module[] = [
  {
    title: "Thermodynamics",
    code: "ENG2301 · 6 files",
    files: [
      {
        type: "pdf",
        name: "Week 1 – Intro to Thermodynamics.pdf",
        meta: "Lecture notes · 2.4 MB",
        badge: { label: "New", className: "badge-new" },
      },
      {
        type: "ppt",
        name: "Week 2 – Laws of Thermodynamics.pptx",
        meta: "Slides · 8.1 MB",
      },
      {
        type: "pdf",
        name: "Tutorial Sheet 1.pdf",
        meta: "Problem set · 340 KB",
      },
      {
        type: "doc",
        name: "Formula Reference Sheet.docx",
        meta: "Reference · 120 KB",
      },
    ],
  },
  {
    title: "Business Analytics",
    code: "BUS3102 · 5 files",
    files: [
      {
        type: "ppt",
        name: "Lecture 1 – Data Driven Decisions.pptx",
        meta: "Slides · 5.6 MB",
        badge: { label: "New", className: "badge-new" },
      },
      {
        type: "pdf",
        name: "Case Study – Airbnb Growth Model.pdf",
        meta: "Reading · 1.2 MB",
      },
      {
        type: "zip",
        name: "Dataset – Sales Q1–Q4.zip",
        meta: "Data · 14.3 MB",
      },
      {
        type: "doc",
        name: "Reading List Semester 2.docx",
        meta: "Reference · 85 KB",
      },
    ],
  },
];

function FolderIcon() {
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
        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v8.25"
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

function ModuleCard({ module }: { module: Module }) {
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
          <FolderIcon />
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
            {module.files.map((file, i) => (
              <div key={i} className="file-item">
                <div className={`file-icon ${file.type}`}>
                  {file.type.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="file-name">{file.name}</div>
                  <div
                    style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 1 }}
                  >
                    {file.meta}
                  </div>
                </div>
                {file.badge && (
                  <span className={`file-badge ${file.badge.className}`}>
                    {file.badge.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Materials() {
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
          Course Materials
        </h1>
        <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 4 }}>
          Browse and access uploaded files for each module
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 14,
        }}
      >
        {MODULES.map((mod, i) => (
          <ModuleCard key={i} module={mod} />
        ))}
      </div>
    </div>
  );
}
