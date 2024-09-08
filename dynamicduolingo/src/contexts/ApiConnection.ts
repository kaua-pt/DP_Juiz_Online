import axios from 'axios';
import config from '../config/config';
import { IApiConnection } from './IApiConnection';
import { ETargetLanguages } from '../enums/ETargetLanguages';

export default class ApiConnection implements IApiConnection {
    async translate(phrase: string, targetLanguage: ETargetLanguages): Promise<string> {

        const params = {
            text: phrase,
            source_lang: 'pt',
            target_lang: targetLanguage.toString()
        };
        try {
            let result = null;
            const url = new URL(config.TRANSLATE_API_URL);
            url.search = new URLSearchParams(params).toString();

            const response = await fetch(url);
            if (response.ok)
                result = await response.json();
            else
                return '';

            if (result !== null)
                return result['response']['translated_text'];
            return '';
        } catch (error) {
            console.error('Error:', error);
            return '';
        }
    }

}

