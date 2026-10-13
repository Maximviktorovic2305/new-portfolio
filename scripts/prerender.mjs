import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer } from "vite";

const origin = "https://itmyportfolio.site";
const routes = ["/", "/private-policy", "/cookie-policy", "/data-consent", "/user-agreement"];
const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character],
  );
const template = await readFile("dist/index.html", "utf8");
const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: "custom" });
try {
  const { renderPage } = await vite.ssrLoadModule("/src/app/prerender.tsx");
  for (const route of routes) {
    const page = renderPage(route);
    const url = origin + (route === "/" ? "/" : route);
    let html = template.replace('<div id="root"></div>', `<div id="root">${page.html}</div>`);
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(page.title)}</title>`);
    html = html.replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`);
    html = html.replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`);
    html = html.replace(
      /(<meta\s+(?:name="(?:description|twitter:description)"|property="og:description")\s+content=")[^"]*/g,
      (_, start) => start + escape(page.description),
    );
    html = html.replace(
      /(<meta\s+(?:name="twitter:title"|property="og:title")\s+content=")[^"]*/g,
      (_, start) => start + escape(page.title),
    );
    const directory = resolve("dist", route.slice(1));
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, "index.html"), html);
  }
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${origin}${route}</loc></url>`).join("")}</urlset>\n`,
  );
  console.log(`Prerendered ${routes.length} pages with route-specific metadata.`);
} finally {
  await vite.close();
}
