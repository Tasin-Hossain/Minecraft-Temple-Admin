// hooks/useUpdateUser.js
import { useState, useCallback } from 'react';
import { UPDATE_USER_BY_ID_API } from '../Api/user'; // তোমার API path
import { toast } from 'react-toastify';

/**
 * Custom hook to update user profile (text + files)
 *
 * @param {string} userId - User ID
 * @param {Object} [options] - Optional callbacks
 * @param {Function} [options.onSuccess] - Called on success (optional)
 * @param {Function} [options.onError] - Called on error (optional)
 */
export const useUpdateUser = (userId, { onSuccess, onError } = {}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateUser = useCallback(
    async (formData) => {
      if (!userId) {
        const msg = 'User ID is required';
        setUpdateError(msg);
        toast.error(msg);
        return;
      }

      setIsUpdating(true);
      setUpdateError(null);
      setIsSuccess(false);

      try {
        const res = await UPDATE_USER_BY_ID_API(userId, formData);
        setIsSuccess(true);
        // Success toast (backend message বা default)
        const successMsg = res?.data?.message || 'User updated successfully!';
        toast.success(successMsg);

        // Optional callback
        if (onSuccess) {
          onSuccess(res.data);
        }

        return res.data;
      } catch (err) {
        const errorMsg =
          err?.res?.data?.message ||
          err?.res?.data?.error ||
          err?.message ||
          'Failed to update user. Please try again.';

        setUpdateError(errorMsg);
        toast.error(errorMsg);

        if (onError) {
          onError(err);
        }

        throw err;
      } finally {
        setIsUpdating(false);
      }
    },
    [userId, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setIsUpdating(false);
    setUpdateError(null);
    setIsSuccess(false);
  }, []);

  return {
    updateUser,      // call this with FormData
    isUpdating,      // is request in progress?
    updateError,     // error message (string | null)
    isSuccess,       // did update succeed?
    reset,           // reset all states
  };
};