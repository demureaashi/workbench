import type { Candidate, Role } from "./types";

const STAGE_BOOST: Record<string, number> = {
  Sourced: 0,
  Contacted: 4,
  Replied: 8,
  Screening: 12,
  Shortlisted: 16,
  Submitted: 18,
  Interviewing: 22,
  Offered: 26,
  Hired: 28,
  Rejected: -30,
  "Dropped Out": -30,
  Closed: -30
};

export interface ScoreSignal {
  label: string;
  weight: number;
}

export interface ScoreResult {
  score: number;
  signals: ScoreSignal[];
}

export function scoreCandidate(candidate: Candidate, role: Role | undefined): ScoreResult {
  if (!role) return { score: 4, signals: [{ label: "No role selected", weight: 0 }] };

  const haystack = [
    candidate.title,
    candidate.company,
    candidate.location,
    candidate.notes,
    candidate.remarks,
    ...candidate.skills
  ].join(" ").toLowerCase();

  const signals: ScoreSignal[] = [];
  let score = 34;

  for (const must of role.must) {
    if (must && haystack.includes(must.toLowerCase())) {
      score += 15;
      signals.push({ label: must, weight: 15 });
    }
  }

  const roleCity = role.location.split(",")[0]?.trim().toLowerCase();
  if (roleCity && candidate.location.toLowerCase().includes(roleCity)) {
    score += 10;
    signals.push({ label: "Location fit", weight: 10 });
  }

  if (candidate.roleId === role.id) {
    score += 8;
    signals.push({ label: "Mapped to role", weight: 8 });
  }

  const stageWeight = STAGE_BOOST[candidate.stage] ?? 0;
  score += stageWeight;
  if (stageWeight) signals.push({ label: candidate.stage, weight: stageWeight });

  if (candidate.archived || ["Rejected", "Dropped Out", "Closed"].includes(candidate.stage)) {
    score -= 30;
    signals.push({ label: "Closed out", weight: -30 });
  }

  return {
    score: Math.max(4, Math.min(98, score)),
    signals: signals.sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight))
  };
}
