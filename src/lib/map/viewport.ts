export type MapViewport = {
  x: number;
  y: number;
  scale: number;
};

export type MapBounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export type ViewportClampContext = {
  viewportWidth: number;
  viewportHeight: number;
  contentBounds: MapBounds;
  contentPaddingRatio?: number;
  minVisibleContentPx?: number;
};

export const MAP_MIN_SCALE = 0.45;
export const MAP_MAX_SCALE = 1.4;
export const MAP_WHEEL_ZOOM_SENSITIVITY = 0.0016;
export const MAP_CONTENT_PADDING_RATIO = 0.36;
export const MAP_MIN_VISIBLE_CONTENT_PX = 72;
export const MAP_TRANSLATE_EXTENT_PADDING = 320;

export function clampScale(scale: number, minScale = MAP_MIN_SCALE, maxScale = MAP_MAX_SCALE) {
  return Math.min(maxScale, Math.max(minScale, scale));
}

function clamp(value: number, minValue: number, maxValue: number) {
  return Math.min(maxValue, Math.max(minValue, value));
}

function axisRange({
  minBound,
  maxBound,
  viewportSize,
  scale,
  minVisible,
  contentPaddingRatio
}: {
  minBound: number;
  maxBound: number;
  viewportSize: number;
  scale: number;
  minVisible: number;
  contentPaddingRatio: number;
}) {
  const contentSize = maxBound - minBound;
  const paddedMin = minBound - contentSize * contentPaddingRatio;
  const paddedMax = maxBound + contentSize * contentPaddingRatio;

  const minTranslate = -paddedMax * scale + minVisible;
  const maxTranslate = viewportSize - paddedMin * scale - minVisible;

  if (minTranslate > maxTranslate) {
    const centered = (minTranslate + maxTranslate) / 2;
    return { minTranslate: centered, maxTranslate: centered };
  }

  return { minTranslate, maxTranslate };
}

export function clampViewport(
  viewport: MapViewport,
  {
    viewportWidth,
    viewportHeight,
    contentBounds,
    contentPaddingRatio = MAP_CONTENT_PADDING_RATIO,
    minVisibleContentPx = MAP_MIN_VISIBLE_CONTENT_PX
  }: ViewportClampContext
): MapViewport {
  const nextScale = clampScale(viewport.scale);

  const xRange = axisRange({
    minBound: contentBounds.minX,
    maxBound: contentBounds.maxX,
    viewportSize: viewportWidth,
    scale: nextScale,
    minVisible: minVisibleContentPx,
    contentPaddingRatio
  });

  const yRange = axisRange({
    minBound: contentBounds.minY,
    maxBound: contentBounds.maxY,
    viewportSize: viewportHeight,
    scale: nextScale,
    minVisible: minVisibleContentPx,
    contentPaddingRatio
  });

  return {
    x: clamp(viewport.x, xRange.minTranslate, xRange.maxTranslate),
    y: clamp(viewport.y, yRange.minTranslate, yRange.maxTranslate),
    scale: nextScale
  };
}

export function isViewportNearContentBounds(
  viewport: MapViewport,
  context: ViewportClampContext,
  tolerancePx = 16
) {
  const clamped = clampViewport(viewport, context);
  return (
    Math.abs(clamped.x - viewport.x) <= tolerancePx &&
    Math.abs(clamped.y - viewport.y) <= tolerancePx &&
    Math.abs(clamped.scale - viewport.scale) <= 0.001
  );
}

export function resetViewport(preset: MapViewport, context: ViewportClampContext) {
  return clampViewport(preset, context);
}

export function buildTranslateExtent(bounds: MapBounds, padding = MAP_TRANSLATE_EXTENT_PADDING) {
  return [
    [bounds.minX - padding, bounds.minY - padding],
    [bounds.maxX + padding, bounds.maxY + padding]
  ] as [[number, number], [number, number]];
}

export function zoomAroundPoint(
  viewport: MapViewport,
  pointer: { x: number; y: number },
  nextScale: number
): MapViewport {
  const scale = clampScale(nextScale);
  const worldX = (pointer.x - viewport.x) / viewport.scale;
  const worldY = (pointer.y - viewport.y) / viewport.scale;

  return {
    scale,
    x: pointer.x - worldX * scale,
    y: pointer.y - worldY * scale
  };
}
