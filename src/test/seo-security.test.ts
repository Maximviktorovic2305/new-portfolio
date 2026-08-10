import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = process.cwd();
const fromRoot = (...segments: string[]) => join(projectRoot, ...segments);
const html = readFileSync(fromRoot("index.html"), "utf8");
const document = new DOMParser().parseFromString(html, "text/html");

interface HeaderEntry {
  key: string;
  value: string;
}

interface HeaderRule {
  source: string;
  headers: HeaderEntry[];
}

interface ServeConfig {
  directoryListing: boolean;
  rewrites: { source: string; destination: string }[];
  symlinks: boolean;
  headers: HeaderRule[];
}

const serveConfig = JSON.parse(readFileSync(fromRoot("serve.json"), "utf8")) as ServeConfig;

describe("SEO metadata", () => {
  it("publishes canonical Open Graph and Twitter metadata", () => {
    expect(document.documentElement.lang).toBe("ru");
    expect(document.title).toContain("Максим Викторович");
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://itmyportfolio.site/",
    );
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute("content")).toBe(
      "https://itmyportfolio.site/og-cover.jpg",
    );
    expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute("content")).toBe(
      "summary_large_image",
    );
  });

  it("provides valid structured data and crawler files", () => {
    const script = document.querySelector('script[type="application/ld+json"]');
    const structuredData = JSON.parse(script?.textContent ?? "") as { "@graph": unknown[] };
    expect(structuredData["@graph"]).toHaveLength(2);

    const robots = readFileSync(fromRoot("public", "robots.txt"), "utf8");
    const sitemap = readFileSync(fromRoot("public", "sitemap.xml"), "utf8");
    const manifest = JSON.parse(readFileSync(fromRoot("public", "site.webmanifest"), "utf8")) as {
      lang: string;
      start_url: string;
    };
    expect(robots).toContain("Sitemap: https://itmyportfolio.site/sitemap.xml");
    expect(sitemap).toContain("<loc>https://itmyportfolio.site/</loc>");
    expect(manifest).toMatchObject({ lang: "ru", start_url: "/" });
    expect(statSync(fromRoot("public", "og-cover.jpg")).size).toBeGreaterThan(100_000);
  });
});

describe("static server security policy", () => {
  it("disables directory and symlink traversal", () => {
    expect(serveConfig.directoryListing).toBe(false);
    expect(serveConfig.rewrites).toContainEqual({ source: "**", destination: "/index.html" });
    expect(serveConfig.symlinks).toBe(false);
  });

  it("allows the inline JSON-LD only by its exact hash", () => {
    const scriptContent = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/u.exec(html)?.[1];
    expect(scriptContent).toBeDefined();
    const hash = createHash("sha256")
      .update(scriptContent ?? "")
      .digest("base64");
    const globalHeaders = serveConfig.headers.find(({ source }) => source === "**")?.headers ?? [];
    const csp = globalHeaders.find(({ key }) => key === "Content-Security-Policy")?.value;

    expect(csp).toContain(`script-src 'self' 'sha256-${hash}'`);
    expect(csp).toContain("https://mc.yandex.ru");
    expect(csp).toContain("https://yastatic.net");
    expect(csp).toContain("frame-ancestors 'self' https://metrika.yandex.ru https://analytics.yandex.ru");
    expect(csp).not.toContain("frame-ancestors *");
    expect(csp).not.toContain("'unsafe-eval'");
    expect(globalHeaders.find(({ key }) => key === "X-Frame-Options")).toBeUndefined();
  });
});
