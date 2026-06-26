import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("post").title("Blog Posts"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("experience").title("Experience"),
      S.documentTypeListItem("achievement").title("Achievements"),
    ]);
