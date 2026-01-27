/**
 * Embroker Insurance Coverage Selection MCP App
 */
import type { App, McpUiHostContext } from "@modelcontextprotocol/ext-apps";
import { useApp } from "@modelcontextprotocol/ext-apps/react";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Check, ExternalLink, Shield, ShieldCheck } from "lucide-react";
import { StrictMode, useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  buildRedirectUrl,
  getCoveragesForInput,
  hasAdditionalCoverages,
  showSecurityScorecardPromo,
} from "./coverage-data";
import type { Coverage, ToolInput, WidgetState } from "./types";

// Brand colors
const EMBROKER_NAVY = "#02024E";
const EMBROKER_ACCENT = "#B45FF9";

function EmbrokerApp() {
  const [toolInput, setToolInput] = useState<ToolInput | null>(null);
  const [hostContext, setHostContext] = useState<McpUiHostContext | undefined>();
  const [widgetState, setWidgetState] = useState<WidgetState>({
    selectedIds: [],
    activeTab: "essential",
  });

  const { app, error } = useApp({
    appInfo: { name: "Embroker Coverage Selection", version: "0.1.0" },
    capabilities: {},
    onAppCreated: (app) => {
      app.onteardown = async () => {
        console.info("App is being torn down");
        return {};
      };

      app.ontoolinput = async (input) => {
        console.info("Received tool input:", input);
        const args = input.arguments as ToolInput;
        setToolInput(args);

        // Pre-select essential coverages by default
        const coverages = getCoveragesForInput(args);
        const essentialIds = coverages
          .filter((c) => c.category === "essential")
          .map((c) => c.id);
        setWidgetState((prev) => ({
          ...prev,
          selectedIds: essentialIds,
        }));
      };

      app.ontoolresult = async (result: CallToolResult) => {
        console.info("Received tool result:", result);
      };

      app.ontoolcancelled = (params) => {
        console.info("Tool call cancelled:", params.reason);
      };

      app.onerror = console.error;

      app.onhostcontextchanged = (params) => {
        setHostContext((prev) => ({ ...prev, ...params }));
      };
    },
  });

  useEffect(() => {
    if (app) {
      setHostContext(app.getHostContext());
    }
  }, [app]);

  if (error) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        <strong>ERROR:</strong> {error.message}
      </div>
    );
  }

  if (!app) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <p>Connecting...</p>
      </div>
    );
  }

  if (!toolInput) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <p>Waiting for company information...</p>
      </div>
    );
  }

  return (
    <CoverageSelectionUI
      app={app}
      toolInput={toolInput}
      hostContext={hostContext}
      widgetState={widgetState}
      setWidgetState={setWidgetState}
    />
  );
}

interface CoverageSelectionUIProps {
  app: App;
  toolInput: ToolInput;
  hostContext?: McpUiHostContext;
  widgetState: WidgetState;
  setWidgetState: React.Dispatch<React.SetStateAction<WidgetState>>;
}

