---
layout: page
---

# Publish fact.claims on your website:

A claimed website contains a set of facts that identify the site, it's resources, concepts, licensing and other statements as required.

The key principles governing fact claims:

- **Valid Facts:** To be valid, a fact must include `prov:wasAssociatedWith` and `prov:wasGeneratedBy`.
- **Traceable Facts:** Found by following a path via `prov:wasAssociatedWith` and/or `prov:wasGeneratedBy`.
- **Grounded Facts:** A set of grounded facts stored in an immutable document and stored using `ipfs://`.
- **Notarized Facts:** A notarized fact is grounded by an `ethereum://` address owned by a trusted smart contract.
- **Published Facts:** A published fact can use either `IPFS` or `HTTPS` protocols.

### Establish trust in a website's claims

Follow these steps:

1. **Create a `fact.claims` File:** 
    - Generate a file named fact.claims containing your [RDF statements](/begin).
    - The `fact.claims` file can choose to use JSON-LD, RDF Turtle, or N3 serialization formats.
   
2. **Save it to the Root of Your Website:** 
    - Place the `fact.claims` file at the root of your website
    - Make it accessible via a URL such as `https://example.com/fact.claims` or `https://fact.claims/fact.claims`.

3. **Publish to IPFS:** 
    - Submit your `fact.claims` file to `https://fact.claims/ipfs/` 
    - Obtain the IPFS hash for your `fact.claims` file.
    - Your facts are now published as a tamper-proof fact web.

4. **Notarize Your `fact.claims`:** 
    - It's recommend, but not necessary to notarize your `fact claims`.
    - A notary must  validate, sign, then catalog the statements
    - Finally, the notary will publish the results, to it'w own `ipfs://` link, that references your `fact.claims`, on the blockchain.

5. **Link back to your notarized facts**

    - Include a link (on your home page or elsewhere) to your notarized `ipfs://` JSON-LD file
    - This allows standard crawlers, include search engines, to find them.

```html
    <script type="application/ld+json" src="ipfs://{notarized-fact-claims}"/>
```

5. **Discovering and trusting new facts:**
    - Any agent (or search engine) can [crawl the facts](/crawling) as they are simply standard JSON-LD rich snippets. 
    - A smart observer can listen to `FactClaim` events on the blockchain, to discover new notarized facts.
    - All fact claims are transparently traceable backwards to their originating owner and primary sources.  
