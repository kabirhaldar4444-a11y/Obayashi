import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, FileText, Globe, Eye } from 'lucide-react';

const policies = {
  "privacy-policy": {
    title: "Privacy Policy",
    subtitle: "How Obayashi protects your personal data and maintains online confidentiality.",
    icon: <ShieldCheck size={36} className="text-red" />,
    content: [
      {
        section: "1. Core Commitment",
        text: "Obayashi Corporation values corporate transparency and personal data confidentiality. We process personal details strictly in compliance with global security regulations, including the General Data Protection Regulation (GDPR) and regional Japanese private data laws."
      },
      {
        section: "2. Information Cataloging",
        text: "We collect identifiers (such as names, emails, and corporate entities) solely via submission tickets (e.g. inquiry tickets). We do not sell or lease this data. Server parameters capture basic browser metrics for analytical optimization purposes only."
      },
      {
        section: "3. Retention & Security",
        text: "We implement firewalls and structural controls to prevent data exposure or unauthorized alteration. Captured records are deleted once their processing purpose (such as responding to inquiries) is finalized."
      }
    ]
  },
  "terms-of-use": {
    title: "Terms of Use",
    subtitle: "Operational parameters and legal frameworks governing your use of this portal.",
    icon: <FileText size={36} className="text-blue" />,
    content: [
      {
        section: "1. Intellectual Property rights",
        text: "All layouts, visual branding indicators, trademark marks, and technology blueprints are the intellectual property of Obayashi or its licensors. Written content is licensed for private viewing purposes. Reproduction requires explicit authorization."
      },
      {
        section: "2. Disclaimers of Liability",
        text: "We strive to maintain accurate data across this website. However, Obayashi is not liable for temporal inaccuracies, download errors, or service delays. Financial details represent historical indices and must not be treated as investment counsel."
      },
      {
        section: "3. Linking Policy",
        text: "You may link to this website provided the link initiates a full browser window without iframe framing. We reserve the right to request link removal if the source site contains illegal material."
      }
    ]
  },
  "social-media-policy": {
    title: "Social Media Policy",
    subtitle: "Guidelines and codes of conduct for our corporate profiles and brand representatives.",
    icon: <Globe size={36} className="text-red" />,
    content: [
      {
        section: "1. Official Brand Statements",
        text: "Official press updates and corporate announcements are issued exclusively via this website and formal IR news channels. Statements posted by individual staff members on private social profiles do not constitute official Obayashi policy."
      },
      {
        section: "2. Comment Moderation",
        text: "We welcome discussions on our official social networks (such as LinkedIn, YouTube). However, comments containing commercial spam, personal abuse, or intellectual infringement will be removed immediately."
      },
      {
        section: "3. Compliance & Copyrights",
        text: "All corporate postings adhere to copyright laws, privacy policies, and local fair-competition rules. We verify facts and sources before posting updates."
      }
    ]
  },
  "accessibility": {
    title: "Web Accessibility Standards",
    subtitle: "Our commitment to ensuring this site is usable for everyone, including those with visual aids.",
    icon: <Eye size={36} className="text-blue" />,
    content: [
      {
        section: "1. Target Standards",
        text: "Obayashi aims to align its digital portals with the Web Content Accessibility Guidelines (WCAG 2.1) Level AA parameters. We design layouts to render cleanly on screen-readers, text-magnifiers, and keyboard navigation systems."
      },
      {
        section: "2. Design Implementations",
        text: "We enforce high color contrast, add alt text to images, support text scaling, and use tabbed indices for clean keyboard-only browsing. Interactive forms feature visual errors and clear ARIA labels."
      },
      {
        section: "3. Ongoing Audits",
        text: "We evaluate our components regularly, checking pages for broken links, contrast anomalies, and accessibility issues. Feedback can be submitted through our Contact desk."
      }
    ]
  }
};

export default function UtilityPage() {
  const { policyId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [policyId]);

  const policy = policies[policyId];

  if (!policy) {
    return (
      <div className="container section-padding text-center">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Policy Document Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>The requested document could not be located.</p>
        <Link to="/" className="btn-primary">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="utility-page fade-in">
      <div className="page-hero-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.75)), url(/images/ones_tower.png)` }}>
        <div className="container hero-banner-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ marginBottom: '16px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '50%' }}>
            {policy.icon}
          </div>
          <h1 className="hero-banner-title">{policy.title}</h1>
          <p className="hero-banner-subtitle" style={{ maxWidth: '600px' }}>{policy.subtitle}</p>
        </div>
      </div>

      <div className="container section-padding" style={{ maxWidth: '800px' }}>
        <div className="policy-content-wrapper">
          {policy.content.map((item, idx) => (
            <div key={idx} className="policy-section" style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px', color: 'var(--dark-main)' }}>
                {item.section}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.75' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
