/**
 * template:
    "schema:name": "{{schema:name}}"
    "schema:description": "{{schema:description}}"
    brand:
      "@id": "{{@id}}brand/"
      "schema:url": "{{schema:url}}"
      "schema:image": "{{schema:image}}"
    contact:
      "@id": "{{@id}}contact/main"
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
  output:
    "@id": "http://example.com/"
    "schema:name": "Example"
    "schema:description": "An Example"
    brand:
    "@id": "http://example.com/brand/"
      "schema:url": "http://www.example.com/"
      "schema:image": "http://www.example.com/logo.png"
    contact:
      "@id": "http://example.com/contact/main"
      "schema:address": "123 Street"
  */

import Handlebars from 'handlebars';
import { LDToGraph } from './LDToGraph';

export class ClaimsToLD {


    public static toLD(data: Record<string, any>, template: Record<string, any>) {
        const json = {
            "@graph": [] as Record<string, any>[]
        };
        const graph = json["@graph"];
        const entity = { "@id": data["@id"] } as Record<string, any>;

        graph.push(entity); 
        Object.entries(template).forEach(([k, v]) => {
            if (typeof v === 'object') {
                const id = v["@id"];
                console.log("claim.id: %o => %o", id, data);
                const innerEntity = id?{ "@id": Handlebars.compile(id)(data) } as Record<string, any>:{};
                Object.entries(v).forEach(([innerK, innerV]) => {
                    if (innerK !== '@id' && innerV) {
                        console.log("claim.k.v: %o -> %o => %o", k, innerK, innerV);
                        const renderedValue = Handlebars.compile(innerV)({...data, key: innerK});
                        if (renderedValue) {
                            innerEntity[innerK] = this.value(renderedValue);
                        }
                    }
                });
                graph.push(innerEntity);
            } else if (v) {
                console.log("claim.K.V: %o => %o", k, v);
                const renderedValue = Handlebars.compile(v)(data);
                if (renderedValue) {
                    entity[k] = ClaimsToLD.value(renderedValue);
                }
            }
        });

        return json;
    }

    public static value(v: any) {
        if (typeof v === "string" || Array.isArray(v)) return v;
        if (typeof v === "object" && v["@value"]) return v["@value"];
        return null;
    }
}
