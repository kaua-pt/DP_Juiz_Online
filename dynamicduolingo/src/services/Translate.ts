import config from "../config/config";
import ApiConnection from "../contexts/ApiConnection";
import DatabaseConnection from "../contexts/DatabaseConnection";
import { IApiConnection } from "../contexts/IApiConnection";
import { ETargetLanguages } from "../enums/ETargetLanguages";

class DynamicDuolingo {
    private apiConnection: IApiConnection = new ApiConnection();
    private databaseConnection: IDatabaseConnection = new DatabaseConnection();
    public correctedPhase = '';
    public lastTraduction = '';
    construtor() {
    }

    public async translate(phrase: string, targetLanguage: ETargetLanguages): Promise<string> {
        const tokens = phrase.split(' ');
        let translated: string = '';
        let correctPhase: string = '';

        for (const element of tokens)
            correctPhase += await this.sequenceAlignment(element) + " ";

        translated = await this.apiConnection.translate(correctPhase, targetLanguage);

        this.correctedPhase = correctPhase;
        this.lastTraduction = translated;

        return translated;
    }

    private async sequenceAlignment(word: string): Promise<string> {
        let rigthWord: string = '';
        let points: number = Number.MAX_VALUE;

        const firstLetter = word.charAt(0);
        let possibleWords = await this.databaseConnection.GetWord(firstLetter);

        possibleWords.forEach(pWord => {
            let pPoints = this.interativeSA(word, pWord)
            if (pPoints < points) {
                rigthWord = pWord;
                points = pPoints;
            }
        });

        return rigthWord;
    }

    private interativeSA(word: string, word2: string): number {
        let memo: number[][] = Array.from({ length: word.length + 1 }, () => Array(word2.length + 1).fill(0));

        for (let i = 0; i <= word.length; i++)
            memo[i][0] = i * config.GAP_PENALTY;

        for (let j = 0; j <= word2.length; j++)
            memo[0][j] = j * config.GAP_PENALTY;

        for (let i = 1; i <= word.length; i++) {
            for (let j = 1; j <= word2.length; j++) {
                let penalty = (word[i - 1] === word2[j - 1]) ? 0 : config.MISSMATCH_PENALTY;

                memo[i][j] = Math.min(
                    penalty + memo[i - 1][j - 1],
                    config.GAP_PENALTY + memo[i][j - 1],
                    config.GAP_PENALTY + memo[i - 1][j]
                );
            }
        }
        return memo[word.length][word2.length];
    }
}


export default DynamicDuolingo;