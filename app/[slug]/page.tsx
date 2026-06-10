import { notFound } from 'next/navigation'
import { CUSTOM_PAGES } from '@/content/site'

export function generateStaticParams() {
  return CUSTOM_PAGES.map((p) => ({ slug: p.slug }))
}

export default function CustomPage({ params }: { params: { slug: string } }) {
  const page = CUSTOM_PAGES.find((p) => p.slug === params.slug)
  if (!page) notFound()

  return (
    <main className="max-w-content mx-auto px-10 pt-6 pb-section">
      <h1 className="text-h1 font-bold font-serif mb-6">{page.title}</h1>
      <div className="text-body text-[#6B6B6B] dark:text-gray-400 whitespace-pre-wrap">
        {page.content}
      </div>
    </main>
  )
}
