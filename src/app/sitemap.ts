import type { MetadataRoute } from 'next'

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

interface SitemapEntry {
  url: string
  priority: number
  changeFrequency: ChangeFreq
}

const BASE = 'https://www.drankitachauhan.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: SitemapEntry[] = [
    // Core pages
    { url: `${BASE}/`, priority: 1.0, changeFrequency: 'monthly' },
    { url: `${BASE}/about`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/services`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: 'yearly' },

    // Pregnancy & Obstetric Care
    { url: `${BASE}/pregnancy-and-obstetric-care/preconception-counselling-and-planning`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${BASE}/pregnancy-and-obstetric-care/antenatal-and-postnatal-care`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${BASE}/pregnancy-and-obstetric-care/normal-and-caesarean-delivery`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${BASE}/pregnancy-and-obstetric-care/high-risk-pregnancy-management`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${BASE}/pregnancy-and-obstetric-care/post-delivery-rehabilitation`, priority: 0.7, changeFrequency: 'yearly' },

    // Gynecology Care
    { url: `${BASE}/gynecology-care/menstrual-problems-and-irregular-periods`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${BASE}/gynecology-care/pcos-management`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${BASE}/gynecology-care/pelvic-infections-treatment`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${BASE}/gynecology-care/menopause-care-and-counselling`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${BASE}/gynecology-care/infertility-treatment`, priority: 0.8, changeFrequency: 'yearly' },

    // Advanced Procedures & Surgeries
    { url: `${BASE}/advanced-procedures-and-surgeries/operative-hysteroscopy`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${BASE}/advanced-procedures-and-surgeries/laparoscopic-surgeries`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${BASE}/advanced-procedures-and-surgeries/laparoscopic-and-vaginal-hysterectomy`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${BASE}/advanced-procedures-and-surgeries/perineal-repair`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${BASE}/advanced-procedures-and-surgeries/hymenoplasty`, priority: 0.7, changeFrequency: 'yearly' },
    { url: `${BASE}/advanced-procedures-and-surgeries/vaginoplasty`, priority: 0.7, changeFrequency: 'yearly' },

    // Laser Gynecology
    { url: `${BASE}/laser-gynecology/laser-treatment-for-stress-urinary-incontinence`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${BASE}/laser-gynecology/vaginal-tightening-procedures`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${BASE}/laser-gynecology/vaginal-dryness-treatment`, priority: 0.7, changeFrequency: 'yearly' },
    { url: `${BASE}/laser-gynecology/prp-therapy-for-vaginal-dryness`, priority: 0.7, changeFrequency: 'yearly' },

    // Blog
    { url: `${BASE}/blogs`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE}/blogs/what-causes-period-pain`, priority: 0.6, changeFrequency: 'yearly' },
    { url: `${BASE}/blogs/understanding-repeated-miscarriages`, priority: 0.6, changeFrequency: 'yearly' },
    { url: `${BASE}/blogs/symptoms-of-silent-pcos`, priority: 0.6, changeFrequency: 'yearly' },
    { url: `${BASE}/blogs/understanding-postpartum-depression`, priority: 0.6, changeFrequency: 'yearly' },

    // NOTE: /login and all /doctor/* and /user/* dashboard routes are intentionally
    // excluded here and marked noindex in their own metadata — they are private
    // application routes, not public content.
  ]

  return pages.map(page => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
