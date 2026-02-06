// src/lib/schemas.ts
import { z } from 'zod';

/**
 * Contact Form Schema
 * Validates contact form submissions with either email OR phone required
 */
export const ContactFormSchema = z.object({
    name: z.string().trim().min(2, { message: 'Name must be at least 2 characters' }).max(100),
    contact: z.string().trim().min(3, { message: 'Contact information is required' }).max(100),
    message: z.string().trim().min(10, { message: 'Message must be at least 10 characters' }).max(2000),
    consent: z.coerce.boolean().refine((val) => val === true, {
        message: 'You must agree to personal data processing'
    }),
});

/**
 * Brief Form Schema
 * Validates comprehensive brief form submissions
 */
export const BriefFormSchema = z.object({
    // --- Contact Data ---
    company_name: z.string().trim().min(1, { message: 'Company name is required' }),
    contacts: z.string().trim().min(1, { message: 'Contact information is required' }),
    preferred_contact: z.enum(['Telegram', 'WhatsApp', 'Email', 'Call']),

    // --- About Company and Project ---
    business_sphere: z.string().trim().min(1, { message: 'Business description is required' }),
    current_site: z.string().trim().url({ message: 'Invalid URL' }).optional().or(z.literal('')),
    competitors: z.string().trim().optional(),

    // --- Goals and Objectives ---
    project_goal: z.string().trim().min(10, { message: 'Please describe your project goal' }),
    success_metrics: z.string().trim().optional(),

    // --- Target Audience ---
    target_audience: z.string().trim().optional(),
    user_action: z.string().trim().optional(),

    // --- Type and Functionality ---
    site_type: z.string().trim().min(1, { message: 'Please select project type' }),
    features: z.union([z.array(z.string()), z.string()]).optional(),
    features_other: z.string().trim().optional(),

    // --- Design and Content ---
    brand_identity: z.string().trim().optional(),
    design_examples: z.string().trim().optional(),
    content_provider: z.string().trim().optional(),

    // --- Technical Questions ---
    hosting_domain: z.string().trim().optional(),
    integrations: z.string().trim().optional(),

    // --- Budget and Timeline ---
    budget: z.string().trim().optional(),
    deadline: z.string().trim().optional(),

    // --- Additional Info ---
    additional_info: z.string().trim().optional(),
    support: z.union([z.array(z.string()), z.string()]).optional(),

    // --- Legal Consent ---
    consent: z.coerce.boolean().refine((val) => val === true, {
        message: 'You must agree to personal data processing'
    }),
});

// Export TypeScript types
export type ContactFormData = z.infer<typeof ContactFormSchema>;
export type BriefFormData = z.infer<typeof BriefFormSchema>;
