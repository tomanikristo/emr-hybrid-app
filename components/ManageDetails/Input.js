import { View, Text, TextInput, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Input({ label, textInputConfig }) {
    let inputStyles = [styles.input]

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} {...textInputConfig} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 16
    },
    label: {
        fontSize: 24,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4

    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 28,
        color: GlobalStyles.colors.primary700
    }
});