// Baut index.html aus den einzelnen Abschnitten in /sections zusammen.
// Ausführen mit: node build.js
const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'sections');
const order = [
  'header.html',
  'hero.html',
  'ueber-uns.html',
  'leistungen.html',
  'standorte.html',
  'karriere.html',
  'kontakt.html',
  'footer.html',
];

const body = order
  .map((file) => fs.readFileSync(path.join(sectionsDir, file), 'utf8').trim())
  .join('\n\n');

const template = fs.readFileSync(path.join(__dirname, 'index.template.html'), 'utf8');
const html = template.replace('<!-- BODY -->', body);

fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log('index.html wurde aus /sections neu gebaut.');
