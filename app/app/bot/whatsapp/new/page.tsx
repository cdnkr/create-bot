import NewWhatsAppChatBot from "@/components/bot/whatsapp/new";
import { createClient } from "@/utils/supabase/server";

const NewWhatsAppBotPage: React.FC = async () => {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <NewWhatsAppChatBot
      user={user}
    />
  );
}

export default NewWhatsAppBotPage;