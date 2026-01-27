/**
 * Embroker Insurance Coverage Selection MCP App
 */
import type { App, McpUiHostContext } from "@modelcontextprotocol/ext-apps";
import { useApp } from "@modelcontextprotocol/ext-apps/react";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import {
  Briefcase,
  Check,
  CheckCircle,
  ClipboardCheck,
  Info,
  Monitor,
  Network,
  Scale,
  Shield,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { StrictMode, useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  buildRedirectUrl,
  getCoveragesForInput,
  hasAdditionalCoverages,
  showSecurityScorecardPromo,
} from "./coverage-data";
import type { Coverage, ToolInput, WidgetState } from "./types";

// Design tokens
const colors = {
  purple: "#6B5CE7",
  purpleLight: "#F5F3FF",
  purpleIconBg: "#EDE9FE",
  teal: "#14B8A6",
  tealLight: "#CCFBF1",
  tealIconBg: "#D1FAE5",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textTertiary: "#9CA3AF",
  border: "#E5E7EB",
  background: "#FFFFFF",
  backgroundLight: "#F9FAFB",
  success: "#10B981",
  infoBlue: "#3B82F6",
  infoBlueBg: "#EFF6FF",
  error: "#EF4444",
};

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
        return {};
      };

      app.ontoolinput = async (input) => {
        const args = input.arguments as ToolInput;
        setToolInput(args);
        setWidgetState({ selectedIds: [], activeTab: "essential" });
      };

      app.ontoolresult = async (_result: CallToolResult) => {};
      app.ontoolcancelled = () => {};
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
      <div style={{ padding: 40, color: colors.error, textAlign: "center" }}>
        <strong>Error:</strong> {error.message}
      </div>
    );
  }

  if (!app) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: colors.textSecondary }}>
        Connecting...
      </div>
    );
  }

  if (!toolInput) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: colors.textSecondary }}>
        Waiting for company information...
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

  const toggleCoverage = useCallback(
    (id: string) => {
      setWidgetState((prev) => ({
        ...prev,
        selectedIds: prev.selectedIds.includes(id)
          ? prev.selectedIds.filter((i) => i !== id)
          : [...prev.selectedIds, id],
      }));
    },
    [setWidgetState]
  );

  const handleContinue = useCallback(async () => {
    const redirectUrl = buildRedirectUrl(toolInput, widgetState.selectedIds);
    try {
      const { isError } = await app.openLink({ url: redirectUrl });
      if (isError) {
        window.open(redirectUrl, "_blank");
      }
    } catch {
      window.open(redirectUrl, "_blank");
    }
  }, [app, toolInput, widgetState.selectedIds]);

  const selectedCount = widgetState.selectedIds.length;

  // Always use 2 columns max, cards wrap to next row
  const getGridColumns = () => {
    return "repeat(2, minmax(280px, 1fr))";
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        paddingTop: hostContext?.safeAreaInsets?.top ?? 0,
        paddingRight: hostContext?.safeAreaInsets?.right ?? 0,
        paddingBottom: hostContext?.safeAreaInsets?.bottom ?? 0,
        paddingLeft: hostContext?.safeAreaInsets?.left ?? 0,
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.border}`,
          padding: "12px 20px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.5px",
            color: colors.textPrimary,
          }}
        >
          EMBROKER
        </span>
      </header>

      {/* Hero Section with light background */}
      <div style={{ backgroundColor: colors.backgroundLight, paddingBottom: 32 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px 0" }}>
          {/* Page Title */}
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: colors.textPrimary,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Coverage Selection
          </h1>
          <p
            style={{
              fontSize: 14,
              color: colors.textSecondary,
              textAlign: "center",
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.5,
            }}
          >
            We have provided our most essential coverages for your business. Please
            select at least one to continue.
            {showAdditional && (
              <>
                <br />
                Not quite what you're looking for? Please feel free to explore our
                additional coverages tab.
              </>
            )}
          </p>

          {/* SecurityScorecard Promo Banner */}
          {showSecurityPromo && (
            <div
              style={{
                backgroundColor: colors.purpleLight,
                borderRadius: 10,
                padding: 16,
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: colors.teal,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={18} color="white" />
              </div>
              <p style={{ fontSize: 13, color: colors.textPrimary, lineHeight: 1.5 }}>
                Unlock <strong>up to 10% off Tech E&O</strong> through our partnership
                with SecurityScorecard. Get a <strong>free cyber risk report</strong>.*
              </p>
            </div>
          )}

          {/* Tab Navigation */}
          {showAdditional && (
            <div
              style={{
                marginTop: 24,
                borderBottom: `1px solid ${colors.border}`,
                display: "flex",
                gap: 24,
              }}
            >
              <button
                onClick={() =>
                  setWidgetState((prev) => ({ ...prev, activeTab: "essential" }))
                }
                style={{
                  background: "none",
                  border: "none",
                  padding: "12px 0",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color:
                    widgetState.activeTab === "essential"
                      ? colors.purple
                      : colors.textTertiary,
                  borderBottom:
                    widgetState.activeTab === "essential"
                      ? `3px solid ${colors.purple}`
                      : "3px solid transparent",
                  marginBottom: -1,
                  cursor: "pointer",
                }}
              >
                Essential Coverages
              </button>
              <button
                onClick={() =>
                  setWidgetState((prev) => ({ ...prev, activeTab: "additional" }))
                }
                style={{
                  background: "none",
                  border: "none",
                  padding: "12px 0",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color:
                    widgetState.activeTab === "additional"
                      ? colors.purple
                      : colors.textTertiary,
                  borderBottom:
                    widgetState.activeTab === "additional"
                      ? `3px solid ${colors.purple}`
                      : "3px solid transparent",
                  marginBottom: -1,
                  cursor: "pointer",
                }}
              >
                Additional Coverages
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Coverage Cards */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 20px 32px" }}>
        <div
          className="coverage-grid"
          style={{
            display: "grid",
            gridTemplateColumns: getGridColumns(),
            gap: 16,
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

        {/* Continue Button */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button
            onClick={handleContinue}
            disabled={selectedCount === 0}
            style={{
              backgroundColor: selectedCount === 0 ? colors.textTertiary : colors.purple,
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "12px 28px",
              fontSize: 14,
              fontWeight: 500,
              cursor: selectedCount === 0 ? "not-allowed" : "pointer",
              minWidth: 200,
              opacity: selectedCount === 0 ? 0.7 : 1,
            }}
          >
            Continue with {selectedCount} coverage{selectedCount !== 1 ? "s" : ""}
          </button>
        </div>

        {/* Footer Disclaimers */}
        {showSecurityPromo && (
          <p
            style={{
              textAlign: "center",
              marginTop: 16,
              fontSize: 11,
              color: colors.textTertiary,
              lineHeight: 1.5,
            }}
          >
            *Discount subject to receiving a SecurityScorecard rating of A.
          </p>
        )}
      </div>
    </main>
  );
}

interface CoverageCardProps {
  coverage: Coverage;
  selected: boolean;
  onToggle: () => void;
}

function CoverageCard({ coverage, selected, onToggle }: CoverageCardProps) {
  const IconComponent = getIconComponent(coverage.icon);
  const checkColor = colors.purple;

  return (
    <div
      style={{
        backgroundColor: colors.background,
        border: `1px solid ${selected ? colors.purple : colors.border}`,
        borderRadius: 10,
        padding: 16,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s",
      }}
    >
      {/* Header with icon and select button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: coverage.iconBg,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconComponent size={20} color={coverage.iconColor} />
        </div>
        <button
          onClick={onToggle}
          className={selected ? "" : "select-btn"}
          style={{
            backgroundColor: selected ? colors.purple : "transparent",
            color: selected ? "white" : colors.purple,
            border: `1.5px solid ${colors.purple}`,
            borderRadius: 20,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            minWidth: 80,
            height: 32,
          }}
        >
          {selected ? (
            <>
              Selected <Check size={14} />
            </>
          ) : (
            "Select +"
          )}
        </button>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: colors.textPrimary,
          marginBottom: 6,
        }}
      >
        {coverage.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 13,
          color: colors.textSecondary,
          lineHeight: 1.4,
          marginBottom: 14,
        }}
      >
        {coverage.description}{" "}
        <a href="#" style={{ color: colors.purple, fontSize: 12 }}>
          Learn more
        </a>
      </p>

      {/* Common Coverages */}
      <div style={{ marginBottom: 12 }}>
        <h4
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: colors.textPrimary,
            marginBottom: 8,
          }}
        >
          {coverage.whyYouNeedThis ? "Common coverages:" : "Includes coverage for:"}
        </h4>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {coverage.commonCoverages.map((item, idx) => (
            <li
              key={idx}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 6,
                marginBottom: 5,
                fontSize: 12,
                color: colors.textSecondary,
                lineHeight: 1.4,
              }}
            >
              <CheckCircle
                size={14}
                color={checkColor}
                style={{ flexShrink: 0, marginTop: 1 }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Why You Need This */}
      {coverage.whyYouNeedThis && (
        <div style={{ marginBottom: 12 }}>
          <h4
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: colors.textPrimary,
              marginBottom: 8,
            }}
          >
            Why you need this:
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {coverage.whyYouNeedThis.map((item, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 6,
                  marginBottom: 5,
                  fontSize: 12,
                  color: colors.textSecondary,
                  lineHeight: 1.4,
                }}
              >
                <ShieldCheck
                  size={14}
                  color={colors.purple}
                  style={{ flexShrink: 0, marginTop: 1 }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Exclusions */}
      {coverage.exclusions && (
        <div style={{ marginBottom: 12 }}>
          <h4
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: colors.textPrimary,
              marginBottom: 8,
            }}
          >
            Doesn't include:
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {coverage.exclusions.map((item, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 6,
                  marginBottom: 5,
                  fontSize: 12,
                  color: colors.textSecondary,
                }}
              >
                <X
                  size={14}
                  color={colors.error}
                  style={{ flexShrink: 0, marginTop: 1 }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Info Box */}
      {coverage.infoBox && (
        <div
          style={{
            backgroundColor: colors.purpleLight,
            borderRadius: 6,
            padding: 10,
            display: "flex",
            alignItems: "flex-start",
            gap: 6,
            marginTop: "auto",
          }}
        >
          <Info size={14} color={colors.purple} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: colors.textPrimary, lineHeight: 1.4 }}>
            {coverage.infoBox.text}
          </span>
        </div>
      )}
    </div>
  );
}

function getIconComponent(icon: Coverage["icon"]) {
  switch (icon) {
    case "monitor":
      return Monitor;
    case "users":
      return Users;
    case "clipboard":
      return ClipboardCheck;
    case "shield":
      return Shield;
    case "network":
      return Network;
    case "briefcase":
      return Briefcase;
    case "scale":
      return Scale;
    default:
      return Shield;
  }
}

// Mount the app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EmbrokerApp />
  </StrictMode>
);
