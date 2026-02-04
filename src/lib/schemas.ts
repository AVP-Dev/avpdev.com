// src/lib/schemas.ts
import { z } from 'zod';

/**
 * Contact Form Schema
 * Validates contact form submissions with either email OR phone required
 */
export const ContactFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }).optional().or(z.literal('')),
    phone: z.string().optional(),
    message: z.string().min(1, { message: 'Message is required' }),
    consent: z.coerce.boolean({
        errorMap: () => ({ message: 'Agreement is required' })
    }).refine((val) => val === true, {
        message: 'Agreement is required'
    }),
}).superRefine((data, ctx) => {
    // If both email and phone are empty, add errors to both fields
    if (!data.email && !data.phone) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Required',
            path: ['email']
        });
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Required',
            path: ['phone']
        });
    }
});

/**
 * Brief Form Schema
 * Validates comprehensive brief form submissions
 */
export const BriefFormSchema = z.object({
    // --- Contact Data ---
    company_name: z.string().min(1, { message: 'Company name is required' }),
    contacts: z.string().min(1, { message: 'Contact information is required' }),
    preferred_contact: z.enum(['Telegram', 'WhatsApp', 'Email', 'Звонок', 'Phone Call']),

    // --- About Company and Project ---
    business_sphere: z.string().min(1, { message: 'Business description is required' }),
    current_site: z.string().url({ message: 'Invalid URL' }).optional().or(z.literal('')),
    competitors: z.string().optional(),

    // --- Goals and Objectives ---
    project_goal: z.string(),
    success_metrics: z.string().optional(),

    // --- Target Audience ---
    target_audience: z.string().optional(),
    user_action: z.string().optional(),

    // --- Type and Functionality ---
    site_type: z.string(),
    features: z.union([z.array(z.string()), z.string()]).optional(),
    features_other: z.string().optional(),

    // --- Design and Content ---
    brand_identity: z.string().optional(),
    design_examples: z.string().optional(),
    content_provider: z.string().optional(),

    // --- Technical Questions ---
    hosting_domain: z.string().optional(),
    integrations: z.string().optional(),

    // --- Budget and Timeline ---
    budget: z.string().optional(),
    deadline: z.string().optional(),

    // --- Additional Info ---
    additional_info: z.string().optional(),
    support: z.union([z.array(z.string()), z.string()]).optional(),

    // --- Legal Consent ---
    consent: z.coerce.boolean({
        errorMap: () => ({ message: 'Data processing consent is required' })
    }).refine((val) => val === true, {
        message: 'Data processing consent is required'
    }),
});

// Export TypeScript types
export type ContactFormData = z.infer<typeof ContactFormSchema>;
export type BriefFormData = z.infer<typeof BriefFormSchema>;
