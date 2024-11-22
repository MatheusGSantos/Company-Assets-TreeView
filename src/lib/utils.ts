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

export class AssetTreeBuilder {
  outputTree: AssetTree = [];

  private buildNode(node: Location | Asset): TreeNode {
    const newNode: TreeNode = new Map(Object.entries(node));

    newNode.set("children", [] as AssetTree);

    return newNode;
  }

  private insertNode(tree: AssetTree, node: Location | Asset) {
    for (const parentNode of tree) {
      const parentId = parentNode.get("id");
      const parentNodeChildren = parentNode.get("children") as AssetTree;

      if (
        parentId === node.parentId ||
        ("locationId" in node && parentId === node.locationId)
      ) {
        const newNode = this.buildNode(node);
        parentNodeChildren.push(newNode);

        return true; // Exit the function after inserting the node
      }

      if (parentNodeChildren.length > 0) {
        this.insertNode(parentNodeChildren, node);
      }
    }

    return false; // Node was not inserted
  }

  public buildTree({ data }: BuildTreeParams) {
    const assetTree: AssetTree = [];

    // let index = 0

    // while (index < data.length) {
    //   const node = data[index]

    //   if (node.parentId || ("locationId" in node && node.locationId)) {
    //     const wasInserted = insertNode(assetTree, node);

    //     if (!wasInserted) {
    //       const newNode = buildNode(node);
    //       assetTree.push(newNode);
    //     }
    //   } else {
    //     const newNode = buildNode(node);
    //     assetTree.push(newNode);
    //   }

    //   index++
    // }

    data.forEach((node) => {
      if (node.parentId || ("locationId" in node && node.locationId)) {
        this.insertNode(assetTree, node);
        // const wasInserted = insertNode(assetTree, node);

        // if (!wasInserted) {
        //   // push to the end of the array
        // }
      } else {
        const newNode = this.buildNode(node);
        assetTree.push(newNode);
      }
    });

    return assetTree;
  }
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

export const filterTree = (
  node: TreeNode,
  sensorType: string | null,
  status: string | null,
  name: string | null
): TreeNode | null => {
  // Filtrar os filhos recursivamente
  const children = (node.get("children") as AssetTree)
    .map((childNode) => filterTree(childNode, sensorType, status, name))
    .filter((childNode) => childNode !== null);

  // Verifica se o nó atual deve ser mantido
  const nodeSensorType = node.get("sensorType") ?? null;
  const nodeStatus = node.get("status") ?? null;
  const nodeName = node.get("name") as string;

  const sameName = name
    ? nodeName.toLowerCase().includes(name.toLowerCase())
    : true;
  const sameSensorType = sensorType ? nodeSensorType === sensorType : true;
  const sameStatus = status ? nodeStatus === status : true;

  const shouldKeep =
    (sameName && sameSensorType && sameStatus) || children.length > 0;

  if (shouldKeep) {
    // Cria um novo nó com os filhos filtrados
    const newNode = new Map(node);
    newNode.set("children", children);
    return newNode;
  }

  return null;
};
