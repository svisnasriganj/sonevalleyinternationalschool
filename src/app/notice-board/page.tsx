import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { NOTICES } from "@/data/notices";
import { SCHOOL_NAME } from "@/lib/school";
import { Calendar, Clock, MapPin } from "lucide-react";

export const metadata = {
  title: `Notice Board | ${SCHOOL_NAME}`,
  description: "Official notices, circulars, and announcements.",
};

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const ANNUAL_EVENTS = [
  {
    name: "Annual Sports Day",
    month: "February",
    description: "Inter-house sports competitions, track and field events, and prize distribution ceremony."
  },
  {
    name: "Cultural Festival",
    month: "December",
    description: "Dance, music, drama performances, and art exhibitions by students."
  },
  {
    name: "Science Exhibition",
    month: "November",
    description: "Student projects, experiments, and innovative science models display."
  },
  {
    name: "Teacher's Day Celebration",
    month: "September",
    description: "Special programs honoring teachers, student performances, and appreciation ceremonies."
  },
  {
    name: "Children's Day",
    month: "November",
    description: "Fun activities, games, competitions, and special treats for students."
  },
  {
    name: "Republic Day",
    month: "January",
    description: "Flag hoisting, patriotic songs, cultural programs, and national pride activities."
  },
  {
    name: "Independence Day",
    month: "August",
    description: "Flag hoisting ceremony, patriotic performances, and freedom celebration."
  },
  {
    name: "Annual Prize Distribution",
    month: "March",
    description: "Academic excellence awards, sports achievements, and special recognition ceremony."
  }
];

const HOLIDAYS = [
  { name: "Summer Vacation", period: "May - June", duration: "45 days" },
  { name: "Winter Break", period: "December", duration: "10 days" },
  { name: "Diwali Break", period: "October/November", duration: "5 days" },
  { name: "Holi", period: "March", duration: "2 days" },
  { name: "Eid Festival", period: "As per lunar calendar", duration: "1-2 days" },
  { name: "Gandhi Jayanti", period: "October 2", duration: "1 day" },
  { name: "Independence Day", period: "August 15", duration: "1 day" },
  { name: "Republic Day", period: "January 26", duration: "1 day" }
];

export default function NoticeBoardPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <SiteNav />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-semibold text-blue-600 mb-2">School Information Hub</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notice Board</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Latest announcements, upcoming events, and academic calendar for {SCHOOL_NAME}
          </p>
        </div>
      </section>

      <main className="flex-1 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 -mt-8">
            <div className="bg-white rounded-xl shadow-lg p-2 border border-gray-200">
              <div className="flex gap-2">
                <a href="#notices" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">
                  Notices
                </a>
                <a href="#events" className="text-gray-600 hover:text-blue-600 px-6 py-2 rounded-lg font-semibold transition">
                  Events
                </a>
                <a href="#calendar" className="text-gray-600 hover:text-blue-600 px-6 py-2 rounded-lg font-semibold transition">
                  Calendar
                </a>
              </div>
            </div>
          </div>

          {/* Notices Section */}
          <section id="notices" className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Latest Notices</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {NOTICES.map((n) => (
                <article
                  key={n.id}
                  className="rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
                    <time dateTime={n.date}>{formatDate(n.date)}</time>
                    {n.category && (
                      <>
                        <span aria-hidden>·</span>
                        <span className="font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-full text-xs">
                          {n.category}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{n.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{n.detail}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Annual Events Section */}
          <section id="events" className="mb-20 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Annual Events</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Celebrate learning and growth through our exciting annual events and festivals
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ANNUAL_EVENTS.map((event, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{event.name}</h3>
                      <p className="text-sm text-purple-600 font-semibold">{event.month}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{event.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Holiday Calendar Section */}
          <section id="calendar" className="mb-20 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Academic Holiday Calendar</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Plan ahead with our comprehensive academic year holiday schedule
            </p>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
              <div className="grid gap-4">
                {HOLIDAYS.map((holiday, index) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Clock className="text-green-600" size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{holiday.name}</h4>
                        <p className="text-gray-600 text-sm">{holiday.period}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {holiday.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-amber-50 rounded-xl p-6 border border-amber-200">
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full mt-1">
                  <MapPin className="text-amber-600" size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-amber-800 mb-2">Important Note</h4>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Holiday dates may vary based on government notifications and local observances. 
                    Parents will be notified of any changes through official school notices. 
                    Please check regularly for updates.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Need More Information?</h3>
              <p className="mb-6 opacity-90">
                For verified copies of circulars, event details, or clarifications, contact our school office
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+918863046790"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Call: +91-8863046790
                </a>
                <a
                  href="mailto:svisnasriganj@gmail.com"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  Email Us
                </a>
                <Link 
                  href="/" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
