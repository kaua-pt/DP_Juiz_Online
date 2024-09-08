import { ETargetLanguages } from "../enums/ETargetLanguages";

export interface IApiConnection {
    translate(word: string, targetLanguage: ETargetLanguages): any;
}