import { IBotPartial } from "@/types/bot";
import axios from "axios";

export async function saveBot(bot: IBotPartial): Promise<string | null> {
    try {
        if (bot.id) {
            await axios.put('/api/bot/save', { ...bot });
            console.log('Bot updated successfully');
            return null; // No need to return an ID for an update
        }

        const response = await axios.post('/api/bot/save', { ...bot });
        console.log('Bot saved successfully');
        return response.data.id;

    } catch (error) {
        console.error('Error saving bot:', error);

        // Handle specific error types if needed
        if (axios.isAxiosError(error)) {
            console.error('Axios error message:', error.message);
        }

        // Return null or throw an error depending on how you want to handle failure
        return null;
    }
}
