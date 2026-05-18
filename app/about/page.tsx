import { BIO_TEXT, BIO_LINKS, RESEARCH_DIRECTIONS, OUR_APPROACH, CONTACT } from '@/content/about'
import ResearchSection from '@/components/about/ResearchSection'
import OurApproachSection from '@/components/about/OurApproachSection'
import ContactSection from '@/components/about/ContactSection'
import InlineLink from '@/components/ui/InlineLink'

function Divider() {
  return <div className="border-t border-gray-200 dark:border-gray-800 mb-16" />
}

export default function AboutPage() {
  return (
    <main className="max-w-content px-10 pt-6 pb-section">
      <h1 className="text-h1 font-bold font-serif mb-6">About</h1>

      <p className="text-body text-[#6B6B6B] dark:text-gray-400 mb-2">{BIO_TEXT}</p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-16 text-body">
        {BIO_LINKS.map((link) => (
          <InlineLink key={link.label} href={link.href} external={link.external}>
            {link.label}
          </InlineLink>
        ))}
      </div>

      {RESEARCH_DIRECTIONS.map((dir) => (
        <ResearchSection key={dir.title} {...dir} />
      ))}

      <Divider />

      <OurApproachSection {...OUR_APPROACH} />

      <Divider />

      <ContactSection {...CONTACT} />
    </main>
  )
}
