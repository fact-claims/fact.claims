# Fact Claims: Towards Trustworthy AI


We need a simple solution that is easy to implement, based on existing standards, best practices, is future-ready and trustworthy.

- The [fact claims RFC](../rfc/draft.md) proposes a methodology for leveraging the [InterPlanetary File System (IPFS)](https://ipfs.io/), [Linked Data (JSON-LD)](https://json-ld.org/), and [Smart Contracts](https://ethereum.org/) into a trusted web of fact graphs.

---

## 1. Problem Statement


Addressing the challenges associated with untrusted, raw data lacking ethical or commercial context requires comprehensive approaches that encompass data integrity, attribution, ethical considerations, legal compliance, contextual understanding, bias mitigation, and transparency. 

In 2024, the Internet started buzzing with AI agents, crawlers and language models all vying for their moment of glory. 

We've learned that they can be clever, creative, productive and resourceful, but also lacking in integrity, factual grounding and attribution.

As with all new technologies, new challenges also emerged. Crawlers struggle to knowing what content is available, whether it has permissive licensing and so on.

These considerations apply to AI development and deployment processes so that society benefits as a whole.

1. **Data Integrity and Reliability**: Without proper mechanisms in place to ensure data integrity, AI systems may encounter inaccuracies, inconsistencies, or even deliberate misinformation in the raw data they process. This can lead to flawed outputs and unreliable decision-making processes.

2. **Attribution and Trustworthiness**: Raw data often lacks clear attribution, making it difficult for AI systems to determine the source or credibility of the information. This lack of trustworthiness can result in AI systems incorporating unreliable or biased data into their models, leading to skewed outcomes.

3. **Ethical Considerations**: Raw data may contain sensitive or controversial content that raises ethical concerns. AI systems need to be equipped with ethical frameworks and guidelines to handle such data responsibly, ensuring that they do not perpetuate harmful biases or stereotypes.

4. **Legal and Regulatory Compliance**: Data lacking ethical or commercial context may also raise legal and regulatory issues, particularly in terms of data privacy, intellectual property rights, and content licensing. AI systems must navigate these complexities to ensure compliance with relevant laws and regulations.

5. **Contextual Understanding**: Without proper contextual information, AI systems may struggle to interpret and analyze raw data accurately. Ethical and commercial context provides valuable insights into the intended meaning, relevance, and implications of the data, enabling more informed decision-making.

6. **Bias and Fairness**: Raw data, especially when unfiltered, may inadvertently reflect societal biases or prejudices. AI systems trained on such data risk perpetuating or exacerbating these biases in their outputs, leading to unfair or discriminatory outcomes.

7. **Transparency and Explainability**: Understanding the ethical and commercial context of data is essential for ensuring transparency and explainability in AI systems. Stakeholders need to understand how decisions are made and what factors influence AI-generated outputs to trust and effectively use these systems.

## 2. Project Objectives

2.1. **Ensure Trustworthiness**: Ensure that the facts are trustworthy and immutable - fostering trust among stakeholders.

2.2. **Semantic Interoperability**: Incorporating standards such as PROV-O, SKOS, and VOID annotations facilitates semantic interoperability. Enable seamless information exchange and collaboration across diverse domains and platforms.

2.3. **Knowledge Curation**: The fact graph should serve as a structured repository for organizing and discovering relevant facts by adhering to standards, ontologies and vocabularies, such as PROV-O, SKOS, and VOID.

2.4. **Transparent and Reproducible**: By capturing provenance information using PROV-O, the fact graph enables transparent and reproducible research. Auditors can trace the lineage of data and assertions, understand how they were derived or obtained, and verify their authenticity.

2.5. **Reasoning and Analysis**: The fact graph facilitates automated reasoning and analysis. By representing data and relationships using standardized RDF, tools can infer new knowledge, detect patterns, and derive insights.

2.6. **Privacy and Security**: While promoting openness and transparency maintain privacy and security of sensitive information. Access control is part of the graph, identifying confidential data, authorized agents, privacy regulations and ethical standards.

2.7. **Collaboration and Sharing**: By providing APIs, query interfaces, and visualization tools, the graph enables seamless collaboration and communication, accelerating the pace of discovery and innovation.

## 3 Fact Claims Architecture

The fact graph is represented as linked data serialized as JSON-LD. 

At runtime, URLs referenced within the JSON-LD, especially those residing outside the IPFS subgraph, may be de-referenced at the agent's discretion. 

Additionally, for enhanced human readability, one could publish XHTML documents embedded with JSON-LD, including the millions of sites that already support SEO rich snippets. 

It's crucial to ensure that data referenced on the public internet is under your custodianship, is trustworthy and consistently available. 

Unlike the IPFS fact claims, Internet-sourced facts need not be immutable, so that dynamic observations may be ingested and inferred by the agent at its discretion. 

This approach enables seamless integration of structured data and semantic annotations within HTML documents, fostering interoperability and facilitating machine-readable interpretation.

The technical architecture for fact claims consists of several key components:

- **IPFS Network:** A peer-to-peer network of nodes running IPFS software, facilitating the storage and retrieval of files using content-based addressing.
- **Fact Graph:** A graph data structure representing interconnected fact graphs and claims within the decentralized system.
- **Trust Chains:** Blockchain smart contracts manage governance of an immutable custody chain of fact graphs.
- **Smart Agents:** Interface with the IPFS network and Internet for storage, retrieval, curation, inference, visualization and publication of fact graphs.

```mermaid
flowchart TB
        subgraph "Example Fact Graph"
            Regulatory[Regulatory Compliance] --> Supply_Chain[Supply Chain]
            Supply_Chain --> Products[Product Development]
            RnD[R&D Efforts] --> Research[Market Research]
            Research --> Innovation[Product Innovation]
            Innovation --> Sustainability[Sustainability Practices]
            Innovation --> Products
            Innovation --> Regulatory
            Innovation --> Supply_Chain
            Innovation --> Tokenomics[Subscription Models]
            Legal[Legal Framework] --> RnD
            Compliance[Compliance Auditing] --> Auditing[Auditing Processes]
            Tokenomics <--> Auditing
        end
```
## 4. Solution Domains

- AI Answer Engines require a new model for finding trusted facts.
- Trust is paramount in assessing the credibility of information sources.
- Fact claims in RDF format, enriched with metadata, serve as foundational elements.
- Verifiable assertions backed by cryptographic proofs and smart contracts ensure trust.
- Real-time algorithms verify dynamic and evolving fact claims.
- Semantic coherence and trust supersede traditional SEO practices.

Here are the short solution statements with links:

| Solution Domain  | Use Cases |
|---|---|
| Ecommerce | - Standardize product, event, service, offer descriptions with [Schema.org](https://schema.org/Product), [Events](https://schema.org/Event), [Services](https://schema.org/Service), [Offers](https://schema.org/Offer), [Loans/Credit](https://schema.org/LoanOrCredit) and more - Leverage [GoodRelations](https://www.heppresearch.com/goodrelations/index.html) ontology for rich ecommerce data |
| Content Creators | - Employ metadata standards like [Dublin Core Metadata Initiative](https://www.dublincore.org/specifications/dublin-core/) and [IPTC Photo Metadata](https://iptc.org/standards/photo-metadata/) for organized content management - Utilize [Creative Commons licenses](https://creativecommons.org/) for content licensing |
| Education | - Ensure interoperability and metadata consistency through [IMS Global Learning Consortium standards](https://www.imsglobal.org/) and [SCORM](https://scorm.com/scorm-explained/) - Enhance resource discovery with [Learning Resource Metadata Initiative (LRMI)](https://www.imsglobal.org/activity/lrmi) and [CiTo (Citations)](https://sparontologies.github.io/cito/current/cito.html) |
| Regulatory Compliance | - Meet regulatory requirements with [XBRL](https://www.xbrl.org/), [FIBO](https://spec.edmcouncil.org/fibo/), and [FIGREGONT](https://finregont.com/) - Ensure transparency and traceability using standards like [PROV-O](https://www.w3.org/TR/prov-o/) |
| Financial Auditing  | - Facilitate financial data exchange with [XBRL](https://www.xbrl.org/) - Ensure data provenance and auditability with [PROV-O](https://www.w3.org/TR/prov-o/) |
| Supply Chain Management | - Ensure traceability and interoperability in supply chain processes with [GS1 Standards](https://www.gs1.org/standards) - Utilize [PROV-O](https://www.w3.org/TR/prov-o/) for tracking provenance and changes |
| Healthcare Data Management  | - Ensure interoperability in healthcare systems with standards like [HL7](https://www.hl7.org/) and [FHIR](https://www.hl7.org/fhir/) - Utilize [RDF](https://www.w3.org/RDF/) for semantic representation of healthcare data |
| Intellectual Property | - Define digital rights with [W3C ODRL](https://www.w3.org/TR/odrl/) for intellectual property management |
| Research & Innovation  | - Track research activities and relationships with [PROV-O](https://www.w3.org/TR/prov-o/) and [SKOS](https://www.w3.org/2004/02/skos/) - Cite and reference resources using [CiTo (Citations)](https://sparontologies.github.io/cito/current/cito.html) |
| Environmental Sustainability  | - Model environmental data using [OGC SOSA/SSN](https://www.w3.org/TR/vocab-ssn/) for web best practices |
| Legal Contracts and Agreements  | - Define digital rights and permissions using [W3C ODRL](https://www.w3.org/TR/odrl/) |
| Identity and Access Management  | - Enable verifiable credentials and decentralized identifiers with [W3C VC](https://www.w3.org/TR/vc-data-model/) and [DID](https://www.w3.org/TR/did-core/) |
| Energy Trading and Grid Management  | - Standardize energy market information exchange with [IEC CIM](https://www.iec.ch/cim/) |
| Credential Verification | - Issue and verify credentials using [W3C VC](https://www.w3.org/TR/vc-data-model/) and [Open Badges](https://www.imsglobal.org/sites/default/files/Badges/OBv2p0/index.html) |
| Asset Tokenization and Management | - Define fungible and non-fungible assets with [ERC-20](https://eips.ethereum.org/EIPS/eip-20) and [ERC-721](https://eips.ethereum.org/EIPS/eip-721) |
| News and Data-driven Narratives | - Standardize news content and data exchange with [NewsML-G2](https://iptc.org/standards/newsml-g2/) and [NITF](https://iptc.org/standards/nitf/) - Utilize semantic web standards like [RDF](https://www.w3.org/RDF/) and [Schema.org](https://schema.org/) for structured data representation and discovery |
## 5. References

- Benet, J. (2014). IPFS - Content Addressed, Versioned, P2P File System. [arXiv:1407.3561.](https://arxiv.org/abs/1407.3561).
- IPFS Documentation. [docs.ipfs.io](https://docs.ipfs.io/).
- RDF 1.1 Primer. [w3.org/TR/rdf11-primer/](https://www.w3.org/TR/rdf11-primer/).
- JSON-LD 1.1. [w3.org/TR/json-ld11/](https://www.w3.org/TR/json-ld11/).
- ERC-20 Token Standard. [ethereum.org/.../erc-20/](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/).
- Ethereum Smart Contracts. [ethereum.org/.../smart-contracts/](https://ethereum.org/en/developers/docs/smart-contracts/).
- Trustworthy Agentic Collaboration. [fact.claims](https://fact.claims/rfc/).

## 6. Next Steps

Adopting a standardized approach for representing factual claims enhances transparency, interoperability, and trust among participants. 

By adhering to semantic standards, ontologies, and validation mechanisms, we can effectively collaborate and offer value, innovation and knowledge sharing.

We hope our  methodology paves the way for a future where collaboration thrives securely and reliably.

- [Smart Trust](../trust/)
- [Case Studies](..`/usecase/)
- [RFC v0.4 Draft](../rfc/draft.md)
