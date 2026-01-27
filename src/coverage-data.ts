import type { Coverage, Industry, ToolInput } from "./types";

// Software company coverages - funded
const softwareFundedCoverages: Coverage[] = [
  {
    id: "tech-eo",
    name: "Technology Errors & Omissions",
    description:
      "Covers liability claims that allege financial losses arising from your tech products or services, as well as costs arising from a security breach (ransomware, system damage, etc.).",
    category: "essential",
    icon: "monitor",
    iconBg: "#EDE9FE",
    iconColor: "#6B5CE7",
    commonCoverages: [
      "Errors, omissions, or misstatements",
      "Negligence",
      "Computer fraud",
      "Privacy breaches",
    ],
    whyYouNeedThis: [
      "It's comprehensive — two full policies in one",
      "Contractual compliance",
      "It covers independent contractors and any non-U.S. employees",
    ],
  },
  {
    id: "d-and-o",
    name: "Directors and Officers",
    description:
      "Protects your company's decision makers against claims and lawsuits alleging certain wrongful acts in managing the business.",
    category: "essential",
    icon: "users",
    iconBg: "#EDE9FE",
    iconColor: "#6B5CE7",
    commonCoverages: [
      "Shareholder claims",
      "Contract disputes",
      "Regulatory gaps",
      "Allegations of financial loss",
    ],
    whyYouNeedThis: [
      "Typically required by executives/investors to protect personal assets",
      "It shows investors you're serious and prepared",
    ],
  },
  {
    id: "epli",
    name: "Employment Practices Liability",
    description:
      "Provides financial protection from employee lawsuits alleging either unfair or inappropriate acts were committed against them by someone who represents your company.",
    category: "essential",
    icon: "clipboard",
    iconBg: "#EDE9FE",
    iconColor: "#6B5CE7",
    commonCoverages: [
      "Wrongful termination",
      "Failure to promote",
      "Harassment and retaliation",
      "Breach of employment contract",
    ],
    whyYouNeedThis: [
      "Employee claims are on the rise: EEOC received 81,055 discrimination charges in 2023",
      "Covers costs associated with reputation repair",
    ],
    infoBox: {
      text: "Includes free access to valuable HR consulting services from Excelerator®",
      variant: "blue",
    },
  },
  {
    id: "bop",
    name: "Business Owners Policy",
    description:
      "Peace of mind for your business. One policy, multiple coverages to protect your business, property, and even employees driving vehicles for work.",
    category: "essential",
    icon: "shield",
    iconBg: "#EDE9FE",
    iconColor: "#6B5CE7",
    commonCoverages: [
      "Legal defense, settlements, medical and other expenses resulting from third-party bodily injury cases",
      "Theft or damage of your property by a third-party",
      "Financial losses in case of business interruption",
      "Option to add Hired/Non-Owned Auto Coverage",
    ],
  },
  {
    id: "cyber",
    name: "Cyber Insurance",
    description:
      "Protects against data breaches, cyber attacks, and digital security incidents affecting your business.",
    category: "additional",
    icon: "network",
    iconBg: "#EDE9FE",
    iconColor: "#6B5CE7",
    commonCoverages: [
      "Phishing",
      "Network/data breaches and privacy liability claims",
      "Extortion and ransomware events",
      "Loss of business income",
    ],
  },
  {
    id: "fiduciary",
    name: "Fiduciary Liability",
    description:
      "Protects plan fiduciaries from claims arising from mismanagement of employee benefit plans.",
    category: "additional",
    icon: "briefcase",
    iconBg: "#EDE9FE",
    iconColor: "#6B5CE7",
    commonCoverages: [
      "Breach of fiduciary duty",
      "Errors in plan administration",
      "Improper investment advice",
      "Failure to comply with regulations",
    ],
  },
];

