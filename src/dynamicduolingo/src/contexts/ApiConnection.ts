import axios from 'axios';
import config from '../config/config';

export default class ApiConnection implements IApiConnection {
    async getLanguages(): Promise<Language[]> {
        try {
            const response = await axios.get(config.LANGUAGES_URL);
            return response.data.map((item: any) => {
                if (typeof item.key !== 'string' || typeof item.value !== 'string')
                    throw new Error("Formato inválido de item");

                return {
                    key: item.key,
                    value: item.value
                };
            });
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
            return [];
        }
    }


    async translate(phrase: string, targetLanguage: string): Promise<string> {

        const data = [{
            id_content: "IDPA202401unb",
            content: phrase,
            content_type: "text/plain",
            source_language: "pt-BR",
            target_languages: [targetLanguage],
            service_type: "standard"
        }]

        try {
            const response = await axios.post(config.TRANSLATE_API_URL, data, {
                headers: {
                    'x-api-key': config.API_KEY,
                    'Content-type': 'application/json'
                }
            });
            return response.data.text[0]
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
            return '';
        }
    }

}