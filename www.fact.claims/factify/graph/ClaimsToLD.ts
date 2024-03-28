/**
shape:
    "@type": ["fact:Claim"]
    "schema:name": "Claim for {{schema:name}} WebPage"
    "prov:wasAssociatedWith":
        "@type": ["schema:WebPage"]
        "@id": "{{schema:url}}"
        "schema:name": "{{schema:name}}"
        "schema:description": "{{schema:description}}"
        "schema:url": "{{schema:url}}"
        "schema:image": "{{schema:image}}"
    "schema:contactPoint":
        "schema:address": "{{schema:address}}"
        "schema:telephone": "{{schema:telephone}}"
        "schema:email": "{{schema:email}}"
data:
    "@id": "http://example.com/"
    "schema:name": "Example"
    "schema:description": "An Example"
    "schema:url": "http://www.example.com/"
    "schema:image": "http://example.com/logo.png"
    "schema:address": "123 Street"
expected:
"@type": ["fact:Claim"]
"schema:name": "A Claim for Example WebPage"
"prov:wasAssociatedWith":
    "@type": ["schema:WebPage"]
    "@id": "http://example.com/"
    "schema:name": "Example"
    "schema:description": "An Example"
"schema:contactPoint":
    "@id": "http://example.com/brand/"
    "schema:url": "http://www.example.com/"
    "schema:image": "http://www.example.com/logo.png"
    "schema:address": "123 Street"
*/

import Handlebars from 'handlebars';

export class ClaimsToLD {

    public static toLDObject(graph: any[], data: any, entity: any, k: string, v: any) {
        if (v == null || v == "") return null;
        if (Array.isArray(v)) {
            let fresh: any[] = [];
            console.log("claim.[%s]: %o => %o", k, v, entity);
            v.forEach(v2 => {
                let a = this.toLDObject(graph, data, {}, k, v2)
                if (a) fresh.push(a);
            })
            return fresh;
        } else if (typeof v === 'object') {
            const id = v["@id"];
            console.log("claim.id: %o => %o", id, data);
            const innerEntity = id ? { "@id": Handlebars.compile(id)(data) } : {} as Record<string, any>;
            Object.entries(v).forEach(([innerK, innerV]) => {
                if (innerK !== "@id" && innerV) {
                    console.log("claim.k.v: %o -> %o => %o", k, innerK, innerV);
                    innerEntity[innerK] = this.toLDObject(graph, data, innerEntity, innerK, innerV);
                }
            });
            return innerEntity;
        } else if (v) {
            console.log("claim.V: %o => %o", k, v);
            const renderedValue = Handlebars.compile(v)(data);
            if (renderedValue) {
                return ClaimsToLD.value(renderedValue);
            }
        }
        return null;
    }

    public static toLD(data: Record<string, any>, template: Record<string, any>) {
        const json = {
            "@graph": [] as Record<string, any>[]
        };
        const graph = json["@graph"];
        const entity = { "@id": data["@id"] } as Record<string, any>;
        console.log("claim.entity: %o", entity);

        graph.push(entity); 
        Object.entries(template).forEach(([k, v]) => {
            entity[k] = this.toLDObject(graph, data, entity, k, v);
        });

        return json;
    }

    public static value(v: any) {
        if (typeof v === "string" || Array.isArray(v)) return v;
        if (typeof v === "object" && v["@value"]) return v["@value"];
        return null;
    }
}
