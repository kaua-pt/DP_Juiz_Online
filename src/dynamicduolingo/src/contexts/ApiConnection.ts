import axios from 'axios';
import config from '../config/config';
import { ETargetLanguages } from '../interfaces/ETargetLanguages';
import { IApiConnection } from './IApiConnection';

export default class ApiConnection implements IApiConnection {
    async translate(phrase: string, targetLanguage: ETargetLanguages): Promise<string> {

        const body = {
            "T": phrase,
            "SL": ETargetLanguages.PtBr,
            "TL": targetLanguage
        };

        try {
            const response = await axios.post(config.TRANSLATE_API_URL, body, {
                headers: {
                    'Authorization': config.API_KEY,
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

