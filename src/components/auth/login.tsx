'use client';
import LoginForm from './login_form';

export default function Login() {
    return (
        <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-lg border border-slate-200">

                {/* ── Left: brand panel ── */}
                <div className="bg-primary-color p-10 flex flex-col justify-between min-h-[560px] md:order-1 order-2">

                    {/* Wordmark */}
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#c9c6ec] mb-1">
                            Patient Portal
                        </p>
                        <h1 className="text-2xl font-bold text-white leading-snug mb-1">
                            Dr. Ankita Chauhan
                        </h1>
                        <p className="text-sm text-[#c9c6ec]">Consultant Gynecologist &amp; Obstetrician</p>
                    </div>

                    {/* Feature list */}
                    <div className="flex flex-col gap-5 my-8">
                        {[
                            {
                                icon: (
                                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                                        <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
                                        <path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                    </svg>
                                ),
                                title: 'Reports & consultation notes',
                                desc: 'Access your visit history and treatment records anytime.',
                            },
                            {
                                icon: (
                                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                                        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
                                        <path d="M2 8h16" stroke="currentColor" strokeWidth="1.4" />
                                        <path d="M6 12h2M10 12h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                    </svg>
                                ),
                                title: 'Book appointments',
                                desc: 'Schedule your consultation at a time that works for you.',
                            },
                            {
                                icon: (
                                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                                        <path d="M10 2a6 6 0 00-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 00-6-6z" stroke="currentColor" strokeWidth="1.4" />
                                        <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
                                    </svg>
                                ),
                                title: 'Confidential, personalized care',
                                desc: 'A private space for your women\'s health journey, at every stage.',
                            },
                        ].map((f) => (
                            <div key={f.title} className="flex items-start gap-3.5">
                                <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20
                  flex items-center justify-center text-[#c9c6ec] flex-shrink-0">
                                    {f.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white mb-0.5">{f.title}</p>
                                    <p className="text-xs text-[#c9c6ec] leading-relaxed">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Clinic info card */}
                    <div className="bg-white/10 border border-white/20 rounded-xl p-4">
                        <p className="text-xs font-bold text-white mb-1">Women Care – Dr. Ankita Chauhan</p>
                        <p className="text-xs text-[#c9c6ec] leading-relaxed">
                            206 B, Botanical Garden Rd, Sri Ram Nagar,<br />
                            Gachibowli, Kondapur, Telangana 500084<br />
                            +91 98812 79493
                        </p>
                    </div>

                </div>

                {/* ── Right: form panel ── */}
                <div className="bg-white p-10 flex flex-col justify-center md:order-2 order-1">
                    <LoginForm />
                </div>

            </div>
        </div>
    );
}