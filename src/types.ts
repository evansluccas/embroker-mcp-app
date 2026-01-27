export interface ToolInput {
  companyName?: string;
  website?: string;
  industry?: string;
  focusArea?: string;
  hasFunding?: boolean;
}

export interface InfoBox {
  text: string;
  variant: "blue" | "teal";
}

export interface Coverage {
  id: string;
  name: string;
  description: string;
  category: "essential" | "additional";
  icon: "monitor" | "users" | "clipboard" | "shield" | "network" | "briefcase" | "scale";
  iconBg: string;
  iconColor: string;
  commonCoverages: string[];
  whyYouNeedThis?: string[];
  exclusions?: string[];
  infoBox?: InfoBox;
}

export type Industry = "software" | "law" | "other";

export interface WidgetState {
  selectedIds: string[];
  activeTab: "essential" | "additional";
}
