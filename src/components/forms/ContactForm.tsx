import React, { useState } from 'react';
import { ContactFormSchema, type ContactFormData } from '../../lib/schemas';
import { z } from 'zod';

interface Props {
    t: Record<string, string>;
    lang: string;
}

export const ContactForm: React.FC<Props> = ({ t, lang }) => {
    const [formData, setFormData] = useState<Partial<ContactFormData>>({
        name: '',
        email: '',
        phone: '',
        message: '',
        consent: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setFormData(prev => ({ ...prev, [name]: val }));
        // Clear error for the field
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
        setSubmitStatus('idle');

        try {
            const validatedData = ContactFormSchema.parse(formData);

            const response = await fetch('/api/sendMessage/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(validatedData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                    consent: false,
                });
                // Dispatch event for Astro to show success modal
                document.dispatchEvent(new CustomEvent('modal:open', { detail: { modalId: 'success-modal' } }));
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.errors.forEach(err => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0] as string] = err.message;
                    }
                });
                setErrors(fieldErrors);
            } else {
                setSubmitStatus('error');
                document.dispatchEvent(new CustomEvent('modal:open', { detail: { modalId: 'error-modal' } }));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form fade-in" noValidate>
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.form_name}
                    className={`form-control ${errors.name ? 'error-field' : ''}`}
                    required
                />
                {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
            </div>

            <div className="form-group-split">
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.form_email}
                        className={`form-control ${errors.email ? 'error-field' : ''}`}
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t.form_phone}
                        className={`form-control ${errors.phone ? 'error-field' : ''}`}
                    />
                    {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone}</span>}
                </div>
            </div>
            <p className="form-hint">{t.form_hint}</p>

            <div className="form-group">
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.form_message}
                    className={`form-control ${errors.message ? 'error-field' : ''}`}
                    required
                    rows={5}
                ></textarea>
                {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message}</span>}
            </div>

            <div className="form-group-checkbox flex items-start gap-3 mb-6">
                <input
                    type="checkbox"
                    id="legal-consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className={`mt-1 w-5 h-5 min-w-[1.25rem] rounded border-gray-300 text-primary focus:ring-primary cursor-pointer accent-primary ${errors.consent ? 'error-field' : ''}`}
                    required
                />
                <label htmlFor="legal-consent" className="text-sm text-muted-foreground leading-snug cursor-pointer select-none">
                    {lang === 'ru' ? (
                        <>
                            Я принимаю условия <a href="/ru/legal/public-offer" className="underline decoration-primary/50 hover:decoration-primary transition-colors">Публичной оферты</a> и даю согласие на обработку <a href="/ru/legal/privacy-policy" className="underline decoration-primary/50 hover:decoration-primary transition-colors">персональных данных</a>.
                        </>
                    ) : (
                        <>
                            I accept the <a href="/en/legal/public-offer" className="underline decoration-primary/50 hover:decoration-primary transition-colors">Public Offer</a> and agree to the processing of <a href="/en/legal/privacy-policy" className="underline decoration-primary/50 hover:decoration-primary transition-colors">personal data</a>.
                        </>
                    )}
                </label>
            </div>

            {errors.consent && (
                <p id="consent-error" className="text-red-600 text-xs font-medium mt-1 animate-pulse">
                    {lang === 'ru' ? 'Пожалуйста, подтвердите согласие с условиями перед отправкой.' : 'Please confirm your agreement with the terms before submitting.'}
                </p>
            )}

            <div className="form-submit-container">
                <button type="submit" className="cta-button" disabled={isSubmitting}>
                    {isSubmitting ? <div className="spinner" style={{ display: 'block' }}></div> : t.form_button}
                </button>
            </div>
        </form>
    );
};
