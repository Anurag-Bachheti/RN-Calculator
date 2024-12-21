import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handlePress = (value) => {
    if (value === '=') {
      try {
        if (input) {
          setResult(eval(input));
          setInput('');
        }
      } catch (error) {
        setResult('Invalid');
      }
    } else if (value === 'C') {
      setInput('');
      setResult(null);
    } else {
      setInput((prevInput) => {
        if (isOperator(value) && !prevInput) return prevInput;
        if (isOperator(value) && isOperator(prevInput[prevInput.length - 1])) return prevInput;
        return prevInput + value;
      });
    }
  };

  const isOperator = (char) => ['+', '-', '*', '/'].includes(char);

  const CalculatorButton = ({ value, onPress }) => {
    // Determine the button color based on its value
    const getButtonColor = () => {
      if (value === 'C') return '#ff6666'; // Red for Clear
      if (value === '=') return '#66cc66'; // Green for Equals
      if (['+', '-', '*', '/'].includes(value)) return '#ffcc66'; // Orange for Operators
      return '#ddd'; // Default color for numbers
    };

    return (
      <TouchableOpacity
        onPress={() => onPress(value)}
        style={[styles.button, { backgroundColor: getButtonColor() }]}
      >
        <Text style={styles.buttonText}>{value}</Text>
      </TouchableOpacity>
    );
  };

  const buttonValues = [
    ['1', '2', '3', '+'],
    ['4', '5', '6', '-'],
    ['7', '8', '9', '*'],
    ['C', '0', '=', '/'],
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{result !== null ? `Result: ${result}` : ''}</Text>
      <Text style={styles.input}>{input}</Text>

      {buttonValues.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.buttonRow}>
          {row.map((value) => (
            <CalculatorButton key={value} value={value} onPress={handlePress} />
          ))}
        </View>
      ))}
    </View>




  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  result: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    fontSize: 36,
    marginBottom: 20,
    color: '#555',
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 35,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default App;
