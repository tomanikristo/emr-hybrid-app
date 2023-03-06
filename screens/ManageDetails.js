import { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DetailsForm from '../components/ManageDetails/DetailsForm';
import { GlobalStyles } from '../constants/styles';
import { DetailsContext } from '../details/details-context';
import IconButton from '../components/UI/IconButton';
import LoadingOverLay from '../components/UI/LoadingOverlay';
import { deleteDetails, storeDetails, updateDetails } from '../util/http';
import ErrorOverlay from '../components/UI/ErrorOverlay';


function ManageDetails({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

    const detailCtx = useContext(DetailsContext);
    const editedDetailsId = route.params?.detailId;
    const isEditing = !!editedDetailsId;

    const selectedDetail = detailCtx.details.find(
        detail => detail.id === editedDetailsId
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit detail' : 'Add detail',
        });
    }, [navigation, isEditing]);

    async function deleteDetailsHandler() {
        setIsSubmitting(true);
        try {
            await deleteDetails(editedDetailsId);
            detailCtx.deleteDetails(editedDetailsId);
            navigation.goBack();
        } catch (error) {
            setError('Something went wrong, could not fetch EMR')
        }
    }
    function cancelHandler() {
        navigation.goBack();
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} />
    }

    async function confirmHandler(detailData) {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                detailCtx.updateDetails(editedDetailsId, detailData);
                await updateDetails(editedDetailsId, detailData);
            } else {
                const id = await storeDetails(detailData);
                detailCtx.addDetails({ ...detailData, id: id });
            }
            navigation.goBack();

        } catch (error) {
            setError('Could not save data')
            setIsSubmitting(false);
        }

    }

    if (isSubmitting) {
        return <LoadingOverLay />
    }

    return (
        <View style={styles.container}>
            <DetailsForm
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                onSubmit={confirmHandler}
                onCancel={cancelHandler}
                defaultValues={selectedDetail}
            />

            {isEditing && (
                <View style={styles.deleleContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteDetailsHandler}
                    />
                </View >
            )}
        </View>
    );
}

export default ManageDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },

    deleleContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'

    }
});