import { defineField, defineType } from "sanity";

export const achievement = defineType({
  name: "achievement",
  title: "Achievement",
  type: "document",
  fields: [
    defineField({
      name: "rank",
      title: "Rank / label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "meta",
      title: "Meta line",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Featured (large card)",
      type: "boolean",
      initialValue: false,
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
    select: { title: "title", subtitle: "rank" },
  },
});
