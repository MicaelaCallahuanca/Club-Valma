export default function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-[3px] bg-white shadow-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
