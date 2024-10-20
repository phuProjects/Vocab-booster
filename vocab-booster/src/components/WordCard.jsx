import React, {useState} from 'react'
import React, {useEffect} from 'react'

export default function WordCard(){

    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchWord = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/random');
            const data = await response.json();

            setWord(data[0].word)
            setDefinition(data[0].meanings[0].definitions[0].definition)
        } 
        catch {
            console.error('Error fetching word:', error);
            setWord('Error');
            setDefinition('Could not fetch word. Try again.');
        }
        setIsLoading(false); 
    }

    return(
        <div>

        </div>
    )
}