function CoverageSelectionUI({
  app,
  toolInput,
  hostContext,
  widgetState,
  setWidgetState,
}: CoverageSelectionUIProps) {
  const coverages = getCoveragesForInput(toolInput);
  const showAdditional = hasAdditionalCoverages(toolInput);
  const showSecurityPromo = showSecurityScorecardPromo(toolInput);

  const essentialCoverages = coverages.filter((c) => c.category === "essential");
  const additionalCoverages = coverages.filter((c) => c.category === "additional");

  const displayedCoverages =
    widgetState.activeTab === "essential" ? essentialCoverages : additionalCoverages;

  const toggleCoverage = useCallback((id: string) => {
    setWidgetState((prev) => ({
      ...prev,
      selectedIds: prev.selectedIds.includes(id)
        ? prev.selectedIds.filter((i) => i !== id)
        : [...prev.selectedIds, id],
    }));
  }, [setWidgetState]);

  const handleContinue = useCallback(async () => {
    const redirectUrl = buildRedirectUrl(toolInput, widgetState.selectedIds);
    console.info("Redirecting to:", redirectUrl);

    try {
      const { isError } = await app.openLink({ url: redirectUrl });
      if (isError) {
        console.error("Failed to open link");
        // Fallback: try window.open
        window.open(redirectUrl, "_blank");
      }
    } catch (e) {
      console.error("Error opening link:", e);
      window.open(redirectUrl, "_blank");
    }
  }, [app, toolInput, widgetState.selectedIds]);

  const selectedCount = widgetState.selectedIds.length;

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        paddingTop: hostContext?.safeAreaInsets?.top ?? 0,
        paddingRight: hostContext?.safeAreaInsets?.right ?? 0,
        paddingBottom: hostContext?.safeAreaInsets?.bottom ?? 0,
        paddingLeft: hostContext?.safeAreaInsets?.left ?? 0,
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: EMBROKER_NAVY,
          color: "white",
          padding: "24px 32px",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <Shield size={28} color="white" />
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Embroker
            </span>
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              margin: "16px 0 8px",
            }}
          >
            Select Your Coverage
          </h1>
          <p style={{ fontSize: 16, opacity: 0.9 }}>
            {toolInput.companyName
              ? `Recommended coverages for ${toolInput.companyName}`
              : "Choose the insurance coverages that fit your business needs"}
          </p>
        </div>
      </header>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 32px" }}>
        {/* Tabs */}
        {showAdditional && (
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 24,
              borderBottom: "2px solid #e5e7eb",
            }}
          >
            <TabButton
              active={widgetState.activeTab === "essential"}
              onClick={() =>
                setWidgetState((prev) => ({ ...prev, activeTab: "essential" }))
              }
            >
              Essential Coverages
            </TabButton>
            <TabButton
              active={widgetState.activeTab === "additional"}
              onClick={() =>
                setWidgetState((prev) => ({ ...prev, activeTab: "additional" }))
              }
            >
              Additional Coverages
            </TabButton>
          </div>
        )}

        {/* Coverage Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              displayedCoverages.length === 3
                ? "repeat(3, 1fr)"
                : "repeat(2, 1fr)",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {displayedCoverages.map((coverage) => (
            <CoverageCard
              key={coverage.id}
              coverage={coverage}
              selected={widgetState.selectedIds.includes(coverage.id)}
              onToggle={() => toggleCoverage(coverage.id)}
            />
          ))}
        </div>

        {/* SecurityScorecard Promo */}
        {showSecurityPromo && widgetState.activeTab === "essential" && (
          <div
            style={{
              backgroundColor: "#f0e6ff",
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
              border: `1px solid ${EMBROKER_ACCENT}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <ShieldCheck size={24} color={EMBROKER_ACCENT} />
              <div>
                <p style={{ fontWeight: 600, marginBottom: 4 }}>
                  Unlock up to 10% off Tech E&O
                </p>
                <p style={{ fontSize: 14, color: "#666" }}>
                  Through our partnership with SecurityScorecard, improve your
                  security posture and save on premiums.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={selectedCount === 0}
          style={{
            width: "100%",
            padding: "16px 24px",
            backgroundColor: selectedCount > 0 ? EMBROKER_NAVY : "#ccc",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            cursor: selectedCount > 0 ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "background-color 0.2s",
          }}
        >
          Continue with {selectedCount} coverage{selectedCount !== 1 ? "s" : ""}
          <ExternalLink size={18} />
        </button>

        {selectedCount === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#666",
              fontSize: 14,
              marginTop: 12,
            }}
          >
            Please select at least one coverage to continue
          </p>
        )}
      </div>
    </main>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 20px",
        backgroundColor: "transparent",
        color: active ? EMBROKER_NAVY : "#666",
        border: "none",
        borderBottom: active ? `2px solid ${EMBROKER_NAVY}` : "2px solid transparent",
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        cursor: "pointer",
        marginBottom: -2,
        transition: "all 0.2s",
      }}
    >
      {children}
    </button>
  );
}

interface CoverageCardProps {
  coverage: Coverage;
  selected: boolean;
  onToggle: () => void;
}

function CoverageCard({ coverage, selected, onToggle }: CoverageCardProps) {
  return (
    <div
      onClick={onToggle}
      style={{
        backgroundColor: selected ? EMBROKER_NAVY : "white",
        color: selected ? "white" : "#1a1a2e",
        border: selected ? "none" : `1px solid ${EMBROKER_NAVY}`,
        borderRadius: 12,
        padding: 20,
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        flexDirection: "column",
        minHeight: 180,
      }}
    >
      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        {coverage.name}
      </h3>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.5,
          opacity: selected ? 0.9 : 0.7,
          flex: 1,
        }}
      >
        {coverage.description}
      </p>
      <button
        style={{
          marginTop: 16,
          padding: "10px 16px",
          backgroundColor: selected ? "rgba(255,255,255,0.2)" : "transparent",
          color: selected ? "white" : EMBROKER_NAVY,
          border: selected ? "none" : `1px solid ${EMBROKER_NAVY}`,
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {selected ? (
          <>
            <Check size={16} />
            Selected
          </>
        ) : (
          "+ Select"
        )}
      </button>
    </div>
  );
}

// Mount the app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EmbrokerApp />
  </StrictMode>
);
