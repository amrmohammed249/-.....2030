import React, { useState, useEffect } from 'react';

interface ThemeColors {
    primary: string;
    secondary: string;
}

interface AppearanceSettingsProps {
    themeColors: ThemeColors;
    onSave: (newColors: ThemeColors) => void;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({ themeColors, onSave }) => {
    const [colors, setColors] = useState<ThemeColors>(themeColors);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setColors(themeColors);
    }, [themeColors]);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setColors(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(colors);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-brand-dark border-b pb-4 mb-6">إعدادات المظهر</h2>
            
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">الألوان الرئيسية</h3>
                    <p className="text-gray-500 text-sm mb-4">اختر الألوان التي تمثل علامتك التجارية. ستتغير ألوان الأزرار والروابط والعناصر الأخرى بناءً على اختيارك.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                            <label htmlFor="primary" className="font-medium text-gray-700">اللون الأساسي:</label>
                            <input
                                type="color"
                                id="primary"
                                name="primary"
                                value={colors.primary}
                                onChange={handleColorChange}
                                className="w-12 h-12 rounded-md border-gray-300 cursor-pointer"
                            />
                            <span className="font-mono text-gray-600">{colors.primary}</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                             <label htmlFor="secondary" className="font-medium text-gray-700">اللون الثانوي:</label>
                            <input
                                type="color"
                                id="secondary"
                                name="secondary"
                                value={colors.secondary}
                                onChange={handleColorChange}
                                className="w-12 h-12 rounded-md border-gray-300 cursor-pointer"
                            />
                             <span className="font-mono text-gray-600">{colors.secondary}</span>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">الخطوط</h3>
                    <p className="text-gray-500 text-sm mb-4">
                        هذه الميزة غير متاحة حاليًا. سيتم إضافة خيارات تخصيص الخطوط قريبًا.
                    </p>
                    <div className="opacity-50">
                        <label htmlFor="font-select" className="block text-sm font-medium text-gray-700 mb-1">اختر خطًا</label>
                        <select id="font-select" className="w-full max-w-xs p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" disabled>
                            <option>Tajawal (الحالي)</option>
                            <option>Cairo</option>
                            <option>Almarai</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end items-center gap-4">
                {isSaved && <span className="text-green-600">تم الحفظ بنجاح!</span>}
                <button 
                    onClick={handleSave}
                    className="px-8 py-2 bg-brand-primary text-white rounded-md hover:bg-opacity-80"
                >
                    حفظ التغييرات
                </button>
            </div>
        </div>
    );
};

export default AppearanceSettings;
