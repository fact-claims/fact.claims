## Introducing Trustworthy AI

Ensuring the integrity and trustworthiness of our AI systems is very important. 

Automated by generative AI, mediocre web content is undergoing exponential growth. 

Now, if our future AI is trained on this - we anticipate increasingly lower-quality answers and halluciations.

## The key principles governing fact claims:

- **Valid Facts:** To be valid, a fact must include `prov:wasAssociatedWith` and `prov:wasGeneratedBy`.
- **Traceable Facts:** Found by following a path via `prov:wasAssociatedWith` and/or `prov:wasGeneratedBy`.
- **Grounded Facts:** A set of grounded facts stored in an immutable document and stored using `ipfs://`.
- **Notarized Facts:** A notarized fact is grounded by an `ethereum://` address owned by a trusted smart contract.
- **Published Facts:** A published fact can use either `IPFS` or `HTTPS` protocols.


## Learn more ...

### [Trustworthy AI](./trust/index.md)

### [White Paper](./paper/index.md)

### [RFC v0.4 DRAFT](./rfc/draft.md)

## [How-to guides](./howto/index.md)

### [Learn the basics](./howto/begin.md)

### [Publish your first facts](./howto/fact.claims.md)

### [Curating and crawling](./howto/crawling.md)