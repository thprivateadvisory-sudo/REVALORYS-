// Rend flyer.html en PDF (fond perdu 3 mm) + aperçus PNG au format fini.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const dir = __dirname;
  const b = await chromium.launch();
  const pg = await b.newPage({ deviceScaleFactor: 2 });
  await pg.goto('file://' + path.join(dir, 'flyer.html'), { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.pdf({ path: path.join(dir, 'flyer-A5-revalorys-fond-perdu-3mm.pdf'),
    width: '154mm', height: '216mm', printBackground: true, preferCSSPageSize: true });
  await pg.addStyleTag({ content: 'html,body{background:#fff}.page{margin:0!important;box-shadow:none!important}' });
  await pg.setViewportSize({ width: 700, height: 1700 });
  for (const [i, name] of ['recto', 'verso'].entries()) {
    const box = await pg.locator('.page').nth(i).boundingBox();
    const mm = box.width / 154;
    await pg.screenshot({ path: path.join(dir, `apercu-${name}.png`),
      clip: { x: box.x + 3 * mm, y: box.y + 3 * mm, width: 148 * mm, height: 210 * mm } });
  }
  await b.close();
  console.log('OK');
})();
