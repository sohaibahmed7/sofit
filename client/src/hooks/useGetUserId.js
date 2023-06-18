import localStorage from 'local-storage'

export const useGetUserId = () => {
  return localStorage.get('userID');
};
