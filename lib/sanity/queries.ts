export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  siteTitle,
  siteDescription,
  keywords,
  "ogImageUrl": coalesce(ogImage.asset->url, ""),
  heroEyebrow,
  heroTitleLine1,
  heroTitleLine2,
  heroTitleHighlight,
  heroSubtitle,
  heroPortrait,
  heroPortraitUrl,
  resumeFile,
  "resumeFileUrl": resumeFile.asset->url,
  resumeUrl,
  heroCtaPrimary,
  heroCtaSecondary,
  heroCtaTertiary,
  introNarration,
  introSidePortrait,
  introSidePortraitUrl,
  introFrontPortrait,
  introFrontPortraitUrl,
  aboutLabel,
  aboutHeadline,
  aboutYears,
  aboutYearsText,
  aboutPortrait,
  aboutPortraitUrl,
  aboutFunFacts,
  aboutCoreStack,
  aboutSpecialty,
  aboutBentoAchievements,
  skillsLabel,
  skillsHeadline,
  orbitSkills,
  skillsCenterNumber,
  skillsCenterLabel,
  proficiencies,
  experienceLabel,
  experienceHeadline,
  projectsLabel,
  projectsHeadline,
  achievementsLabel,
  achievementsHeadline,
  blogLabel,
  blogHeadline,
  blogPageTitle,
  blogPageDescription,
  contactLabel,
  contactHeadline,
  contactNote,
  contactLinks,
  footerLine1,
  footerLine2,
  navCtaText
}`;

export const experiencesQuery = `*[_type == "experience"] | order(order asc){
  role,
  company,
  period,
  points,
  order
}`;

export const projectsQuery = `*[_type == "project"] | order(order asc){
  name,
  tag,
  description,
  stack,
  screenshot,
  screenshotUrl,
  appStoreUrl,
  playStoreUrl,
  order
}`;

export const achievementsQuery = `*[_type == "achievement"] | order(order asc){
  rank,
  title,
  meta,
  featured,
  order
}`;

export const postsQuery = `*[_type == "post"] | order(publishedAt desc){
  "slug": slug.current,
  title,
  excerpt,
  "date": publishedAt,
  readTime,
  tags,
  coverImage,
  coverImageUrl,
  gallery,
  body,
  seo
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  excerpt,
  "date": publishedAt,
  readTime,
  tags,
  coverImage,
  coverImageUrl,
  gallery,
  body,
  seo
}`;

export const postSlugsQuery = `*[_type == "post"].slug.current`;
