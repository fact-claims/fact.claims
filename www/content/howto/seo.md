## Technical SEO

We know structured data plays a crucial role in improving search engine visibility and enriching results with enhanced snippets. 

JSON-LD allows webmasters to embed structured data directly into their HTML code, these are published facts.

By implementing these JSON-LD structured data examples, webmasters can enhance their website's SEO performance and increase the likelihood of their content. 

These rich snippets can include additional information such as organization details, breadcrumbs, article summaries, and product details, providing users with more relevant and informative search results.

However, they are not renowned as reliable quality data.

With `fact.claims` we can improve and also attest to their trustworthiness using our [simple protocol](./begin.md).

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

2. **Breadcrumb Markup:**
   ```turtle
   @prefix schema: <http://schema.org/> .
   
   [] a schema:BreadcrumbList ;
       schema:itemListElement [
           a schema:ListItem ;
           schema:position 1 ;
           schema:name "Home" ;
           schema:item <https://www.example.com/>
       ], [
           a schema:ListItem ;
           schema:position 2 ;
           schema:name "Category" ;
           schema:item <https://www.example.com/category/>
       ], [
           a schema:ListItem ;
           schema:position 3 ;
           schema:name "Product" ;
           schema:item <https://www.example.com/category/product/>
       ] .
   ```

3. **Article Markup:**
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

4. **Product Markup:**
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

These Turtle representations capture the structured data examples for organization, breadcrumb list, article, and product, following the schema.org vocabulary.