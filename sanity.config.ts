import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  name: "tangim-portfolio",
  title: "Tangim Portfolio",
  projectId,
  dataset,
  apiVersion,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
