export function MediaControl({
  audioUrl,
  label,
}: {
  audioUrl?: string;
  label: string;
}) {
  if (!audioUrl) {
    return <p role="status">Audio is not available for {label}.</p>;
  }

  return (
    <audio
      aria-label={`Listen to ${label}`}
      controls
      preload="none"
      src={audioUrl}
    />
  );
}
