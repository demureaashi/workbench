export const STAGES = [
  "Sourced",
  "Contacted",
  "Replied",
  "Screening",
  "Shortlisted",
  "Submitted",
  "Interviewing",
  "Offered",
  "Hired",
  "Rejected",
  "Dropped Out",
  "Closed"
] as const;

export const ARCHIVED_STAGES = ["Hired", "Dropped Out", "Closed"] as const;
export const ROLE_STATUSES = ["Active", "Paused", "Filled", "Closed"] as const;
export const PRIORITIES = ["High", "Medium", "Low"] as const;

export const STAGE_COLOR: Record<string, string> = {
  Sourced: "#9b9797",
  Contacted: "#c28d41",
  Replied: "#a06f24",
  Screening: "#7d5411",
  Shortlisted: "#6f8f6a",
  Submitted: "#4f7f52",
  Interviewing: "#4f7f52",
  Offered: "#2f6f8f",
  Hired: "#2b6b3f",
  Rejected: "#b3402b",
  "Dropped Out": "#b3402b",
  Closed: "#7d7979"
};

export const PRIORITY_COLOR: Record<string, string> = {
  High: "#b3402b",
  Medium: "#c28d41",
  Low: "#6f8f6a"
};

export const PALETTES = {
  house: {
    label: "House - navy & terracotta",
    accent: "#c0764a",
    a100: "#f7ebe1",
    a600: "#a45f37",
    a700: "#874a28",
    a800: "#5f331b",
    ink: "#17334f"
  },
  superteam: {
    label: "Superteam - black & red",
    accent: "#e5453a",
    a100: "#fdeae8",
    a600: "#c3372c",
    a700: "#9c2b22",
    a800: "#6f1e17",
    ink: "#101010"
  },
  ink: {
    label: "Ink & graphite",
    accent: "#3f4a55",
    a100: "#ecedef",
    a600: "#313a43",
    a700: "#242b32",
    a800: "#171c21",
    ink: "#171c21"
  },
  forest: {
    label: "Forest",
    accent: "#3f7350",
    a100: "#e8f1ea",
    a600: "#2f5c3f",
    a700: "#234730",
    a800: "#173021",
    ink: "#16211a"
  },
  navy: {
    label: "Navy",
    accent: "#2c4a7c",
    a100: "#e8eef7",
    a600: "#233c66",
    a700: "#1a2e50",
    a800: "#121f36",
    ink: "#141c2b"
  },
  plum: {
    label: "Plum",
    accent: "#6f3b63",
    a100: "#f5eaf2",
    a600: "#5a2f50",
    a700: "#45243d",
    a800: "#2f1829",
    ink: "#1f1620"
  }
} as const;

export const DEFAULT_WORKSPACE = {
  id: "st",
  name: "Superteam Talent",
  mark: "ST",
  type: "Talent collective",
  palette: "superteam"
} as const;
