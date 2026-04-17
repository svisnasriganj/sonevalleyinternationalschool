'use client';

import { useState } from 'react';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { SCHOOL_NAME } from '@/lib/school';

export default function CareersPage() {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    purpose: ''
  });

  // Replace this URL with your Google Apps Script Web App URL
  const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbxJxFgUw8-Z-GcnsR8zi6kEF_kiB5J_3Vy_dpEwaxwKtB2dFPGQymrOv6op1YyjPPMl/exec';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create URL with parameters to avoid CORS issues
      const params = new URLSearchParams({
        name: applicationData.name,
        phoneNumber: applicationData.phoneNumber,
        address: applicationData.address,
        purpose: applicationData.purpose,
        page: 'careers'
      });

      // Use GET request with parameters
      const response = await fetch(`${WEBAPP_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'cors'
      });

      const result = await response.json();

      alert('Application submitted successfully! We will contact you soon.');
      setShowApplicationForm(false);
      setApplicationData({
        name: '',
        phoneNumber: '',
        address: '',
        purpose: ''
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your application. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-gray-900">
      <SiteNav onOpenApplicationForm={() => setShowApplicationForm(true)} />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Team</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Shape the future of education at {SCHOOL_NAME}. We're looking for passionate educators and dedicated staff members.
          </p>
          <button
            onClick={() => setShowApplicationForm(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg transition transform hover:scale-105"
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Current Openings</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Teaching Positions */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 shadow-lg">
              <div className="text-4xl mb-4">👩‍🏫</div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">Teaching Positions</h3>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Primary Teachers (Grades 1-5)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Middle School Teachers (Grades 6-8)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Secondary Teachers (Grades 9-10)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Pre-Primary Teachers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Subject Specialists (Math, Science, English)</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setApplicationData(prev => ({ ...prev, purpose: 'Teaching' }));
                  setShowApplicationForm(true);
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Apply for Teaching Position
              </button>
            </div>

            {/* Staff Positions */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100 shadow-lg">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">Staff Positions</h3>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Administrative Assistant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Library Assistant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Lab Technician</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Sports Coordinator</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Security Staff</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setApplicationData(prev => ({ ...prev, purpose: 'Staff' }));
                  setShowApplicationForm(true);
                }}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Apply for Staff Position
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Work With Us?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌟",
                title: "Professional Growth",
                desc: "Continuous learning opportunities and career advancement programs"
              },
              {
                icon: "🤝",
                title: "Supportive Environment",
                desc: "Collaborative team culture with experienced mentors and resources"
              },
              {
                icon: "💼",
                title: "Competitive Benefits",
                desc: "Fair compensation, health benefits, and work-life balance"
              },
              {
                icon: "🎯",
                title: "Make a Difference",
                desc: "Shape young minds and contribute to their educational journey"
              },
              {
                icon: "🏆",
                title: "Recognition",
                desc: "Performance-based incentives and appreciation for excellence"
              },
              {
                icon: "📚",
                title: "Modern Facilities",
                desc: "Work with latest educational technology and well-equipped classrooms"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">General Requirements</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-blue-600">For Teaching Positions:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>B.Ed or equivalent teaching qualification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Subject expertise in relevant areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Excellent communication skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Passion for education and student development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Minimum 1-2 years experience (preferred)</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-green-600">For Staff Positions:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Relevant educational qualifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Good communication and interpersonal skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Commitment to educational excellence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Ability to work in a team environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Flexibility and adaptability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h2>
          <p className="text-lg mb-8 opacity-90">
            Submit your application today and become part of our educational mission at {SCHOOL_NAME}
          </p>
          <button
            onClick={() => setShowApplicationForm(true)}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* Application Form Popup */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{zIndex: 9999}}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Career Application</h2>
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 opacity-90">Join the {SCHOOL_NAME} family</p>
            </div>
            
            <form onSubmit={handleApplicationSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={applicationData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={applicationData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter mobile/WhatsApp number"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={2}
                  value={applicationData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter your complete address"
                />
              </div>

              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                  Position Type *
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  required
                  value={applicationData.purpose}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Position</option>
                  <option value="Teaching">Teaching</option>
                  <option value="Staff">Staff</option>
                  <option value="Enquiry">General Enquiry</option>
                </select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Next Steps:</strong> After submitting this form, our HR team will contact you within 24-48 hours to schedule an interview.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}