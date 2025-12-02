interface ReportProps {
  size?: number;
  className?: string;
}

export const Report = ({ size = 24, className }: ReportProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <title>Report</title>
      <path d="M19.5 19.5H4.5V4.5H19.5Z" />
      <path d="M19.5 12H4.5" />
      <path d="M12 19.5V4.5" />
    </svg>
  );
};
