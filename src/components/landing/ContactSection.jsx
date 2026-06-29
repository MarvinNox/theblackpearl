import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import SectionLabel from './SectionLabel';

export default function ContactSection() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    toast({ title: "Message sent!", description: "We'll get back to you shortly." });
    setForm({ name: '', email: '', company: '', message: '' });
  };

  const inputClass = (field) =>
    `w-full bg-transparent border-b ${
      errors[field] ? 'border-red-500' : form[field] ? 'border-foreground/60' : 'border-foreground/20'
    } py-4 font-body text-sm text-pearl placeholder:text-foreground/30 focus:outline-none focus:border-foreground/60 transition-colors duration-300`;

  return (
    <section id="contact" className="relative py-32 md:py-44 px-6 md:px-10 bg-void">
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel label="Contact" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-heading font-semibold text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-pearl">
              Start a conversation
            </h2>
            <p className="mt-6 font-body text-base leading-relaxed text-mercury max-w-sm">
              Tell us about your project and we'll get back to you within 24 hours with a plan.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-40" />
              </div>
              <span className="font-mono text-xs tracking-wider text-mercury uppercase">
                Direct line · Available now
              </span>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-2"
          >
            <div>
              <input type="text" placeholder="Your name" value={form.name}
                onChange={(e) => handleChange('name', e.target.value)} className={inputClass('name')} />
              {errors.name && <p className="text-red-500 text-xs mt-1 font-mono">{errors.name}</p>}
            </div>
            <div>
              <input type="email" placeholder="Email address" value={form.email}
                onChange={(e) => handleChange('email', e.target.value)} className={inputClass('email')} />
              {errors.email && <p className="text-red-500 text-xs mt-1 font-mono">{errors.email}</p>}
            </div>
            <div>
              <input type="text" placeholder="Company (optional)" value={form.company}
                onChange={(e) => handleChange('company', e.target.value)} className={inputClass('company')} />
            </div>
            <div>
              <textarea placeholder="Tell us about your project" value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                rows={4} className={`${inputClass('message')} resize-none`} />
              {errors.message && <p className="text-red-500 text-xs mt-1 font-mono">{errors.message}</p>}
            </div>

            <div className="pt-6">
              <button type="submit" disabled={sending}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-mono text-xs tracking-wider uppercase hover:gap-5 transition-all duration-300 disabled:opacity-50"
              >
                {sending ? (<>Sending <Loader2 className="w-4 h-4 animate-spin" /></>) : (<>Send message <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></>)}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}