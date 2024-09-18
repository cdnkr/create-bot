import NewWhatsAppChatBot from "@/components/bot/whatsapp/new";
import { createClient } from "@/utils/supabase/server";
import axios from "axios";

const NewWhatsAppBotPage: React.FC = async () => {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  const docsResponse = await axios.get(`${process.env.APP_URL}/api/docs/whatsapp/how-to?html=true`);

  return (
    <NewWhatsAppChatBot
      user={user}
      docs={docsResponse.data}
    />
  );
}

export default NewWhatsAppBotPage;