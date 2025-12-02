interface MeetingCameraOffProps {
  size?: number;
  className?: string;
}

export const MeetingCameraOff = ({ size = 24, className }: MeetingCameraOffProps) => {
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
      <title>Meeting Camera Off</title>
      <path d="m0.75 0.75 22.5 22.5" />
      <path d="M15.75 11.25v-3a1.5 1.5 0 0 0 -1.5 -1.5H10.5" />
      <path d="M13.5 18.75H2.25a1.5 1.5 0 0 1 -1.5 -1.5v-9a1.5 1.5 0 0 1 1.5 -1.5" />
      <path d="m19.579 16.165 2.586 1.292a0.75 0.75 0 0 0 1.085 -0.671V8.714a0.75 0.75 0 0 0 -1.085 -0.671l-2.586 1.292a1.5 1.5 0 0 0 -0.829 1.342v4.146a1.5 1.5 0 0 0 0.829 1.342Z" />
    </svg>
  );
};
