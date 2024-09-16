import BuildWhatsAppBot from "@/components/bot/whatsapp";
import { createClient } from "@/utils/supabase/server";

export default async function NewWhatsAppBotPage() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  return (
      <BuildWhatsAppBot user={user} />
  );
}
