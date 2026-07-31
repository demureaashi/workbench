import type { PALETTES, PRIORITIES, ROLE_STATUSES, STAGES } from "./constants";

export type Id = string;
export type Stage = (typeof STAGES)[number];
export type RoleStatus = (typeof ROLE_STATUSES)[number];
export type Priority = (typeof PRIORITIES)[number];
export type PaletteName = keyof typeof PALETTES;
export type IsoDate = string;

export interface Workspace {
  id: Id;
  name: string;
  mark: string;
  type: string;
  palette: PaletteName;
  archived?: boolean;
}

export interface Role {
  id: Id;
  workspaceId: Id;
  title: string;
  client: string;
  location: string;
  priority: Priority;
  status: RoleStatus;
  target: number;
  submitted: number;
  week: string;
  board: string;
  must: string[];
  nice: string;
  manager: string;
  comp: string;
  opened: IsoDate;
  due: IsoDate;
  brief: string;
  screening: string;
  notes: string;
  archived: boolean;
  closed?: IsoDate;
  closeReason?: string;
}

export interface CandidateFile {
  id: Id;
  candidateId: Id;
  name: string;
  size: number;
  mimeType: string;
  storageKey: string;
  createdAt: string;
}

export interface CandidateLink {
  id: Id;
  candidateId: Id;
  url: string;
}

export interface Candidate {
  id: Id;
  workspaceId: Id;
  name: string;
  title: string;
  company: string;
  location: string;
  roleId: Id;
  stage: Stage;
  followUp: IsoDate;
  lastContact: IsoDate;
  snoozedUntil: IsoDate;
  snoozedOn: IsoDate;
  contactedOn: IsoDate;
  touches: number;
  linkedin: string;
  email: string;
  files: CandidateFile[];
  links: string[];
  skills: string[];
  notes: string;
  remarks: string;
  sequence: string;
  archived: boolean;
  archivedAt?: IsoDate;
  closeReason?: string;
}

export interface Template {
  id: Id;
  workspaceId: Id;
  title: string;
  type: string;
  body: string;
  used: number;
  lastUsed: IsoDate;
}

export interface Capture {
  id: Id;
  workspaceId: Id;
  source: string;
  title: string;
  url: string;
  when: string;
  snippet: string;
  name: string;
  parsedTitle: string;
  company: string;
  location: string;
  email: string;
  link: string;
  roleId: Id;
  dismissed?: boolean;
}

export interface WorkspaceExport {
  version: 2;
  workspace: Workspace;
  roles: Role[];
  candidates: Candidate[];
  templates: Template[];
  captures: Capture[];
}

export interface BootstrapPayload {
  workspaces: Workspace[];
  activeWorkspace: Workspace;
  roles: Role[];
  candidates: Candidate[];
  templates: Template[];
  captures: Capture[];
}
