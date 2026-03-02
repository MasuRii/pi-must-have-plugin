export interface MustHavePluginConfig {
	debug: boolean;
	replacements: Record<string, string>;
}

export interface ConfigLoadResult {
	config: MustHavePluginConfig;
	source: "primary" | "legacy" | "fallback";
	warning?: string;
}

export interface EnsureConfigResult {
	created: boolean;
	error?: string;
}

export interface ReplacementOutcome {
	result: string;
	counts: Map<string, number>;
}
