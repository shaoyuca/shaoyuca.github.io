// ================================================================
//  COURSES PAGE CONTENT
//  Edit this file to update everything on the Courses page.
//  No other files need to be changed.
// ================================================================

import InlineLink from '@/components/ui/InlineLink'

export type CourseVideo = {
  title: string
  src: string
}

export type Course = {
  title: string
  href: string
  linkLabel: string
  description: React.ReactNode
  videos?: CourseVideo[]
  studentWork?: React.ReactNode
}


// ── COURSES ─────────────────────────────────────────────────────

/**
 * Each object below creates one course block on the Courses page.
 *
 * To add a course:
 *   Copy one full { ... }, block and paste it inside COURSES.
 *
 * To remove a course:
 *   Delete the full { ... }, block.
 *
 * Field guide:
 *   title       -> course name shown as a large heading
 *   href        -> external course page URL
 *   linkLabel   -> link text shown below the course title
 *   description -> course description; plain text or JSX with <InlineLink>
 *   videos      -> optional external video embeds; max two videos per row
 *   studentWork -> optional Student Work section description
 *
 * Video note:
 *   Do not upload video files here. Paste an embed URL from an external platform,
 *   such as "https://www.youtube.com/embed/VIDEO_ID" or
 *   "https://player.vimeo.com/video/VIDEO_ID".
 *   The sample below uses a YouTube embed URL so the page shows a real video
 *   player template. Replace it with your own course video when ready.
 *   If a course has no video, delete the videos field entirely.
 */
export const COURSES: Course[] = [
  {
    title: 'CDE5312: Beyond the Surface: Exploring Interactive Wearables',
    href: 'https://blog.nus.edu.sg/multimodalwearablelab/welcome/',
    linkLabel: 'Course website',
    // Plain description: edit the words between <> and </>.
    description: (
      <>
        This course aims to explore the limitless potential of interactive wearables — 
        from virtual and augmented reality to smart textiles and artificial intelligence-based 
        health-monitoring devices and immersive gaming gear. In this course, students will 
        learn about designing wearable interfaces for seamless interaction among wearables, 
        users, and environments; experimenting with sensors, actuators, microcontrollers, 
        and artificial intelligence-driven applications; and leveraging hardware and software 
        for wearable system prototyping. After completing this course, students should be able 
        to apply interactive wearable technologies to tackle real-world projects, turning ideas 
        into tangible solutions for various applications such as virtual and augmented reality, 
        gaming, fashion, communication, and beyond.
      </>
    ),
    videos: [
      {
        title: 'Course video template',
        src: 'https://www.youtube-nocookie.com/embed/M7lc1UVf-VE',
      },
    ],
    // Delete studentWork if this course does not need a Student Work section.
    studentWork:
      'Students produce working prototypes, short design reports, and final demonstrations that connect interaction concepts to everyday contexts.',
  },
  {
    title: 'CDE3301: Ideas to Proof-of-concept',
    href: 'https://cde.nus.edu.sg/edic/projects/cde3301-projects-2026/',
    linkLabel: 'Course website',
    // Course without videos: simply omit the videos field.
    description: (
      <>
        CDE3301 Ideas to Proof-of-Concept is a two-semester project course which focuses on conceptualisation, 
        implementation and realisation of a product solution to solve an identified problem while providing 
        experience in an integrated product design and development process where technology plays a central role. 
        Through lecture classes, studio sessions and an open-ended project, students learn how to create a product 
        idea to address a problem of interest, generate and evaluate concept designs, and build proof-of-concept 
        prototypes for user testing. Students also learn how to work in a multidisciplinary team and with various 
        stakeholders.
      </>
    ),
    studentWork:
      'Student work includes research plans, pilot studies, annotated observations, and reflective reports on method selection.',
  },
  {
    title: 'Computational Fabrication Workshop',
    href: 'https://example.edu/courses/computational-fabrication-workshop',
    linkLabel: 'Course website',
    // Linked description: use <InlineLink href="..." external>link text</InlineLink>.
    description: (
      <>
        A hands-on workshop on digital fabrication, material experimentation, and rapid
        prototyping. Students connect fabrication workflows with interface design and may
        reference open resources such as{' '}
        <InlineLink href="https://www.w3.org/WAI/" external>
          accessibility guidelines
        </InlineLink>{' '}
        when evaluating physical interaction concepts.
      </>
    ),
    // videos: [
    //   {
    //     title: 'Fabrication workflow sample',
    //     src: 'https://www.youtube.com/embed/VIDEO_ID',
    //   },
    // ],
  },
]
