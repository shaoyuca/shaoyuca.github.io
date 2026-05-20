// ================================================================
//  PORTFOLIO PAGE CONTENT
//  Edit this file to update everything on the Portfolio page.
//  No other files need to be changed.
// ================================================================

import InlineLink from '@/components/ui/InlineLink'
import Strong from '@/components/ui/Strong'
import type { ProjectCardProps } from '@/components/portfolio/ProjectCard'


// ── 1. HERO BANNER ──────────────────────────────────────────────

/**
 * Full-width banner at the top of the page.
 * Place your image in public/images/ and write "/images/filename.jpg".
 * Any image size works — it will be cropped to fill the strip.
 */
export const PORTFOLIO_HERO = {
  imageSrc: 'https://picsum.photos/seed/portfolio-hero/1600/600',
  imageAlt: 'Laboratory and research projects overview',
}


// ── 2. INTRO TEXT ───────────────────────────────────────────────

/**
 * Body paragraph shown below the banner.
 * Bold: <Strong>word</Strong>
 * Link: <InlineLink href="…" external>word</InlineLink>
 */
export const PORTFOLIO_INTRO = (
  <>
    This portfolio presents research projects from our lab, spanning{' '}
    <Strong>shape-changing interfaces</Strong>,{' '}
    <Strong>wearable computing</Strong>, and{' '}
    <Strong>computational fabrication</Strong>. Each project is grounded in a
    human-centred design process, combining technical prototyping with user studies
    to evaluate real-world impact. Work has been exhibited at{' '}
    <InlineLink href="https://chi2024.acm.org" external>CHI</InlineLink>,{' '}
    <InlineLink href="https://uist.acm.org" external>UIST</InlineLink>, and
    international design festivals. Select a project below to read more.
  </>
)


// ── 3. RESEARCH DIRECTIONS & PROJECTS ───────────────────────────

/**
 * Each direction has:
 *   title     — text shown over the direction banner (user-defined)
 *   imageSrc  — background image for the banner; place in public/images/
 *   imageAlt  — accessibility description of the image
 *   projects  — list of project cards shown below the banner
 *
 * Each project card has:
 *   title     — paper/project title (H2 size)
 *   authors   — italic author list; wrap names in <Strong> for bold
 *   venue     — conference/journal; wrap in <Strong> for bold parts
 *   links     — array of { label, href } for PDF, Video, etc.
 *               Two ways to link a PDF:
 *               External URL:  { label: 'PDF', href: 'https://dl.acm.org/…' }
 *               Self-hosted:   { label: 'PDF', href: '/papers/your-paper.pdf' }
 *                 → place the file at  public/papers/your-paper.pdf
 *                 → PDFs in that folder are git-ignored; upload them separately
 *                    to Vercel (dashboard → Storage) or your institution's server.
 *   mediaSrc  — image or GIF; place in public/images/ (".gif" files work)
 *               GIFs are lazy-loaded — they only start downloading when
 *               the user scrolls to them, keeping initial load fast.
 *   mediaAlt  — accessibility description of the media
 */
export type Direction = {
  title: string
  imageSrc: string
  imageAlt: string
  projects: ProjectCardProps[]
}

export const DIRECTIONS: Direction[] = [
  {
    title: 'Shape-Changing Interfaces',           // ← banner text, edit freely
    imageSrc: 'https://picsum.photos/seed/dir1/1600/900',
    imageAlt: 'Shape-changing interface research',
    projects: [
      {
        title: 'RoboSkin: A Soft Robotic Interface That Changes Shape in Response to Touch',
        authors: <><Strong>Alice Chen</Strong>, Bob Smith, Carol Williams, David Lee</>,
        venue: <>Proceedings of <Strong>CHI 2024</Strong>, Honolulu, Hawaii, USA</>,
        award: <>🏆 Best Paper Award — <Strong>CHI 2024</Strong></>,
        links: [
          { label: 'PDF',   href: 'https://example.com/paper.pdf' },
          { label: 'Video', href: 'https://example.com/video' },
        ],
        mediaSrc: '/images/tenor_1.gif',
        mediaAlt: 'RoboSkin interface demonstration',
      },
      {
        title: 'FluidForm: Pneumatic Actuators for Programmable Shape Displays',
        authors: <>Eve Martinez, <Strong>Alice Chen</Strong>, Frank Nguyen</>,
        venue: <>Proceedings of <Strong>UIST 2023</Strong>, San Francisco, California, USA</>,
        links: [
          { label: 'PDF',   href: 'https://example.com/paper2.pdf' },
          { label: 'Video', href: 'https://example.com/video2' },
        ],
        mediaSrc: 'https://picsum.photos/seed/proj2/400/300',
        mediaAlt: 'FluidForm pneumatic display demo',
      },
    ],
  },
  {
    title: 'Wearable & Textile Computing',
    imageSrc: 'https://picsum.photos/seed/dir2/1600/900',
    imageAlt: 'Wearable and textile computing research',
    projects: [
      {
        title: 'KnitSense: Conductive Knitting Patterns for On-Body Gesture Recognition',
        authors: <><Strong>Grace Kim</Strong>, Henry Park, Alice Chen</>,
        venue: <>Proceedings of <Strong>CHI 2024</Strong>, Honolulu, Hawaii, USA</>,
        links: [
          { label: 'PDF',   href: 'https://example.com/paper3.pdf' },
          { label: 'Video', href: 'https://example.com/video3' },
        ],
        mediaSrc: 'https://picsum.photos/seed/proj3/400/300',
        mediaAlt: 'KnitSense wearable sensor demo',
      },
    ],
  },
  {
    title: 'Long Text Stress Test',
    imageSrc: 'https://picsum.photos/seed/stress/1600/900',
    imageAlt: 'Stress test direction banner',
    projects: [
      {
        // Stress test: very long title (~220 chars), 15-author list, full venue string with DOI
        title: 'PolyBend: A Continuous Morphological Transformation Framework for Bistable Lattice Structures in Computationally Actuated Furniture and Architectural Surface Systems Toward Seamless Physical Reconfiguration Without Mechanical Fasteners',
        authors: (
          <><Strong>Alice Chen</Strong>, Bob Smith, Carol Williams, David Lee, Eve Martinez, Frank Nguyen, Grace Kim, Henry Park, Ivan Torres, Joan Liu, Kevin Zhang, Laura Patel, Michael Brown, Nancy Wilson, Oscar Garcia</>
        ),
        venue: 'In Proceedings of the 2024 ACM CHI Conference on Human Factors in Computing Systems (CHI \'24), Honolulu, Hawaii, USA, May 11–16, 2024. ACM, New York, NY, USA, 24 pages. https://doi.org/10.1145/XXXXXXX.XXXXXXX',
        links: [
          { label: 'PDF',   href: 'https://example.com/paper.pdf' },
          { label: 'Video', href: 'https://example.com/video' },
        ],
        mediaSrc: 'https://picsum.photos/seed/stress1/400/300',
        mediaAlt: 'Stress test paper thumbnail',
      },
    ],
  },
]
