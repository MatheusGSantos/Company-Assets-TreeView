import { AssetTree, flattenTree, TreeNode } from "@lib/utils";
import { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import ArrowDown from "@assets/icons/ArrowDown.svg";
import ComponentIcon from "@assets/icons/Codepen.svg";
import AssetIcon from "@assets/icons/IoCubeOutline.svg";
import LocationIcon from "@assets/icons/GoLocation.svg";
import BoltIcon from "@assets/icons/bolt.svg";
import EllipseIcon from "@assets/icons/ellipse.svg";
import { ListRowRenderer } from "react-virtualized";
import { TreeView } from "@components/TreeView";

interface AssetTreeViewProps {
  tree: AssetTree;
  onNodeClick: (node: TreeNode) => void;
  selectedComponentId?: string;
}

const renderAssetTreeIcon = (
  isLocation: boolean,
  hasSensor: boolean,
  isComponentSelected: boolean
) => {
  if (isLocation) {
    return <LocationIcon />;
  }

  if (isComponentSelected || hasSensor) {
    return (
      <ComponentIcon
        className={`${isComponentSelected ? "stroke-white" : ""}`}
      />
    );
  }

  return <AssetIcon />;
};

const renderComponentHintIcon = (sensorType: string, status: string) => {
  if (sensorType === "energy") {
    return (
      <BoltIcon
        className={`bolt-icon ${status === "critical" ? "critical" : ""}`}
      />
    );
  }

  if (sensorType === "vibration") {
    return (
      <EllipseIcon
        className={`ellipse ${status === "critical" ? "critical" : ""}`}
      />
    );
  }

  return null;
};

export function AssetTreeView({
  tree,
  selectedComponentId,
  onNodeClick,
}: Readonly<AssetTreeViewProps>) {
  const [expandedIds, setExpandedIds] = useState(new Set());

  const handleNodeClick = useCallback(
    (node: TreeNode) => {
      const children = node.get("children") as AssetTree;

      if (children.length > 0)
        setExpandedIds((prevExpandedIds) => {
          const newExpandedIds = new Set(prevExpandedIds);
          const nodeId = node.get("id");

          if (newExpandedIds.has(nodeId)) {
            newExpandedIds.delete(nodeId);
          } else {
            newExpandedIds.add(nodeId);
          }
          return newExpandedIds;
        });

      onNodeClick(node);
    },
    [onNodeClick]
  );

  const flattenedTree = flattenTree(tree, 0, expandedIds);

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    const node = flattenedTree[index];
    const isComponentSelected = selectedComponentId === node.get("id");

    return (
      <button
        key={key}
        style={{
          ...style,
          paddingLeft: `${(node.get("level") as number) * 20}px`,
          cursor: "pointer",
          backgroundColor: isComponentSelected ? "#2188FF" : "transparent",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
        onClick={() => handleNodeClick(node)}
      >
        {(node.get("children") as AssetTree).length > 0 ? (
          <ArrowDown
            className={twMerge(
              "transform",
              !expandedIds.has(node.get("id")) && "-rotate-90"
            )}
          />
        ) : (
          <div className="w-6 h-6" />
        )}

        {renderAssetTreeIcon(
          !node.has("sensorType"),
          !!node.get("sensorType"),
          isComponentSelected
        )}
        <span
          className={twMerge(
            "font-roboto text-sm font-normal text-blue-dark",
            isComponentSelected && "text-white"
          )}
        >
          {node.get("name")}
        </span>
        {node.get("status") &&
          renderComponentHintIcon(
            node.get("sensorType") as string,
            node.get("status") as string
          )}
      </button>
    );
  };

  return <TreeView flattenedTree={flattenedTree} rowRenderer={rowRenderer} />;
}
