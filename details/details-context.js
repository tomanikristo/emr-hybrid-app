import { createContext, useReducer } from "react";


/*const DUMMY_DETAILS = [
    {
        id: 'e1',
        description: 'New medication',
        detail: '60',
        date: new Date('2022-08-01')

    },
    {
        id: 'e2',
        description: 'Picture',
        detail: '60',
        date: new Date('2022-08-02')

    },
    {
        id: 'e3',
        description: 'Location',
        detail: '60',
        date: new Date('2022-08-03')
    },
    {
        id: 'e4',
        description: 'New medication',
        detail: '60',
        date: new Date('2022-08-04')

    },
    {
        id: 'e5',
        description: 'New medication',
        detail: '60',
        date: new Date('2022-08-01')

    },
    {
        id: 'e6',
        description: 'Picture',
        detail: '60',
        date: new Date('2022-08-02')

    },
    {
        id: 'e7',
        description: 'Location',
        detail: '60',
        date: new Date('2022-08-03')
    },
    {
        id: 'e8',
        description: 'New medication',
        detail: '60',
        date: new Date('2022-08-04')

    },
]
*/

export const DetailsContext = createContext({
    details: [],
    addDetails: ({ description, detail, date }) => { },
    setDetails: (details) => { },
    deleteDetails: (id) => { },
    updateDetails: (id, { description, detail, date }) => { },

});

function detailsReducer(state, action) {
    switch (action.type) {
        case 'ADD':

            return [action.payload, ...state]
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableDetailsIndex = state.findIndex(
                (detail) => detail.id === action.payload.id
            );
            const updatableDetails = state[updatableDetailsIndex];
            const updatedItem = { ...updatableDetails, ...action.payload.data };
            const updatedDetails = [...state];
            updatedDetails[updatableDetailsIndex] = updatedItem;
            return updatedDetails;
        case 'DELETE':
            return state.filter((detail) => detail.id !== action.payload);
        default:
            return state;
    }
}


function DetailsContextProvider({ children }) {
    const [detailsState, dispatch] = useReducer(detailsReducer, []);

    function addDetails(detailsData) {
        dispatch({ type: 'ADD', payload: detailsData });
    }

    function setDetails(details) {
        dispatch({ type: 'SET', payload: details });
    }

    function deleteDetails(id) {
        dispatch({ type: 'DELETE', payload: id });
    }
    function updateDetails(id, detailsData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: detailsData } });
    }

    const value = {
        details: detailsState,
        setDetails: setDetails,
        addDetails: addDetails,
        deleteDetails: deleteDetails,
        updateDetails: updateDetails
    }

    return <DetailsContext.Provider value={value}>
        {children}
    </DetailsContext.Provider>
};

export default DetailsContextProvider;