import { useMemo, useState } from 'react';
import { Monitor, Smartphone, Columns3, RotateCw, ArrowUpRight } from 'lucide-react';
import { APP_VERSIONS, type AppVersion } from './data/versions';
import { ComparisonFrame, type ViewportMode } from './components/ComparisonFrame';
import { HeuristicsMatrix } from './components/HeuristicsMatrix';

type ComparePair = 'all' | 'orig-v1' | 'v1-v2' | 'orig-v2';

const COMPARE_OPTIONS: { id: ComparePair; label: string }[] = [
  { id: 'all', label: 'All 3 Side-by-Side' },
  { id: 'orig-v1', label: 'Original vs V1' },
  { id: 'v1-v2', label: 'V1 vs V2' },
  { id: 'orig-v2', label: 'Original vs V2' },
];

const VIEWPORT_OPTIONS: {
  id: ViewportMode;
  label: string;
  icon: typeof Monitor;
}[] = [
  { id: 'desktop', label: 'Desktop 1280px', icon: Monitor },
  { id: 'mobile', label: 'Mobile 390px', icon: Smartphone },
  { id: 'fluid', label: 'Fluid', icon: Columns3 },
];

export default function App() {
  const [comparePair, setComparePair] = useState<ComparePair>('all');
  const [focusedId, setFocusedId] = useState<AppVersion['id'] | null>(null);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [frameHeight, setFrameHeight] = useState<number>(640);
  const [reloadToken, setReloadToken] = useState<number>(0);

  const visibleVersions = useMemo(() => {
    if (focusedId) {
      return APP_VERSIONS.filter((v) => v.id === focusedId);
    }
    switch (comparePair) {
      case 'orig-v1':
        return APP_VERSIONS.filter((v) => v.id === 'original' || v.id === 'v1');
      case 'v1-v2':
        return APP_VERSIONS.filter((v) => v.id === 'v1' || v.id === 'v2');
      case 'orig-v2':
        return APP_VERSIONS.filter((v) => v.id === 'original' || v.id === 'v2');
      default:
        return APP_VERSIONS;
    }
  }, [comparePair, focusedId]);

  const gridClass =
    visibleVersions.length === 1
      ? 'grid-cols-1'
      : visibleVersions.length === 2
        ? 'grid-cols-1 lg:grid-cols-2'
        : 'grid-cols-1 xl:grid-cols-3';

  const handleReloadAll = () => {
    setReloadToken((t) => t + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-zinc-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 whitespace-nowrap shrink-0"
          >
            Shopee UX Benchmark
          </a>

          {/* Zone 2: Single-line Nav Links */}
          <nav
            aria-label="Primary sections"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600"
          >
            <a
              href="#side-by-side"
              className="hover:text-zinc-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Side-by-Side
            </a>
            <a
              href="#iteration-notes"
              className="hover:text-zinc-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Iteration Notes
            </a>
            <a
              href="#heuristics-matrix"
              className="hover:text-zinc-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Heuristics Matrix
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleReloadAll}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#EE4D2D] hover:bg-[#d84224] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE4D2D]"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Reload All Frames
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Intro & Workspace Controls */}
        <section className="pt-8 pb-5">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-zinc-500 mb-1.5">
                UI/UX Iteration Showcase · 3 Live Deployments
              </p>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 text-balance">
                Side-by-Side Evolution: Baseline to Intuitive Accounts & Nielsen’s Heuristics
              </h1>
            </div>

            {/* Interactive Workspace Toolbar */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Comparison Pair Selector */}
              <div
                role="group"
                aria-label="Comparison layout"
                className="flex items-center gap-1 p-1 bg-zinc-100 rounded-lg overflow-x-auto max-w-full"
              >
                {COMPARE_OPTIONS.map((opt) => {
                  const isActive = !focusedId && comparePair === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setFocusedId(null);
                        setComparePair(opt.id);
                      }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE4D2D] ${
                        isActive
                          ? 'bg-white text-zinc-900 shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* Viewport Mode Switcher */}
              <div
                role="group"
                aria-label="Viewport mode"
                className="flex items-center gap-1 p-1 bg-zinc-100 rounded-lg"
              >
                {VIEWPORT_OPTIONS.map((mode) => {
                  const Icon = mode.icon;
                  const isActive = viewportMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setViewportMode(mode.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE4D2D] ${
                        isActive
                          ? 'bg-white text-zinc-900 shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {mode.label}
                    </button>
                  );
                })}
              </div>

              {/* Frame Height Selector */}
              <div
                role="group"
                aria-label="Frame height"
                className="hidden sm:flex items-center gap-1 p-1 bg-zinc-100 rounded-lg"
              >
                {[640, 800].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setFrameHeight(h)}
                    className={`px-2.5 py-1.5 text-xs font-mono tabular-nums rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      frameHeight === h
                        ? 'bg-white text-zinc-900 shadow-xs font-medium'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {h}px
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live Side-by-Side Comparison Grid */}
        <section id="side-by-side" aria-label="Live application comparison" className="pb-12">
          {focusedId && (
            <div className="mb-3 flex items-center justify-between text-xs text-zinc-600">
              <span>
                Showing focused single view. Click restore or choose a comparison preset above to return to multi-column mode.
              </span>
              <button
                type="button"
                onClick={() => setFocusedId(null)}
                className="font-medium text-[#EE4D2D] hover:underline whitespace-nowrap shrink-0"
              >
                Show All 3 Versions
              </button>
            </div>
          )}

          <div className={`grid ${gridClass} gap-5 items-start`}>
            {visibleVersions.map((version) => (
              <ComparisonFrame
                key={version.id}
                version={version}
                viewportMode={viewportMode}
                frameHeight={frameHeight}
                reloadToken={reloadToken}
                isFocused={focusedId === version.id}
                onToggleFocus={() =>
                  setFocusedId((current) =>
                    current === version.id ? null : version.id
                  )
                }
              />
            ))}
          </div>
        </section>

        {/* Iteration Rationale Strip */}
        <section id="iteration-notes" className="py-12 border-t border-zinc-200">
          <div className="mb-8">
            <p className="text-xs font-medium text-[#EE4D2D] mb-1.5">
              Design Focus
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
              What Changed Across Versions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {APP_VERSIONS.map((version) => (
              <div
                key={version.id}
                className="bg-white border border-zinc-200 rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                    <span className="font-mono tabular-nums text-zinc-400">
                      {version.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{version.focus}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                    {version.name}
                  </h3>

                  <p className="text-sm text-zinc-600 leading-relaxed mb-5">
                    {version.summary}
                  </p>

                  <ul className="space-y-2.5 border-t border-zinc-100 pt-4 text-xs text-zinc-700 leading-relaxed">
                    {version.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          className="font-mono text-zinc-400 select-none"
                          aria-hidden="true"
                        >
                          —
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setFocusedId(version.id);
                      document
                        .getElementById('side-by-side')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-medium text-zinc-900 hover:text-[#EE4D2D] transition-colors whitespace-nowrap"
                  >
                    Inspect Solo Frame
                  </button>

                  <a
                    href={version.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-colors whitespace-nowrap"
                  >
                    Open Live URL
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Nielsen's 10 Heuristics Matrix */}
        <HeuristicsMatrix />
      </main>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-zinc-200 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <p>Shopee UX Benchmark · Side-by-Side Iteration Hosting</p>
          <div className="flex flex-wrap items-center gap-5">
            {APP_VERSIONS.map((v) => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-900 transition-colors whitespace-nowrap"
              >
                {v.name} ({v.focus})
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
