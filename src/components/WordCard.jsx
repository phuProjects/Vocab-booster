import React, { useState, useEffect } from 'react';

export default function WordCard() {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [example, setExample] = useState('');
    const [partOfSpeech, setPartOfSpeech] = useState('');
    const [audio, setAudio] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch a new random word and its details
    const fetchWord = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('https://random-word-api.vercel.app/api?words=1');
            if (!response.ok) throw new Error('Failed to fetch random word');
            const data = await response.json();
            const randomWord = data[0];
            setWord(randomWord);

            const defResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
            if (!defResponse.ok) throw new Error('Failed to fetch word definition');
            const defData = await defResponse.json();

            const meaning = defData[0].meanings[0];
            const wordDefinition = meaning.definitions[0].definition;
            const wordExample = meaning.definitions[0].example || 'No example available.';
            const wordPartOfSpeech = meaning.partOfSpeech;
            const pronunciationAudio = defData[0].phonetics.find(p => p.audio)?.audio || null;

            setDefinition(wordDefinition);
            setExample(wordExample);
            setPartOfSpeech(wordPartOfSpeech);
            setAudio(pronunciationAudio);

        } catch (error) {
            console.error('Error fetching word, retrying:', error);
            fetchWord();
        } finally {
            setIsLoading(false);
        }
    };

    // Play the pronunciation audio
    const playAudio = () => {
        if (audio) {
            const audioElement = new Audio(audio);
            audioElement.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    };

    useEffect(() =>{fetchWord();}, [])

    return (
        <div className="word-card">
            {isLoading ? (
                <p className="is-loading">Loading...</p>
            ) : (
                <>
                    <h1>{word}</h1>
                    <p><strong>Part of Speech: </strong>{partOfSpeech}</p>
                    <p><strong>Definition: </strong>{definition}</p>
                    <p><strong>Example: </strong>{example}</p>
                    <button onClick={fetchWord}>Generate New Word</button>
                    <button onClick={playAudio} disabled={!audio}>
                        {audio ? 'Play Pronunciation' : 'No Audio Available'}
                    </button>
                </>
                )}
        </div>
    );
}