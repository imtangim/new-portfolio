import { defineArrayMember, defineField, defineType } from "sanity";

export const bodyBlock = defineType({
  name: "bodyBlock",
  title: "Body block",
  type: "object",
  fields: [
    defineField({
      name: "blockType",
      title: "Block type",
      type: "string",
      options: {
        list: [
          { title: "Paragraph", value: "paragraph" },
          { title: "Heading", value: "heading" },
          { title: "Image", value: "image" },
          { title: "Gallery", value: "gallery" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 4,
      hidden: ({ parent }) =>
        parent?.blockType !== "paragraph" && parent?.blockType !== "heading",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.blockType !== "image",
    }),
    defineField({
      name: "imageUrl",
      title: "Image URL (external)",
      type: "url",
      description: "Use if the image is not uploaded to Sanity",
      hidden: ({ parent }) => parent?.blockType !== "image",
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      hidden: ({ parent }) => parent?.blockType !== "image",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      hidden: ({ parent }) => parent?.blockType !== "image",
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery images",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "image", title: "Image", type: "image" }),
            defineField({
              name: "imageUrl",
              title: "Image URL (external)",
              type: "url",
            }),
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        }),
      ],
      hidden: ({ parent }) => parent?.blockType !== "gallery",
    }),
  ],
  preview: {
    select: { blockType: "blockType", text: "text" },
    prepare({ blockType, text }) {
      return {
        title: blockType || "Block",
        subtitle: text?.slice(0, 60),
      };
    },
  },
});
