import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";




function DetailItem({ id, description, detail, date }) {

    const navigation = useNavigation();

    function detailPressHandler() {
        navigation.navigate('ManageDetails', {
            detailId: id
        });
    }
    return (
        <Pressable
            onPress={detailPressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.detailItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>
                        {description}
                    </Text>
                    <Text style={styles.textBase}>{date.toISOString().slice(0, 10)}</Text>
                </View>
                {/*               <View style={styles.amountContrainer}>
                    <Text style={styles.amount}>{amount}</Text>
                </View>
    */}
            </View>
        </Pressable >
    );
}

export default DetailItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    detailItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4
    },
    textBase: {
        color: GlobalStyles.colors.primary50
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    amountContrainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 80
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold'
    }
})