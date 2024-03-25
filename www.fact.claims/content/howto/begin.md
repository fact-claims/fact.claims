---
layout: page
---
# Make & trust all kinds of claims 

RDF is a framework for representing information in the form of statements - our `fact claims`. 

Each statement consists of three components - `subject`,`tag,` and `object`.

We use URLs to uniquely identify resources and the relationships between them. 

### Let's make a simple claim:

It becomes easier to read if we work on an example:

```turtle
    <https://fact.claims/> a fact:Claim .
```

- Formally our statement says that `https://fact.claims/` is `a` kind of `fact:Claim`. 


- Subject: `<https://fact.claims/>`
- Tag: `a` (short for "is a kind of")
- Object: `fact:Claim`  - something called a `Claim` is defined in the `fact:` vocabulary)

### Now, Let's enrich our statements to be more descriptive:

We can tag our subject with both links and literals, like this:

```turtle
<https://fact.claims/>

    a schema:Organization, prov:Organization, fact:Claim ;

    rdf:label "fact.claims";
    schema:name "fact.claims" ;
    skos:prefLabel "fact.claims";

    rdf:comment "The fact.claims project builds tools for fact-based AI.";
    owl:sameAs <https://www.fact.claims/>.
```

### Let's break it down:

- We always start with a subject resource, like`<https://fact.claims/>`
- Then we add some tags to assign more meaning - to tell it's story so to speak:
  - We claim to be`a` `schema:Organization` and a `prov:Organization`.
- We added some human-readable labels - using a few common vocabularies for compatibility: 
  - `rdf:label`, `schema:name`, and `skos:prefLabel` are well-known properties.
  - `rdf:comment` provides a longer description of the subject.
  - `owl:sameAs` indicating that it is an alias of another resource.

### Using short tags instead of URLs:

The simplest vocabulary is really just a URL prefix that ensure terms are globally unique.

A short tag uses a prefix (we use `fact:`) to stand-in for the URL namespace.

In our example, `fact:` is expanded into a full URL when the RDF is parsed only if we declare it as prefix.

```
  @prefix fact: <https://fact.claims/v0/fact#> .
```

For our implementation, we created and hosted an RDF resource named [/v0/fact](/v0/fact.ttl) that describes our terms. 

So `fact:Claim` becomes `<https://fact.claims/v0/fact#Claim>`, a fully qualified URL that can, but need not, be resolvable.

For production use cases, it's best practice to define a formal vocabulary using RDFS notation ([W3C standard](https://www.w3.org/TR/rdf12-schema/)).

Our vocabulary is retrievable from [https://fact.claims/v0/fact](https://fact.claims/v0/fact) and our claims from [https://fact.claims/fact.claims](https://fact.claims/fact.claims). 

This allows any agent to make sense of our (or your) terms by following links to their definitions.

### And that's it (mostly)! 

- [Claim your facts](/claim)

- [Fact Augmented Generation](/howto/fag)

- [Curating and crawling](/howto/crawling)

- [SEO for AI](/howto/seo)

- [Querying facts with SPARQL](/howto/sparql)

- [White Paper](/paper/)

- [RFC v0.4 DRAFT](/rfc/draft)

