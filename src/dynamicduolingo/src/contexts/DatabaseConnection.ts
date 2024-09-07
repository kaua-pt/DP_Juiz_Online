
export default class DatabaseConnection implements IDatabaseConnection {
    public GetWord(regex: string): string[] {
        fetch('/br-utf8.txt')
            .then((response) => {
                if (!response.ok)
                    throw new Error('Erro ao carregar o arquivo');
                return response.text();
            })
            .then((text) => {
                const lines = text.split(/\r?\n/);
                return lines.filter((line) => regex.match(line));
            })
            .catch((error) => {
                console.error('Erro ao processar o arquivo:', error);
                return [];
            });
        return [];
    }
}