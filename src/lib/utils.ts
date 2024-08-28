import Asset from "@models/Asset";
import Location from "@models/Location";

export type TreeNode = Map<string, string | null | Array<TreeNode> | boolean>;

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

    if (
      parentId === node.parentId ||
      ("locationId" in node && parentId === node.locationId)
    ) {
      const newNode = buildNode(node);

      if (!parentNode.get("children")) {
        parentNode.set("children", [newNode]);
      } else {
        const children = parentNode.get("children") as AssetTree;
        children.push(newNode);
      }

      return; // Exit the function after inserting the node
    }

    const children = parentNode.get("children") as AssetTree;

    if (children.length > 0) {
      insertNode(children, node);
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