// Software company coverages - unfunded
const softwareUnfundedCoverages: Coverage[] = [
  {
    id: "tech-eo",
    name: "Technology Errors & Omissions",
    description:
      "Covers liability claims that allege financial losses arising from your tech products or services, as well as costs arising from a security breach (ransomware, system damage, etc.).",
    category: "essential",
    icon: "monitor",
    iconBg: "#EDE9FE",
    iconColor: "#6B5CE7",
    commonCoverages: [
      "Errors, omissions, or misstatements",
      "Negligence",
      "Computer fraud",
      "Privacy breaches",
    ],
    whyYouNeedThis: [
      "It's comprehensive — two full policies in one",
      "Contractual compliance",
      "It covers independent contractors and any non-U.S. employees",
    ],
  },
  {
    id: "bop",
    name: "Business Owners Policy",
    description:
      "Peace of mind for your business. One policy, multiple coverages to protect your business, property, and even employees driving vehicles for work.",
    category: "essential",
    icon: "shield",
    iconBg: "#EDE9FE",
    iconColor: "#6B5CE7",
    commonCoverages: [
      "Legal defense, settlements, medical and other expenses resulting from third-party bodily injury cases",
      "Theft or damage of your property by a third-party",
      "Financial losses in case of business interruption",
      "Option to add Hired/Non-Owned Auto Coverage",
    ],
  },
];

// Law firm coverages
const lawFirmCoverages: Coverage[] = [
  {
    id: "lawyers-pl",
    name: "Lawyers Professional Liability",
    description:
      "Even the most experienced lawyers need to cover their assets. Protect your firm while providing your professional services — anywhere in the world you do business.",
    category: "essential",
    icon: "scale",
    iconBg: "#EDE9FE",
    iconColor: "#6B5CE7",
    commonCoverages: [
      "Negligence or errors",
      "Actual or alleged misrepresentation",
      "Conflicts of interest or breach of duty",
      "Rendering or failing to render professional services",
    ],
    exclusions: ["Phishing scams"],
  },
  {
    id: "cyber",
    name: "Cyber Insurance",
    description:
      "Check Point reports that cyber attacks on law firms increased 13% in 2023. Don't be a statistic. Cyber insurance covers financial and legal costs following a cybercrime.",
    category: "essential",
    icon: "network",
    iconBg: "#EDE9FE",
    iconColor: "#6B5CE7",
    commonCoverages: [
      "Phishing",
      "Network/data breaches and privacy liability claims",
      "Extortion and ransomware events",
      "Loss of business income",
    ],
    infoBox: {
      text: "Includes complimentary information security training.",
      variant: "blue",
    },
  },
  {
    id: "bop",
    name: "Business Owners Policy",
    description:
      "Peace of mind for your business. One policy, multiple coverages to protect your business, property, and even employees driving vehicles for work.",
    category: "essential",
    icon: "shield",
    iconBg: "#EDE9FE",
    iconColor: "#6B5CE7",
    commonCoverages: [
      "Legal defense, settlements, medical and other expenses resulting from third-party bodily injury cases",
      "Theft or damage of your property by a third-party",
      "Financial losses in case of business interruption",
      "Option to add Hired/Non-Owned Auto Coverage",
    ],
  },
];

export function detectIndustry(input: ToolInput): Industry {
  const industry = input.industry?.toLowerCase() || "";

  if (industry.includes("law") || industry.includes("legal")) {
    return "law";
  }

  if (
    industry.includes("software") ||
    industry.includes("tech") ||
    industry.includes("saas") ||
    industry.includes("fintech") ||
    industry.includes("startup")
  ) {
    return "software";
  }

  return "other";
}

export function getCoveragesForInput(input: ToolInput): Coverage[] {
  const industry = detectIndustry(input);

  if (industry === "law") {
    return lawFirmCoverages;
  }

  if (industry === "software") {
    return input.hasFunding ? softwareFundedCoverages : softwareUnfundedCoverages;
  }

  // Default to unfunded software coverages for unknown industries
  return softwareUnfundedCoverages;
}

export function hasAdditionalCoverages(input: ToolInput): boolean {
  const coverages = getCoveragesForInput(input);
  return coverages.some((c) => c.category === "additional");
}

export function showSecurityScorecardPromo(input: ToolInput): boolean {
  const industry = detectIndustry(input);
  return industry === "software";
}

export function buildRedirectUrl(
  input: ToolInput,
  selectedIds: string[]
): string {
  const baseUrl = "https://app-staging.embroker.com/signup";
  const params = new URLSearchParams();

  if (input.companyName) {
    params.set("name", input.companyName);
  }

  if (input.website) {
    params.set("website", input.website);
  }

  if (input.industry) {
    params.set("naics_code", input.industry);
  }

  if (input.focusArea) {
    params.set("tech_area_of_focus", input.focusArea);
  }

  if (input.hasFunding !== undefined) {
    params.set("raised_funding", String(input.hasFunding));
  }

  if (selectedIds.length > 0) {
    params.set("coverages", selectedIds.join(","));
  }

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}
