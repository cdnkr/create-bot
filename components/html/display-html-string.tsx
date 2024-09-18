interface Props {
  content: string;
}

const DisplayHtmlString = ({
  content
}: Props) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="prose mt-0 prose-hr:my-1 prose-p:font-light prose-li:font-light prose-p:m-0 prose-li:m-0 my-5 w-full max-w-full"
    />
  );
};

export default DisplayHtmlString;
