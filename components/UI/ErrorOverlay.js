import { View, StyleSheet, Text } from "react-native";

import Button from "./Button";
import { GlobalStyles } from "../../constants/styles";

function ErrorOverlay({ message, onConfirm }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>Something went wrong...</Text>
            <Text style={styles.text}>{message}</Text>

        </View>
    );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text: {
        color: 'white',
        textAlign: "center",
        marginBottom: 8,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold"
    },

});