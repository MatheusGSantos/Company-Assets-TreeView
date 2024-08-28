import Asset from "@models/Asset";
import Location from "@models/Location";

export type TreeNode = Map<
  string,
  string | null | Array<TreeNode> | boolean | number
>;

export type AssetTree = Array<TreeNode>;

interface BuildTreeParams {
  data: Array<Location | Asset>;
}

function buildNode(node: Location | Asset): TreeNode {
  const newNode = new Map(Object.entries(node)) as TreeNode;
  newNode.set("children", [] as AssetTree);

  return newNode;
}

function insertNode(tree: AssetTree, node: Location | Asset) {
  for (const parentNode of tree) {
    const parentId = parentNode.get("id");
    const parentNodeChildren = parentNode.get("children") as AssetTree;

    if (
      parentId === node.parentId ||
      ("locationId" in node && parentId === node.locationId)
    ) {
      const newNode = buildNode(node);
      parentNodeChildren.push(newNode);

      return; // Exit the function after inserting the node
    }

    if (parentNodeChildren.length > 0) {
      insertNode(parentNodeChildren, node);
    }
  }
}

export function buildTree({ data }: BuildTreeParams) {
  const assetTree: AssetTree = [];

  data.forEach((node) => {
    if (node.parentId || ("locationId" in node && node.locationId)) {
      insertNode(assetTree, node);
    } else {
      const newNode = buildNode(node);
      assetTree.push(newNode);
    }
  });

  return assetTree;
}

export function twoPointerSort<T>(
  array: T[],
  compareFn: (a: T, b: T) => number
) {
  const newArray = [...array]; // Create a copy of the array
  let left = 0;
  let right = newArray.length - 1;

  while (left < right) {
    if (compareFn(newArray[left], newArray[right]) > 0) {
      const temp = newArray[left];
      newArray[left] = newArray[right];
      newArray[right] = temp;
    }

    left++;
    right--;
  }

  return newArray; // Return the sorted copy
}

export function flattenTree(
  nodes: AssetTree,
  level = 0,
  expandedIds = new Set()
) {
  let flatList = [] as AssetTree;

  nodes.forEach((node) => {
    const flatNode = new Map([...node.entries()]);
    flatNode.set("level", level);
    flatNode.set("isExpanded", expandedIds.has(node.get("id") as string));

    flatList.push(flatNode);

    const children = node.get("children") as AssetTree;
    const isExpanded = expandedIds.has(node.get("id") as string);

    if (children && isExpanded) {
      flatList = flatList.concat(flattenTree(children, level + 1, expandedIds));
    }
  });

  return flatList;
}
