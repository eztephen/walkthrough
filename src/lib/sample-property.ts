import type { Property, Room } from "./types";

// Pre-loaded so a prospect can open the finished owner report in the first five seconds.
export const SAMPLE_PROPERTY: Property = {
  ref: "RV-0418",
  address: "14 Fernbrook Road, Riverton",
  description: "3 bed · 1 bath townhouse",
  tenant: "M. Anderson",
  tenancyStart: "1 March 2024",
  inspectionType: "Routine — quarterly",
  agency: "Riverton Property Management",
  manualBaselineMinutes: 130,
};

export const SAMPLE_ROOMS: Room[] = [
  {
    id: "entry",
    name: "Entry & hallway",
    scope: "Front door, hall, storage",
    condition: "good",
    note: "Front door and deadlock operating correctly. Hall carpet clean, no marks. Smoke alarm tested and sounding — expiry label reads 2029.",
    photos: [
      { id: "s-entry-1", kind: "sample", tone: "moss" },
      { id: "s-entry-2", kind: "sample", tone: "timber" },
    ],
    maintenance: [],
  },
  {
    id: "lounge",
    name: "Lounge",
    scope: "Living area, windows, heat pump",
    condition: "good",
    note: "Well kept. Heat pump filters clean and unit running quietly. Curtains and window seals in good order, no condensation staining.",
    photos: [{ id: "s-lounge-1", kind: "sample", tone: "slate" }],
    maintenance: [],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    scope: "Bench, cabinetry, appliances, extractor",
    condition: "attention",
    note: "Benchtop and cabinetry in good condition. Extractor fan is noisy under load and the filter is heavily loaded with grease. Mixer tap at the sink drips steadily when closed.",
    photos: [
      { id: "s-kitchen-1", kind: "sample", tone: "sand" },
      { id: "s-kitchen-2", kind: "sample", tone: "sage" },
    ],
    maintenance: [{ id: "m-kitchen-1", title: "Kitchen mixer tap dripping — replace washer or cartridge", trade: "Plumber" }],
  },
  { id: "bath", name: "Bathroom", scope: "Shower, vanity, extractor, seals", condition: null, note: "", photos: [], maintenance: [] },
  { id: "bed1", name: "Bedroom 1", scope: "Main bedroom, wardrobe", condition: null, note: "", photos: [], maintenance: [] },
  { id: "bed2", name: "Bedrooms 2 & 3", scope: "Second and third bedrooms", condition: null, note: "", photos: [], maintenance: [] },
  { id: "laundry", name: "Laundry", scope: "Tub, connections, ventilation", condition: null, note: "", photos: [], maintenance: [] },
  { id: "exterior", name: "Exterior & grounds", scope: "Cladding, gutters, lawn, fencing", condition: null, note: "", photos: [], maintenance: [] },
];
