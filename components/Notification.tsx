import React, { useEffect } from 'react';
import { CheckCircleIcon, CloseIcon } from './icons';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-dismiss after 3 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className="max-w-sm w-full bg-green-500 text-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden animate-fade-in-down"
      role="alert"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <CheckCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div className="mr-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <div className="mr-4 flex-shrink-0 flex">
            <button
              onClick={onClose}
              className="inline-flex rounded-md text-green-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
            >
              <span className="sr-only">إغلاق</span>
              <CloseIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Notification;
