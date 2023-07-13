import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CardProps {
  value: string;
  isFlipped: boolean;
  onCardPress: () => void;
}

const Card: React.FC<CardProps> = ({ value, isFlipped, onCardPress }) => {
  return (
    <TouchableOpacity style={[styles.card, isFlipped && styles.flippedCard]} onPress={onCardPress}>
      {isFlipped ? <Text style={styles.cardText}>{value}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 120,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  flippedCard: {
    backgroundColor: 'blue',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Card;
