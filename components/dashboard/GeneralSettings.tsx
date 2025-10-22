import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../../types';

interface GeneralSettingsProps {
    settings: SiteSettings;
    onSave: (newSettings: SiteSettings) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ settings, onSave }) => {
    const [formData, setFormData] = useState<SiteSettings>(settings);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setFormData(settings);
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-brand-dark border-b pb-2 mb-4">المعلومات الأساسية</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">اسم الموقع</label>
                                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">وصف الموقع</label>
                                <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold text-brand-dark border-b pb-2 mb-4">معلومات التواصل</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-brand-dark border-b pb-2 mb-4">روابط التواصل الاجتماعي</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">فيسبوك</label>
                                <input type="url" name="facebook" id="facebook" value={formData.facebook} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">انستغرام</label>
                                <input type="url" name="instagram" id="instagram" value={formData.instagram} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                             <div>
                                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">واتساب</label>
                                <input type="url" name="whatsapp" id="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end items-center gap-4">
                    {isSaved && <span className="text-green-600">تم الحفظ بنجاح!</span>}
                    <button type="submit" className="px-8 py-2 bg-brand-primary text-white rounded-md hover:bg-opacity-80">
                        حفظ التغييرات
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GeneralSettings;
