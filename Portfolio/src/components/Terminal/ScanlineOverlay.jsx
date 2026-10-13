export default function ScanlineOverlay({ enabled = true }) {
  if (!enabled) return null;

  return (
    <div className="crt-overlay" aria-hidden="true">
      <div className="crt-scanlines"></div>
      <div className="crt-flicker"></div>
      <div className="crt-vignette"></div>
    </div>
  );
}
