import React, {useState, useEffect} from 'react'

export default function WordCard(){

    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [example, setExample] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchWord = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('https://random-word-api.vercel.app/api?words=1');
            const data = await response.json();
            const randomWord = data[0]
            setWord(randomWord);

            const defResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
            const defData = await defResponse.json();
            const wordDefinition = defData[0].meanings[0].definitions[0].definition;
            setDefinition(wordDefinition);
            
            const wordExample = defData[0].meanings[0].definitions[0].example || 'No example available.';
            setExample(wordExample)
        } 
        catch (error){
            console.error('Error fetching word:', error);
            setIsLoading(true)
            setWord('');
            setDefinition('');
            fetchWord();
        }
        setIsLoading(false); 
    }

    useEffect(() => {
        fetchWord();
    }, [])

    return(
        <div className="word-card">
            {isLoading ? (<p className="is-loading">Loading...</p>)  //If isLoading is true, "render is Loading..." else show word and def
            :(
                <>
                <h1>{word}</h1>
                <p>Definition: {definition}</p>
                <p>Example: {example}</p>
                <button onClick={fetchWord}>Generate New Word</button>
                </>
             )
            }
        </div>
    )
}