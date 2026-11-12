UPDATE articles SET body = REPLACE(
  body,
  '<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://riggamer.com/arknights-endfield-review#article",
      "headline": "Arknights: Endfield Review 2026 — Is This the Best Strategy RPG on PC?",
      "description": "Full review of Arknights: Endfield on PC (2026). Gameplay, story, gacha system, F2P value, graphics and final verdict with Score RIGGAMER.",
      "author": {
        "@type": "Person",
        "name": "Dr. Vance",
        "url": "https://riggamer.com/authors/dr-vance"
      },
      "publisher": {
        "@type": "Organization",
        "name": "RIGGAMER",
        "logo": {
          "@type": "ImageObject",
          "url": "https://riggamer.com/media/riggamer-logo.webp"
        }
      },
      "datePublished": "2026-11-07",
      "dateModified": "2026-11-07",
      "image": {
        "@type": "ImageObject",
        "url": "https://riggamer.com/media/arknights-endfield-review-2026.webp",
        "name": "Arknights Endfield Review 2026 PC",
        "description": "Arknights Endfield gameplay screenshot showing base building and combat on PC in 2026",
        "width": 1200,
        "height": 630
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://riggamer.com/arknights-endfield-review"
      }
    },',
  '<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Review", "Article"],
      "@id": "https://riggamer.com/reviews/arknights-endfield-review#article",
      "headline": "Arknights: Endfield Review 2026 — Is This the Best Strategy RPG on PC?",
      "description": "Full review of Arknights: Endfield on PC (2026). Gameplay, story, gacha system, F2P value, graphics and final verdict with Score RIGGAMER 7.7/10.",
      "author": {
        "@type": "Person",
        "name": "Dr. Vance",
        "url": "https://riggamer.com/authors/dr-vance"
      },
      "publisher": {
        "@type": "Organization",
        "name": "RIGGAMER",
        "logo": {
          "@type": "ImageObject",
          "url": "https://riggamer.com/media/riggamer-logo.webp"
        }
      },
      "datePublished": "2026-11-07",
      "dateModified": "2026-11-09",
      "image": {
        "@type": "ImageObject",
        "url": "https://riggamer.com/media/arknights-endfield-review-2026.webp",
        "name": "Arknights Endfield Review 2026 PC",
        "description": "Arknights Endfield gameplay screenshot showing base building and combat on PC in 2026",
        "width": 1200,
        "height": 630
      },
      "itemReviewed": {
        "@type": "VideoGame",
        "name": "Arknights: Endfield",
        "url": "https://store.steampowered.com/app/arknights-endfield",
        "operatingSystem": "Windows",
        "gamePlatform": "PC",
        "applicationCategory": "Game",
        "genre": ["Strategy RPG", "Free to Play", "Gacha"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "7.7",
        "bestRating": "10",
        "worstRating": "0",
        "reviewAspect": "Overall"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://riggamer.com/reviews/arknights-endfield-review"
      }
    },
    {
      "@type": "ImageObject",
      "url": "https://riggamer.com/media/arknights-endfield-review-2026.webp",
      "name": "Arknights Endfield Review 2026 — Endministrator on Talos-II",
      "description": "Arknights Endfield review 2026 PC gameplay combat and base building on Talos-II moon",
      "width": 1200,
      "height": 630
    },
    {
      "@type": "ImageObject",
      "url": "https://riggamer.com/media/arknights-endfield-base-building-gameplay.webp",
      "name": "Arknights Endfield Base Building Gameplay",
      "description": "Arknights Endfield base building mechanics on PC 2026 — production facilities on Talos-II",
      "width": 1200,
      "height": 630
    },
    {
      "@type": "ImageObject",
      "url": "https://riggamer.com/media/arknights-endfield-graphics-pc-performance-2026.webp",
      "name": "Arknights Endfield PC Graphics and Performance 2026",
      "description": "Arknights Endfield PC graphics quality and performance 2026 RTX — high settings benchmark",
      "width": 1200,
      "height": 630
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://riggamer.com/" },
        { "@type": "ListItem", "position": 2, "name": "Reviews", "item": "https://riggamer.com/reviews/" },
        { "@type": "ListItem", "position": 3, "name": "Arknights: Endfield Review 2026", "item": "https://riggamer.com/reviews/arknights-endfield-review" }
      ]
    },'
) WHERE slug = 'arknights-endfield-review';
