/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    function minDepthHelper(node) {
      if (node === null) return 0;
      else if (node.left === null && node.right === null) return 1;
      else if (node.right === null) return 1 + minDepthHelper(node.left);
      else if (node.left === null) return 1 + minDepthHelper(node.right);
      else
        return (
          1 + Math.min(minDepthHelper(node.left), minDepthHelper(node.right))
        );
    }
    return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    function maxDepthHelper(node) {
      if (node === null) return 0;
      else if (node.left === null && node.right === null) return 1;
      else
        return (
          1 + Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right))
        );
    }
    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = Number.MIN_SAFE_INTEGER;

    function sumHelper(node) {
      if (node === null) return 0;

      let left = sumHelper(node.left);
      let right = sumHelper(node.right);

      let max = Math.max(
        result,
        node.val,
        node.val + left,
        node.val + right,
        node.val + left + right
      );
      result = max;

      return Math.max(node.val, node.val + Math.max(left, right));
    }
    sumHelper(this.root);
    return result === Number.MIN_SAFE_INTEGER ? 0 : result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let nextLargerResult = null;
    let nodeStack = [this.root];
    while (nodeStack.length) {
      let current = nodeStack.pop();
      if (current !== null) {
        if (
          current.val > lowerBound &&
          (nextLargerResult === null || current.val < nextLargerResult)
        )
          nextLargerResult = current.val;
        nodeStack.push(current.left);
        nodeStack.push(current.right);
      }
    }
    return nextLargerResult;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
