import BuildWhatsAppBot from "@/components/bot/whatsapp";
import Error from "@/components/error";
import { createClient } from "@/utils/supabase/server";
import axios from "axios";

const NewWhatsAppBotPage: React.FC = async () => {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <BuildWhatsAppBot
      user={user}
    />
  );
}

export default NewWhatsAppBotPage;