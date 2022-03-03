export interface BwitData {
  bcid: string;
  text: string; // Text to encode
  scale: number; // 3x scaling factor
  height: number; // Bar height, in millimeters
  includeText: boolean; // Show human-readable text
  textXAlign: "center" | "left" | "right"; // Always good to set this
}
