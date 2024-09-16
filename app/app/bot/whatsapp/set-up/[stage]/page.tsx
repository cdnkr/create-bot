import Error from "@/components/error";
import DisplayHtmlString from "@/components/html/display-html-string";
import { markdownToHtml } from "@/utils/markdown";
import { createClient } from "@/utils/supabase/server";
import axios from "axios";
import WhatsAppBotSetupForm from "./form";
;

interface Props {
  params: { stage: string }
}

const SetupWhatsAppBotPage: React.FC<Props> = async ({
  params: { stage },
}) => {
  const response = await axios.get(`${process.env.APP_URL}/api/docs/whatsapp/how-to/${stage}`);
  if (!response?.data || !response?.data?.content) return (
    <Error
      errorCode={404}
      errorTitle='Something&apos;s missing.'
      errorText='Sorry, we can&apos;t find that page.'
      errorAction={{
        text: 'Back to Homepage',
        type: 'link',
        path: '/'
      }}
    />
  );

  const htmlContent = await markdownToHtml(response.data.content);

  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  return (
    <>
      <DisplayHtmlString content={htmlContent} />
      <WhatsAppBotSetupForm stage={stage} user={user} />
    </>
  );
}

export default SetupWhatsAppBotPage;