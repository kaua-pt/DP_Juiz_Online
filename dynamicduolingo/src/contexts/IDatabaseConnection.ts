interface IDatabaseConnection {
    GetWord(parameter: string): Promise<string[]>;
}