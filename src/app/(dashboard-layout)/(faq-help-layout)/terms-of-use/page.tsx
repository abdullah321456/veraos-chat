import { FadeAnimation } from "@/components/atom/fade-animatation";

export default function TermsOfUsePage() {
  return (
    <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 md:px-8">
      <FadeAnimation>
        <h1 className="text-black text-lg sm:text-xl md:text-[24px] font-bold text-center my-6 sm:my-8">
          Terms of Use & Acceptable Use Cases
        </h1>
        
        <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
          {/* Introduction */}
          <section>
            <h2 className="text-black text-base sm:text-lg font-bold mb-3 sm:mb-4">Introduction</h2>
            <p className="text-black text-xs sm:text-sm leading-relaxed">
              By using Veraos, you agree to abide by these terms of use and acceptable use cases. 
              These terms govern your use of our AI-powered search and investigation platform.
            </p>
          </section>

          {/* Acceptable Use Cases */}
          <section>
            <h2 className="text-black text-base sm:text-lg font-bold mb-3 sm:mb-4">Acceptable Use Cases</h2>
            <div className="space-y-2 sm:space-y-3">
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-black text-sm sm:text-base font-semibold mb-1 sm:mb-2">✅ Authorized Investigations</h3>
                <p className="text-black text-xs sm:text-sm">
                  Use for legitimate law enforcement, private investigation, background checks, 
                  and other authorized investigative purposes.
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-black text-sm sm:text-base font-semibold mb-1 sm:mb-2">✅ Compliance & Due Diligence</h3>
                <p className="text-black text-xs sm:text-sm">
                  Conducting compliance checks, due diligence for business transactions, 
                  and regulatory compliance activities.
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-black text-sm sm:text-base font-semibold mb-1 sm:mb-2">✅ Risk Assessment</h3>
                <p className="text-black text-xs sm:text-sm">
                  Assessing potential risks for business partnerships, employment, 
                  or other professional relationships.
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-black text-sm sm:text-base font-semibold mb-1 sm:mb-2">✅ Fraud Prevention</h3>
                <p className="text-black text-xs sm:text-sm">
                  Investigating potential fraud, identity theft, or other criminal activities 
                  for prevention and detection purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section>
            <h2 className="text-black text-base sm:text-lg font-bold mb-3 sm:mb-4">Prohibited Uses</h2>
            <div className="space-y-2 sm:space-y-3">
              <div className="bg-red-50 p-3 sm:p-4 rounded-lg border-l-4 border-red-400">
                <h3 className="text-black text-sm sm:text-base font-semibold mb-1 sm:mb-2">❌ Unauthorized Surveillance</h3>
                <p className="text-black text-xs sm:text-sm">
                  Using the platform for unauthorized surveillance, stalking, or harassment of individuals.
                </p>
              </div>
              
              <div className="bg-red-50 p-3 sm:p-4 rounded-lg border-l-4 border-red-400">
                <h3 className="text-black text-sm sm:text-base font-semibold mb-1 sm:mb-2">❌ Personal Vendettas</h3>
                <p className="text-black text-xs sm:text-sm">
                  Using the platform for personal vendettas, revenge, or non-professional purposes.
                </p>
              </div>
              
              <div className="bg-red-50 p-3 sm:p-4 rounded-lg border-l-4 border-red-400">
                <h3 className="text-black text-sm sm:text-base font-semibold mb-1 sm:mb-2">❌ Discrimination</h3>
                <p className="text-black text-xs sm:text-sm">
                  Using information obtained to discriminate against individuals based on protected characteristics.
                </p>
              </div>
              
              <div className="bg-red-50 p-3 sm:p-4 rounded-lg border-l-4 border-red-400">
                <h3 className="text-black text-sm sm:text-base font-semibold mb-1 sm:mb-2">❌ Data Resale</h3>
                <p className="text-black text-xs sm:text-sm">
                  Reselling, redistributing, or commercializing data obtained through the platform.
                </p>
              </div>
            </div>
          </section>

          {/* Legal Compliance */}
          <section>
            <h2 className="text-black text-base sm:text-lg font-bold mb-3 sm:mb-4">Legal Compliance</h2>
            <div className="space-y-2 sm:space-y-3">
              <p className="text-black text-xs sm:text-sm leading-relaxed">
                Users must comply with all applicable laws and regulations, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-black text-xs sm:text-sm pl-2 sm:pl-0">
                <li>Fair Credit Reporting Act (FCRA)</li>
                <li>Gramm-Leach-Bliley Act (GLBA)</li>
                <li>Health Insurance Portability and Accountability Act (HIPAA)</li>
                <li>State and local privacy laws</li>
                <li>International data protection regulations</li>
              </ul>
            </div>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-black text-base sm:text-lg font-bold mb-3 sm:mb-4">Data Protection & Privacy</h2>
            <div className="space-y-2 sm:space-y-3">
              <p className="text-black text-xs sm:text-sm leading-relaxed">
                Users are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-black text-xs sm:text-sm pl-2 sm:pl-0">
                <li>Securing access credentials and preventing unauthorized access</li>
                <li>Using data only for authorized purposes</li>
                <li>Maintaining appropriate data retention and disposal practices</li>
                <li>Respecting individual privacy rights</li>
                <li>Reporting any data breaches or security incidents</li>
              </ul>
            </div>
          </section>

          {/* Consequences */}
          <section>
            <h2 className="text-black text-base sm:text-lg font-bold mb-3 sm:mb-4">Consequences of Violation</h2>
            <div className="space-y-2 sm:space-y-3">
              <p className="text-black text-xs sm:text-sm leading-relaxed">
                Violation of these terms may result in:
              </p>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-black text-xs sm:text-sm pl-2 sm:pl-0">
                <li>Immediate account suspension or termination</li>
                <li>Legal action and potential civil or criminal penalties</li>
                <li>Reporting to relevant authorities</li>
                <li>Liability for damages caused by misuse</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-black text-base sm:text-lg font-bold mb-3 sm:mb-4">Contact Information</h2>
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <p className="text-black text-xs sm:text-sm leading-relaxed">
                If you have questions about these terms or need to report a violation, 
                please contact our legal team at{' '}
                <span className="text-primary font-medium">legal@veraos.io</span>
              </p>
            </div>
          </section>

          {/* Last Updated */}
          <section className="border-t pt-4 sm:pt-6">
            <p className="text-gray-500 text-xs text-center">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </section>
        </div>
      </FadeAnimation>
    </div>
  );
}

