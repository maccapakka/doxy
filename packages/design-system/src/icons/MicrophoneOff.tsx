interface MicrophoneOffProps {
  size?: number;
  className?: string;
}

export const MicrophoneOff = ({ size = 24, className }: MicrophoneOffProps) => {
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
      <title>Microphone Off</title>
      <path d="m12 19.5 0 3.75" />
      <path d="M12.56 16.47c-0.54 0.06 -5.06 0.31 -5.06 -5.22" />
      <path d="M15.13 18.84a7.8 7.8 0 0 1 -3.13 0.66h0a7.36 7.36 0 0 1 -7.5 -7.18V9.75" />
      <path d="M19.5 9.75v2.57a7 7 0 0 1 -2.08 4.95" />
      <path d="M3 2.25 21 21" />
      <path d="M7.5 6.94V5.25A4.49 4.49 0 0 1 12 0.75h0a4.49 4.49 0 0 1 4.5 4.5v6a5.54 5.54 0 0 1 -1.19 3.82" />
    </svg>
  );
};
