import React, { useState, useEffect } from 'react';

export default function WordCard() {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [example, setExample] = useState('');
    const [partOfSpeech, setPartOfSpeech] = useState('');
    const [audio, setAudio] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    // Fetch a new random word and its details
    const fetchWord = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('https://random-word-api.vercel.app/api?words=1');
            const data = await response.json();
            const randomWord = data[0];
            setWord(randomWord);

            const defResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
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
            console.error('Error fetching word:', error);
            setWord('');
            setDefinition('');
            setPartOfSpeech('');
            setAudio(null);
        }
        setIsLoading(false);
    };

    // Save the word to favorites if not already saved
    const saveToFavorites = () => {
        const newFavorite = { word, definition, partOfSpeech, example };

        if (favorites.some(fav => fav.word === word)) {
            alert('This word is already in your favorites!');
            return;
        }

        const updatedFavorites = [...favorites, newFavorite];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    // Delete a word from favorites
    const deleteFromFavorites = (wordToDelete) => {
        const updatedFavorites = favorites.filter(fav => fav.word !== wordToDelete);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    // Load saved favorites from LocalStorage on component mount
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
        fetchWord();
    }, []);

    // Play the pronunciation audio
    const playAudio = () => {
        if (audio) {
            const audioElement = new Audio(audio);
            audioElement.play();
        }
    };

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
                    <button onClick={playAudio}>{audio ? 'Play Pronunciation' : 'No Audio Available'}</button>
                    <button onClick={saveToFavorites}>Save to Favorites</button>
                    
                    <h2>Favorites</h2>
                    <ul>
                        {favorites.map((fav, index) => (
                            <li key={index}>
                                <strong>{fav.word}</strong> ({fav.partOfSpeech}): {fav.definition}
                                <button onClick={() => deleteFromFavorites(fav.word)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
