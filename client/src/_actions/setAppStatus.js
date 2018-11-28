export const ALL_DATA_LOADED = 'ALL_DATA_LOADED';
export const ERROR_OCCURED = 'ERROR_OCCURED';

export const allDataLoaded = () => ({
  type: ALL_DATA_LOADED
});

export const errorOccured = (error) => ({
  type: ERROR_OCCURED,
  payload: error
});
