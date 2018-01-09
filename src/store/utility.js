// helper functions to distribute state immutably and clean up reducers.
export const updateObject = (oldObject, updatedProperties) => {
        return {
            ...oldObject,
            ...updatedProperties
        };
};
