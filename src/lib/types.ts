export type Condition = "good" | "fair" | "attention" | "damaged";

export type Trade = "Plumber" | "Electrician" | "Builder" | "Painter" | "Gardener" | "Cleaner" | "Handyman";

// Gradient stand-ins for the photos in the pre-loaded sample property.
export type SampleTone = "moss" | "timber" | "slate" | "sand" | "sage";

export type Photo =
  | { id: string; kind: "sample"; tone: SampleTone }
  | { id: string; kind: "upload"; url: string; name: string };

export type MaintenanceItem = { id: string; title: string; trade: Trade };

export type Room = {
  id: string;
  name: string;
  scope: string;
  condition: Condition | null;
  note: string;
  photos: Photo[];
  maintenance: MaintenanceItem[];
};

export type Property = {
  ref: string;
  address: string;
  description: string;
  tenant: string;
  tenancyStart: string;
  inspectionType: string;
  agency: string;
  // How long this report takes by hand — the number the demo is measured against.
  manualBaselineMinutes: number;
};

export type ReportMeta = { generatedAt: number; elapsedSeconds: number };
