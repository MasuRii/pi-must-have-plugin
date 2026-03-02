import test from "node:test";
import assert from "node:assert/strict";
import { applyReplacements, shouldSkipInput } from "../src/replacements/replacement-engine.ts";

test("shouldSkipInput skips extension commands and shell input", () => {
	assert.equal(shouldSkipInput("/reload"), true);
	assert.equal(shouldSkipInput("!ls"), true);
	assert.equal(shouldSkipInput("!{ command: \"ls\" }"), false);
	assert.equal(shouldSkipInput("must should"), false);
});

test("applyReplacements replaces RFC2119 words case-insensitively", () => {
	const { result, counts } = applyReplacements("You must and SHOULD comply.", {
		must: "MUST",
		should: "SHOULD",
	});

	assert.equal(result, "You MUST and SHOULD comply.");
	assert.equal(counts.get("must"), 1);
	assert.equal(counts.get("should"), 1);
});

test("applyReplacements prefers longer matches first", () => {
	const { result } = applyReplacements("must not ignore this", {
		must: "MUST",
		"must not": "MUST NOT",
	});

	assert.equal(result, "MUST NOT ignore this");
});
