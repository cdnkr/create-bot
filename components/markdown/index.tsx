'use client'

import { markdownToHtml } from '@/utils/markdown';
import axios from 'axios';
import { useRef } from 'react';

interface Props {
  markdownFileUrl?: string;
  markdownContent?: string;
}

const DisplayMarkdown = ({
  markdownFileUrl,
  markdownContent
}: Props) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  console.log('hit')

  loadMarkdown();

  async function loadMarkdown() {
    if (!contentRef?.current) return;

    if (markdownFileUrl) {
      // Fetch the markdown file content
      const markdownContentResponse = await axios.get(markdownFileUrl);

      markdownContent = markdownContentResponse.data;
    }

    if (typeof markdownContent !== 'string') return;

    // Convert markdown to HTML
    const htmlContent = await markdownToHtml(markdownContent);

    contentRef.current.innerHTML = htmlContent;
  }

  return (
    <div
      ref={contentRef}
      className="prose prose-hr:my-1 prose-p:font-light prose-li:font-light prose-p:m-0 prose-li:m-0 my-5 w-full max-w-full"
    />
  );
};

export default DisplayMarkdown;
