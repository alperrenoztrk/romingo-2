interface MascotFaceProps {
  mascotId: "flamingo" | "cat" | "toucan" | "panda";
  mascotName: string;
  className?: string;
}

export default function MascotFace({ mascotId, mascotName, className = "h-20 w-20" }: MascotFaceProps) {
  if (mascotId === "cat") {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label={mascotName}>
        <path d="M14 22 L20 8 L28 20" fill="#f59e0b" />
        <path d="M50 22 L44 8 L36 20" fill="#f59e0b" />
        <ellipse cx="32" cy="35" rx="22" ry="19" fill="#fbbf24" />
        <ellipse cx="25" cy="33" rx="4" ry="5" fill="white" />
        <ellipse cx="39" cy="33" rx="4" ry="5" fill="white" />
        <circle cx="25" cy="34" r="2" fill="#111827" />
        <circle cx="39" cy="34" r="2" fill="#111827" />
        <path d="M29 41 Q32 44 35 41" stroke="#111827" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="32" cy="40" r="2" fill="#fb7185" />
      </svg>
    );
  }

  if (mascotId === "toucan") {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label={mascotName}>
        <ellipse cx="28" cy="34" rx="18" ry="18" fill="#38bdf8" />
        <ellipse cx="26" cy="33" rx="5" ry="6" fill="white" />
        <circle cx="26" cy="34" r="2.2" fill="#111827" />
        <path d="M31 34 C44 26, 56 27, 60 33 C56 40, 44 41, 31 38 Z" fill="#fb923c" />
        <path d="M31 36 C43 34, 55 35, 59 38 C54 42, 43 43, 31 40 Z" fill="#f43f5e" />
        <path d="M31 34 L59 38" stroke="#111827" strokeWidth="1.5" />
      </svg>
    );
  }

  if (mascotId === "panda") {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label={mascotName}>
        <circle cx="19" cy="18" r="8" fill="#1f2937" />
        <circle cx="45" cy="18" r="8" fill="#1f2937" />
        <ellipse cx="32" cy="36" rx="22" ry="19" fill="#f8fafc" />
        <ellipse cx="24" cy="34" rx="5" ry="7" fill="#1f2937" />
        <ellipse cx="40" cy="34" rx="5" ry="7" fill="#1f2937" />
        <circle cx="24" cy="34" r="2" fill="white" />
        <circle cx="40" cy="34" r="2" fill="white" />
        <ellipse cx="32" cy="42" rx="4" ry="3" fill="#111827" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={mascotName}>
      <ellipse cx="30" cy="36" rx="16" ry="19" fill="#f472b6" />
      <path d="M28 18 C26 8, 35 6, 38 14 C39 17, 37 21, 33 24" fill="#ec4899" />
      <ellipse cx="25" cy="34" rx="3.5" ry="4.5" fill="white" />
      <ellipse cx="34" cy="36" rx="3" ry="4" fill="white" />
      <circle cx="25" cy="35" r="1.7" fill="#111827" />
      <circle cx="34" cy="37" r="1.5" fill="#111827" />
      <path d="M42 39 C49 35, 54 36, 57 40 C54 45, 48 46, 42 44 Z" fill="#fbcfe8" />
    </svg>
  );
}
