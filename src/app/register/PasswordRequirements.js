import React from "react";

const requirements = [
  {
    label: "Mindestens 8 Zeichen",
    test: (pw) => pw.length >= 8,
  },
  {
    label: "Mindestens 1 Großbuchstabe",
    test: (pw) => /[A-Z]/.test(pw),
  },
  {
    label: "Mindestens 1 Kleinbuchstabe",
    test: (pw) => /[a-z]/.test(pw),
  },
  {
    label: "Mindestens 1 Zahl",
    test: (pw) => /[0-9]/.test(pw),
  },
  {
    label: "Mindestens 1 Sonderzeichen (!@#$%^&*)",
    test: (pw) => /[!@#$%^&*]/.test(pw),
  },
];

export default function PasswordRequirements({ password }) {
  return (
    <div className="mt-2 mb-1">
      <ul className="space-y-1 text-sm">
        {requirements.map((req, i) => {
          const passed = req.test(password);
          return (
            <li key={i} className={passed ? "text-green-600 flex items-center" : "text-red-500 flex items-center"}>
              <span className="mr-2 text-lg">{passed ? "✔" : "✖"}</span>
              {req.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
