import React from 'react';
import { CogIcon } from '../icons';

interface PlaceholderProps {
    title: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center bg-white p-8 rounded-lg shadow-md">
            <CogIcon className="w-16 h-16 text-gray-300 animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-brand-dark mb-2">{title}</h2>
            <p className="text-gray-500">هذه الميزة قيد التطوير وستكون متاحة قريبًا.</p>
            <p className="text-gray-500 mt-1">
                تتطلب هذه الوظيفة بناء نظام خلفي (Backend) لإدارة البيانات.
            </p>
        </div>
    );
};

export default Placeholder;
