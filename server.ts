import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
  CallToolResult,
  ReadResourceResult,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

// Works both from source (server.ts) and compiled (dist/server.js)
const DIST_DIR = import.meta.filename.endsWith(".ts")
  ? path.join(import.meta.dirname, "dist")
  : import.meta.dirname;

// Input schema for the coverage selection tool
const coverageSelectionInputSchema = z.object({
  companyName: z.string().optional().describe("The legal company name"),
  website: z.string().optional().describe("The company website URL"),
  industry: z
    .string()
    .optional()
    .describe("Industry classification (e.g., 'Software/Tech', 'Law')"),
  focusArea: z
    .string()
    .optional()
    .describe("Technology focus area (for software companies)"),
  hasFunding: z
    .boolean()
    .optional()
    .describe("Whether the company has received funding"),
});

export type CoverageSelectionInput = z.infer<typeof coverageSelectionInputSchema>;

/**
 * Creates a new MCP server instance with tools and resources registered.
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: "embroker-insurance",
    version: "0.1.0",
  });

  // Resource URI that links the tool to its UI
  const resourceUri = "ui://show-coverage-selection/mcp-app.html";

  // Register the coverage selection tool
  registerAppTool(
    server,
    "show_coverage_selection",
    {
      title: "Show Coverage Selection",
      description:
        "Shows the insurance coverage selection page for Embroker based on company industry and funding status. Use this after collecting company information to display personalized insurance coverage options.",
      inputSchema: {
        companyName: z.string().optional().describe("The legal company name"),
        website: z.string().optional().describe("The company website URL"),
        industry: z.string().optional().describe("Industry classification (e.g., 'Software/Tech', 'Law')"),
        focusArea: z.string().optional().describe("Technology focus area (for software companies)"),
        hasFunding: z.boolean().optional().describe("Whether the company has received funding"),
      },
      _meta: { ui: { resourceUri } },
    },
    async (args): Promise<CallToolResult> => {
      const input = coverageSelectionInputSchema.parse(args);

      // Build a text summary for non-UI hosts
      const industryDisplay = input.industry || "Unknown";
      const fundingStatus = input.hasFunding ? "Funded" : "Not funded";

      let coverageList: string[];
      if (input.industry?.toLowerCase().includes("law")) {
        coverageList = [
          "Lawyers Professional Liability",
          "Cyber Insurance",
          "Business Owner's Policy",
        ];
      } else if (input.hasFunding) {
        coverageList = [
          "Technology E&O",
          "Directors & Officers",
          "Employment Practices Liability",
          "Business Owner's Policy",
          "Cyber Insurance (Additional)",
          "Fiduciary Liability (Additional)",
        ];
      } else {
        coverageList = ["Technology E&O", "Business Owner's Policy"];
      }

      const textContent = `
Insurance Coverage Selection for ${input.companyName || "Your Company"}

Industry: ${industryDisplay}
Funding Status: ${fundingStatus}

Recommended Coverages:
${coverageList.map((c) => `- ${c}`).join("\n")}

Please select your desired coverages in the UI to continue to the Embroker signup.
      `.trim();

      return {
        content: [{ type: "text", text: textContent }],
      };
    }
  );

  // Register the UI resource
  registerAppResource(
    server,
    resourceUri,
    resourceUri,
    { mimeType: RESOURCE_MIME_TYPE },
    async (): Promise<ReadResourceResult> => {
      const html = await fs.readFile(
        path.join(DIST_DIR, "mcp-app.html"),
        "utf-8"
      );
      return {
        contents: [{ uri: resourceUri, mimeType: RESOURCE_MIME_TYPE, text: html }],
      };
    }
  );

  return server;
}
