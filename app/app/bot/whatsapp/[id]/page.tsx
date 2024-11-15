import EditWhatsAppBot from "@/components/bot/whatsapp/edit";
import Error from "@/components/error";
import { createClient } from "@/utils/supabase/server";
import axios from "axios";

interface Props {
  params: { id: string }
}

const EditWhatsAppBotPage: React.FC<Props> = async ({
  params: { id },
}) => {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  const response = await axios.get(`${process.env.APP_URL}/api/bot/${id}`);
  if (!response?.data) return (
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

  const docsResponse = await axios.get(`${process.env.APP_URL}/api/docs/whatsapp/how-to?html=true`);

  return (
    <EditWhatsAppBot
      botDetails={response.data}
      user={user}
      docs={docsResponse.data}
    />
  );
}

export default EditWhatsAppBotPage;