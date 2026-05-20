// ================================================================
//  PUBLICATIONS PAGE CONTENT
//  Edit this file to update everything on the Publications page.
//  No other files need to be changed.
// ================================================================

import Strong from '@/components/ui/Strong'
import Corresponding from '@/components/ui/Corresponding'
import InlineLink from '@/components/ui/InlineLink'
import type { PublicationCardProps } from '@/components/publications/PublicationCard'

export type YearGroup = {
  year: number           // displayed as an H2 heading
  papers: PublicationCardProps[]
}

/**
 * HOW TO ADD A PAPER
 *   Copy any existing { title, authors, venue, … } block and paste it
 *   inside the correct year's `papers` array. Fill in the fields below.
 *
 * HOW TO ADD A NEW YEAR
 *   Copy an entire { year: …, papers: […] } block, change the year number,
 *   and add your papers. Keep years in descending order (newest first).
 *
 * ── FIELDS ──────────────────────────────────────────────────────────────
 *
 * title   Plain string. No JSX needed.
 *
 * authors Italic by default. Two independent markers, mix freely:
 *
 *   Plain name:                  Bob Smith
 *   Lab owner (bold):            <Strong>Alice Chen</Strong>
 *   Corresponding author (*):    Bob Smith<Corresponding />
 *   Both bold AND corresponding: <Strong>Alice Chen</Strong><Corresponding />
 *
 *   <Corresponding /> adds a superscript * immediately after the name.
 *   Bold (lab owner) and corresponding author are NOT the same thing —
 *   apply them independently as needed.
 *
 * venue   Plain string. Paste the full venue string as-is; no bold needed.
 *
 * award   Optional. Omit the line entirely if there is no award.
 *         When present, it appears above the links row.
 *         Use the 🏆 emoji to be consistent with the portfolio page.
 *           award: <>🏆 Best Paper Award — CHI 2026</>,
 *
 * links   Array of { label, href }. Use external URLs only (ACM DL, arXiv…).
 *           { label: 'PDF',   href: 'https://dl.acm.org/…' }
 *           { label: 'Video', href: 'https://…' }
 *           { label: 'Code',  href: 'https://github.com/…' }
 *
 * ── CORRESPONDING AUTHOR FOOTNOTE ───────────────────────────────────────
 * Set CORRESPONDING_NOTE to a non-empty string to show a footnote at the
 * bottom of the page (e.g. '* Corresponding author').
 * Set to '' to hide it entirely.
 */

export const CORRESPONDING_NOTE = ''  // e.g. '* Corresponding author'

export const PUBLICATIONS: YearGroup[] = [
  // ── 2026 ──────────────────────────────────────────────────────
  {
    year: 2026,
    papers: [
      {
        // Example: lab owner (bold) is also the corresponding author (*)
        title: '[Paper Title] A Sample Paper on Shape-Changing Interfaces',
        authors: (
          <><Strong>Alice Chen</Strong><Corresponding />, Bob Smith, Carol Williams, David Lee</>
        ),
        venue: 'In CHI 2026, Honolulu, Hawaii, USA. ACM, New York, NY, USA, 14 pages.',
        award: <>🏆 Best Paper Award — <Strong>CHI 2026</Strong></>,
        links: [
          { label: 'PDF',   href: 'https://dl.acm.org' },
          { label: 'Video', href: 'https://example.com' },
        ],
      },
      {
        // Stress test: maximum realistic title + 20-author list + full venue string with DOI
        title: 'ThermoFlux: A Wearable Thermoregulatory Feedback Array Using Micro-Peltier Elements and Distributed Skin-Contact Sensors for Adaptive Thermal Comfort Management in Occupational and Athletic Environments: System Architecture, Perceptual Calibration, and Longitudinal Field Deployment',
        authors: (
          <><Strong>Alice Chen</Strong><Corresponding />, Bob Smith, Carol Williams, David Lee, Eve Martinez, Frank Nguyen, Grace Kim, Henry Park, Ivan Torres, Joan Liu, Kevin Zhang, Laura Patel, Michael Brown, Nancy Wilson, Oscar Garcia, Patricia Adams, Quinn Baker, Rachel Clark, Samuel Davis, Teresa Evans, Uma Fernandez, Victor Hassan, Wendy Ishida, Xavier Johnson, Yuki Kawamoto, Zara Larsson, Aaron Mitchell, Bella Nakamura, Carlos Ortega, Diana Petrov, Ethan Quinn, Fiona Romano, George Santos, Hannah Tanaka, Ibrahim Ueda, Julia Vasquez, Klaus Weber, Lily Xu, Marco Yamamoto, Nina Zhao</>
        ),
        venue: 'In Proceedings of the 2026 ACM CHI Conference on Human Factors in Computing Systems (CHI \'26), Honolulu, Hawaii, USA, April 26 – May 1, 2026. ACM, New York, NY, USA, 24 pages. https://doi.org/10.1145/XXXXXXX.XXXXXXX',
        award: <>🏆 Best Paper Award — <Strong>CHI 2026</Strong></>,
        links: [
          { label: 'PDF',   href: 'https://dl.acm.org' },
          { label: 'Video', href: 'https://example.com' },
        ],
      },
      {
        // Example: lab owner (bold) is NOT the corresponding author — they are different people
        title: '[Paper Title] Another Sample Paper on Wearable Computing',
        authors: (
          <>Bob Smith<Corresponding />, <Strong>Alice Chen</Strong>, Eve Johnson</>
        ),
        venue: 'In UIST 2026, Pittsburgh, PA, USA. ACM, New York, NY, USA, 12 pages.',
        links: [
          { label: 'PDF',  href: 'https://dl.acm.org' },
          { label: 'Code', href: 'https://github.com' },
        ],
      },
    ],
  },

  // ── 2025 ──────────────────────────────────────────────────────
  {
    year: 2025,
    papers: [
      {
        // Example: lab owner (bold) appears later in the author list; a different person is corresponding
        title: '[Paper Title] A Sample Paper from the Previous Year',
        authors: (
          <>Carol Williams<Corresponding />, David Lee, <Strong>Alice Chen</Strong></>
        ),
        venue: 'In CHI 2025, Yokohama, Japan. ACM, New York, NY, USA, 16 pages.',
        links: [
          { label: 'PDF',   href: 'https://dl.acm.org' },
          { label: 'Video', href: 'https://example.com' },
          { label: 'Talk',  href: 'https://example.com' },
        ],
      },
    ],
  },
]
