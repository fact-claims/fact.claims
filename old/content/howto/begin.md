## We need to describe all kinds of things in a structured way. 

RDF is a framework for representing information in the form of statements - our `fact claims`. 

Each consists of three components, we'll call them `subject, tag, and object`, that together describe an atomic statement of fact.

We use URIs to uniquely identify resources and the relationships between them. 

Since resources are often rather long, we can use a vocabulary to shorten them, in this case the `trust` vocabulary.

### Let's make a simple claim:


```turtle
    <https://example.com/> a trust:Claim .
```

It's hopefully easy to read, let's break down our example:

- Formally our statement claims that `https://example.com/` (our subject) is a kind of `trust:Claim`. 


- Subject: `<https://example.com/>`
- Relationship: `a` (short for "is a")
- Object: `trust:Claim` (A `Claim` as defined by the `trust` vocabulary)

### Now, we can enrich statements to be more and more interesting:

Let's us describe our subject by adding `tags` that can refer to both links and literals, like this:

```turtle
<https://example.com>
    a schema:Organization, prov:Organization ;
    a trust:Claim;
    rdf:label "example";
    schema:name "example" ;
    skos:prefLabel "example";
    rdf:comment "The Example";
    owl:sameAs <https://www.example.com>.
```

### Let's break down our extended example:

- As always, we start with a subject resource: `<https://example.com/>`
- Then we add some tags to assign more meaning:
  - `a` (signifying "is a") with `schema:Organization` and `prov:Organization`.
- Let's give it some human-readable labels in a few common vocabularies: 
  - `rdf:label`, `schema:name`, and `skos:prefLabel` are well-known properties used to provide labels or names for the subject.
  - `rdf:comment` is a property used to provide a comment or description of the subject.
- Finally, let's tag some resources that are exactly equivalent.  
  - `owl:sameAs` indicating that it is an alias of another resource.


### Using short tags instead of URIs:

A short tag uses a `prefix` that stands in for the URI namespace, and a local `name` that is appended to it.

```
  @prefix trust: <https://fact.claims/v0/trust#> .
```

In our example, `trust` is expanded into a full URI when the RDF is parsed, and we define in our RDF document.

The simplest vocabulary is really just a URI namespace that ensure terms are globally unique.

For production use cases, it's best practice to define a formal vocabulary using RDFS notation ([W3C standard](https://www.w3.org/TR/rdf12-schema/)).

So our `trust:Claim` becomes `<https://fact.claims/v0/trust#Claim>`, a fully qualified URI that can, but need not, be resolvable.

A best practice vocabulary specifies terms with more precision, and would be retrievable from `https://fact.claims/v0/trust`. 

This allows an agent to make sense of facts by following the links and self-discovering the detailed (schema) definitions.

### And that's it (mostly)! 

- [Publish your fact.claims](./fact.claims.md)

- [Curating and crawling](./crawling.md)

- [Curating and crawling](./crawling.md)

- [White Paper](../paper/index.md)

- [RFC v0.4 DRAFT](../rfc/draft.md)

