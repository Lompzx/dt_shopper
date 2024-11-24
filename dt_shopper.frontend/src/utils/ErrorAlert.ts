import Swal from 'sweetalert2';

export const ErrorAlert = (error: any, onClose?: () => void) => {
    const errorCode = error?.response?.data?.error_code || 'Unknown Error';
    const errorMessage = error?.response?.data?.error_description || 'An unexpected error occurred.';

    Swal.fire({
        icon: 'error',
        title: errorCode,
        html: errorMessage,
    }).then(() => {
        if (onClose) onClose();
    });
};