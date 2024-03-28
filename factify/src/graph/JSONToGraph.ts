import { Graph, Node, Edge } from "../types";

export default class LDToGraph {
  private nodeIdCounter = 0;
  private edgeIdCounter = 0;
  private nodes: Record<string, Node> = {};
  private edges: Record<string, Edge> = {};

  constructor(private data: any, private predicate: string) { }

  private generateNodeId(): string {
    this.nodeIdCounter++;
    return `node${this.nodeIdCounter}`;
  }

  private generateEdgeId(): string {
    this.edgeIdCounter++;
    return `edge${this.edgeIdCounter}`;
  }

  private traverse(node: any, parentId?: string) {
    const nodeId = this.generateNodeId();

    this.nodes[nodeId] = node;

    if (parentId) {
      this.edges[this.generateEdgeId()] = {
        source: parentId,
        target: nodeId
      } as any;
    }

    if (node[this.predicate]) {
      for (const child of node[this.predicate]) {
        this.traverse(child, nodeId);
      }
    }
  }

  toGraph(): Graph {
    this.traverse(this.data);
    return {
      nodes: this.nodes,
      edges: this.edges,
      layouts: { nodes: {} }
    };
  }
}
