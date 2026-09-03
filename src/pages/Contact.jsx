import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Mail, Building2, Phone, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    inquiryType: 'Business Inquiry',
    subject: '',
    message: '',
    agreed: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = 'Full Name is required';
    if (!formData.organization.trim()) tempErrors.organization = 'Organization name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email format';
    }
    
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      tempErrors.message = 'Message body is required';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters long';
    }
    
    if (!formData.agreed) tempErrors.agreed = 'You must agree to the privacy policy terms';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error for active field
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate submission
      setTimeout(() => {
        setIsSubmitted(true);
      }, 600);
    }
  };

  return (
    <div className="contact-page fade-in">
      {/* Page Hero */}
      <div className="page-hero-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(/images/ones_tower.png)` }}>
        <div className="container hero-banner-inner">
          <h1 className="hero-banner-title">CONTACT INQUIRIES</h1>
          <p className="hero-banner-subtitle">Get in touch with our commercial operations or investor relations departments</p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="contact-layout-grid">
          {/* Form Side */}
          <div className="contact-form-container">
            {isSubmitted ? (
              <div className="submission-success-card fade-in">
                <CheckCircle2 size={48} className="text-red success-icon" />
                <h3 className="success-title">Inquiry Submitted Successfully</h3>
                <p className="success-text">
                  Thank you for contacting Obayashi. We have cataloged your ticket and forwarded it to our relevant regional desk.
                </p>
                <div className="success-spec-box">
                  <p><strong>Inquiry ID:</strong> OB-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p><strong>Type:</strong> {formData.inquiryType}</p>
                  <p><strong>Reply to:</strong> {formData.email}</p>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      fullName: '',
                      organization: '',
                      email: '',
                      inquiryType: 'Business Inquiry',
                      subject: '',
                      message: '',
                      agreed: false
                    });
                  }}
                  className="btn-primary"
                  style={{ marginTop: '24px' }}
                >
                  <span>Submit Another Inquiry</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-inquiry-form" noValidate>
                <h3 className="form-section-title">Corporate Inquiry Ticket</h3>
                <p className="form-section-subtitle">Please populate all mandatory fields to submit your message.</p>

                {/* Name */}
                <div className="form-field-box">
                  <label className="form-label" htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`form-input-element ${errors.fullName ? 'has-error' : ''}`}
                    placeholder="E.g. John Doe"
                  />
                  {errors.fullName && (
                    <span className="field-error-msg flex-align-center gap-4">
                      <AlertCircle size={12} />
                      <span>{errors.fullName}</span>
                    </span>
                  )}
                </div>

                {/* Organization */}
                <div className="form-field-box">
                  <label className="form-label" htmlFor="organization">Organization *</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className={`form-input-element ${errors.organization ? 'has-error' : ''}`}
                    placeholder="E.g. Engineering Corp"
                  />
                  {errors.organization && (
                    <span className="field-error-msg flex-align-center gap-4">
                      <AlertCircle size={12} />
                      <span>{errors.organization}</span>
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="form-field-box">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input-element ${errors.email ? 'has-error' : ''}`}
                    placeholder="E.g. john@company.com"
                  />
                  {errors.email && (
                    <span className="field-error-msg flex-align-center gap-4">
                      <AlertCircle size={12} />
                      <span>{errors.email}</span>
                    </span>
                  )}
                </div>

                {/* Inquiry Type */}
                <div className="form-field-box">
                  <label className="form-label" htmlFor="inquiryType">Inquiry Classification</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="form-select-element"
                  >
                    <option value="Business Inquiry">Domestic/Overseas Construction Business</option>
                    <option value="IR Inquiry">Investor Relations (Financial & Stock)</option>
                    <option value="ESG Inquiry">Sustainability & ESG Materiality</option>
                    <option value="General Inquiry">General Information Request</option>
                  </select>
                </div>

                {/* Subject */}
                <div className="form-field-box">
                  <label className="form-label" htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`form-input-element ${errors.subject ? 'has-error' : ''}`}
                    placeholder="Inquiry topic..."
                  />
                  {errors.subject && (
                    <span className="field-error-msg flex-align-center gap-4">
                      <AlertCircle size={12} />
                      <span>{errors.subject}</span>
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="form-field-box">
                  <label className="form-label" htmlFor="message">Message Details *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-input-element textarea ${errors.message ? 'has-error' : ''}`}
                    placeholder="Please specify your message details..."
                  />
                  {errors.message && (
                    <span className="field-error-msg flex-align-center gap-4">
                      <AlertCircle size={12} />
                      <span>{errors.message}</span>
                    </span>
                  )}
                </div>

                {/* Privacy Agreement */}
                <div className="form-field-box checkbox-field">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleChange}
                      className="form-checkbox-input"
                    />
                    <span>I agree to the processing of personal data in compliance with Obayashi's Privacy Policy. *</span>
                  </label>
                  {errors.agreed && (
                    <span className="field-error-msg flex-align-center gap-4" style={{ marginTop: '8px' }}>
                      <AlertCircle size={12} />
                      <span>{errors.agreed}</span>
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Submit Inquiry Ticket</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Contact Details Side (Beside Form) */}
          <div className="contact-details-panel">
            {/* Card 1: Departmental Inquiries (India) */}
            <div className="contact-info-card">
              <h3 className="info-card-title">Departmental Inquiries (India)</h3>

              <div className="info-item">
                <Mail size={18} className="info-icon" />
                <div>
                  <h4>Human Resources Division</h4>
                  <p><a href="mailto:hrd@obayashi.in" className="hover:text-[var(--primary-red)] font-semibold transition-colors">hrd@obayashi.in</a></p>
                  <span className="text-[12px] text-gray-500">General HR queries and employee relations</span>
                </div>
              </div>

              <div className="info-item">
                <Mail size={18} className="info-icon" />
                <div>
                  <h4>Legal & Compliance Affairs</h4>
                  <p><a href="mailto:legal@obayashi.in" className="hover:text-[var(--primary-red)] font-semibold transition-colors">legal@obayashi.in</a></p>
                  <span className="text-[12px] text-gray-500">Contractual, regulatory & compliance notices</span>
                </div>
              </div>

              <div className="info-item">
                <Mail size={18} className="info-icon" />
                <div>
                  <h4>Careers & Recruitment Desk</h4>
                  <p><a href="mailto:recruitment@obayashi.in" className="hover:text-[var(--primary-red)] font-semibold transition-colors">recruitment@obayashi.in</a></p>
                  <span className="text-[12px] text-gray-500">Job applications and career opportunities</span>
                </div>
              </div>

              <div className="info-item">
                <Mail size={18} className="info-icon" />
                <div>
                  <h4>Talent Acquisition Team</h4>
                  <p><a href="mailto:talent@obayashi.in" className="hover:text-[var(--primary-red)] font-semibold transition-colors">talent@obayashi.in</a></p>
                  <span className="text-[12px] text-gray-500">Specialized executive & engineering hiring</span>
                </div>
              </div>

              <div className="info-item">
                <Mail size={18} className="info-icon" />
                <div>
                  <h4>Employee Onboarding Services</h4>
                  <p><a href="mailto:onboard@obayashi.in" className="hover:text-[var(--primary-red)] font-semibold transition-colors">onboard@obayashi.in</a></p>
                  <span className="text-[12px] text-gray-500">New hire documentations and orientation</span>
                </div>
              </div>
            </div>

            {/* Card 2: Direct Telephones (India) - Below Departmental Inquiries */}
            <div className="contact-info-card" style={{ marginTop: '24px' }}>
              <h3 className="info-card-title">Direct Telephones (India)</h3>

              <div className="info-item">
                <Phone size={18} className="info-icon" />
                <div>
                  <h4>Direct Line 1</h4>
                  <p><a href="tel:02241504282" className="hover:text-[var(--primary-red)] font-semibold transition-colors">022-41504282</a></p>
                  <span className="text-[12px] text-gray-500">General administration & board assistance</span>
                </div>
              </div>

              <div className="info-item">
                <Phone size={18} className="info-icon" />
                <div>
                  <h4>Direct Line 2</h4>
                  <p><a href="tel:02241504283" className="hover:text-[var(--primary-red)] font-semibold transition-colors">022-41504283</a></p>
                  <span className="text-[12px] text-gray-500">Commercial projects & vendor coordination</span>
                </div>
              </div>

              <div className="info-item">
                <Phone size={18} className="info-icon" />
                <div>
                  <h4>Direct Line 3</h4>
                  <p><a href="tel:02241504284" className="hover:text-[var(--primary-red)] font-semibold transition-colors">022-41504284</a></p>
                  <span className="text-[12px] text-gray-500">Human resources & employee affairs</span>
                </div>
              </div>

              <div className="info-item">
                <Phone size={18} className="info-icon" />
                <div>
                  <h4>Direct Line 4</h4>
                  <p><a href="tel:02241504285" className="hover:text-[var(--primary-red)] font-semibold transition-colors">022-41504285</a></p>
                  <span className="text-[12px] text-gray-500">Legal, contracts & compliance desk</span>
                </div>
              </div>

              <div className="info-item">
                <Phone size={18} className="info-icon" />
                <div>
                  <h4>Direct Line 5</h4>
                  <p><a href="tel:02241504286" className="hover:text-[var(--primary-red)] font-semibold transition-colors">022-41504286</a></p>
                  <span className="text-[12px] text-gray-500">Engineering & technical assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Headquarters & Security Notice Section */}
        <div style={{ marginTop: '48px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="contact-info-card">
              <h3 className="info-card-title">Corporate Headquarters</h3>
              
              <div className="info-item">
                <Building2 size={18} className="info-icon" />
                <div>
                  <h4>OBAYASHI CORPORATION (Japan HQ)</h4>
                  <p>Umeda Sky Building, 1-1-88 Oyodonaka, Kita-ku, Osaka 531-0076, Japan</p>
                </div>
              </div>

              <div className="info-item">
                <Building2 size={18} className="info-icon" />
                <div>
                  <h4>OBAYASHI CORPORATION (Asia HQ)</h4>
                  <p>The Ruby, 9th Floor, 29, Senapati Bapat Marg, Dadar West, Mumbai, Maharashtra 400028, India</p>
                </div>
              </div>

              <div className="info-item">
                <Phone size={18} className="info-icon" />
                <div>
                  <h4>Central Office Board (India)</h4>
                  <p className="font-semibold text-[var(--dark-main)]">
                    <a href="tel:02241504282" className="hover:text-[var(--primary-red)] transition-colors">022-41504282</a> &nbsp;/&nbsp; <a href="tel:02241504283" className="hover:text-[var(--primary-red)] transition-colors">022-41504283</a>
                  </p>
                  <span className="text-[12px] text-gray-500 block mt-1">Available Mon–Fri, 9:00 AM – 6:00 PM IST</span>
                </div>
              </div>
            </div>

            <div className="contact-security-card">
              <div className="security-card-header">
                <ShieldCheck size={20} className="text-red" />
                <h4>Security & Governance Notice</h4>
              </div>
              <p className="security-card-text">
                Verify any email source carefully. Official correspondence from Obayashi Corporation in India originates solely from verified <strong>@obayashi.in</strong> domains. Obayashi Corporation does not issue transactional funds requests or recruitment fees through unverified external email platforms. Report any suspicious correspondences impersonating Obayashi management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
