const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://v4por.netlify.app';
const rootDir = path.join(__dirname, '..');
const dataPath = path.join(rootDir, 'data.js');
const sitemapPath = path.join(rootDir, 'sitemap.xml');

function slugifyProductName(name) {
    return String(name || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function getProductSlug(product) {
    if (product.slug) return product.slug;
    return `${slugifyProductName(product.name)}-${product.id}`;
}

function loadProducts() {
    const content = fs.readFileSync(dataPath, 'utf8');
    const source = content.replace(/^window\.VAPOR_PRODUCTS\s*=\s*/, '').trim().replace(/;\s*$/, '');
    // data.js uses JS object syntax, not strict JSON.
    return Function(`return (${source});`)();
}

function writeUrl(loc, changefreq, priority) {
    return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
}

const products = loadProducts();
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
xml += writeUrl(`${SITE_URL}/`, 'weekly', '1.0');
xml += writeUrl(`${SITE_URL}/products.html`, 'weekly', '0.9');
xml += writeUrl(`${SITE_URL}/about.html`, 'monthly', '0.7');

products.forEach((product) => {
    const slug = getProductSlug(product);
    xml += writeUrl(`${SITE_URL}/product/${slug}`, 'weekly', '0.8');
});

xml += '</urlset>\n';
fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log(`Sitemap updated with ${products.length + 3} URLs.`);
