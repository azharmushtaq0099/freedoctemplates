const fs = require('fs');
const path = require('path');
const base = 'C:/Users/mastr/claude co/legal-docs/';
const domain = 'https://www.freedoctemplates.xyz';
const today = new Date().toISOString().split('T')[0];

// collect all html files
var files = fs.readdirSync(base).filter(f => f.endsWith('.html') && !f.startsWith('_'));

var urls = files.map(function(f) {
  var slug = f.replace('.html','');
  var loc = slug === 'index' ? domain + '/' : domain + '/' + slug;
  var priority = slug === 'index' ? '1.0' :
    ['lease-agreement-template','bill-of-sale-template','power-of-attorney-template','nda-template','invoice-template','llc-operating-agreement-template'].includes(slug) ? '0.9' :
    slug.includes('-') && (slug.endsWith('-lease-agreement-template') || slug.endsWith('-bill-of-sale-template') || slug.endsWith('-power-of-attorney-template')) ? '0.7' : '0.8';
  return '  <url>\n    <loc>'+loc+'</loc>\n    <lastmod>'+today+'</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>'+priority+'</priority>\n  </url>';
});

var xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.join('\n')+'\n</urlset>';
fs.writeFileSync(base + 'sitemap.xml', xml);
console.log('sitemap ok —', urls.length, 'URLs');

// also write robots.txt
fs.writeFileSync(base + 'robots.txt', 'User-agent: *\nAllow: /\nSitemap: '+domain+'/sitemap.xml\n');
console.log('robots.txt ok');
