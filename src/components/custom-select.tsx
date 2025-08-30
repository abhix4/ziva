"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { value: "all", label: "All" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
  ];

  const handleSelect = (value: string) => {
    setSelected(value);
    setOpen(false);
  };

  return (
    <div style={styles.container}>
      {/* Static label */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          ...styles.trigger,
          borderColor: open ? "#888" : "#555",
        }}
      >
        <span>View</span>
        <ChevronDown
          size={16}
          style={{
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul style={styles.dropdown}>
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              style={{
                ...styles.option,
                background: selected === opt.value ? "#444" : "transparent",
                fontWeight: selected === opt.value ? "bold" : "normal",
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "relative",
    width: "160px",
    fontFamily: "sans-serif",
  },
  trigger: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    background: "#2d2d2d",
    color: "white",
    border: "1px solid #555",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "border-color 0.2s",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    marginTop: "4px",
    width: "100%",
    background: "#1f1f1f",
    border: "1px solid #444",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
    zIndex: 100,
  },
  option: {
    padding: "8px 12px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};
