export interface ToolInput {
  companyName?: string;
  website?: string;
  industry?: string;
  focusArea?: string;
  hasFunding?: boolean;
}

export interface Coverage {
  id: string;
  name: string;
  description: string;
  category: "essential" | "additional";
}

export type Industry = "software" | "law" | "other";

export interface WidgetState {
  selectedIds: string[];
  activeTab: "essential" | "additional";
}
