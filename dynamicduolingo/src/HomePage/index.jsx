import React, { useState } from "react";
import { ETargetLanguages } from "../enums/ETargetLanguages";
import DynamicDuolingo from '../services/Translate';
import arrow from '../Images/seta-direita.png';
import loadingGif from '../Images/loading.svg';

const HomePage = () => {
    const tradutor = new DynamicDuolingo();
    const languageOptions = Object.entries(ETargetLanguages).map(([language, abbreviation]) => ({
        language,
        abbreviation
    }));

    const [text, setText] = useState({
        original: '',
        translated: '',
        newLanguage: ETargetLanguages.English, 
    });

    const [loading, setLoading] = useState(false);

    const translate = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const translated = await tradutor.translate(text.original, text.newLanguage);
            setText({...text, translated: translated});
        } catch (error) {
            console.error("Erro ao traduzir:", error);
            return null; 
        }
        setLoading(false);
    };

    console.log(text)

    return (
        <div className="grid w-full h-screen grid-cols-2 gap-4 p-4 pb-20 bg-beige">
            <div className="w-full">
                <form onSubmit={translate}>
                    <header className="flex items-center gap-4 pb-4">
                        <select 
                            className="p-2 border-2 outline-none shadow-bottom-primary rounded-xl border-gray bg-orange"
                            name="sourceLanguage"
                            defaultValue="pt"
                            disabled // Assuming you want to keep this static
                        >
                            <option key='pt' className="bg-beige" value='pt'>Português</option>
                        </select>
                        <img className="h-8" src={arrow} alt='seta' />
                        <select 
                            className="p-2 border-2 outline-none cursor-pointer shadow-bottom-primary rounded-xl border-gray bg-blue"
                            name="newLanguage"
                            value={text.newLanguage}
                            onChange={e => setText({...text, newLanguage: e.target.value})}
                        >
                            {languageOptions.map(({ language, abbreviation , index}) => (
                                <option  className="bg-beige" value={abbreviation}>
                                    {language}
                                </option>
                            ))}
                        </select>
                        <button     
                            className="p-2 border-2 rounded-full outline-none cursor-pointer shadow-bottom-primary border-gray bg-green" 
                            type="submit"
                        >
                            Traduzir
                        </button>
                    </header>
                </form>
                <div className="w-full p-4 bg-white border-2 rounded-xl h-fit min-h-80 border-gray">
                    <textarea
                        className="w-full h-full text-lg whitespace-normal outline-none min-h-[274px]"
                        type='text'
                        value={text.original}
                        onChange={(e) => setText({...text, original: e.target.value})}
                        placeholder="Insira o texto..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              translate(e); // Chama a função de tradução
                            }
                          }}
                    />
                </div>
            </div>
            <div className="w-full p-4 bg-white border-2 mt-[60px] rounded-xl h-fit min-h-80 border-gray">
                {
                    loading ?
                        <img className="h-12" src={loadingGif} alt='loading' />
                        :
                        <p className="text-lg">{text.translated}</p>
                }
            </div>
        </div>
    );
}

export default HomePage;
