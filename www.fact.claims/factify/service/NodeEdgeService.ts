import JSONToGraph from "../graph/JSONToGraph";
import { Graph } from "..";

export class NodeEdgeService {
    token: string = "";
    baseURL: string = "http://localhost:3000/api/kb/";

    constructor() { }

    async find(focus: string): Promise<Graph> {
        const url = this.baseURL + focus;
        console.log("find.url: %o", url)
        const r = await fetch(url);

        console.log("find.response: %o", r.status);
        const json = await r.json();

        if (!json) return Promise.reject();

        if (json.nodes && json.edges) {
            return Promise.resolve(json);
        } else {
            const j2g = new JSONToGraph(json, "narrower")
            return Promise.resolve(j2g.toGraph())
        }

    }
}