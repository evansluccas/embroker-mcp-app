import type { Coverage, Industry, ToolInput } from "./types";

// Software company coverages - funded
const softwareFundedCoverages: Coverage[] = [
  {
    id: "tech-eo",
    name: "Technology Errors & Omissions",
    description:
      "Covers liability claims that allege financial losses arising from your tech products or services, as well as costs arising from a security breach.",
    category: "essential",
  },
  {
    id: "d-and-o",
    name: "Directors and Officers",
    description:
      "Protects your company's decision makers against claims and lawsuits alleging certain wrongful acts in managing the business.",
    category: "essential",
  },
  {
    id: "epli",
    name: "Employment Practices Liability",
    description:
      "Covers claims from employees alleging wrongful termination, failure to promote, harassment and retaliation, or breach of employment contract.",
    category: "essential",
  },
  {
    id: "bop",
    name: "Business Owner's Policy",
    description:
      "Combines general liability and property coverage, including legal defense, settlements, theft/damage, and business interruption.",
    category: "essential",
  },
  {
    id: "cyber",
    name: "Cyber Insurance",
    description:
      "Protects against data breaches, cyber attacks, and digital security incidents affecting your business.",
    category: "additional",
  },
  {
    id: "fiduciary",
    name: "Fiduciary Liability",
    description:
      "Protects plan fiduciaries from claims arising from mismanagement of employee benefit plans.",
    category: "additional",
  },
];

// Software company coverages - unfunded
const softwareUnfundedCoverages: Coverage[] = [
  {
    id: "tech-eo",
    name: "Technology Errors & Omissions",
    description:
      "Covers liability claims that allege financial losses arising from your tech products or services, as well as costs arising from a security breach.",
    category: "essential",
  },
  {
    id: "bop",
    name: "Business Owner's Policy",
    description:
      "Combines general liability and property coverage, including legal defense, settlements, theft/damage, and business interruption.",
    category: "essential",
  },
];

// Law firm coverages
const lawFirmCoverages: Coverage[] = [
  {
    id: "lawyers-pl",
    name: "Lawyers Professional Liability",
    description:
      "Professional liability coverage for law firms covering negligence, errors, misrepresentation, and conflicts of interest.",
    category: "essential",
  },
  {
    id: "cyber",
    name: "Cyber Insurance",
    description:
      "Protects against data breaches, cyber attacks, and digital security incidents affecting your business.",
    category: "essential",
  },
  {
    id: "bop",
    name: "Business Owner's Policy",
    description:
      "Combines general liability and property coverage, including legal defense, settlements, theft/damage, and business interruption.",
    category: "essential",
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
