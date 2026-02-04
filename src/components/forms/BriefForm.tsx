import React, { useState } from 'react';
import { BriefFormSchema, type BriefFormData } from '../../lib/schemas';
import { z } from 'zod';

interface Props {
    t: Record<string, string>;
    lang: string;
}

export const BriefForm: React.FC<Props> = ({ t, lang }) => {
    const [formData, setFormData] = useState<Partial<BriefFormData>>({
        company_name: '',
        contacts: '',
        preferred_contact: 'Telegram',
        business_sphere: '',
        current_site: '',
        competitors: '',
        project_goal: 'Selling goods or services online',
        success_metrics: '',
        target_audience: '',
        user_action: '',
        site_type: 'Landing Page',
        features: [],
        features_other: '',
        brand_identity: 'Yes, have everything',
        design_examples: '',
        content_provider: 'We have ready content',
        hosting_domain: 'Yes, have',
        integrations: '',
        budget: 'Up to $500',
        deadline: '',
        additional_info: '',
        support: [],
        consent: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showOtherFeatures, setShowOtherFeatures] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checkbox = e.target as HTMLInputElement;
            if (name === 'features' || name === 'support') {
                const currentArray = (formData[name] as string[]) || [];
                if (checkbox.checked) {
                    setFormData(prev => ({ ...prev, [name]: [...currentArray, value] }));
                    if (value === 'other' && name === 'features') setShowOtherFeatures(true);
                } else {
                    setFormData(prev => ({ ...prev, [name]: currentArray.filter(item => item !== value) }));
                    if (value === 'other' && name === 'features') setShowOtherFeatures(false);
                }
            } else if (name === 'consent') {
                setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            const validatedData = BriefFormSchema.parse(formData);

            const response = await fetch('/api/sendBrief/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(validatedData),
            });

            if (response.ok) {
                document.dispatchEvent(new CustomEvent('modal:open', { detail: { modalId: 'success-modal' } }));
                // Could reset here if needed
            } else {
                const resData = await response.json();
                if (resData.errors) {
                    setErrors(resData.errors);
                } else {
                    throw new Error('Submission failed');
                }
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.errors.forEach(err => {
                    if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
                });
                setErrors(fieldErrors);
                // Scroll to first error
                const firstErrorKey = Object.keys(fieldErrors)[0];
                document.getElementsByName(firstErrorKey)[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                document.dispatchEvent(new CustomEvent('modal:open', { detail: { modalId: 'error-modal' } }));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const isRu = lang === 'ru';

    return (
        <form onSubmit={handleSubmit} id="brief-form" className="brief-form" noValidate>
            {/* 1. Contact Details */}
            <fieldset className={`form-block fade-in ${errors.company_name || errors.contacts || errors.preferred_contact ? 'border-red-500' : ''}`}>
                <legend>{isRu ? '1. Контактные данные' : '1. Contact Details'}</legend>
                <div className="form-group">
                    <label htmlFor="company_name">{isRu ? 'Имя / Название компании *' : 'Name / Company Name *'}</label>
                    <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} className={`form-control ${errors.company_name ? 'error-field' : ''}`} required />
                    {errors.company_name && <span className="text-red-500 text-xs">{errors.company_name}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="contacts">{isRu ? 'Контакты (Телефон, Telegram, Email) *' : 'Contacts (Phone, Telegram, Email) *'}</label>
                    <input type="text" name="contacts" value={formData.contacts} onChange={handleChange} className={`form-control ${errors.contacts ? 'error-field' : ''}`} required />
                    {errors.contacts && <span className="text-red-500 text-xs">{errors.contacts}</span>}
                </div>
                <div className="form-group">
                    <label>{isRu ? 'Предпочтительный способ связи *' : 'Preferred Contact Method *'}</label>
                    <div className="radio-group">
                        {['Telegram', 'WhatsApp', 'Email', isRu ? 'Phone Call' : 'Phone Call'].map(method => (
                            <label key={method}>
                                <input type="radio" name="preferred_contact" value={method} checked={formData.preferred_contact === method} onChange={handleChange} />
                                <span>{method}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </fieldset>

            {/* 2. About Company & Project */}
            <fieldset className="form-block fade-in">
                <legend>{isRu ? '2. О компании и проекте' : '2. About Company & Project'}</legend>
                <div className="form-group">
                    <label htmlFor="business_sphere">{isRu ? 'Кратко опишите чем занимается компания, какие товары или услуги предлагает? *' : 'Briefly describe what your company does, what goods or services it offers? *'}</label>
                    <textarea name="business_sphere" value={formData.business_sphere} onChange={handleChange} className={`form-control ${errors.business_sphere ? 'error-field' : ''}`} rows={3} required />
                    {errors.business_sphere && <span className="text-red-500 text-xs">{errors.business_sphere}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="current_site">{isRu ? 'Адрес текущего сайта (если есть)' : 'Current website URL (if any)'}</label>
                    <input type="url" name="current_site" value={formData.current_site} onChange={handleChange} className={`form-control ${errors.current_site ? 'error-field' : ''}`} placeholder="https://" />
                    {errors.current_site && <span className="text-red-500 text-xs">{errors.current_site}</span>}
                </div>
            </fieldset>

            {/* 3. Goals & Objectives */}
            <fieldset className="form-block fade-in">
                <legend>{isRu ? '3. Цели и задачи' : '3. Goals & Objectives'}</legend>
                <div className="form-group">
                    <label>{isRu ? 'Какова основная цель создания сайта? *' : 'What is the main goal of the website? *'}</label>
                    <div className="radio-group-vertical">
                        {[
                            'Selling goods or services online',
                            'Lead generation',
                            'Corporate presence',
                            'Information portal or blog',
                            'Internal process automation'
                        ].map(goal => (
                            <label key={goal}>
                                <input type="radio" name="project_goal" value={goal} checked={formData.project_goal === goal} onChange={handleChange} />
                                <span>{goal}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </fieldset>

            {/* 5. Site Type & Functionality */}
            <fieldset className="form-block fade-in">
                <legend>{isRu ? '5. Тип сайта и функционал' : '5. Site Type & Functionality'}</legend>
                <div className="form-group">
                    <label>{isRu ? 'Какой тип сайта вам необходим? *' : 'What type of website do you need? *'}</label>
                    <div className="radio-group">
                        {['Landing Page', 'Corporate Site', 'E-commerce', 'Web Application'].map(type => (
                            <label key={type}>
                                <input type="radio" name="site_type" value={type} checked={formData.site_type === type} onChange={handleChange} />
                                <span>{type}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label>{isRu ? 'Какой функционал необходим?' : 'What functionality is required?'}</label>
                    <div className="checkbox-group">
                        {['Product/Service Catalog', 'Blog/News', 'User Account', 'Online Payment', 'Cost Calculator', 'Multilingual', 'other'].map(feat => (
                            <label key={feat}>
                                <input type="checkbox" name="features" value={feat} checked={formData.features?.includes(feat)} onChange={handleChange} />
                                <span>{feat === 'other' ? (isRu ? 'Другое' : 'Other') : feat}</span>
                            </label>
                        ))}
                    </div>
                    {showOtherFeatures && (
                        <div className="form-group other-input">
                            <input type="text" name="features_other" value={formData.features_other} onChange={handleChange} className="form-control" placeholder={isRu ? 'Укажите другой функционал' : 'Specify other functionality'} />
                        </div>
                    )}
                </div>
            </fieldset>

            {/* Legal Consent */}
            <div className="form-group-checkbox flex items-start gap-3 mb-6 mt-4">
                <input type="checkbox" id="brief-consent" name="consent" checked={formData.consent} onChange={handleChange} className={`mt-1 w-5 h-5 min-w-[1.25rem] rounded border-gray-300 text-primary focus:ring-primary cursor-pointer accent-primary ${errors.consent ? 'error-field' : ''}`} required />
                <label htmlFor="brief-consent" className="text-sm text-muted-foreground leading-snug cursor-pointer select-none">
                    {isRu ? (
                        <>Я принимаю условия <a href="/ru/legal/public-offer" className="underline decoration-primary/50 hover:decoration-primary transition-colors">Публичной оферты</a> и даю согласие на обработку <a href="/ru/legal/privacy-policy" className="underline decoration-primary/50 hover:decoration-primary transition-colors">персональных данных</a>.</>
                    ) : (
                        <>I accept the <a href="/en/legal/public-offer" className="underline decoration-primary/50 hover:decoration-primary transition-colors">Public Offer</a> and agree to the processing of <a href="/en/legal/privacy-policy" className="underline decoration-primary/50 hover:decoration-primary transition-colors">personal data</a>.</>
                    )}
                </label>
            </div>
            {errors.consent && <p className="text-red-600 text-xs font-medium mt-1 animate-pulse">{isRu ? 'Пожалуйста, подтвердите согласие с условиями.' : 'Please confirm your agreement.'}</p>}

            <div className="form-submit-container">
                <button type="submit" className="cta-button" disabled={isSubmitting}>
                    {isSubmitting ? <div className="spinner" style={{ display: 'block' }}></div> : t.form_button}
                </button>
            </div>
        </form>
    );
};
