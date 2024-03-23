# Fact Claims

Ensuring the integrity and trustworthiness of our AI systems necessitates a network of dependable facts. 

Recently, mediocre web content has experienced exponential growth - automated by generative AI. 

Now, if our future AI is trained on this - we will see increasingly lower-quality halluciations.

## The key principles governing fact claims:

- **Valid Facts:** To be valid, a fact must include `prov:wasAssociatedWith` and `prov:wasGeneratedBy`.
- **Traceable Facts:** Found by following a path via `prov:wasAssociatedWith` and/or `prov:wasGeneratedBy`.
- **Grounded Facts:** A set of grounded facts stored in an immutable document and stored using `ipfs://`.
- **Notarized Facts:** A notarized fact is grounded by an `ethereum://` address owned by a trusted smart contract.
- **Published Facts:** A published fact can use either `IPFS` or `HTTPS` protocols.

## Learn more ...

### [Trustworthy AI](./www/content/trust/index.md)

### [White Paper](./www/content/paper/index.md)

### [RFC v0.4 DRAFT](./www/content/rfc/draft.md)

### [How-to Guides](./www/content/howto/index.md)

### [Learn the basics](./www/content/howto/begin.md)

### [Publish your first facts](./www/content/howto/fact.claims.md)

### [Curating and crawling](./www/content/howto/crawling.md)