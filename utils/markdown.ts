// lib/markdownToHtml.js
import { remark } from 'remark';
import html from 'remark-html';
import { rehype } from 'rehype';
import rehypePrism from 'rehype-prism';

export async function markdownToHtml(markdown: string) {
    const result = await remark()
        .use(html)
        .process(markdown);

    const contentWithSyntaxHighlighting = await rehype()
        .data('settings', { fragment: true })
        .use(rehypePrism) // Add syntax highlighting here
        .process(result.toString());

    return contentWithSyntaxHighlighting.toString();
}
