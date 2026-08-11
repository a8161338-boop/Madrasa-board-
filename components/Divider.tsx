export default function Divider() {
  return (
    <div className="divider">
      <span className="ln"></span>
      <svg viewBox="0 0 100 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 6 H30 M70 6 H100" stroke="currentColor" strokeWidth="1" />
        <polygon points="50,0 56,6 50,12 44,6" fill="currentColor" />
        <circle cx="35" cy="6" r="2" fill="currentColor" />
        <circle cx="65" cy="6" r="2" fill="currentColor" />
      </svg>
      <span className="ln"></span>
    </div>
  );
}
