import type { Node, Edge } from "v-network-graph";

const localPartRegex = new RegExp("[^#]+(?=[^#/]*$)");

export class LDToGraph {
  nodes: Record<string, Node>;
  edges: Record<string, Edge>;

  constructor(data: any, nodes: Record<string, Node> = {}, edges: Record<string, Edge> = {}) {
    this.nodes = nodes;
    this.edges = edges;
    this.flatten(data);
  }

  private flatten(nodes: Record<string, any>[]) {
    console.log("map.graph: %o", nodes);

    for (const node of nodes) {
      this.traverse(node);
    }
  }

  private handleArray(key: string, value: any[], pid: string) {

    value.forEach((item: Record<string, any>, index: number) => {
      if (typeof item === 'object' && item !== null) {
        const nid = this.traverse(item);
        const edgeId = `${pid}_${key}_${nid}`;
        this.edges[edgeId] = { source: pid, target: nid, label: key };
        console.log("map.edge: %o --> %o => %o", pid, key, nid);
      }
    });
  }

  private handleObject(key: string, node: Record<string, any>, pid: string) {
    const nid = node['@id'];
    if (!nid) {
      console.log("map.skip: %o --> %o => %o", pid, key, nid);
      return;
    }
    delete node[key];
    const edgeId = `${pid}_${key}`;
    this.edges[edgeId] = { source: pid, target: nid, label: key };
    if (nid) {
      console.log("map.object: %o --> %o --> %o  --> %o ----> %o", pid, key, nid, node, edgeId);
      this.traverse(node);
    }
}

  private traverse(node: Record<string, any>) {
    const nid = node["@id"];
    console.log("map.node: %o -> %o", nid, node);
    if (!nid) return null;

    Object.entries(node).forEach(([key, value]) => {
      if (key === '@id') {
        console.log("map.id: %o --> %o == %s", nid, node, this.nodes[nid]);
        this.nodes[nid] = this.nodes[nid] || node;
      } else if (Array.isArray(value)) {
        console.log("map.array: %o --> %o => %o", nid, key, value);
        this.handleArray(key, value, nid);
      } else if (typeof value === 'object' && value !== null) {
        this.handleObject(key, value, nid);
      } else if (key && value) {
        console.log("map.string: %o --> %o => %o", nid, key, value);
        this.nodes[nid][key] = ""+value;
        }
    });
    return nid;
  }

  public getes(): { nodes: Record<string, Node>, edges: Record<string, Edge> } {
    return { nodes: this.nodes, edges: this.edges };
  }

  public static localname(uri: string): string {
    const found = uri ? uri.match(localPartRegex) : "[?]";
    return found ? found[0] : uri;
  }

  public static label(node: Record<string, any>, max = 24): string {
    let label: string = node['skos:prefLabel'] || node['schema:name'] || node['rdf:label'] || node['rdf:value'] || LDToGraph.localname(node['@id'])    
    const isURI = label.indexOf("://");
    if (isURI>1) {
      label = label.substring(isURI+3)
    }
    return label.length>24?label.substring(0,Math.max(max,20)):label;
  }
}
