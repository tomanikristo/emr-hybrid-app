import { Alert, StyleSheet, View } from 'react-native';
import Input from './Input';
import { useState } from 'react';
import Button from '../UI/Button';

function DetailsForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
    const [inputValues, setInputValues] = useState({
        detail: defaultValues ? defaultValues.detail : '',
        description: defaultValues ? defaultValues.description : '',
        date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            }
        });
    }
    function submitHandler() {
        const detailData = {
            detail: inputValues.detail,
            description: inputValues.description,
            date: new Date(inputValues.date),
        };

        const detailisValid = detailData.detail.trim().length > 0;
        const deteIsValid = detailData.date.toString() !== 'Invalid Date';
        const descriptionValid = detailData.description.trim().length > 0;


        if (!detailisValid || !deteIsValid || !descriptionValid) {
            Alert.alert('Invalid input', 'Please check your input values')
            return;
        }

        onSubmit(detailData);
    }

    return <View>

        <Input label='Title' textInputConfig={{
            placeholder: 'e.g. blood type',
            onChangeText: inputChangedHandler.bind(this, 'detail'),
            value: inputValues.detail
        }} />
        <Input label='Description' textInputConfig={{
            placeholder: 'e.g. A',
            onChangeText: inputChangedHandler.bind(this, 'description'),
            value: inputValues.description
        }} />
        <Input label='Date' textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputValues.date
        }} />
        <View style={styles.buttons}>
            <Button
                style={styles.button}
                mode='flat'
                onPress={onCancel}>Cancel</Button>
            <Button
                style={styles.button}
                onPress={submitHandler}>
                {submitButtonLabel}</Button>
        </View>
    </View>
}

export default DetailsForm;

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
})