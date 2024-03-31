---
title: WebPage Claim
description: Tell us a little about your site
logoPosition: right
meta:
  goto: "/ai/render/website/"
openai:
  endpoint: /api/
template:
  "@type": ["fact:Claim"]
  "schema:name": "A WebPage Claim"
  "prov:wasGeneratedBy":
    "@id": "urn:fact.claim:website"
  "prov:wasAssociatedWith":
  - "@type": ["schema:WebPage"]
    "@id": "{{schema:url}}"
    "schema:name": "{{schema:name}}"
    "schema:license": "{{{$ schema:license}}}"
    "schema:description": "{{schema:description}}"
    "schema:url": "{{schema:url}}"
    "schema:image": "{{schema:image}}"
  "schema:contactPoint":
  - "@type": ["schema:ContactPoint"]
    "schema:address": "{{schema:address}}"
    "schema:telephone": "{{schema:telephone}}"
    "schema:email": "{{schema:email}}"
pages:
  - name: "publishing"
    elements:
      - type: "radiogroup"
        name: "publisher"
        title: "How will you publish you claims ?"
        isRequired: true
        choices:
          - value: "demo"
            text: "Demo / Don't publish"
            description: "Woot"
          - value: "dev"
            text: "Developer / Self hosting"
          - value: "ipfs"
            text: "Tamper-proof / Grounded"
          - value: "notary"
            text: "Notarized / Verifiable"
          - value: "token"
            text: "Monetized / Featured / Promoted"
      - type: "tagbox"
        name: "schema:license"
        title: "Select a license for your claims"
        isRequired: true
        choices:
          - value: https://wiki.creativecommons.org/wiki/public_domain
            text: "Public Domain"
          - value: "https://creativecommons.org/licenses/by/4.0/"
            text: "Creative Commons Attribution 4.0 International"
          - value: "https://creativecommons.org/licenses/by-sa/4.0/"
            text: "Creative Commons Attribution-ShareAlike 4.0 International"
          - value: "https://creativecommons.org/licenses/by-nc/4.0/"
            text: "Creative Commons Attribution-NonCommercial 4.0 International"
          - value: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
            text: "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International"
          - value: "https://creativecommons.org/licenses/by-nd/4.0/"
            text: "Creative Commons Attribution-NoDerivatives 4.0 International"
          - value: "https://creativecommons.org/licenses/by-nc-nd/4.0/"
            text: "Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International"
  - name: "describe"
    elements:
      - type: "text"
        name: "schema:name"
        title: "What is your website name?"
        isRequired: true
      - type: "textarea"
        name: "schema:description"
        title: "Please provide a brief description of your website."
        isRequired: true
      - type: "text"
        name: "schema:url"
        title: "What is your website URL?"
        isRequired: true
        validate:
          - type: url
            text: "A valid (https: or ipfs:) URL for your website"
  - name: "branding"
    elements:
      - type: "text"
        name: "schema:description"
        title: "Please describe your website for the record"
      - type: "email"
        name: "schema:author"
        title: "What is the email of the webmaster (will be redacted)?"
      - type: "text"
        name: "schema:copyrightHolder"
        title: "Who holds the copyright for your website content?"
---
## Claim a WebPage 

- A `fact` about a WebPage takes only a minute or so.
- Anyone can make a claim - praises it's service for example.
- Only the owner can `notarize` a WebPage claim.

