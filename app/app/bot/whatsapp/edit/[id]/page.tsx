import BuildWhatsAppBot from "@/components/bot/whatsapp";
import Error from "@/components/error";
import axios from "axios";

interface Props {
  params: { id: string }
}

const EditWhatsAppBotPage: React.FC<Props> = async ({
  params: { id },
}) => {
  const response = await axios.get(`${process.env.APP_URL}/api/flow/${id}`);
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
  )

  return (
    <BuildWhatsAppBot
      botDetails={response.data}
    />
  );
}

export default EditWhatsAppBotPage;