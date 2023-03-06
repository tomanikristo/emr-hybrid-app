import { FlatList } from "react-native";
import DetailItem from "./DetailsItem";


function renderDetailItem(itemData) {
    return <DetailItem {...itemData.item} />
}

function DetailsList({ details }) {
    return <FlatList
        data={details}
        renderItem={renderDetailItem}
        keyExtractor={(item) => item.id} />;
}

export default DetailsList;