import axios from 'axios';
import config from '../config/config';
import { ETargetLanguages } from '../interfaces/ETargetLanguages';
import { IApiConnection } from './IApiConnection';

export default class ApiConnection implements IApiConnection {
    async translate(phrase: string, targetLanguage: ETargetLanguages): Promise<string> {
        try {
            const sufix = `text=${phrase}&source_lang=br&target_lang=fr`;
            const response = await axios.get(config.TRANSLATE_API_URL + sufix);
            return response.data.text[0]
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
            return '';
        }
    }

}

