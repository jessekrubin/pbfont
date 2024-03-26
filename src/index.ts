import type { glyph } from "./gen/glyphs_pb.js";
import { fontstack, glyphs } from "./gen/glyphs_pb.js";

function debug(buffer: Uint8Array | glyphs) {
  const _g = buffer instanceof glyphs ? buffer : glyphs.fromBinary(buffer);
  return _g.toJsonString();
}

function range256(start: number) {
  if (start < 0 || start > 65535)
    throw new Error(`start must be between 0 and 255; given ${start}`);

  const start256 = Math.trunc(start / 256) * 256;
  const stop256 = start256 + 255;
  return {
    start: start256,
    stop: stop256,
    str: `${start256}-${stop256}`,
  };
}

/**
 * Combine any number of glyph (SDF) PBFs.
 * Returns a re-encoded PBF with the combined font faces, composited using array order
 * to determine glyph priority.
 * @param buffers An array of SDF PBFs.
 * @param fontstackName Optional font stack name.
 * @returns Combined glyph PBF.
 */
export function combine(
  buffers: Uint8Array[],
  fontstackName?: string,
): Uint8Array | undefined {
  if (buffers.length === 0) return;
  if (buffers.length === 1) return buffers[0];
  const coverage = new Map<number, boolean>();
  const combinedGlyphs: glyph[] = []; // Initialize an empty array to hold the combined glyphs
  const names: string[] = [];
  for (const buffer of buffers) {
    const decodedGlyphs = glyphs.fromBinary(buffer);
    const currentFontstack = decodedGlyphs.stacks[0];
    const currentGlyphs = currentFontstack?.glyphs || [];

    // Combine glyphs and check for duplicates
    for (const glyph of currentGlyphs) {
      const gid = glyph.id;
      if (gid !== undefined && !coverage.has(gid)) {
        combinedGlyphs.push(glyph);
        coverage.set(gid, true);
      }
    }

    const currentFontstackName = currentFontstack?.name;
    // Combine font stack names
    if (currentFontstackName) {
      names.push(currentFontstackName);
    }
  }

  // Sort the combined glyphs by id
  combinedGlyphs.sort((a, b) => {
    // @ts-expect-error - id is a number but the type thinks it could be undefined
    return a.id - b.id;
  });
  const allids = [...coverage.keys()];
  const minId = Math.min(...allids);
  const range = range256(minId);

  // Create the result glyphs message
  const thefontstack = new fontstack({
    name: fontstackName || names.join(", "), // Use provided font stack name or the combined one
    glyphs: combinedGlyphs,
    range: range.str,
  });
  const result = new glyphs({
    stacks: [thefontstack],
  });
  return result.toBinary();
}

export const decode: typeof glyphs.fromBinary = (bytes, options) =>
  glyphs.fromBinary(bytes, options);

export function encode(data: glyphs) {
  return data.toBinary();
}

export { debug, glyphs, fontstack };
