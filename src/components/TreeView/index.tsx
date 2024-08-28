/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutoSizer, List, ListRowRenderer } from "react-virtualized";
import "react-virtualized/styles.css";

interface TreeViewProps {
  flattenedTree: Map<string, any>[];
  rowRenderer: ListRowRenderer;
}

export function TreeView({
  flattenedTree,
  rowRenderer,
}: Readonly<TreeViewProps>) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          rowCount={flattenedTree.length}
          rowHeight={28}
          rowRenderer={rowRenderer}
          width={width}
          className="px-1 py-2"
        />
      )}
    </AutoSizer>
  );
}
