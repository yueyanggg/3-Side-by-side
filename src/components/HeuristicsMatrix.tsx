import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { NIELSEN_HEURISTICS, type HeuristicCategory } from '../data/versions';

const CATEGORIES: { id: HeuristicCategory; label: string }[] = [
  { id: 'all', label: 'All 10 Heuristics' },
  { id: 'account-control', label: 'Account & Control' },
  { id: 'clarity', label: 'Clarity & Recognition' },
  { id: 'errors-recovery', label: 'Errors & Recovery' },
];

export function HeuristicsMatrix() {
  const [category, setCategory] = useState<HeuristicCategory>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return NIELSEN_HEURISTICS.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      if (!matchesCategory) return false;
      if (!normalized) return true;
      return (
        item.title.toLowerCase().includes(normalized) ||
        item.original.toLowerCase().includes(normalized) ||
        item.v1.toLowerCase().includes(normalized) ||
        item.v2.toLowerCase().includes(normalized)
      );
    });
  }, [category, query]);

  return (
    <section id="heuristics-matrix" className="py-12 border-t border-zinc-200">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs font-medium text-[#EE4D2D] mb-1.5">
            Usability Evaluation
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Nielsen’s 10 Heuristics Breakdown
          </h2>
          <p className="text-sm text-zinc-600 mt-1.5 max-w-2xl">
            How each release evolves from the baseline replica to intuitive account management and systematic heuristic compliance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Segmented Category Filter */}
          <div
            role="tablist"
            aria-label="Filter heuristics by focus"
            className="flex items-center gap-1 p-1 bg-zinc-100 rounded-lg overflow-x-auto"
          >
            {CATEGORIES.map((tab) => {
              const active = category === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE4D2D] ${
                    active
                      ? 'bg-white text-zinc-900 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter heuristics..."
              aria-label="Filter heuristics"
              className="w-full sm:w-48 pl-8 pr-8 py-1.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear filter"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[840px]">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/80">
                <th className="py-3 px-4 text-xs font-semibold text-zinc-500 w-64">
                  Heuristic Principle
                </th>
                <th className="py-3 px-4 text-xs font-semibold text-zinc-700">
                  Original Replica
                </th>
                <th className="py-3 px-4 text-xs font-semibold text-zinc-700">
                  Version 1 · Intuitive Accounts
                </th>
                <th className="py-3 px-4 text-xs font-semibold text-zinc-900">
                  Version 2 · Nielsen’s 10 Heuristics
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 px-4 text-center">
                    <p className="text-sm font-medium text-zinc-900 mb-1">
                      No matching heuristics
                    </p>
                    <p className="text-xs text-zinc-500 mb-3">
                      Try clearing your search query or selecting all heuristics.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCategory('all');
                        setQuery('');
                      }}
                      className="px-3.5 py-1.5 text-xs font-medium text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors"
                    >
                      Reset Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr
                    key={row.number}
                    className="hover:bg-zinc-50/70 transition-colors align-top"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono text-xs text-zinc-400 tabular-nums pt-0.5 shrink-0">
                          {row.number}
                        </span>
                        <div>
                          <div className="font-medium text-zinc-900 leading-snug">
                            {row.title}
                          </div>
                          <div className="text-xs text-zinc-500 mt-0.5">
                            {row.categoryLabel}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs leading-relaxed text-zinc-600">
                      {row.original}
                    </td>
                    <td className="py-4 px-4 text-xs leading-relaxed text-zinc-700">
                      {row.v1}
                    </td>
                    <td className="py-4 px-4 text-xs leading-relaxed text-zinc-900 font-medium bg-[#EE4D2D]/[0.02]">
                      {row.v2}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
