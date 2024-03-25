---
layout: page
---

# Publish fact.claims on your website:

A claimed website contains a set of facts that identify the site, it's resources, concepts, licensing and other statements as required.

The key principles governing fact claims:

- **Specific Facts:** To be valid, a fact must include `prov:wasAssociatedWith` and `prov:wasGeneratedBy`.
- **Traceable Facts:** Found by following a path via `prov:wasAssociatedWith` and/or `prov:wasGeneratedBy`.
- **Grounded Facts:** A set of grounded facts stored in an [immutable](/claim/ipfs) document and stored using `ipfs://`.
- **Notarized Facts:** A notarized fact is grounded by an `ethereum://` address owned by a trusted smart contract.
- **Published Facts:** A published fact can use either `IPFS` or `HTTPS` protocols.

### Establish trust in a website's claims

Follow these steps:

1. **Create a `fact.claims` File:** 
    - Generate a file named fact.claims containing your [RDF statements](/begin).
    - The `fact.claims` file can choose to use JSON-LD, RDF Turtle, or N3 serialization formats.
   
2. **Save it to the Root of Your Website:** 
    - Place the `fact.claims` file at the root of your website
    - Make it accessible via a URL such as [https://fact.claims/fact.claims](/fact.claims).

3. **Notarize on IPFS:** 
    - It's recommend, but not necessary to notarize your `fact claims`.
    - Submit your `fact.claims` file to [https://fact.claims/example#](/claim/) for notarization.
    - Obtain the IPFS hash for your `fact.claims` file.
    - Your facts are now published as a tamper-proof record on the `fact web`.
    - Finally, the notary will publish your `ipfs://` link on the blockchain.

4. **Link to your notarized facts**

    - Include a link (on your home page or elsewhere) to your notarized `ipfs://` JSON-LD file
    - This allows standard crawlers, include search engines, to find them.

```html
    <script type="application/ld+json" src="ipfs://{notarized-fact-claims}"/>
```

5. **Discovering and trusting new facts:**
    - Any agent (or search engine) can [crawl the facts](/crawling) as they are simply standard JSON-LD rich snippets. 
    - A smart observer can listen to `FactClaim` events on the blockchain, to discover new notarized facts.
    - All fact claims are transparently traceable backwards to their originating owner and primary sources.  
