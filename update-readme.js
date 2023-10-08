import fs from 'fs/promises';
import Parser from 'rss-parser';
const parser = new Parser();
 
try {
  // Get three latest posts from my blog's RSS feed
  const { items } = await parser.parseURL('https://taller.luismita.com/b.rss');
  const { itemslib } = await parser.parseURL('https://libialany.github.io/feed.xml');

  let updates = `<!-- start latest posts looper -->\n`;
  for (let i = 0; i < 3; i++) {
    const { link, title } = items[i];
    const row = `- [${title}](${link})\n`;

    console.log(`Post #${i + 1} found. Title: ${title} Link: ${link}\n`);
    updates = updates.concat(row);
  }
  updates = updates.concat('<!-- end latest posts looper -->');


  updates2 = `<!-- start latest posts lib -->\n`;
  for (let i = 0; i < 3; i++) {
    const { link, title } = itemslib[i];
    const row = `- [${title}](${link})\n`;

    console.log(`Post #${i + 1} found. Title: ${title} Link: ${link}\n`);
    updates2 = updates2.concat(row);
  }
  updates2 = updates2.concat('<!-- end latest posts lib -->');


  // Rewrite README with new post content
  const currentText = await fs.readFile('README.md', 'utf8');
  const postsSection = /<!-- start latest posts looper -->[\s\S]*<!-- end latest posts looper -->/g;
  const newText = currentText.replace(postsSection, updates)

  const postsSection2 = /<!-- start latest posts lib -->[\s\S]*<!-- end latest posts lib -->/g;
  const newText2 = newText.replace(postsSection2, updates2)



  await fs.writeFile('README.md', newText2);
} catch (error) {
  console.error('there was an error:', error.message);
}
