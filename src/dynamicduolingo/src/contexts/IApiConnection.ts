interface IApiConnection {
    translate(word: string, targetLanguage: string): Promise<string>;
    getLanguages(): Promise<Language[]>;
}