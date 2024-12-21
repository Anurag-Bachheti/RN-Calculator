import { Colors } from "react-native/Libraries/NewAppScreen";

const CalculatorButton = ({ value, onPress }) => (
    <TouchableOpacity onPress={() => onPress(value)} style={styles.button}>
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  export default CalculatorButton;