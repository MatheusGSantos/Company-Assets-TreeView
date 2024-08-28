import { PureComponent, useCallback, useState } from "react";
import { AutoSizer, List, ListProps, ListRowRenderer } from "react-virtualized";
import ArrowDown from "@assets/icons/ArrowDown.svg";
import "react-virtualized/styles.css";
import { twMerge } from "tailwind-merge";

interface TreeViewProps<T> extends PureComponent<ListProps> {
  flattenedTree: T[];
  rowRenderer: ListRowRenderer;
}

interface TreeNodeProps<T> {
  onNodeClick: (node: T) => void;
  node: T;
}

export function TreeNode<T>({ node, onNodeClick }: Readonly<TreeNodeProps<T>>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNodeClick = useCallback(() => {
    if (onNodeClick) onNodeClick(node);
    setIsOpen((prev) => !prev);
  }, [node, onNodeClick]);

  return (
    <button className="w-full h-7" onClick={handleNodeClick} tabIndex={0}>
      <span>
        <ArrowDown className={twMerge("transform", !isOpen && "-rotate-90")} />
      </span>
    </button>
  );
}

export function TreeView<T>({
  flattenedTree,
  rowRenderer,
  ...props
}: Readonly<TreeViewProps<T>>) {
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
          {...props}
        />
      )}
    </AutoSizer>
  );
}
