import config from "../config/config";
import ApiConnection from "../contexts/ApiConnection";
import DatabaseConnection from "../contexts/DatabaseConnection";

class DynamicDuolingo {
    private apiConnection: IApiConnection = new ApiConnection();
    private databaseConnection: IDatabaseConnection = new DatabaseConnection();
    public correctedPhase = '';
    public lastTraduction = '';
    public availableTargetLanguages: Language[] = [];
    construtor() {
        this.apiConnection.getLanguages().then(x => this.availableTargetLanguages = x);
    }


    public async translate(phrase: string, targetLanguage: string): Promise<string> {
        const tokens = phrase.split("");
        let translated: string = '', correctPhase: string = '';
        tokens.forEach(async element => {
            correctPhase += this.sequenceAlignment(element) + " ";
        });
        this.correctedPhase = correctPhase;
        translated = await this.apiConnection.translate(correctPhase, targetLanguage)
        this.lastTraduction = translated;
        return translated;
    }

    private sequenceAlignment(word: string): string {
        let rigthWord: string = '';
        let points: number = Number.MAX_VALUE;

        const firstLetter = word.charAt(0);
        const regex = new RegExp(`\\b${firstLetter}\\w*`, 'gi');
        let possibleWords = this.databaseConnection.GetWord(firstLetter);

        for (let pWord in possibleWords) {
            let pPoints = this.interativeSA(word, pWord)
            if (pPoints < points) {
                rigthWord = pWord;
                points = pPoints;
            }
        }
        return rigthWord;
    }

    private interativeSA(word: string, word2: string): number {
        let memo: number[][] = [];
        for (let i = 0; i < word.length; i++)
            memo[i][0] = i * config.GAP_PENALTY;

        for (let j = 0; j < word2.length; j++)
            memo[0][j] = j * config.GAP_PENALTY;

        for (let i = 0; i < word.length; i++)
            for (let j = 0; j < word2.length; j++) {
                let penalty = 0;
                if (word[i] !== word2[j])
                    penalty = config.MISSMATCH_PENALTY;
                memo[i][j] = Math.min(penalty + memo[i - 1][j - 1],
                    config.GAP_PENALTY + memo[i][j - 1],
                    config.GAP_PENALTY + memo[i - 1][j]);
            }

        return memo[word.length][word2.length];
    }
}

let duolingo = new DynamicDuolingo();
duolingo.translate("irmau du ceu", "en-US");
console.log("Frase corrigida: " + duolingo.correctedPhase);
console.log("Frase traduzida: " + duolingo.lastTraduction);