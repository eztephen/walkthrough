import { ImageResponse } from "next/og";
export const alt = "Walkthrough — inspection reports that write themselves";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The preview card shown when the link is shared on LinkedIn, Messenger or Slack.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "100%", height: "100%", padding: "72px 80px", background: "#0F5257" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 36 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#7FD6CE" }} />
          <div style={{ fontSize: 30, color: "#B7E3DF", letterSpacing: 4 }}>INSPECTION REPORTS</div>
        </div>
        <div style={{ fontSize: 108, fontWeight: 800, color: "#FFFFFF", letterSpacing: -4, lineHeight: 1 }}>Walkthrough</div>
        <div style={{ marginTop: 22, fontSize: 40, color: "#E6F4F2" }}>Inspection reports that write themselves.</div>
        <div style={{ marginTop: 28, fontSize: 26, color: "#9ED0CB" }}>Live demo · sample property pre-loaded · nothing to install</div>
      </div>
    ),
    size,
  );
}
