export default function AddIcon({ color, size }) {
  return (
    <svg
      width={size || '24'}
      height={size || '24'}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 12H18"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18V6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
