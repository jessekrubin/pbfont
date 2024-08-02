import { create, fromBinary, toBinary, toJsonString } from "@bufbuild/protobuf";
import type { glyph, glyphs } from "./gen/glyphs_pb.js";
import { fontstackSchema, glyphsSchema } from "./gen/glyphs_pb.js";

// export function parse(buffer: Uint8Array): glyphs {
//   return fromBinary(glyphsSchema, buffer);
// }

function debug(buffer: Uint8Array | glyphs) {
  if (buffer instanceof Uint8Array) {
    const g = fromBinary(glyphsSchema, buffer);
    return toJsonString(glyphsSchema, g);
  }
  return toJsonString(glyphsSchema, buffer);
}
export function decode(buffer: Uint8Array): glyphs {
  return fromBinary(glyphsSchema, buffer);
}

export function encode(data: glyphs) {
  return toBinary(glyphsSchema, data);
}

function range256(start: number) {
  if (start < 0 || start > 65_535)
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
    const decodedGlyphs = decode(buffer);
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
    return a.id - b.id;
  });
  const allids = [...coverage.keys()];
  const minId = Math.min(...allids);
  const range = range256(minId);

  // Create the result glyphs message
  const theFontstackObj = {
    name: fontstackName || names.join(", "), // Use provided font stack name or the combined one
    glyphs: combinedGlyphs,
    range: range.str,
  };
  const thefontstack = create(fontstackSchema, theFontstackObj);
  const result = create(glyphsSchema, { stacks: [thefontstack] });
  return encode(result);
}

export { debug };
export * from "./gen/glyphs_pb.js";
