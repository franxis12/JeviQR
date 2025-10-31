import { useEffect } from "react";

const defaultMetadata = {
  title: "JeviQR | Custom QR Code Generator",
  description:
    "JeviQR is the all-in-one platform to create, customize, and track dynamic QR codes with real-time analytics.",
  keywords:
    "JeviQR, QR code generator, custom QR codes, dynamic QR codes, QR analytics",
  url: "https://jeviqr.com/",
  image: "https://jeviqr.com/og-image.jpg",
  type: "website",
  twitterCard: "summary_large_image",
};

function setMetaTag(attribute, name, content) {
  if (!content) {
    return;
  }

  const selector =
    attribute === "property"
      ? `meta[property="${name}"]`
      : `meta[name="${name}"]`;

  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(url) {
  if (!url) {
    return;
  }

  let link = document.head.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", url);
}

function setJsonLd(json) {
  const scriptId = "seo-jsonld";
  let script = document.head.querySelector(`#${scriptId}`);

  if (!json) {
    if (script) {
      script.remove();
    }
    return;
  }

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = scriptId;
    document.head.appendChild(script);
  }

  script.textContent = json;
}

function SEO({
  title,
  description,
  keywords,
  url,
  image,
  type = "website",
  twitterCard,
  jsonLd,
}) {
  const meta = { ...defaultMetadata };

  if (title) meta.title = title;
  if (description) meta.description = description;
  if (keywords) meta.keywords = keywords;
  if (url) meta.url = url;
  if (image) meta.image = image;
  if (type) meta.type = type;
  if (twitterCard) meta.twitterCard = twitterCard;

  const schema = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    document.title = meta.title;
    setMetaTag("name", "description", meta.description);
    setMetaTag("name", "keywords", meta.keywords);
    setMetaTag("property", "og:title", meta.title);
    setMetaTag("property", "og:description", meta.description);
    setMetaTag("property", "og:url", meta.url);
    setMetaTag("property", "og:type", meta.type);
    setMetaTag("property", "og:image", meta.image);
    setMetaTag("name", "twitter:card", meta.twitterCard);
    setMetaTag("name", "twitter:title", meta.title);
    setMetaTag("name", "twitter:description", meta.description);
    setMetaTag("name", "twitter:image", meta.image);
    setCanonical(meta.url);
    setJsonLd(schema);
  }, [
    meta.description,
    meta.image,
    meta.keywords,
    meta.title,
    meta.twitterCard,
    meta.type,
    meta.url,
    schema,
  ]);

  return null;
}

export default SEO;
