import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import Card from './Card';

const Board: React.FC = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);

  useEffect(() => {
    const cardPairs = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
    const shuffledCards = shuffle(cardPairs);
    setCards(shuffledCards);
  }, []);

  const shuffle = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardPress = (index: number) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !cards[index].includes('found')) {
      const newFlippedCards = [...flippedCards, index];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        checkForMatch(newFlippedCards);
      }
    }
  };

  const checkForMatch = (flippedCards: number[]) => {
    const [cardIndex1, cardIndex2] = flippedCards;
    if (cards[cardIndex1] === cards[cardIndex2]) {
      setScore(score + 1);

      // Mark the matched cards as "found"
      const updatedCards = [...cards];
      updatedCards[cardIndex1] = `${cards[cardIndex1]}-found`;
      updatedCards[cardIndex2] = `${cards[cardIndex2]}-found`;
      setCards(updatedCards);

      setFlippedCards([]);

      if (score + 1 === cards.length / 2) {
        Alert.alert('Congratulations', 'You won the game!');
        resetGame();
      }
    } else {
      setErrors(errors + 1);
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  const resetGame = () => {
    setCards([]);
    setFlippedCards([]);
    setScore(0);
    setErrors(0);
    const cardPairs = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
    const shuffledCards = shuffle(cardPairs);
    setCards(shuffledCards);
  };

  return (
    <View style={styles.board}>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.errors}>Errors: {errors}</Text>
      <View style={styles.cardsContainer}>
        {cards.map((value, index) => (
          <Card
            key={index}
            value={value}
            isFlipped={flippedCards.includes(index) || value.includes('found')}
            onCardPress={() => handleCardPress(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errors: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Board;
