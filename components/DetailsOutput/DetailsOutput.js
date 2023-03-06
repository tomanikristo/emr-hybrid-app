import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

import DetailsList from './DetailsList';
import DetailsSummary from './DetailsSummary';






function DetailsOutput({ details, detailsPeriod, fallbackText }) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if (details.length > 0) {
        content = <DetailsList details={details} />
    }
    return (
        <View style={styles.contrainer}>
            {/*<DetailsSummary details={DUMMY_EXPENSES} prediodName={detailsPeriod} />*/}
            {content}
        </View>
    )
}

export default DetailsOutput;

const styles = StyleSheet.create({
    contrainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
});