import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "stack",
      title: "Tech stack",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "screenshot",
      title: "Screenshot",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "screenshotUrl",
      title: "Screenshot URL (if not uploaded)",
      type: "string",
    }),
    defineField({
      name: "appStoreUrl",
      title: "App Store URL",
      type: "url",
    }),
    defineField({
      name: "playStoreUrl",
      title: "Play Store URL",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "tag", media: "screenshot" },
  },
});
