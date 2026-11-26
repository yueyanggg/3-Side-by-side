import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Maximize2, Minimize2, RotateCw, AlertCircle } from 'lucide-react';
import type { AppVersion } from '../data/versions';

export type ViewportMode = 'desktop' | 'mobile' | 'fluid';

interface ComparisonFrameProps {
  version: AppVersion;
  viewportMode: ViewportMode;
  frameHeight: number;
  reloadToken: number;
  isFocused: boolean;
  onToggleFocus: () => void;
}

const TARGET_DESKTOP_WIDTH = 1280;
const TARGET_MOBILE_WIDTH = 390;

export function ComparisonFrame({
  version,
  viewportMode,
  frameHeight,
  reloadToken,
  isFocused,
  onToggleFocus,
}: ComparisonFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(440);
  const [localReloadCount, setLocalReloadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      setContainerWidth(el.clientWidth);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [reloadToken, localReloadCount, viewportMode]);

  const handleReload = () => {
    setLocalReloadCount((c) => c + 1);
  };

  let scale = 1;
  let iframeWidth: string | number = '100%';
  let iframeHeight: string | number = frameHeight;
  let activeResolutionLabel = `${Math.round(containerWidth)}px fluid`;

  if (viewportMode === 'desktop') {
    scale = Math.min(1, Math.max(0.2, containerWidth / TARGET_DESKTOP_WIDTH));
    iframeWidth = TARGET_DESKTOP_WIDTH;
    iframeHeight = Math.round(frameHeight / scale);
    activeResolutionLabel = `${TARGET_DESKTOP_WIDTH}px · ${Math.round(scale * 100)}%`;
  } else if (viewportMode === 'mobile') {
    const available = Math.max(240, containerWidth - 24);
    scale = Math.min(1, available / TARGET_MOBILE_WIDTH);
    iframeWidth = TARGET_MOBILE_WIDTH;
    iframeHeight = Math.round((frameHeight - 24) / scale);
    activeResolutionLabel = `${TARGET_MOBILE_WIDTH}px · ${Math.round(scale * 100)}%`;
  }

  return (
    <article className="flex flex-col bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-xs transition-colors">
      {/* Frame Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-zinc-200 bg-white">
        <div className="min-w-0 flex items-baseline gap-2">
          <span className="font-mono text-xs text-zinc-400 tabular-nums shrink-0">
            {version.index}
          </span>
          <h2 className="text-sm font-semibold text-zinc-900 truncate">
            {version.name}
          </h2>
          <span className="text-zinc-300 shrink-0" aria-hidden="true">
            ·
          </span>
          <span className="text-xs text-zinc-500 truncate">{version.focus}</span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleReload}
            title={`Reload ${version.name}`}
            aria-label={`Reload ${version.name}`}
            className="inline-flex items-center justify-center w-8 h-8 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE4D2D]"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={onToggleFocus}
            title={isFocused ? 'Exit solo view' : `Expand ${version.name}`}
            aria-label={isFocused ? 'Exit solo view' : `Expand ${version.name}`}
            className="inline-flex items-center justify-center w-8 h-8 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE4D2D]"
          >
            {isFocused ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>

          <a
            href={version.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Open ${version.name} in new tab`}
            aria-label={`Open ${version.name} in new tab`}
            className="inline-flex items-center justify-center w-8 h-8 rounded-md text-zinc-500 hover:text-[#EE4D2D] hover:bg-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE4D2D]"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Address & Viewport Readout Bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-zinc-50 border-b border-zinc-200 text-xs">
        <a
          href={version.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-zinc-500 hover:text-zinc-900 truncate transition-colors"
        >
          {version.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </a>
        <span className="font-mono text-[11px] text-zinc-400 tabular-nums whitespace-nowrap shrink-0">
          {activeResolutionLabel}
        </span>
      </div>

      {/* Live Preview Canvas */}
      <div
        ref={containerRef}
        style={{ height: `${frameHeight}px` }}
        className={`relative w-full overflow-hidden ${
          viewportMode === 'mobile'
            ? 'bg-zinc-100 flex items-center justify-center p-3'
            : 'bg-white'
        }`}
      >
        {isLoading && (
          <div
            aria-live="polite"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2.5 bg-white/90 backdrop-blur-[1px]"
          >
            <div className="w-5 h-5 border-2 border-zinc-200 border-t-[#EE4D2D] rounded-full animate-spin" />
            <p className="text-xs text-zinc-500">Loading {version.name}...</p>
          </div>
        )}

        {hasError ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-zinc-50">
            <AlertCircle className="w-6 h-6 text-zinc-400 mb-2" />
            <p className="text-sm font-medium text-zinc-900 mb-1">
              Preview blocked or unavailable
            </p>
            <p className="text-xs text-zinc-500 max-w-xs mb-4">
              Open the deployment directly in a new browser tab to inspect {version.name}.
            </p>
            <a
              href={version.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Open Live Site
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : viewportMode === 'mobile' ? (
          <div
            style={{
              width: `${Math.round(TARGET_MOBILE_WIDTH * scale)}px`,
              height: `${Math.round((frameHeight - 24) * 1)}px`,
            }}
            className="relative bg-white border border-zinc-300 rounded-2xl overflow-hidden shadow-xs"
          >
            <iframe
              key={`${version.id}-${reloadToken}-${localReloadCount}-${viewportMode}`}
              src={version.url}
              title={`${version.name} — ${version.focus}`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              style={{
                width: `${TARGET_MOBILE_WIDTH}px`,
                height: `${iframeHeight}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
              className="border-0 bg-white block"
              loading="lazy"
            />
          </div>
        ) : (
          <iframe
            key={`${version.id}-${reloadToken}-${localReloadCount}-${viewportMode}`}
            src={version.url}
            title={`${version.name} — ${version.focus}`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            style={
              viewportMode === 'desktop'
                ? {
                    width: `${iframeWidth}px`,
                    height: `${iframeHeight}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                  }
                : {
                    width: '100%',
                    height: `${frameHeight}px`,
                  }
            }
            className="border-0 bg-white block"
            loading="lazy"
          />
        )}
      </div>
    </article>
  );
}
