import { absoluteUrl, schemaIds } from "../ids";
import { pruneEmpty, type JsonLdNode } from "../types";

export type SchemaListItem = {
  name: string;
  path: string;
};

/**
 * ItemList pour les hubs (guides / calculateurs).
 * Reflète uniquement les entrées réellement listées sur la page.
 */
export function buildItemListNode(
  path: string,
  name: string,
  items: SchemaListItem[],
): JsonLdNode {
  return pruneEmpty({
    "@type": "ItemList",
    "@id": schemaIds.itemList(path),
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) =>
      pruneEmpty({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      }),
    ),
  });
}
