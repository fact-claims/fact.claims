---
layout: page
---
# Technical SEO for AI

We know structured data plays a crucial role in search engine relevance, prominence and visibility. 

JSON-LD allows webmasters to embed structured data directly into their HTML code, these are `published` facts.

By implementing JSON-LD, webmasters can enhance their website's SEO performance **and** curate content for AI. 

These rich snippets can include additional information such as organizations, articles and products.

They provide intelligent agents with more relevant, informative and crawl-able search results.

SEO is rarely quality data - `fact.claims` is a simple solution to reduce the GIGO (Garbage-in, Garbage-out).

### Implemention

A modern SEO-optimized website will likely already host `published` facts, in the form of SEO snippets.

However, to be considered `grounded` our [fact.claims](/fact.claims) must be pinned to an `ipfs://` URL and become [immutable](/claim/ipfs).

**For that reason, it's wise to take a little more care over the facts we declare:**

Let's start with`schema.org`- they host definitions for organizations, events, people, articles, products and much more. 

1. **Organization Markup:**
   ```turtle
   @prefix schema: <http://schema.org/> .
   
   <https://www.example.com/> a schema:Organization ;
       schema:name "Example Company" ;
       schema:url "https://www.example.com/" ;
       schema:logo "https://www.example.com/logo.png" ;
       schema:contactPoint [
           a schema:ContactPoint ;
           schema:telephone "+1-123-456-7890" ;
           schema:contactType "customer service"
       ] ;
       schema:sameAs <https://www.facebook.com/example>, <https://www.twitter.com/example> .
   ```

2. **Article Markup:**
   ```turtle
   @prefix schema: <http://schema.org/> .
   
   <https://www.example.com/article> a schema:WebPage ;
       schema:mainEntity [
           a schema:Article ;
           schema:headline "Example Article Headline" ;
           schema:description "Brief description of the article." ;
           schema:datePublished "2022-04-01"^^schema:Date ;
           schema:dateModified "2022-04-01"^^schema:Date ;
           schema:author [
               a schema:Person ;
               schema:name "John Doe"
           ] ;
           schema:publisher [
               a schema:Organization ;
               schema:name "Example Publisher" ;
               schema:logo [
                   a schema:ImageObject ;
                   schema:url "https://www.example.com/publisher-logo.png"
               ]
           ]
       ] .
   ```

3. **Product Markup:**
```turtle
   @prefix schema: <http://schema.org/> .
   
   <https://www.example.com/product> a schema:Product ;
       schema:name "Example Product" ;
       schema:image "https://www.example.com/product-image.jpg" ;
       schema:description "Description of the product." ;
       schema:brand [
           a schema:Brand ;
           schema:name "Example Brand"
       ] ;
       schema:offers [
           a schema:Offer ;
           schema:priceCurrency "USD" ;
           schema:price "100.00"^^schema:Float ;
           schema:availability schema:InStock ;
           schema:seller [
               a schema:Organization ;
               schema:name "Example Seller"
           ]
       ] .
```

4. **Potential Action:**
```turtle

@prefix schema: <http://schema.org/> .

<https://www.example.com/action> a schema:Action ;
    schema:name "Example Action" ;
    schema:description "Description of the action." ;
    schema:actionStatus schema:ActiveActionStatus ;
    schema:potentialAction [
        a schema:CommunicateAction ;
        schema:actionOption "Call" ;
        schema:expectsAcceptanceOf [
            a schema:Offer ;
            schema:name "Example Offer"
        ]
    ] .
```
