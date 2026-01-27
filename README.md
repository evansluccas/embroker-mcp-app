# Embroker Insurance MCP App

An interactive insurance coverage selection tool built with the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) Apps SDK. This app integrates with Claude Desktop to help users discover and select appropriate business insurance coverages through a conversational interface.

![MCP App](https://img.shields.io/badge/MCP-App-6B5CE7)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)

---

## Table of Contents

- [What is MCP?](#what-is-mcp)
- [How This App Works](#how-this-app-works)
- [Installation](#installation)
- [Testing the App](#testing-the-app)
- [Project Structure](#project-structure)
- [Making UI Changes](#making-ui-changes)
- [Configuring the MCP Tool](#configuring-the-mcp-tool)
- [Distribution](#distribution)
- [Troubleshooting](#troubleshooting)

---

## What is MCP?

**Model Context Protocol (MCP)** is a protocol that allows AI assistants (like Claude) to connect to external tools and services. Think of it as a way to extend Claude's capabilities with custom functionality.

### How MCP Works

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Conversation                        │
│                                                                  │
│  User: "I need insurance for my tech startup"                   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                          Claude Desktop                          │
│                                                                  │
│  1. Sees available MCP tools and their descriptions             │
│  2. Recognizes insurance-related request                        │
│  3. Gathers required info through conversation                  │
│  4. Calls the appropriate tool with collected data              │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         MCP Server                               │
│                    (This App - embroker-mcp-app)                │
│                                                                  │
│  1. Receives tool call with parameters                          │
│  2. Processes the request                                       │
│  3. Returns result + interactive UI                             │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Interactive UI                              │
│                                                                  │
│  • Displays coverage options based on industry/funding          │
│  • User selects coverages                                       │
│  • Redirects to Embroker signup with pre-filled data            │
└─────────────────────────────────────────────────────────────────┘
```

### Key Concepts

| Concept | Description |
|---------|-------------|
| **MCP Server** | A backend service that registers tools and resources |
| **Tool** | A function Claude can call (e.g., `show_coverage_selection`) |
| **Resource** | Content the tool can return (e.g., HTML UI) |
| **Input Schema** | Defines what parameters a tool accepts |
| **Tool Description** | Helps Claude understand when to use the tool |

---

## How This App Works

### The Tool: `show_coverage_selection`

This app registers one tool that:

1. **Accepts company information** (name, industry, funding status, etc.)
2. **Returns personalized coverage options** based on business type
3. **Displays an interactive UI** for selecting coverages
4. **Redirects to Embroker signup** with pre-filled data

### Business Logic

| Scenario | Coverages Shown |
|----------|-----------------|
| **Funded Tech Startup** | Tech E&O, D&O, EPLI, BOP + Additional (Cyber, Fiduciary) |
| **Bootstrapped Startup** | Tech E&O, BOP |
| **Law Firm** | Lawyers Professional Liability, Cyber, BOP |

### Triggering the Tool

Claude decides when to use the tool based on its description. When a user says something like:
- "I need business insurance"
- "What insurance does my startup need?"
- "Help me find coverage for my law firm"

Claude recognizes this matches the tool's purpose and initiates the flow.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Claude Desktop](https://claude.ai/download) app installed

### Step 1: Clone the Repository

```bash
git clone https://github.com/evansluccas/embroker-mcp-app.git
cd embroker-mcp-app
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Build the UI

```bash
npm run build:ui
```

### Step 4: Configure Claude Desktop

Open or create the Claude Desktop configuration file:

```bash
# macOS
open ~/Library/Application\ Support/Claude/claude_desktop_config.json

# If the file doesn't exist, create it:
mkdir -p ~/Library/Application\ Support/Claude
touch ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Add the MCP server configuration:

```json
{
  "mcpServers": {
    "embroker": {
      "command": "npx",
      "args": ["tsx", "/FULL/PATH/TO/embroker-mcp-app/main.ts", "--stdio"]
    }
  }
}
```

**Important:** Replace `/FULL/PATH/TO/` with the actual path to your project.

### Step 5: Restart Claude Desktop

Quit Claude Desktop completely (Cmd+Q) and reopen it.

### Step 6: Test It

Start a new conversation and say:
> "I need insurance for my funded tech startup called Acme Corp"

Claude should call the tool and display the coverage selection UI.

---

## Testing the App

### Option 1: Claude Desktop

After installation, simply chat with Claude about business insurance needs.

### Option 2: Basic Host (Development)

For faster iteration during development:

**Terminal 1 - Start the server:**
```bash
cd embroker-mcp-app
npm run start
```

**Terminal 2 - Start the test host:**
```bash
# Clone the MCP Apps SDK if you haven't
git clone --depth 1 https://github.com/modelcontextprotocol/ext-apps.git /tmp/mcp-ext-apps
cd /tmp/mcp-ext-apps
npm install

# Run the basic host
cd examples/basic-host
SERVERS='["http://localhost:3001/mcp"]' npm run start
```

Open http://localhost:8080 and test with JSON input:

```json
{"companyName":"Acme Corp","industry":"Software/Tech","hasFunding":true}
```

---

## Project Structure

```
embroker-mcp-app/
├── package.json            # Dependencies and scripts
├── main.ts                 # Server entry point (HTTP + stdio transports)
├── server.ts               # MCP server - tool & resource registration
├── mcp-app.html            # HTML entry point for the UI
├── vite.config.ts          # Vite bundler configuration
├── tsconfig.json           # TypeScript config (React/UI)
├── tsconfig.server.json    # TypeScript config (Server)
├── dist/                   # Built files (generated)
│   └── mcp-app.html        # Bundled single-file UI
└── src/
    ├── mcp-app.tsx         # Main React component
    ├── types.ts            # TypeScript interfaces
    ├── coverage-data.ts    # Coverage definitions & business logic
    └── global.css          # Global styles
```

---

## Making UI Changes

The UI is built with React and bundled into a single HTML file using Vite.

### Step 1: Edit the React Component

Open `src/mcp-app.tsx` and make your changes. Key sections:

```tsx
// Design tokens (colors, etc.)
const colors = {
  purple: "#6B5CE7",
  purpleLight: "#F5F3FF",
  // ... more colors
};

// Main UI component
function CoverageSelectionUI({ ... }) {
  // Header, cards, buttons, etc.
}

// Individual coverage card
function CoverageCard({ coverage, selected, onToggle }) {
  // Card layout, icon, select button, etc.
}
```

### Step 2: Edit Coverage Data

To modify coverage options, edit `src/coverage-data.ts`:

```tsx
const softwareFundedCoverages: Coverage[] = [
  {
    id: "tech-eo",
    name: "Technology Errors & Omissions",
    description: "Covers liability claims...",
    category: "essential",
    icon: "monitor",
    iconBg: "#EDE9FE",
    iconColor: "#6B5CE7",
    commonCoverages: [
      "Errors, omissions, or misstatements",
      // ... more items
    ],
    whyYouNeedThis: [
      "It's comprehensive — two full policies in one",
      // ... more items
    ],
  },
  // ... more coverages
];
```

### Step 3: Edit Styles

Global styles are in `src/global.css`:

```css
/* Button hover effect */
.select-btn:hover {
  background-color: #6B5CE7 !important;
  color: white !important;
}

/* Responsive grid */
@media (max-width: 600px) {
  .coverage-grid {
    grid-template-columns: 1fr !important;
  }
}
```

### Step 4: Rebuild

After making changes, rebuild the UI:

```bash
npm run build:ui
```

### Step 5: Test

- **Claude Desktop:** Restart the app to load changes
- **Basic Host:** Refresh the browser

---

## Configuring the MCP Tool

### Changing the Tool Schema

The tool's input schema determines what data Claude gathers. Edit `server.ts`:

```typescript
registerAppTool(
  server,
  "show_coverage_selection",
  {
    title: "Show Coverage Selection",
    description: "Shows the insurance coverage selection page...",
    inputSchema: {
      // Required field
      companyName: z.string().describe("The legal company name"),

      // Optional field
      website: z.string().optional().describe("Company website URL"),

      // Enum field (restricts options)
      industry: z.enum(["Software/Tech", "Law", "Healthcare"])
        .describe("Select your industry"),

      // Boolean field
      hasFunding: z.boolean().describe("Has the company raised funding?"),
    },
    _meta: { ui: { resourceUri } },
  },
  async (args) => {
    // Tool handler logic
  }
);
```

### Field Types

| Type | Example | Effect |
|------|---------|--------|
| `z.string()` | `companyName: z.string()` | Free text input |
| `z.string().optional()` | `website: z.string().optional()` | Optional free text |
| `z.boolean()` | `hasFunding: z.boolean()` | Yes/No question |
| `z.enum([...])` | `z.enum(["A", "B", "C"])` | Multiple choice |
| `z.number()` | `employees: z.number()` | Numeric input |

### Influencing Claude's Questions

Claude uses the **description** to understand what to ask. Be specific:

```typescript
// Vague - Claude might not ask the right question
website: z.string().optional().describe("Website")

// Better - Claude knows exactly what to ask
website: z.string().optional().describe("The company's official website URL (e.g., https://example.com)")
```

### Changing the Tool Description

The tool description determines **when** Claude uses the tool:

```typescript
description: "Shows the insurance coverage selection page for Embroker. Use this when a user needs help finding business insurance, commercial coverage, or liability protection for their company."
```

---

## Distribution

### Current Limitation

MCP tools must be **manually installed** by each user. There's no "app store" yet.

### Distribution Options

| Method | Pros | Cons |
|--------|------|------|
| **GitHub repo** | Easy to share, version controlled | Users need technical skills |
| **npm package** | Easy install with `npm install -g` | Users need Node.js |
| **Hosted server** | No local install needed | Requires hosting infrastructure |

### Publishing to npm

1. Update `package.json` with your package name
2. Run `npm publish`
3. Users can then install with:
   ```bash
   npm install -g embroker-mcp-app
   ```

### Hosted Deployment

Deploy the server to a cloud provider (Vercel, Railway, Fly.io, etc.):

1. The HTTP transport is already configured (`/mcp` endpoint)
2. Users add your hosted URL to their Claude config:
   ```json
   {
     "mcpServers": {
       "embroker": {
         "url": "https://your-deployed-server.com/mcp"
       }
     }
   }
   ```

---

## Troubleshooting

### Tool not appearing in Claude

1. Check the config file path is correct
2. Verify the full path in `args` is absolute
3. Restart Claude Desktop completely (Cmd+Q)
4. Check logs:
   ```bash
   cat ~/Library/Logs/Claude/mcp*.log
   ```

### UI not updating after changes

1. Run `npm run build:ui` after making changes
2. Restart Claude Desktop
3. Clear browser cache if using basic-host

### Server errors

Check the MCP server logs:
```bash
cat ~/Library/Logs/Claude/mcp-server-embroker.log
```

### Common issues

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` |
| UI shows "Connecting..." | Check server is running |
| Tool not called | Check tool description matches user intent |
| Schema not showing fields | Use Zod types (`z.string()`) not plain objects |

---

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run build:ui` | Build the UI bundle |
| `npm run start` | Build UI and start server |
| `npm run serve` | Start server only (for development) |
| `npm run dev` | Watch mode - rebuilds on changes |

---

## License

MIT

---

## Links

- [MCP Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP Apps SDK](https://github.com/modelcontextprotocol/ext-apps)
- [Embroker](https://www.embroker.com/)
