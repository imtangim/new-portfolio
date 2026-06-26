import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "seo", title: "SEO & Global" },
    { name: "hero", title: "Hero" },
    { name: "intro", title: "Intro" },
    { name: "about", title: "About" },
    { name: "skills", title: "Skills" },
    { name: "experience", title: "Experience header" },
    { name: "projects", title: "Projects header" },
    { name: "achievements", title: "Achievements header" },
    { name: "blog", title: "Blog header" },
    { name: "contact", title: "Contact & Footer" },
    { name: "nav", title: "Navigation" },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      group: "seo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Site description",
      type: "text",
      rows: 3,
      group: "seo",
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Default OG image",
      type: "image",
      group: "seo",
    }),

    defineField({
      name: "heroEyebrow",
      title: "Eyebrow text",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTitleLine1",
      title: "Headline line 1",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTitleLine2",
      title: "Headline line 2 (before highlight)",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTitleHighlight",
      title: "Highlighted word",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroPortrait",
      title: "Hero portrait",
      type: "image",
      group: "hero",
    }),
    defineField({
      name: "heroPortraitUrl",
      title: "Hero portrait URL (if not uploaded)",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "resumeFile",
      title: "Resume PDF",
      type: "file",
      options: { accept: ".pdf" },
      group: "hero",
    }),
    defineField({
      name: "resumeUrl",
      title: "Resume URL (if not uploaded)",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroCtaPrimary",
      title: "Primary CTA label",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroCtaSecondary",
      title: "Resume CTA label",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroCtaTertiary",
      title: "Contact CTA label",
      type: "string",
      group: "hero",
    }),

    defineField({
      name: "introNarration",
      title: "Intro narration",
      type: "text",
      rows: 3,
      group: "intro",
    }),
    defineField({
      name: "introSidePortrait",
      title: "Side portrait",
      type: "image",
      group: "intro",
    }),
    defineField({
      name: "introSidePortraitUrl",
      title: "Side portrait URL",
      type: "string",
      group: "intro",
    }),
    defineField({
      name: "introFrontPortrait",
      title: "Front portrait",
      type: "image",
      group: "intro",
    }),
    defineField({
      name: "introFrontPortraitUrl",
      title: "Front portrait URL",
      type: "string",
      group: "intro",
    }),

    defineField({
      name: "aboutLabel",
      title: "Section label",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutHeadline",
      title: "Headline",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutYears",
      title: "Years of experience (number)",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutYearsText",
      title: "Experience description",
      type: "text",
      rows: 3,
      group: "about",
    }),
    defineField({
      name: "aboutPortrait",
      title: "About portrait",
      type: "image",
      group: "about",
    }),
    defineField({
      name: "aboutPortraitUrl",
      title: "About portrait URL",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutFunFacts",
      title: "Fun facts",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "about",
    }),
    defineField({
      name: "aboutCoreStack",
      title: "Core stack tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "about",
    }),
    defineField({
      name: "aboutSpecialty",
      title: "Specialty text (HTML allowed: use &amp; for &)",
      type: "text",
      rows: 2,
      group: "about",
    }),
    defineField({
      name: "aboutBentoAchievements",
      title: "About bento achievements",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon/number", type: "string" }),
            defineField({ name: "text", title: "Text", type: "string" }),
          ],
        }),
      ],
      group: "about",
    }),

    defineField({
      name: "skillsLabel",
      title: "Section label",
      type: "string",
      group: "skills",
    }),
    defineField({
      name: "skillsHeadline",
      title: "Headline",
      type: "string",
      group: "skills",
    }),
    defineField({
      name: "orbitSkills",
      title: "Orbital skills",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "skills",
    }),
    defineField({
      name: "skillsCenterNumber",
      title: "Center number",
      type: "string",
      group: "skills",
    }),
    defineField({
      name: "skillsCenterLabel",
      title: "Center label",
      type: "string",
      group: "skills",
    }),
    defineField({
      name: "proficiencies",
      title: "Proficiency bars",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({
              name: "level",
              title: "Level (0–100)",
              type: "number",
              validation: (rule) => rule.min(0).max(100),
            }),
          ],
        }),
      ],
      group: "skills",
    }),

    defineField({
      name: "experienceLabel",
      title: "Section label",
      type: "string",
      group: "experience",
    }),
    defineField({
      name: "experienceHeadline",
      title: "Headline",
      type: "string",
      group: "experience",
    }),

    defineField({
      name: "projectsLabel",
      title: "Section label",
      type: "string",
      group: "projects",
    }),
    defineField({
      name: "projectsHeadline",
      title: "Headline",
      type: "string",
      group: "projects",
    }),

    defineField({
      name: "achievementsLabel",
      title: "Section label",
      type: "string",
      group: "achievements",
    }),
    defineField({
      name: "achievementsHeadline",
      title: "Headline",
      type: "string",
      group: "achievements",
    }),

    defineField({
      name: "blogLabel",
      title: "Section label",
      type: "string",
      group: "blog",
    }),
    defineField({
      name: "blogHeadline",
      title: "Headline",
      type: "string",
      group: "blog",
    }),
    defineField({
      name: "blogPageTitle",
      title: "Blog page title",
      type: "string",
      group: "blog",
    }),
    defineField({
      name: "blogPageDescription",
      title: "Blog page description",
      type: "text",
      rows: 2,
      group: "blog",
    }),

    defineField({
      name: "contactLabel",
      title: "Section label",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactHeadline",
      title: "Headline",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactNote",
      title: "Contact note",
      type: "text",
      rows: 3,
      group: "contact",
    }),
    defineField({
      name: "contactLinks",
      title: "Contact links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "URL / mailto / tel", type: "string" }),
            defineField({
              name: "external",
              title: "Open in new tab",
              type: "boolean",
              initialValue: true,
            }),
          ],
        }),
      ],
      group: "contact",
    }),
    defineField({
      name: "footerLine1",
      title: "Footer line 1",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "footerLine2",
      title: "Footer line 2",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "navCtaText",
      title: "Nav CTA button text",
      type: "string",
      group: "nav",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
