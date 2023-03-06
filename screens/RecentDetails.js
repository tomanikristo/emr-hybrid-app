import { useContext, useEffect, useState } from 'react';

import DetailsOutput from '../components/DetailsOutput/DetailsOutput';
import LoadingOverLay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { DetailsContext } from '../details/details-context';
import { getDateMinusDays } from '../util/date';
import { fetchDetails } from '../util/http';


function RecentDetails() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const detailsCtx = useContext(DetailsContext);

    useEffect(() => {
        async function getDetails() {
            setIsFetching(true);
            try {
                const details = await fetchDetails();
                detailsCtx.setDetails(details);

            } catch (error) {
                setError('Could not fetch details');
                console.log(error);
            }

            setIsFetching(false);
        }
        getDetails();
    }, []);

    function errorHandler() {
        setError(null);
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isFetching) {
        return <LoadingOverLay />
    }

    const recentDetails = detailsCtx.details.filter((detail) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return detail.date >= date7DaysAgo && detail.date <= today;
    });

    return (
        <DetailsOutput
            details={recentDetails}
            detailsPeriod="Last 7 Days"
            fallbackText="No details added in the last 7 days."
        />
    );
}

export default RecentDetails;