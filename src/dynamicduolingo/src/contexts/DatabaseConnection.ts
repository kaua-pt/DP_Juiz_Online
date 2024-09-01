import * as fs from 'fs';

export default class DatabaseConnection implements IDatabaseConnection {
    public GetWord(regex: string): string[] {
        const allPtBrWords = fs.readFileSync("src//dynamicduolingo//data//br-utf8.txt", 'utf8');
        const foundWords = allPtBrWords.match(regex);
        return foundWords || [];
    }
}