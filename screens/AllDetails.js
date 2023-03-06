import DetailsOutput from '../components/DetailsOutput/DetailsOutput'
import { DetailsContext } from '../details/details-context';
import { useContext } from 'react'

function AllDetails() {
    const detailsCtx = useContext(DetailsContext);
    return <DetailsOutput details={detailsCtx.details} expensesPeriod="Total" fallbackText="No details added" />
}

export default AllDetails;