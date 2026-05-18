// ================================================================
//  TEAM PAGE CONTENT
//  Edit this file to update everything on the Team page.
//  No other files need to be changed.
// ================================================================

export type TeamSectionContent = {
  title: string
  members: string[]
}


// ── 1. INTRO ────────────────────────────────────────────────────

/**
 * Main paragraph shown below the Team page title.
 *
 * Replace this placeholder with a short description of the lab, team culture,
 * or research community. Plain text is enough.
 */
export const TEAM_INTRO =
  'Our team brings together students, researchers, and collaborators who explore human-centered computing, interactive systems, and design-led technology research. This placeholder can be replaced with the lab mission, working style, or a short welcome note.'


// ── 2. TEAM SECTIONS ────────────────────────────────────────────

/**
 * Each entry creates one section:
 *   title     -> H2 heading, such as "Current"
 *   members   -> bullet-point list shown below the heading
 *
 * To add a member, add a new string inside members.
 * To remove a member, delete that line.
 */
export const TEAM_SECTIONS: TeamSectionContent[] = [
  {
    title: 'Current',
    members: [
      'Research Fellow - studies interactive systems for everyday creative work.',
      'PhD Student - develops prototypes for tangible and embodied computing.',
      'Graduate Research Assistant - supports user studies, documentation, and lab demonstrations.',
      'Visiting Student - explores design methods for accessible physical interfaces.',
    ],
  },
  {
    title: 'Alumni',
    members: [
      'Former Research Assistant - contributed to early-stage prototyping and study preparation.',
      'Former Graduate Student - worked on interaction techniques for responsive materials.',
      'Former Visiting Scholar - collaborated on design workshops and research publications.',
      'Former Lab Coordinator - supported project organization and public-facing demos.',
    ],
  },
  {
    title: 'Former Capstone Student',
    members: [
      'Student Team 2024 - created a prototype for collaborative studio planning.',
      'Student Team 2023 - explored a lightweight toolkit for classroom interaction.',
      'Student Team 2022 - designed a sensing mockup for public exhibition settings.',
      'Student Team 2021 - investigated physical data representations for learning activities.',
    ],
  },
]
