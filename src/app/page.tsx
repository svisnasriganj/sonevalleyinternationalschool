'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Star, CheckCircle, ChevronLeft, ChevronRight, Play, Shield, Droplets } from 'lucide-react';
import Image from 'next/image';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { NOTICES } from '@/data/notices';
import { SCHOOL_NAME } from '@/lib/school';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const previewNotices = NOTICES.slice(0, 3);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
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

  const heroImages = [
    { src: '/images/school_front_second_angle_sonevalley_nasriganj_rohtas.jpeg', alt: 'School Front View' },
    { src: '/images/school front image sonevalley_nasriganj_rohtas.jpeg', alt: 'Main Building' },
    { src: '/images/beautiful_premises_indoor_corridor_sonevalley_nasriganj_rohtas.jpeg', alt: 'School Corridors' },
    { src: '/images/kids_classroom_with_teacher_and_students_sonevalley_international_school_nasriganj_rohtas.jpeg', alt: 'Kids Classroom' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentHeroSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

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
        page: 'main'
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
      
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918863046790"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 z-50 flex items-center justify-center group"
        aria-label="WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
        </svg>
      </a>
      
      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setShowApplicationForm(true)}
        className={`fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-4 rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 z-50 flex items-center gap-2 group ${
          showFloatingButton ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
        aria-label="Apply Now"
      >
        <span className="hidden sm:inline">Apply Now</span>
        <span className="text-2xl group-hover:rotate-12 transition-transform">🎓</span>
      </button>

      {/* HERO WITH CAROUSEL */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-6 animate-fadeIn">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              Est. 2013 • CBSE Affiliated • English Medium
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Shaping future{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">leaders</span>{' '}
              with values &amp; excellence
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Give your child the gift of quality education in a safe, nurturing environment. {SCHOOL_NAME} — where every child&apos;s future begins with care, confidence, and excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg hover:shadow-xl transition transform hover:scale-105"
                onClick={() => setShowApplicationForm(true)}
              >
                Apply now
              </button>
            </div>
          </div>

          <div className="relative w-full min-h-[280px] md:min-h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 group">
            {heroImages.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentHeroSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
            
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition z-10"
            >
              <ChevronLeft className="text-blue-600" size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition z-10"
            >
              <ChevronRight className="text-blue-600" size={24} />
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroSlide(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === currentHeroSlide ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-white border-y border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: '12+', l: 'Years of excellence' },
            { n: '500+', l: 'Active students' },
            { n: 'CBSE', l: 'Curriculum' },
            { n: '20+', l: 'Qualified teachers' },
          ].map((x) => (
            <div key={x.l} className="text-center space-y-2">
              <div className="text-blue-600 text-4xl font-bold">{x.n}</div>
              <p className="text-gray-600 font-medium">{x.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NOTICE BOARD (preview) */}
      <section id="notice-board" className="py-20 px-4 bg-amber-50/60 border-y border-amber-100 scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Notice board</h2>
              <p className="text-gray-600 max-w-2xl">
                Important circulars and updates for parents and students of {SCHOOL_NAME}.
              </p>
            </div>
            <Link
              href="/notice-board"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shrink-0"
            >
              View all notices
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {previewNotices.map((n) => (
              <article
                key={n.id}
                className="bg-white rounded-xl border border-amber-100/80 shadow-sm p-5 hover:shadow-md transition"
              >
                <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-2">
                  {new Date(n.date + 'T12:00:00').toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                  {n.category ? ` · ${n.category}` : ''}
                </p>
                <h3 className="font-bold text-gray-900 mb-2 leading-snug">{n.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{n.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">About {SCHOOL_NAME}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Established in 2013, we have been nurturing young minds with dedication, innovation, and care for over a decade.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg group">
                <Image
                  src="/images/Director_Sir_inoffice_sonevalley_international_school_nasriganj_rohtas.jpeg"
                  alt="Director"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg group">
                <Image
                  src="/images/Director_maam_sonevalley_international_school_nasriganj_rohtas.jpeg"
                  alt="Director"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border-l-4 border-blue-600 shadow-md hover:shadow-xl transition">
                <h3 className="text-2xl font-bold mb-3 text-blue-600 flex items-center gap-2">
                  <span className="text-3xl">🎯</span>
                  Our vision
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To develop every child into a confident, compassionate, and capable individual who contributes
                  positively to society and leads with integrity and wisdom.
                </p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-white p-6 rounded-xl border-l-4 border-cyan-600 shadow-md hover:shadow-xl transition">
                <h3 className="text-2xl font-bold mb-3 text-cyan-600 flex items-center gap-2">
                  <span className="text-3xl">🚀</span>
                  Our mission
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Provide world-class education fostering intellectual growth, moral values, and social responsibility
                  in a safe, inclusive, and technologically advanced environment.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border-l-4 border-purple-600 shadow-md hover:shadow-xl transition">
                <h3 className="text-2xl font-bold mb-3 text-purple-600 flex items-center gap-2">
                  <span className="text-3xl">💡</span>
                  Our values
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Excellence in education, integrity in action, compassion in interaction, and innovation in approach — 
                  these core values guide everything we do at {SCHOOL_NAME}.
                </p>
              </div>
            </div>
          </div>
          
          {/* Mandatory Disclosure Button */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200 max-w-2xl mx-auto">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mandatory Disclosure</h3>
              <p className="text-gray-600 mb-6">
                View our complete school information including CBSE affiliation, infrastructure details, and regulatory compliance documents.
              </p>
              <a
                href="/mandatory-disclosure"
                className="inline-flex items-center bg-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 shadow-lg transition transform hover:scale-105"
              >
                <span>View Mandatory Disclosure</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECTOR & PRINCIPAL */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Leadership messages</h2>
          <p className="text-center text-gray-600 mb-14 max-w-2xl mx-auto">
            Words from our director and principal on the culture of learning and care at {SCHOOL_NAME}.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg hover:shadow-xl transition">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-200 shrink-0 shadow-md">
                  <Image
                    src="/images/Director_Sir_inoffice_sonevalley_international_school_nasriganj_rohtas.jpeg"
                    alt="Director Shri Suresh Singh"
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div>
                  <p className="font-bold text-lg text-gray-900">Director&apos;s message</p>
                  <p className="text-blue-700 font-semibold">Shri Suresh Singh</p>
                  <p className="text-sm text-gray-500">Director</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic border-l-4 border-blue-500 pl-4 mb-4">
                &ldquo;Education must ignite curiosity and character together. At {SCHOOL_NAME}, we invest in modern
                infrastructure, trained educators, and a value system that prepares children not only for examinations,
                but for life.&rdquo;
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                We are committed to safe campuses, transparent communication with parents, and continuous improvement
                across academics and co-curricular programmes.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-cyan-50 to-white p-8 shadow-lg hover:shadow-xl transition">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-cyan-200 shrink-0 shadow-md">
                  <Image
                    src="/images/principal_sir_image_sonevalley_international_school_nasriganj_rohtas.jpeg"
                    alt="Principal"
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div>
                  <p className="font-bold text-lg text-gray-900">Principal&apos;s message</p>
                  <p className="text-cyan-800 font-semibold">Principal</p>
                  <p className="text-sm text-gray-500">{SCHOOL_NAME}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic border-l-4 border-cyan-500 pl-4 mb-4">
                &ldquo;Our teachers focus on every learner&apos;s potential. We blend discipline with warmth, rigorous
                academics with sports and arts, so each child feels seen and challenged in the right measure.&rdquo;
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                We invite parents to partner with us through PTMs, notice boards, and open dialogue — together we build
                responsible young citizens.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-gray-200 bg-gradient-to-br from-purple-50 to-white p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-purple-200 shrink-0 shadow-md">
                <Image
                  src="/images/Director_maam_sonevalley_international_school_nasriganj_rohtas.jpeg"
                  alt="Director Ma'am"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900 mb-1">Co-Director&apos;s message</p>
                <p className="text-purple-700 font-semibold mb-3">Director Ma&apos;am</p>
                <p className="text-gray-700 leading-relaxed italic border-l-4 border-purple-500 pl-4">
                  &ldquo;Every child deserves a nurturing environment where they can discover their unique strengths. At {SCHOOL_NAME}, 
                  we prioritize emotional well-being alongside academic achievement, ensuring that each student grows into a 
                  confident, compassionate individual ready to contribute positively to society.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEET OUR STUDENTS */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Meet our students</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Confident, well-groomed, and ready to excel — our students are a testament to the values and discipline we nurture at {SCHOOL_NAME}.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Our Young Leaders',
                image: '/images/confident_students_in_dress_sonevalley_international_school_nasriganj_rohtas.jpeg',
              },
              {
                name: 'Future Achievers',
                image: '/images/two_male_kids_in_school_uniform_in_dress_sonevalley_international_school_nasriganj_rohtas.jpeg',
              },
              {
                name: 'Bright Minds',
                image: '/images/two_female_kids_in_school_uniform_in_dress_sonevalley_international_school_nasriganj_rohtas.jpeg',
              },
            ].map((student, i) => (
              <div
                key={i}
                className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`relative ${i === 0 ? 'h-64' : 'h-80'} bg-gradient-to-br from-blue-100 to-purple-100`}>
                  <Image
                    src={student.image}
                    alt={student.name}
                    fill
                    className={`${i === 0 ? 'object-cover' : 'object-cover'} group-hover:scale-110 transition-transform duration-500`}
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-bold text-lg">{student.name}</p>
                  <p className="text-sm text-gray-200">Dressed in pride, ready for success</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Our students wear their uniform with pride, representing the values of discipline, unity, and excellence that 
              {SCHOOL_NAME} stands for. Each child is groomed to be confident, respectful, and ready to take on the world.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section id="why-choose" className="py-20 px-4 bg-gray-50 scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Why choose us?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We combine academic rigor with holistic development so every child thrives at {SCHOOL_NAME}.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🎓', title: 'Smart classrooms', desc: 'Interactive boards, modern pedagogy, tech-enabled learning' },
              { icon: '🌍', title: 'English medium', desc: 'Strong foundation in communication and global readiness' },
              { icon: '👥', title: 'Focused attention', desc: 'Healthy student–teacher ratio and personalised support' },
              { icon: '🛡️', title: 'Safe campus', desc: 'CCTV, trained staff, and structured entry–exit protocols' },
              { icon: '🚌', title: 'Transport', desc: 'GPS-enabled fleet and trained crew on key routes' },
              { icon: '⚽', title: 'Sports & activities', desc: 'Integrated co-curricular and sports programmes' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMICS — full image visible */}
      <section id="academics" className="py-20 px-4 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our academic programmes</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                stage: 'Pre-Primary',
                age: 'Ages 3–5',
                desc: 'Play-based learning with focus on motor & cognitive development in a nurturing environment',
                image: '/images/beautiful_classroom_with_kids_and_teachers_sonevalley_international_school_nasriganj_rohtas.jpeg',
                images: [
                  '/images/kids_classroom_with_teacher_and_students_sonevalley_international_school_nasriganj_rohtas.jpeg',
                  '/images/kids_classroom_with_teacher_and_students_2_sonevalley_international_school_nasriganj_rohtas.jpeg',
                ],
              },
              {
                stage: 'Primary',
                age: 'Grades 1–5',
                desc: 'Strong foundation in English, mathematics, science & social studies with interactive teaching',
                image: '/images/junior_classroom_with_teacher_and_students_sonevalley_international_school_nasriganj_rohtas.jpeg',
                images: [
                  '/images/junior_classroom_with_teacher_and_students_2_sonevalley_international_school_nasriganj_rohtas.jpeg',
                  '/images/junior_classroom_with_teacher_and_students_3_sonevalley_international_school_nasriganj_rohtas.jpeg',
                ],
              },
              {
                stage: 'Middle School',
                age: 'Grades 6–8',
                desc: 'Conceptual depth with labs, projects & research habits for critical thinking',
                image: '/images/senior_classroom_with_teacher_and_students_5_sonevalley_international_school_nasriganj_rohtas.jpeg',
                images: [
                  '/images/coccurricular_activity_classroom_common_sonevalley_nasriganj_rohtas.jpeg',
                  '/images/blank_classroom_with_teacher_2_sonevalley_nasriganj_rohtas.jpeg',
                ],
              },
              {
                stage: 'Secondary',
                age: 'Grades 9–10',
                desc: 'Board exam preparation, career guidance & competitive exam readiness for future success',
                image: '/images/senior_classroom_with_teacher_and_students_4_sonevalley_international_school_nasriganj_rohtas.jpeg',
                images: [
                  '/images/senior_classroom_with_teacher_and_students_4_sonevalley_international_school_nasriganj_rohtas.jpeg',
                  '/images/senior_classroom_with_teacher_and_students_3_sonevalley_international_school_nasriganj_rohtas.jpeg',
                ],
              },
            ].map((prog, i) => (
              <div key={i} className="group rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden bg-white">
                <div className="relative w-full h-[280px] md:h-[320px] bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
                  <Image
                    src={prog.image}
                    alt={prog.stage}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-blue-600 mb-1">{prog.stage}</h3>
                  <p className="text-sm text-gray-500 font-semibold mb-3">{prog.age}</p>
                  <p className="text-gray-600 leading-relaxed mb-4">{prog.desc}</p>
                  
                  <div className="flex gap-2 mt-4">
                    {prog.images.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition">
                        <Image
                          src={img}
                          alt={`${prog.stage} classroom ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/smart_classroom_sonevalley_nasriganj_rohtas.jpeg"
                  alt="Smart Classroom Technology"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-blue-700">Smart Classroom Technology</h3>
                <p className="text-gray-700 leading-relaxed">
                  All our classrooms are equipped with modern teaching aids including interactive boards, projectors, 
                  and digital content to make learning engaging and effective. Our educators blend traditional wisdom 
                  with contemporary teaching methodologies.
                </p>
                <ul className="space-y-2">
                  {['Interactive digital boards', 'Audio-visual learning', 'STEM-focused curriculum', 'Regular assessments & feedback'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="text-green-500 shrink-0" size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section id="activities" className="py-20 px-4 bg-gray-50 scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Activities at {SCHOOL_NAME}</h2>
          <p className="text-center text-gray-600 mb-14 max-w-2xl mx-auto">
            A balanced blend of curricular depth and exploration beyond the textbook.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-blue-700 mb-6">Curricular (academic)</h3>
              <ul className="space-y-3 text-gray-700">
                {[
                  'CBSE-aligned syllabus & English medium instruction',
                  'STEM, ICT & digital literacy across stages',
                  'Smart classrooms and structured lesson planning',
                  'Continuous assessment, feedback & remedial support',
                  'Reading programmes, library periods & language labs',
                  'Spoken English, composition & communication skills',
                  'Value education, citizenship & life-skills periods',
                  'Homework support and exam-readiness in secondary grades',
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={18} />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-cyan-700 mb-6">Extra-curricular</h3>
              <ul className="space-y-3 text-gray-700">
                {[
                  'Sports: athletics, cricket, football, kho-kho, badminton & indoor games',
                  'Yoga, physical education & annual sports day',
                  'Music, dance, drama & fine arts clubs',
                  'Quiz, debate, elocution & Olympiad preparation',
                  'Science fairs, exhibitions & project displays',
                  'House system competitions: arts, sports, culture',
                  'Community outreach, eco-club & celebration assemblies',
                  'Annual day & thematic cultural performances',
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <CheckCircle className="text-cyan-600 shrink-0 mt-0.5" size={18} />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY & WELLBEING */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Safety &amp; wellbeing first</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Your child&apos;s safety, health, and happiness are our top priorities. We provide a secure, hygienic, and nurturing environment.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition group">
              <div className="relative h-72 bg-gradient-to-br from-green-100 to-emerald-100">
                <Image
                  src="/images/safe_playground_sonevalley_international_school_nasriganj_rohtas.jpeg"
                  alt="Safe Playground"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg">
                  <Shield size={28} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-3">Safe playground &amp; campus</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our playground and entire campus are designed with child safety in mind. Well-maintained play equipment, 
                  soft landing surfaces, proper fencing, and 24/7 CCTV surveillance ensure your child plays and learns in a secure environment.
                </p>
                <ul className="space-y-2">
                  {['24/7 CCTV monitoring', 'Trained safety supervisors', 'First aid facilities', 'Secure entry-exit protocols'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="text-green-500 shrink-0" size={18} />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition group">
              <div className="relative h-72 bg-gradient-to-br from-blue-100 to-cyan-100">
                <Image
                  src="/images/clean_drinking_water_facility_sonevalley_international_school_nasriganj_rohtas.jpeg"
                  alt="Clean Drinking Water"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg">
                  <Droplets size={28} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-blue-700 mb-3">Clean drinking water</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We provide RO-purified, safe drinking water throughout the campus. Multiple water stations ensure easy access 
                  for students during class breaks and sports activities, maintaining proper hydration and health standards.
                </p>
                <ul className="space-y-2">
                  {['RO purification system', 'Regular water quality testing', 'Multiple water stations', 'Clean & hygienic facilities'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="text-blue-500 shrink-0" size={18} />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-center mb-6">Comprehensive safety measures</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '🚨', title: 'Emergency protocols', desc: 'Fire safety drills, evacuation plans & emergency contacts' },
                { icon: '🏥', title: 'Health support', desc: 'Trained staff for first aid & medical emergency response' },
                { icon: '🚌', title: 'Safe transport', desc: 'GPS-tracked buses with trained drivers & attendants' },
                { icon: '👁️', title: 'Surveillance', desc: 'Full campus CCTV coverage with security personnel' },
                { icon: '🧼', title: 'Hygiene standards', desc: 'Regular sanitization & clean washroom facilities' },
                { icon: '🤝', title: 'Visitor management', desc: 'Strict entry protocols & visitor registration system' },
              ].map((item, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES — full image visible */}
      <section id="facilities" className="py-20 px-4 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">World-class facilities</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            State-of-the-art infrastructure designed to provide the best learning and growth environment for every student.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              { 
                name: 'Computer Lab', 
                image: '/images/computer_lab_sonevalley_nasriganj_rohtas.jpeg',
                desc: 'Modern computers with high-speed internet',
                icon: '💻',
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                name: 'Staff Room', 
                image: '/images/staff_room_teachers_working_sonevalley_nasriganj_rohtas.jpeg',
                desc: 'Dedicated space for faculty collaboration',
                icon: '👥',
                color: 'from-green-500 to-emerald-500'
              },
              { 
                name: 'Playground & Assembly', 
                image: '/images/playgound_and_assembly_area_sonevalley_nasriganj_rohtas.jpeg',
                desc: 'Spacious grounds for sports and gatherings',
                icon: '⚽',
                color: 'from-orange-500 to-amber-500'
              },
              { 
                name: 'Smart Classrooms', 
                image: '/images/smart_classroom_sonevalley_nasriganj_rohtas.jpeg',
                desc: 'Interactive boards and digital learning',
                icon: '📱',
                color: 'from-purple-500 to-pink-500'
              },
              { 
                name: 'Transport Fleet', 
                image: '/images/transport_vehicle_sonevalley_nasriganj_rohtas.jpeg',
                desc: 'GPS-enabled buses for safe commute',
                icon: '🚌',
                color: 'from-red-500 to-rose-500'
              },
              { 
                name: 'Safe Campus', 
                image: '/images/beautiful_premises_indoor_corridor_sonevalley_nasriganj_rohtas.jpeg',
                desc: 'CCTV monitored secure environment',
                icon: '🛡️',
                color: 'from-indigo-500 to-blue-500'
              },
            ].map((fac, i) => (
              <div
                key={i}
                className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 bg-white transform hover:-translate-y-2"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={fac.image}
                    alt={fac.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br ${fac.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {fac.icon}
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{fac.name}</h3>
                  <p className="text-sm text-gray-600">{fac.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Ready to join our community?</h3>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Start your admission process today and give your child access to world-class facilities and quality education.
            </p>
            <button
              type="button"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 shadow-lg transition transform hover:scale-105"
              onClick={() => setShowApplicationForm(true)}
            >
              Apply now
            </button>
          </div>
        </div>
      </section>

      {/* ADMISSIONS — 5 steps */}
      <section id="admissions" className="py-20 px-4 bg-blue-50 scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Admissions 2026–27</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Transparent steps from your first enquiry to confirmed admission at {SCHOOL_NAME}.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {[
              { step: 1, title: 'Enquiry', desc: 'Reach out via call, visit, or form. Receive grade-wise information and fee overview.' },
              { step: 2, title: 'Consultation', desc: 'Counselling session with the admissions team and campus walk-through where possible.' },
              { step: 3, title: 'Test', desc: 'Age-appropriate written or interaction-based assessment for grade readiness.' },
              {
                step: 4,
                title: 'Background verification',
                desc: 'Document check, previous school records where applicable, and identity verification.',
              },
              { step: 5, title: 'Admission done', desc: 'Fee payment, kit allocation, and onboarding into the class group.' },
            ].map((item) => (
              <div key={item.step} className="text-center bg-white rounded-xl p-6 shadow-sm border border-blue-100">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h3 className="text-2xl font-bold mb-6">Documents required</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Birth certificate',
                'Aadhaar card',
                'Parent ID proof',
                'Address proof',
                'Previous school records (if applicable)',
                'Medical history / vaccination (where required)',
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 shrink-0" size={20} />
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="bg-blue-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 shadow-lg transition"
              onClick={() => setShowApplicationForm(true)}
            >
              Apply now
            </button>
            <p className="text-gray-600 mt-4">
              Or call <span className="font-bold">+91-8863046790</span>
            </p>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Results &amp; achievements</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                {
                  t: 'Board results',
                  d: 'Consistent strong outcomes with students in merit lists.',
                  border: 'border-blue-600',
                  bg: 'from-blue-50 to-cyan-50',
                },
                {
                  t: 'Olympiad & competitions',
                  d: 'Medallists and qualifiers in NSTSE, IMO, science & maths contests.',
                  border: 'border-green-600',
                  bg: 'from-green-50 to-emerald-50',
                },
                {
                  t: 'School recognition',
                  d: 'Excellence in academics, sports, and cultural events at regional levels.',
                  border: 'border-purple-600',
                  bg: 'from-purple-50 to-pink-50',
                },
              ].map((x) => (
                <div
                  key={x.t}
                  className={`bg-gradient-to-r ${x.bg} p-6 rounded-xl border-l-4 ${x.border}`}
                >
                  <h3 className="font-bold text-lg mb-2">{x.t}</h3>
                  <p className="text-gray-700">{x.d}</p>
                </div>
              ))}
            </div>

            <div className="relative w-full min-h-[320px] rounded-xl overflow-hidden shadow-lg bg-gray-100">
              <Image
                src="/images/staff_room_teachers_working_sonevalley_nasriganj_rohtas.jpeg"
                alt="Teachers at work"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 px-4 bg-gradient-to-b from-slate-50 to-gray-100 scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">School gallery</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Take a visual tour of our campus, classrooms, facilities, and the vibrant life at {SCHOOL_NAME}.
          </p>

          {/* Campus & Building */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="w-1 h-8 bg-blue-600 rounded"></span>
              Campus &amp; Building
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'School Front - Main View', image: '/images/school_front_second_angle_sonevalley_nasriganj_rohtas.jpeg' },
                { name: 'School Building', image: '/images/school front image sonevalley_nasriganj_rohtas.jpeg' },
                { name: 'Indoor Corridors', image: '/images/beautiful_premises_indoor_corridor_sonevalley_nasriganj_rohtas.jpeg' },
                { name: 'Playground & Assembly', image: '/images/playgound_and_assembly_area_sonevalley_nasriganj_rohtas.jpeg' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative h-48 rounded-xl overflow-hidden border-2 border-gray-200 bg-white shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <p className="w-full p-4 text-sm font-semibold text-white">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Classrooms */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="w-1 h-8 bg-green-600 rounded"></span>
              Classrooms &amp; Learning Spaces
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Kids Classroom', image: '/images/kids_classroom_with_teacher_and_students_sonevalley_international_school_nasriganj_rohtas.jpeg' },
                { name: 'Kids Classroom 2', image: '/images/kids_classroom_with_teacher_and_students_2_sonevalley_international_school_nasriganj_rohtas.jpeg' },
                { name: 'Junior Classroom', image: '/images/junior_classroom_with_teacher_and_students_sonevalley_international_school_nasriganj_rohtas.jpeg' },
                { name: 'Junior Classroom 2', image: '/images/junior_classroom_with_teacher_and_students_2_sonevalley_international_school_nasriganj_rohtas.jpeg' },
                { name: 'Junior Classroom 3', image: '/images/junior_classroom_with_teacher_and_students_3_sonevalley_international_school_nasriganj_rohtas.jpeg' },
                { name: 'Beautiful Classroom', image: '/images/beautiful_classroom_with_kids_and_teachers_sonevalley_international_school_nasriganj_rohtas.jpeg' },
                { name: 'Senior Classroom', image: '/images/senior_classroom_with_teacher_and_students_3_sonevalley_international_school_nasriganj_rohtas.jpeg' },
                { name: 'Senior Classroom 2', image: '/images/senior_classroom_with_teacher_and_students_4_sonevalley_international_school_nasriganj_rohtas.jpeg' },
                { name: 'Senior Classroom 3', image: '/images/senior_classroom_with_teacher_and_students_5_sonevalley_international_school_nasriganj_rohtas.jpeg' },
                { name: 'Smart Classroom', image: '/images/smart_classroom_sonevalley_nasriganj_rohtas.jpeg' },
                { name: 'Classroom with Teacher', image: '/images/blank_classroom_with_teacher_2_sonevalley_nasriganj_rohtas.jpeg' },
                { name: 'Active Classroom', image: '/images/coccurricular_activity_classroom_common_sonevalley_nasriganj_rohtas.jpeg' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative h-48 rounded-xl overflow-hidden border-2 border-gray-200 bg-white shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <p className="w-full p-4 text-sm font-semibold text-white">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="w-1 h-8 bg-purple-600 rounded"></span>
              Facilities &amp; Infrastructure
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Computer Lab', image: '/images/computer_lab_sonevalley_nasriganj_rohtas.jpeg' },
                { name: 'Staff Room', image: '/images/staff_room_teachers_working_sonevalley_nasriganj_rohtas.jpeg' },
                { name: 'Transport Vehicle', image: '/images/transport_vehicle_sonevalley_nasriganj_rohtas.jpeg' },
                { name: 'Kids Section Nursery', image: '/images/kids_section_nursery_sonevalley_nasriganj_rohtas.jpeg' },
                { name: 'Clean Drinking Water', image: '/images/clean_drinking_water_facility_sonevalley_international_school_nasriganj_rohtas.jpeg' },
                { name: 'Safe Playground', image: '/images/safe_playground_sonevalley_international_school_nasriganj_rohtas.jpeg' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative h-48 rounded-xl overflow-hidden border-2 border-gray-200 bg-white shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <p className="w-full p-4 text-sm font-semibold text-white">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events & Activities */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="w-1 h-8 bg-orange-600 rounded"></span>
              Events &amp; Activities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Morning Assembly', image: '/images/morning_assembly_image_with_students_in_ground.png' },
                { name: 'Sports Day', image: '/images/sonevalley_sports_day_in_ground_with_principle_and_students_image.png' },
                { name: 'Yoga Day', image: '/images/sonevalley_yoga_day_image.png' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative h-56 rounded-xl overflow-hidden border-2 border-gray-200 bg-white shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <p className="w-full p-4 text-sm font-semibold text-white">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* DRESS CODE & ROUTINE */}
      <section id="dress-code-routine" className="py-20 px-4 bg-white border-t border-gray-100 scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Dress code &amp; school routine</h2>
          <p className="text-center text-gray-600 mb-14 max-w-2xl mx-auto">
            Uniform colours and day timings at {SCHOOL_NAME}. Please confirm session start dates and any changes on the
            notice board.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-6">School uniform</h3>
              <div className="space-y-5">
                {[
                  {
                    title: 'Boys',
                    accent: 'bg-blue-700',
                    lines: ['Steel blue/grey-blue shirt with blue/white micro-check pattern', 'Steel blue/grey-blue trousers with blue/white micro-check pattern', 'Chocolate brown tie and belt'],
                  },
                  {
                    title: 'Girls',
                    accent: 'bg-blue-600',
                    lines: ['Steel blue/grey-blue shirt with blue/white micro-check pattern', 'Steel blue/grey-blue skirt with blue/white micro-check pattern', 'Chocolate brown tie and belt'],
                  },
                  {
                    title: 'Appearance & footwear',
                    accent: 'bg-amber-700',
                    lines: [
                      'Black school shoes and white socks (unless a circular specifies otherwise)',
                      'Neat hair; school belt and ID card when issued',
                      'Winter: steel blue sweater or blazer as per notice',
                    ],
                  },
                ].map((block) => (
                  <div
                    key={block.title}
                    className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/90 to-white p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`h-2 w-2 rounded-full ${block.accent}`} aria-hidden />
                      <h4 className="font-bold text-gray-900">{block.title}</h4>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      {block.lines.map((line) => (
                        <li key={line} className="flex gap-3 text-sm sm:text-base">
                          <CheckCircle className="text-blue-600 shrink-0 mt-0.5" size={18} />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Daily timings</h3>
              <div className="space-y-6">
                <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50/50 p-6 sm:p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-wide text-orange-800 mb-2">Summer</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">7:55 AM – 2:00 PM</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Typical session: April through June and other hot-weather months as notified. Students should reach
                    before assembly; late arrivals may be marked absent for the first period.
                  </p>
                </div>
                <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50/50 p-6 sm:p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-wide text-sky-800 mb-2">Winter</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">8:30 AM – 2:30 PM</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Typical session: November through February (approx.). Exact switch-over dates and any revision are
                    published on the notice board each academic year.
                  </p>
                </div>
                <p className="text-sm text-gray-500 italic border-l-4 border-gray-300 pl-4">
                  Transport, assembly, and dispersal timings follow the same bell chart shared with parents at admission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO + TEXT TESTIMONIALS */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Hear from our students</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Real experiences, real voices. Listen to what our students have to say about their journey at {SCHOOL_NAME}.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
              <div className="p-4 bg-gradient-to-r from-orange-500 to-amber-500">
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <Play size={20} />
                  Female Student Testimonial
                </h3>
              </div>
              <div className="aspect-video bg-black relative group">
                <video
                  controls
                  poster="/images/confident_students_in_dress_sonevalley_international_school_nasriganj_rohtas.jpeg"
                  className="w-full h-full"
                  preload="metadata"
                >
                  <source src="/videos/confident_female_student_video_testimonial_sonevalley_international_school_nasriganj_rohtas.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  &ldquo;Our student shares her personal experience about the quality of education, 
                  supportive teachers, and the wonderful learning environment at {SCHOOL_NAME}.&rdquo;
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500">
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <Play size={20} />
                  Male Student Testimonial
                </h3>
              </div>
              <div className="aspect-video bg-black relative group">
                <video
                  controls
                  poster="/images/two_male_kids_in_school_uniform_in_dress_sonevalley_international_school_nasriganj_rohtas.jpeg"
                  className="w-full h-full"
                  preload="metadata"
                >
                  <source src="/videos/confident_male_student_video_testimonial_sonevalley_international_school_nasriganj_rohtas.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  &ldquo;Hear from our student about his academic growth, participation in co-curricular activities, 
                  and how {SCHOOL_NAME} has shaped his confidence and skills.&rdquo;
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-8 text-center">Parent reviews</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                role: 'Parent of Grade 5',
                text: 'My daughter has grown so much here. The teachers are caring and the facilities are excellent.',
              },
              {
                name: 'Rajesh Kumar',
                role: 'Parent of Grade 9',
                text: 'Strong academics with holistic development. The admission process was clear and professional.',
              },
              {
                name: 'Sneha Verma',
                role: 'Parent of Grade 2',
                text: 'Transport feels safe, communication via notices is timely, and my son loves school.',
              },
            ].map((test, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">&ldquo;{test.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-gray-900">{test.name}</p>
                  <p className="text-sm text-gray-500">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently asked questions</h2>

          <div className="space-y-4">
            {[
              { q: 'What is the fee structure?', a: 'Fee varies by grade. Contact admissions for the latest schedule.' },
              { q: 'Do you provide transport?', a: 'Yes — GPS-enabled buses on major routes around Nasriganj and nearby areas.' },
              { q: 'Is the school CBSE affiliated?', a: 'Yes. We follow the CBSE curriculum and assessment guidelines.' },
              { q: 'What is the student–teacher ratio?', a: 'We maintain healthy section sizes so every child gets attention.' },
              { q: 'When does admission start?', a: 'Admissions for the new year are announced on the notice board and website.' },
              { q: 'Are scholarships available?', a: 'Merit-based support may be offered — ask during consultation.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition text-left"
                >
                  <span className="font-bold text-gray-900 pr-4">{item.q}</span>
                  <ChevronDown
                    size={24}
                    className={`text-blue-600 shrink-0 transition ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-gray-600">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT US & LOCATION */}
      <section id="contact" className="py-20 px-4 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Contact us & location</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Visit us at our campus in Nasriganj, Rohtas, Bihar. We're here to help with all your enquiries about admissions and school programs.
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 shadow-lg">
                <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                  <span className="text-3xl">📍</span>
                  Visit our campus
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-blue-600 text-sm">📍</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600">Sonevalley International School<br />Nasriganj, Rohtas, Bihar</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-green-600 text-sm">📞</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">+91-8863046790</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-green-600 text-sm">💬</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">WhatsApp</p>
                      <a href="https://wa.me/918863046790" className="text-green-600 hover:text-green-700 font-medium">
                        +91-8863046790
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-purple-600 text-sm">⏰</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Office Hours</p>
                      <p className="text-gray-600">Monday - Saturday: 8:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-blue-100">
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(true)}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
                  >
                    Schedule a campus visit
                  </button>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-3xl">🗺️</span>
                  Find us on the map
                </h3>
                
                <div className="relative w-full h-96 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019284849576!2d84.11631131542231!3d24.743247384145896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d2f0b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sNasriganj%2C%20Bihar%2C%20India!5e0!3m2!1sen!2sus!4v1642345678901!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sonevalley International School Location"
                  ></iframe>
                </div>
                
                <div className="mt-4 flex gap-3">
                  <a
                    href="https://share.google/0GxTI5deQ59p8SSzg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
                  >
                    Open in Google Maps
                  </a>
                  <a
                    href="https://share.google/0GxTI5deQ59p8SSzg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition shadow-md"
                  >
                    Get directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">{SCHOOL_NAME}</h2>
          <p className="text-lg opacity-90">Admissions open 2026–27 · Nasriganj, Rohtas, Bihar</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              type="button"
              className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
              onClick={() => setShowApplicationForm(true)}
            >
              Apply now
            </button>
            <button
              type="button"
              className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-white/10 transition"
              onClick={() => setShowApplicationForm(true)}
            >
              Contact us
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* Application Form Popup */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{zIndex: 9999}}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Apply for Admission</h2>
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
              <p className="mt-2 opacity-90">Start your journey with {SCHOOL_NAME}</p>
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
                  Purpose *
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  required
                  value={applicationData.purpose}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Purpose</option>
                  <option value="Admission">Admission</option>
                  <option value="Teaching">Teaching</option>
                  <option value="Staff">Staff</option>
                  <option value="Enquiry">Enquiry</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Next Steps:</strong> After submitting this form, our admissions team will contact you within 24-48 hours to schedule a consultation and campus visit.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
}
