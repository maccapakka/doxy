interface PhoneIconProps {
  size?: number;
  className?: string;
}

export const PhoneIcon = ({ size = 24, className }: PhoneIconProps) => {
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
      <title>Phone</title>
      <path d="m15.04 22.39 0.012 0.007a5.533 5.533 0 0 0 6.884 -0.755l0.774 -0.774a1.846 1.846 0 0 0 0 -2.609L19.449 15a1.846 1.846 0 0 0 -2.609 0h0a1.843 1.843 0 0 1 -2.608 0L9.014 9.781a1.846 1.846 0 0 1 0 -2.609h0a1.843 1.843 0 0 0 0 -2.608L5.754 1.3a1.846 1.846 0 0 0 -2.609 0l-0.774 0.774a5.535 5.535 0 0 0 -0.756 6.884l0.008 0.012A49.935 49.935 0 0 0 15.04 22.39Z" />
    </svg>
  );
};
