
export default class DatabaseConnection implements IDatabaseConnection {
    public async GetWord(regex: string): Promise<string[]> {
        try {
            const response = await fetch('/br-utf8.txt');

            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo');
            }

            const text = await response.text();
            const lines = text.split(/\r?\n/);

            // Assumindo que você tenha a função binarySearchForCharWithContext
            return this.binarySearchForCharWithContext(lines, regex);
        } catch (error) {
            console.error('Erro ao processar o arquivo:', error);
            return []; // Retorna um array vazio no caso de erro
        }
    }

    private binarySearchForCharWithContext(lines: string[], char: string): string[] {
        let left = 0;
        let right = lines.length - 1;
        let foundIndex: number | null = null;

        // Realiza a busca binária
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const currentLine = lines[mid];

            if (currentLine.startsWith(char)) {
                foundIndex = mid;
                break;
            } else if (currentLine < char)
                left = mid + 1;
            else
                right = mid - 1;
        }

        if (foundIndex === null)
            return [];

        const start = Math.max(0, foundIndex - 100021);
        const end = Math.min(lines.length - 1, foundIndex + 100021);
        return lines.slice(start, end + 1);
    }
}