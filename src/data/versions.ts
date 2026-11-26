export interface AppVersion {
  id: 'original' | 'v1' | 'v2';
  index: string;
  name: string;
  focus: string;
  url: string;
  summary: string;
  highlights: string[];
}

export type HeuristicCategory = 'all' | 'account-control' | 'clarity' | 'errors-recovery';

export interface HeuristicRow {
  number: string;
  title: string;
  category: Exclude<HeuristicCategory, 'all'>;
  categoryLabel: string;
  original: string;
  v1: string;
  v2: string;
}

export const APP_VERSIONS: AppVersion[] = [
  {
    id: 'original',
    index: '00',
    name: 'Original Replica',
    focus: 'Baseline Commerce Interface',
    url: 'https://shopeeoriginal-six.vercel.app/',
    summary:
      'Faithful baseline replica preserving dense promotional banners, multi-row marketplace chrome, and traditional account entry flows.',
    highlights: [
      'Dense promotional visual hierarchy with competing focal banners',
      'Standard multi-step login and account utility placement',
      'Minimal inline validation and recovery guidance during flows',
    ],
  },
  {
    id: 'v1',
    index: '01',
    name: 'Version 1',
    focus: 'Intuitive Accounts',
    url: 'https://shopeenew-seven.vercel.app/',
    summary:
      'First UI/UX iteration centered on streamlining account discovery, authentication clarity, profile state visibility, and personal order access.',
    highlights: [
      'Clearer account entry point and recognizable profile context',
      'Streamlined sign-in, saved items, and order-tracking pathways',
      'Reduced cognitive friction around personal account management',
    ],
  },
  {
    id: 'v2',
    index: '02',
    name: 'Version 2',
    focus: "Nielsen's 10 Heuristics",
    url: 'https://shopeev2.vercel.app/',
    summary:
      'Comprehensive second iteration systematically redesigned around Jakob Nielsen’s 10 usability heuristics for status, control, consistency, and error prevention.',
    highlights: [
      'Explicit system status feedback across cart, search, and account actions',
      'Stronger error prevention, plain-language recovery, and undo paths',
      'Aesthetic restraint prioritizing scannability and consistent controls',
    ],
  },
];

export const NIELSEN_HEURISTICS: HeuristicRow[] = [
  {
    number: '01',
    title: 'Visibility of System Status',
    category: 'clarity',
    categoryLabel: 'Clarity & Recognition',
    original: 'Subtle or passive state changes; limited confirmation on cart and account transitions.',
    v1: 'Clearer signed-in indicator and account state visibility in top navigation.',
    v2: 'Immediate inline feedback, explicit loading states, and clear action confirmations throughout.',
  },
  {
    number: '02',
    title: 'Match Between System & Real World',
    category: 'clarity',
    categoryLabel: 'Clarity & Recognition',
    original: 'Marketplace jargon and promo-heavy labels crowd functional shopping terms.',
    v1: 'Natural everyday phrasing across account settings, addresses, and order history.',
    v2: 'Consistent human-first taxonomy across browsing, checkout, and account tasks.',
  },
  {
    number: '03',
    title: 'User Control & Freedom',
    category: 'account-control',
    categoryLabel: 'Account & Control',
    original: 'Harder-to-reverse modal states and deeper back-navigation during account steps.',
    v1: 'Clean sign-out, account switching, and predictable return paths from profile views.',
    v2: 'Clear cancel/back exits, reversible cart edits, and non-trapping modal flows.',
  },
  {
    number: '04',
    title: 'Consistency & Standards',
    category: 'clarity',
    categoryLabel: 'Clarity & Recognition',
    original: 'Mixed button weights, varied banner treatments, and inconsistent link affordances.',
    v1: 'Unified form controls and predictable card structures within account flows.',
    v2: 'Harmonized spacing, typography, and interaction patterns across every page.',
  },
  {
    number: '05',
    title: 'Error Prevention',
    category: 'errors-recovery',
    categoryLabel: 'Errors & Recovery',
    original: 'Minimal pre-submit checks; users discover invalid inputs only after submission.',
    v1: 'Guided account input constraints and clearer field expectations before submitting.',
    v2: 'Proactive inline guardrails, confirmation prompts on destructive actions, and disabled-state clarity.',
  },
  {
    number: '06',
    title: 'Recognition Rather Than Recall',
    category: 'clarity',
    categoryLabel: 'Clarity & Recognition',
    original: 'Users must remember buried navigation paths and prior selections across screens.',
    v1: 'Visible account summary, recent context, and persistent header cues.',
    v2: 'Persistent breadcrumbs, visible filter states, and contextual summaries at decision points.',
  },
  {
    number: '07',
    title: 'Flexibility & Efficiency of Use',
    category: 'account-control',
    categoryLabel: 'Account & Control',
    original: 'Single linear path with repetitive steps for returning shoppers.',
    v1: 'Faster shortcuts to saved addresses, payment preferences, and recent orders.',
    v2: 'Streamlined quick-actions, keyboard-friendly navigation, and scannable shortcuts.',
  },
  {
    number: '08',
    title: 'Aesthetic & Minimalist Design',
    category: 'clarity',
    categoryLabel: 'Clarity & Recognition',
    original: 'High visual noise from stacked promotional strips and competing badges.',
    v1: 'Decluttered account surfaces with improved breathing room around key controls.',
    v2: 'Disciplined visual hierarchy removing non-essential chrome to spotlight core tasks.',
  },
  {
    number: '09',
    title: 'Recognize, Diagnose & Recover from Errors',
    category: 'errors-recovery',
    categoryLabel: 'Errors & Recovery',
    original: 'Generic or terse error notices without actionable next steps.',
    v1: 'Specific field-level account error explanations and direct retry cues.',
    v2: 'Plain-language diagnostics explaining what went wrong and exactly how to fix it.',
  },
  {
    number: '10',
    title: 'Help & Documentation',
    category: 'errors-recovery',
    categoryLabel: 'Errors & Recovery',
    original: 'Help links tucked in dense footer columns away from active workflows.',
    v1: 'Contextual helper text inside account setup and security panels.',
    v2: 'Task-adjacent guidance, clear tooltips, and accessible support entry points.',
  },
];
