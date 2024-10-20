import React, {useState, useEffect} from 'react'

export default function WordCard(){

    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchWord = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('https://random-word-api.herokuapp.com/word');
            const data = await response.json();
            const randomWord = data[0]

            setWord(randomWord)
            const defResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
            const defData = await defResponse.json();
            const wordDefinition = defData[0].meanings[0].definitions[0].definition;
            setDefinition(wordDefinition)
        } 
        catch (error){
            console.error('Error fetching word:', error);
            setWord('Error');
            setDefinition('Could not fetch word. Try again.');
        }
        setIsLoading(false); 
    }

    useEffect(() => {
        fetchWord();
    }, [])

    return(
        <div className="word-card">
            {isLoading ? (<p>is Loading...</p>)  //If isLoading is true, "render is Loading..." else show word and def
            :(
                <>
                <h1>{word}</h1>
                <p>{definition}</p>
                <button onClick={fetchWord}>Generate New Word</button>
                </>
             )
            }
        </div>
    )
}