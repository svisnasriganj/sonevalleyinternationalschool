'use client';

import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { SCHOOL_NAME } from '@/lib/school';
import { Download, ExternalLink } from 'lucide-react';

export default function MandatoryDisclosurePage() {
  return (
    <div className="bg-white text-gray-900">
      <SiteNav />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">📋</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mandatory <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Disclosure</span>
          </h1>
          <p className="text-xl text-gray-600">
            Complete information about {SCHOOL_NAME} as per CBSE regulations and government requirements
          </p>
        </div>
      </section>

      {/* School Information */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">School Information</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 shadow-lg">
              <h3 className="text-2xl font-bold text-blue-700 mb-6">Basic Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">School Name:</span>
                  <span>{SCHOOL_NAME}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Affiliation Number:</span>
                  <span>3330XXX (CBSE)</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">School Code:</span>
                  <span>33XXX</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Year of Establishment:</span>
                  <span>2013</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Academic Session:</span>
                  <span>April to March</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Board Affiliation:</span>
                  <span>CBSE, New Delhi</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100 shadow-lg">
              <h3 className="text-2xl font-bold text-green-700 mb-6">Contact Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Address:</span>
                  <span className="text-right">Nasriganj, Rohtas, Bihar 803101</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Phone:</span>
                  <span>+91-8863046790</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Email:</span>
                  <span>svisnasriganj@gmail.com</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Website:</span>
                  <span>www.sonevalley.in</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Principal Name:</span>
                  <span>[Principal Name]</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Principal Qualification:</span>
                  <span>M.A., B.Ed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Infrastructure Details */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Infrastructure & Facilities</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 border">
                <h4 className="text-lg font-bold mb-4 text-purple-700">Academic Infrastructure</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Total Classrooms: 25</li>
                  <li>• Smart Classrooms: 15</li>
                  <li>• Computer Lab: 1</li>
                  <li>• Science Labs: 2</li>
                  <li>• Library: 1 (5000+ books)</li>
                  <li>• Playground Area: 2 acres</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 border">
                <h4 className="text-lg font-bold mb-4 text-blue-700">Safety & Security</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• CCTV Surveillance: 24/7</li>
                  <li>• Fire Safety: Compliant</li>
                  <li>• Building Safety: Certified</li>
                  <li>• Security Guards: 3</li>
                  <li>• First Aid Facility: Available</li>
                  <li>• Emergency Exits: 4</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 border">
                <h4 className="text-lg font-bold mb-4 text-green-700">Student Services</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Total Students: 500+</li>
                  <li>• Transport Facility: Available</li>
                  <li>• Clean Drinking Water: RO System</li>
                  <li>• Separate Toilets: Boys/Girls</li>
                  <li>• Medical Room: 1</li>
                  <li>• Canteen: Hygienic</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Faculty Information */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Faculty & Staff</h3>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold mb-4 text-purple-700">Teaching Staff</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Principal:</span>
                      <span className="font-semibold">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vice Principal:</span>
                      <span className="font-semibold">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PGTs:</span>
                      <span className="font-semibold">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TGTs:</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PRTs:</span>
                      <span className="font-semibold">15</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-4 text-pink-700">Non-Teaching Staff</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Administrative Staff:</span>
                      <span className="font-semibold">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lab Assistants:</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Librarian:</span>
                      <span className="font-semibold">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Support Staff:</span>
                      <span className="font-semibold">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Personnel:</span>
                      <span className="font-semibold">3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Important Documents</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: "CBSE Affiliation Certificate", type: "PDF" },
                { name: "NOC from State Government", type: "PDF" },
                { name: "Building Safety Certificate", type: "PDF" },
                { name: "Fire Safety Certificate", type: "PDF" },
                { name: "Water, Health & Sanitation Certificate", type: "PDF" },
                { name: "Annual Academic Calendar", type: "PDF" },
                { name: "Fee Structure", type: "PDF" },
                { name: "School Managing Committee", type: "PDF" },
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded">
                      <Download className="text-red-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-500">{doc.type} Document</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <span>Download</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Information */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Academic Information</h3>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-100">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-lg font-bold mb-4 text-cyan-700">Classes Offered</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Nursery to Class X</li>
                    <li>• English Medium</li>
                    <li>• CBSE Curriculum</li>
                    <li>• Co-educational</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold mb-4 text-blue-700">Medium of Instruction</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Primary: English</li>
                    <li>• Secondary: English</li>
                    <li>• Additional Languages: Hindi</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold mb-4 text-indigo-700">Academic Year</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Session: April - March</li>
                    <li>• Working Days: 220+</li>
                    <li>• Teaching Hours: 6 hours/day</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* School Management */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">School Management</h3>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold mb-4 text-orange-700">Management Committee</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold">Chairperson:</p>
                      <p className="text-gray-700">Shri [Name]</p>
                    </div>
                    <div>
                      <p className="font-semibold">Principal:</p>
                      <p className="text-gray-700">[Principal Name]</p>
                    </div>
                    <div>
                      <p className="font-semibold">Parent Representatives:</p>
                      <p className="text-gray-700">2 Members</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold mb-4 text-red-700">Administrative Details</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold">Trust/Society:</p>
                      <p className="text-gray-700">[Trust Name]</p>
                    </div>
                    <div>
                      <p className="font-semibold">Registration:</p>
                      <p className="text-gray-700">Registered under Society Act</p>
                    </div>
                    <div>
                      <p className="font-semibold">Status:</p>
                      <p className="text-gray-700">Private Unaided</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need More Information?</h2>
          <p className="text-lg mb-8 opacity-90">
            For any additional information or clarifications regarding this mandatory disclosure, please contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918863046790"
              className="bg-white text-amber-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Call: +91-8863046790
            </a>
            <a
              href="mailto:svisnasriganj@gmail.com"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition"
            >
              Email: svisnasriganj@gmail.com
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}