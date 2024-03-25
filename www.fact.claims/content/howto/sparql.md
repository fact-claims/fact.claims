---
layout: page
---
# Queries that curate, verify and infer facts

With SPARQL, you can craft queries to retrieve the facts based on complex criteria.

The `WHERE` clause in a SPARQL query defined a pattern that matches statements { `subject`, `tag` and `object` }.

A semi-colon `;` indicates a set of tags belong to same subject. 

A period `.` indicates a closing statement, afterwards we need a new subject.

And the `FILTER` only includes statements that match a boolean expression.

### Retrieve claims and their source:

```sparql
SELECT ?claim ?by
WHERE {
  ?claim rdf:type trust:Claim ;
    prov:generatedBy ?by .
}
```

### Retrieve claims about the `SmartTrust` topic:

```sparql
SELECT ?claim
WHERE {
  ?claim skos:member self:SmartTrust .
}
```

### Retrieve claims notarized by a smart contract:

```sparql
SELECT ?claim
WHERE {
  ?claim rdf:type trust:Claim ;
         prov:wasGeneratedBy ?by .
  FILTER (startswith(str(?by), "ethereum://"))
}
```

### Retrieve all organizations:

```sparql
SELECT DISTINCT ?claim
WHERE {
  ?claim rdf:type schema:Organization.
}
```

### Retrieve all grounded fact claims, including `sameAs` aliases:

```sparql
SELECT ?claim ?by
WHERE {
  {
    ?claim (prov:wasGeneratedBy*/^prov:wasGeneratedBy) ?by .
  }
  UNION
  {
    ?alias owl:sameAs ?claim.
    ?claim (prov:wasGeneratedBy*/^prov:wasGeneratedBy) ?by .
  }
  FILTER (startswith(str(?by), "ipfs://") || startswith(str(?by), "ethereum://"))
}
```

### Infer `fact:Grounded`:

```sparql
INSERT {
  ?claim a fact:Grounded .
}
WHERE {
  {
    ?claim (prov:wasGeneratedBy*/^prov:wasGeneratedBy) ?by .
  }
  UNION
  {
    ?alias owl:sameAs ?claim .
    ?claim (prov:wasGeneratedBy*/^prov:wasGeneratedBy) ?by .
  }
  FILTER (startswith(str(?by), "ipfs://") || startswith(str(?by), "ethereum://"))
}
```

- The INSERT keyword indicates that you want to insert triples into the graph.
- The pattern in the WHERE clause remains the same as before, retrieving either the original claims or their aliases along with their corresponding sources.
- After the insertion, each matched ?claim will be assigned the type fact:Grounded.

## Mini Tutorial

The `WHERE` clause in SPARQL serves as a pattern matching mechanism, allowing you to specify patterns that RDF triples must conform to in order to match the query. Here's an explanation of the `WHERE` pattern matching in your query:

1. **Basic Pattern Matching**:
   - The basic form of pattern matching in SPARQL involves matching triples directly. For example, `?claim rdf:type trust:Claim` matches triples where `?claim` is of type `trust:Claim`.

2. **Optional Matching**:
   - Optional patterns are specified using the `OPTIONAL` keyword. They allow you to specify patterns that may or may not match. If an optional pattern doesn't match, the variables within it will be bound to null.
   - In your query, there's an attempt to use `OPTIONAL` to find aliases connected via the `owl:sameAs` property. However, it's not fully utilized due to a misunderstanding of its usage in this context.

3. **Union of Patterns**:
   - The `UNION` keyword allows you to combine multiple patterns together. Each pattern separated by `UNION` operates independently, and results from each are combined.
   - Your query utilizes `UNION` to combine patterns for finding both the original claim and its aliases (connected via `owl:sameAs`).

4. **Filtering**:
   - Filtering is used to constrain query results based on specified conditions. Filters are applied after the basic pattern matching.
   - Your query utilizes `FILTER` to restrict sources based on their prefixes (`ipfs://` or `ethereum://`).

5. **Property Path Expressions**:
   - Property paths allow you to traverse RDF graphs efficiently using concise syntax. They specify sequences of properties and/or inverse properties to follow.
   - Your query uses property paths like `(prov:wasGeneratedBy*/^prov:wasGeneratedBy)` to traverse through chains of `prov:wasGeneratedBy` relationships, including their inverses, allowing for a flexible search for claims and their sources.

