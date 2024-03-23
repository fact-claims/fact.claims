## Some sample SPARQL queries

With SPARQL, you can craft queries to retrieve the facts based on complex criteria.

### Retrieve claims and their source:
```sparql
SELECT ?claim ?by
WHERE {
  ?claim rdf:type trust:Claim ;
  prov:generatedBy ?by .
}
```

### Retrieve claims about the `IPFS` topic:
```sparql
SELECT ?claim
WHERE {
  ?claim skos:member self:IPFS .
}
```

### Retrieve Notarized Claims by a Smart Contract:
```sparql
SELECT ?claim
WHERE {
  ?claim rdf:type trust:Claim ;
         prov:wasGeneratedBy ?by .
  FILTER (startswith(str(?by), "ethereum://"))
}
```

### Retrieve all Organizations:
```sparql
SELECT DISTINCT ?organization
WHERE {
  ?organization rdf:type schema:Organization.
}
```

### Retrieve all grounded facts:

```sparql
SELECT ?claim ?by
WHERE {
  ?claim rdf:type trust:Claim ;
         (prov:wasGeneratedBy*/^prov:wasGeneratedBy) ?by .
  FILTER (startswith(str(?by), "ipfs://") || startswith(str(?by), "ethereum://"))
}
```


