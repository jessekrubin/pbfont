import fs from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import * as pbfonts from "../src/index";

const openSans512 = new Uint8Array(
  fs.readFileSync(path.resolve(__dirname, "fixtures/opensans.512.767.pbf")),
);
const arialUnicode512 = new Uint8Array(
  fs.readFileSync(path.resolve(__dirname, "fixtures/arialunicode.512.767.pbf")),
);
const league512 = new Uint8Array(
  fs.readFileSync(path.resolve(__dirname, "fixtures/league.512.767.pbf")),
);
const composite512 = new Uint8Array(
  fs.readFileSync(
    path.resolve(__dirname, "fixtures/opensans.arialunicode.512.767.pbf"),
  ),
);
const triple512 = new Uint8Array(
  fs.readFileSync(
    path.resolve(
      __dirname,
      "fixtures/league.opensans.arialunicode.512.767.pbf",
    ),
  ),
);

test("compositing two pbfs", (_t) => {
  const combined = pbfonts.combine([openSans512, arialUnicode512]);
  if (!combined) throw new Error("no combined");
  const composite: pbfonts.glyphs = pbfonts.decode(combined);
  // t.ok(composite.stacks, 'has stacks');
  expect(composite.stacks.length).toBe(1);
  expect(composite.stacks[0].name).toBe(
    "Open Sans Regular, Arial Unicode MS Regular",
  ); //, 'has a name');

  const stack = composite.stacks[0];

  expect(stack.name).toBe("Open Sans Regular, Arial Unicode MS Regular"); //, 'is a named stack');
  expect(stack.range).toBeTruthy(); //, 'has a glyph range');
  // expect(composite).toEqual(expected); //, 'equals a server-composited stack');
  expect(stack.name).toBeTruthy();
  expect(stack.range).toBeTruthy();

  const recombined = pbfonts.combine([league512, pbfonts.encode(composite)]);
  if (recombined) {
    const recomposite = pbfonts.decode(recombined);
    const reexpect = pbfonts.decode(triple512);

    expect(reexpect.stacks[0].glyphs.length).toEqual(176);

    const recombinedReexpect = pbfonts.combine([reexpect.toBinary()]);
    if (!recombinedReexpect) throw new Error("no recombinedReexpect");

    expect(recomposite.stacks.length).toEqual(reexpect.stacks.length);

    const recompositelength = recomposite.stacks[0].glyphs.length;
    expect(recompositelength).toEqual(176);
    expect(recomposite.stacks[0].glyphs.length).toEqual(
      reexpect.stacks[0].glyphs.length,
    );
    expect(recomposite).toEqual(reexpect); //, 'can add on a third for good measure');
  }
});
test("returns nothing when given nothing", () => {
  expect(pbfonts.combine([])).toBe(undefined);
});

test("can composite only one pbf", (_t) => {
  const combined = pbfonts.combine([openSans512]);
  if (!combined) throw new Error("no combined");
  const composite = pbfonts.decode(combined);
  const expected = pbfonts.decode(openSans512);
  expect(composite).toEqual(expected);
});

test("can composite more than two", (_t) => {
  const combined = pbfonts.combine([league512, openSans512, arialUnicode512]);
  if (!combined) throw new Error("no combined");
  const composite = pbfonts.decode(combined);
  const expected = pbfonts.decode(triple512);

  expect(composite).toEqual(expected); //, 'can composite three');
});

test("compositing and providing fontstack string name", (_t) => {
  const name = "Open Sans Regular,Arial Unicode MS Regular";
  const combined = pbfonts.combine([openSans512, arialUnicode512], name);
  if (!combined) throw new Error("no combined");
  const composite_name = pbfonts.decode(combined);
  const combined2 = pbfonts.combine([openSans512, arialUnicode512]);
  if (!combined2) throw new Error("no combined");
  const composite_noname = pbfonts.decode(combined2);
  const expected = pbfonts.decode(composite512);

  expect(composite_name.stacks.length).toBe(1); //, 'has stacks');
  expect(composite_name.stacks[0].name).toBe(name); //, 'has a name');
  expect(composite_noname).toEqual(expected);
  expect(composite_name).not.toEqual(expected);
  expect(composite_name.stacks[0].glyphs).toEqual(
    composite_noname.stacks[0].glyphs,
  );
  expect(composite_name.stacks[0].range).toEqual(
    composite_noname.stacks[0].range,
  );
  expect(composite_name.stacks[0].name).toEqual(name);
});

test("debug method shows decoded glyphs", (_t) => {
  const something = pbfonts.debug(openSans512);
  expect(something).toBeTruthy();
  expect(JSON.parse(something).stacks[0].glyphs.length).toBe(16);
  const decodedGlyph = pbfonts.decode(openSans512);

  if (!decodedGlyph) throw new Error("no decodedGlyph");
  const decoded = pbfonts.debug(decodedGlyph);
  expect(decoded).toBeTruthy();
  expect(() => JSON.parse(decoded)).not.toThrow();

  expect(JSON.parse(decoded).stacks[0].glyphs.length).toBe(16);
});
test("can composite only one pbf version2", (_t) => {
  const combined = pbfonts.combine([openSans512]);
  if (!combined) throw new Error("no combined");
  const composite = pbfonts.decode(combined);
  const expected = pbfonts.decode(openSans512);
  expect(composite).toEqual(expected);
});
