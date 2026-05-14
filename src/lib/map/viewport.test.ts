import { describe, expect, it } from "vitest";
import {
  clampScale,
  clampViewport,
  MAP_MAX_SCALE,
  MAP_MIN_SCALE,
  resetViewport,
  zoomAroundPoint,
  type MapViewport
} from "./viewport";

const context = {
  viewportWidth: 800,
  viewportHeight: 600,
  contentBounds: {
    minX: 120,
    maxX: 680,
    minY: 90,
    maxY: 540
  }
};

describe("map viewport helpers", () => {
  it("keeps scale within min and max bounds", () => {
    expect(clampScale(0.1)).toBe(MAP_MIN_SCALE);
    expect(clampScale(8)).toBe(MAP_MAX_SCALE);
    expect(clampScale(1)).toBe(1);
  });

  it("clamps pan values so content remains recoverable", () => {
    const farOutside: MapViewport = { x: 6000, y: -6000, scale: 1 };
    const clamped = clampViewport(farOutside, context);

    expect(clamped.x).toBeLessThan(1400);
    expect(clamped.x).toBeGreaterThan(-1400);
    expect(clamped.y).toBeLessThan(1200);
    expect(clamped.y).toBeGreaterThan(-1200);
  });

  it("produces stable viewport after repeated clamp cycles", () => {
    let current: MapViewport = { x: -2400, y: 1300, scale: 3.4 };

    for (let index = 0; index < 50; index += 1) {
      current = clampViewport(current, context);
    }

    const once = clampViewport(current, context);
    expect(current).toEqual(once);
  });

  it("resets back to deterministic clamped viewport", () => {
    const preset: MapViewport = { x: -200, y: 90, scale: 0.92 };
    const reset = resetViewport(preset, context);

    expect(reset.scale).toBeGreaterThanOrEqual(MAP_MIN_SCALE);
    expect(reset.scale).toBeLessThanOrEqual(MAP_MAX_SCALE);
    expect(reset.x).toBeTypeOf("number");
    expect(reset.y).toBeTypeOf("number");
  });

  it("zooms around pointer while preserving anchor point", () => {
    const start: MapViewport = { x: 120, y: 80, scale: 1 };
    const pointer = { x: 360, y: 220 };
    const zoomed = zoomAroundPoint(start, pointer, 1.2);

    const beforeX = (pointer.x - start.x) / start.scale;
    const afterX = (pointer.x - zoomed.x) / zoomed.scale;
    const beforeY = (pointer.y - start.y) / start.scale;
    const afterY = (pointer.y - zoomed.y) / zoomed.scale;

    expect(Math.abs(beforeX - afterX)).toBeLessThan(0.001);
    expect(Math.abs(beforeY - afterY)).toBeLessThan(0.001);
  });
});
