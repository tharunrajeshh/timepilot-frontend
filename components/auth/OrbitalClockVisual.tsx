export default function OrbitalClockVisual() {
  return (
    <svg
      viewBox="0 0 300 300"
      className="h-[220px] w-[220px] xl:h-[280px] xl:w-[280px]"
      aria-hidden="true"
    >
      <circle
        cx="150"
        cy="150"
        r="140"
        fill="none"
        stroke="rgba(246,244,238,0.07)"
        strokeWidth="1"
      />
      <circle
        cx="150"
        cy="150"
        r="110"
        fill="none"
        stroke="rgba(246,244,238,0.045)"
        strokeWidth="1"
      />
      <circle
        cx="150"
        cy="150"
        r="82"
        fill="none"
        stroke="rgba(196,154,97,0.22)"
        strokeWidth="1"
      />

      <circle cx="150" cy="10" r="3" fill="#c49a61" />
      <circle cx="10" cy="150" r="2" fill="rgba(196,154,97,0.5)" />

      <circle
        cx="150"
        cy="150"
        r="60"
        fill="#0a1422"
        stroke="rgba(196,154,97,0.35)"
        strokeWidth="1.5"
      />

      <line
        x1="150"
        y1="102"
        x2="150"
        y2="110"
        stroke="rgba(246,244,238,0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="150"
        y1="190"
        x2="150"
        y2="198"
        stroke="rgba(246,244,238,0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="102"
        y1="150"
        x2="110"
        y2="150"
        stroke="rgba(246,244,238,0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="190"
        y1="150"
        x2="198"
        y2="150"
        stroke="rgba(246,244,238,0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <line
        x1="150"
        y1="150"
        x2="150"
        y2="118"
        stroke="#f6f4ee"
        strokeWidth="2.5"
        strokeLinecap="round"
        transform="rotate(-40 150 150)"
      />

      <line
        x1="150"
        y1="150"
        x2="150"
        y2="108"
        stroke="#f6f4ee"
        strokeWidth="2"
        strokeLinecap="round"
        transform="rotate(80 150 150)"
      />

      <line
        x1="150"
        y1="150"
        x2="150"
        y2="102"
        stroke="#c49a61"
        strokeWidth="1.2"
        strokeLinecap="round"
        transform="rotate(200 150 150)"
      />

      <circle cx="150" cy="150" r="3" fill="#c49a61" />
    </svg>
  );
}