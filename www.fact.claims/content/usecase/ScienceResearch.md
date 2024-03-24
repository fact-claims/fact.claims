Linked Data (and its abstract sibling RDF) are foundational technologies for organizing and interlinking data on the web in a structured and machine-readable format.

For a scientist, Linked Data enables the representation of complex relationships between various research resources, such as publications, datasets, and authors. This structured representation can describe papers, authors, citations, and references in a formal model.

Scientists need to discover, share, and analyze research findings to improve collaboration, reproducibility, and innovation.

1. **Choose Vocabularies**: Vocabularies define terms, we refer to them using their common prefix, like `skos:` or `schema:`.

2. **Resources and Types**: Describe resources such as the scholarly article and its related entities.

3. **Properties and Relationships**: Define properties and relationships between resources, elucidating attributes and interconnections.

4. **Fact Claims**: Introduce fact claims for insights into the paper, authors, content, and context.

Now, let's delve into an exemplar in the realm of AI research:

- **Attention Is All You Need.**
- Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). [arXiv preprint arXiv:1706.03762.](https://arxiv.org/abs/1706.03762)

We introduce the article, the subject of our fact graph, using the URL of the paper on `arxiv`:

```turtle
    <https://arxiv.org/abs/1706.03762> 

        a schema:ScholarlyArticle ;

        schema:name "Attention is all you need" .
```
The authors of the paper deserve some attention:

We have a few choices; we'll add a `schema:author` because it's widely understood:

```turtle
    <https://arxiv.org/abs/1706.03762> 
        schema:author <https://fact.claims/demo/VaswaniAshish>,
                    <https://fact.claims/demo/ShazeerNoam>,
                    <https://fact.claims/demo/ParmarNiki>,
                    <https://fact.claims/demo/UszkoreitJakob>,
                    <https://fact.claims/demo/JonesLlion>,
                    <https://fact.claims/demo/GomezAidanN>,
                    <https://fact.claims/demo/KaiserŁukasz>,
                    <https://fact.claims/demo/PolosukhinIllia> .
```

The `fact.claims` protocol specifies to use PROV-O `wasAttributedTo` for more formal attribution and provenance.

Let's reuse the same author URLs because we're talking about the same authors:

```turtle
    prov:wasAttributedTo <https://fact.claims/demo/VaswaniAshish>,
                 <https://fact.claims/demo/ShazeerNoam>,
                 <https://fact.claims/demo/ParmarNiki>,
                 <https://fact.claims/demo/UszkoreitJakob>,
                 <https://fact.claims/demo/JonesLlion>,
                 <https://fact.claims/demo/GomezAidanN>,
                 <https://fact.claims/demo/KaiserŁukasz>,
                 <https://fact.claims/demo/PolosukhinIllia> .
```

We can expand our primary resource with some additional context, like the journal, publisher, and a link to `Wikipedia` for good measure:

```turtle
    <https://arxiv.org/abs/1706.03762> 
        schema:datePublished "2017-06-12" ;
        schema:publisher "arXiv" ;
        schema:isPartOf <https://arxiv.org/> ;
        skos:related <https://en.wikipedia.org/wiki/Transformer_(machine_learning_model)> ;
```

We've referenced some resources, and we can include some basic facts about them too:

```turtle
    <https://en.wikipedia.org/wiki/Transformer_(machine_learning_model)>
        a schema:WebPage ;
        schema:name "Transformer (machine learning model)" .
```

----
Since we're using RDF Turtle, we must define our prefixes before we refer to them:

```turtle
    @prefix schema: <https://schema.org/> .
    @prefix prov: <http://www.w3.org/ns/prov#> .
    @prefix skos: <http://www.w3.org/2004/02/skos/core#> .
    @prefix trust: <https://fact.claims/v0/trust#> .
    @prefix cito: <http://purl.org/spar/cito/> .
    @prefix w3cvc: <https://www.w3.org/2018/credentials#> .

    # Article and Authors
    <https://arxiv.org/abs/1706.03762> 
        a schema:ScholarlyArticle ;
        schema:name "Attention is all you need" ;
        schema:author <https://fact.claims/demo/VaswaniAshish>,
                    <https://fact.claims/demo/ShazeerNoam>,
                    <https://fact.claims/demo/ParmarNiki>,
                    <https://fact.claims/demo/UszkoreitJakob>,
                    <https://fact.claims/demo/JonesLlion>,
                    <https://fact.claims/demo/GomezAidanN>,
                    <https://fact.claims/demo/KaiserŁukasz>,
                    <https://fact.claims/demo/PolosukhinIllia> ;
        prov:wasAttributedTo <https://fact.claims/demo/VaswaniAshish>,
                    <https://fact.claims/demo/ShazeerNoam>,
                    <https://fact.claims/demo/ParmarNiki>,
                    <https://fact.claims/demo/UszkoreitJakob>,
                    <https://fact.claims/demo/JonesLlion>,
                    <https://fact.claims/demo/GomezAidanN>,
                    <https://fact.claims/demo/KaiserŁukasz>,
                    <https://fact.claims/demo/PolosukhinIllia> ;
        schema:datePublished "2017-06-12" ;
        schema:publisher "arXiv" ;
        schema:isPartOf <https://arxiv.org/> ;
        skos:related <https://en.wikipedia.org/wiki/Transformer_(machine_learning_model)> .

    # Verifiable Credentials
    <https://arxiv.org/abs/1706.03762>
        a w3cvc:VerifiableCredential ;
        cito:citesAsDataSource <https://arxiv.org/abs/1706.03762> .

    # Wikipedia Resource
    <https://en.wikipedia.org/wiki/Transformer_(machine_learning_model)>
        a schema:WebPage ;
        schema:name "Transformer (machine learning model)" .
```
