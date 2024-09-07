import { ETargetLanguages } from "../interfaces/ETargetLanguages";

export interface IApiConnection {
    translate(word: string, targetLanguage: ETargetLanguages): Promise<string>;
}