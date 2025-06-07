"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X, Sparkles, Users, FileEdit } from "lucide-react";

export default function Home() {
  // ─── AUTH REDIRECT LOGIC ─────────────────────────────────────────────
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // redirect signed-in users straight to the dashboard
      router.replace("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);
  // ─────────────────────────────────────────────────────────────────────

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    {
      quote:
        "Kolab's AI-powered templates have cut our document creation time in half. The collaboration features are unmatched.",
      author: "Sarah Johnson",
      role: "Product Manager at Acme Inc.",
      avatar: "/Sarah.jpg?height=64&width=64",
    },
    {
      quote:
        "The real-time editor is incredibly responsive. We've tried many tools, but Kolab's AI integration makes it truly stand out.",
      author: "Michael Chen",
      role: "CTO at TechStart",
      avatar: "/Michael.jpg?height=64&width=64",
    },
    {
      quote:
        "Being able to create separate organizations for different clients has streamlined our workflow tremendously.",
      author: "Elena Rodriguez",
      role: "Team Lead at Global Solutions",
      avatar: "/Elena.jpg?height=64&width=64",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(1);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <main className="min-h-screen">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-100 via-purple-50 to-blue-100 -z-10" />

      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : ""
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              {/* No w-10 here, so the container hugs the image */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Kolab Logo"
                  width={32}
                  height={32}
                />
              </div>

              {/* Just 1px left margin to prevent text overlapping the image */}
              <span className="ml-1 text-xl font-bold text-gray-900">
                Kolab
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Features
              </a>
              <a
                href="#solution"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Solution
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Testimonials
              </a>
              <a
                href="#blog"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Blog
              </a>
              <Link
                href="/sign-in"
                className="bg-purple-600 text-white px-5 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                Get Started
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-700 hover:text-purple-600"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <Image
                      src="/logo.png" // your logo file in /public
                      alt="Kolab Logo"
                      width={32}
                      height={32}
                    />
                  </div>
                  <span className="ml-2 text-xl font-bold text-gray-900">
                    Kolab
                  </span>
                </div>
                <button
                  type="button"
                  className="text-gray-700 hover:text-purple-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col space-y-6">
                <a
                  href="#features"
                  className="text-gray-700 hover:text-purple-600 font-medium text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#solution"
                  className="text-gray-700 hover:text-purple-600 font-medium text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Solution
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-700 hover:text-purple-600 font-medium text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </a>
                <a
                  href="#blog"
                  className="text-gray-700 hover:text-purple-600 font-medium text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </a>
                <Link
                  href="/sign-in"
                  className="bg-purple-600 text-white px-5 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" /> AI-Powered Collaboration
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl mx-auto">
            <span className="text-gray-900">
              Kolab is where teams collaborate,{" "}
            </span>
            <span className="text-purple-600">in sync.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            Kolab is a real-time collaborative workspace with AI-powered
            templates that lets teams create, share, and stay in sync across all
            their projects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link
              href="/sign-in"
              className="bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors text-lg"
            >
              Get Started
            </Link>
            <a
              href="#learn-more"
              className="bg-gradient-to-r from-purple-50 to-blue-50 text-purple-600 border border-purple-200 px-8 py-3 rounded-full font-medium hover:border-purple-300 transition-colors text-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section - Modern Version */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Kolab?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes Kolab the preferred choice for modern teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-6 right-6">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-4">
                  BEST VALUE
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  The lowest price
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Flexible plans for teams of every size. Start free and scale
                  as you grow, with transparent pricing that fits your budget.
                </p>
              </div>
              <div className="flex items-center text-green-600 font-medium">
                <span className="mr-2">Starting at $0</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-6 right-6">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4">
                  PERFORMANCE
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  The fastest on the market
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Instant sync, zero lag. Experience real-time collaboration
                  that feels as natural as working side by side.
                </p>
              </div>
              <div className="flex items-center text-blue-600 font-medium">
                <span className="mr-2">&lt;50ms latency</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-6 right-6">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <span className="text-2xl">❤️</span>
                </div>
              </div>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-4">
                  TRUSTED
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  The most loved
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Loved by over 1M+ users worldwide. Join teams from startups to
                  Fortune 500 companies who trust Kolab daily.
                </p>
              </div>
              <div className="flex items-center text-purple-600 font-medium">
                <span className="mr-2">4.9/5 rating</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Stats section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1M+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50ms</div>
              <div className="text-gray-600">Avg Latency</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section - Modernized */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to collaborate effectively with your team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 - Real-time Editor */}
            <div className="group relative overflow-hidden bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-500"></div>
              <div className="p-8">
                <div className="mb-6 relative">
                  <div className="absolute -top-1 -right-1 bg-purple-100 rounded-full p-1.5 group-hover:bg-purple-200 transition-colors">
                    <FileEdit className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-4">
                    EDITOR
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Real-time Editor
                  </h3>
                  <p className="text-gray-600">
                    Collaborate with your team in real-time with our responsive
                    editor. See changes as they happen with zero lag.
                  </p>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Rich text formatting</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Real-time cursors</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Version history</span>
                  </li>
                </ul>
                <a
                  href="#learn-more-editor"
                  className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors"
                >
                  <span className="mr-2">Learn more</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Feature 2 - Multiple Organizations */}
            <div className="group relative overflow-hidden bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
              <div className="p-8">
                <div className="mb-6 relative">
                  <div className="absolute -top-1 -right-1 bg-blue-100 rounded-full p-1.5 group-hover:bg-blue-200 transition-colors">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4">
                    TEAMS
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Multiple Organizations
                  </h3>
                  <p className="text-gray-600">
                    Create and manage different organizations for various teams,
                    clients, or projects with customized settings.
                  </p>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Custom permissions</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Separate workspaces</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Branded experiences</span>
                  </li>
                </ul>
                <a
                  href="#learn-more-orgs"
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  <span className="mr-2">Learn more</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Feature 3 - AI-Powered Templates */}
            <div className="group relative overflow-hidden bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
              <div className="p-8">
                <div className="mb-6 relative">
                  <div className="absolute -top-1 -right-1 bg-amber-100 rounded-full p-1.5 group-hover:bg-amber-200 transition-colors">
                    <Sparkles className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-4">
                    AI
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    AI-Powered Templates
                  </h3>
                  <p className="text-gray-600">
                    Generate professional templates instantly with Gemini API.
                    Create documents, reports, and more with just a prompt.
                  </p>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>One-click generation</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Customizable templates</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Smart suggestions</span>
                  </li>
                </ul>
                <a
                  href="#learn-more-ai"
                  className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors"
                >
                  <span className="mr-2">Learn more</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Feature showcase */}
          <div className="mt-16 text-center">
            <a
              href="#all-features"
              className="inline-flex items-center justify-center bg-white text-purple-600 border border-purple-200 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
            >
              <span className="mr-2">Explore all features</span>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Live Components Section - Modernized */}
      <section id="solution" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Live Components
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real-time widgets that keep your team in perfect sync, no matter
              where they are
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Component 1 - Comments */}
            <div className="group relative overflow-hidden bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
              <div className="p-8">
                <div className="mb-6 relative">
                  <div className="absolute -top-1 -right-1 bg-emerald-100 rounded-full p-1.5 group-hover:bg-emerald-200 transition-colors">
                    <span className="text-lg">💬</span>
                  </div>
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full mb-4">
                    COMMUNICATION
                  </span>
                  <div className="h-32 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-teal-100/50"></div>
                    <div className="relative z-10 text-center">
                      <div className="text-3xl mb-2">💬</div>
                      <div className="text-xs text-emerald-600 font-medium">
                        Real-time sync
                      </div>
                    </div>
                    {/* Animated dots */}
                    <div className="absolute bottom-2 left-2 flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                      <div
                        className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Comments
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Real-time commenting and discussion threads that keep
                    conversations organized and contextual.
                  </p>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Threaded discussions</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>@mentions & notifications</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Rich text formatting</span>
                  </li>
                </ul>
                <a
                  href="#learn-more-comments"
                  className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  <span className="mr-2">Learn more</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Component 2 - Reactions */}
            <div className="group relative overflow-hidden bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-500"></div>
              <div className="p-8">
                <div className="mb-6 relative">
                  <div className="absolute -top-1 -right-1 bg-indigo-100 rounded-full p-1.5 group-hover:bg-indigo-200 transition-colors">
                    <span className="text-lg">👍</span>
                  </div>
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full mb-4">
                    REACTIONS
                  </span>
                  <div className="h-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-purple-100/50"></div>
                    <div className="relative z-10 text-center">
                      <div className="text-3xl mb-2">👍</div>
                      <div className="text-xs text-indigo-600 font-medium">
                        Live reactions
                      </div>
                    </div>
                    {/* Animated reaction emojis */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      <div className="text-xs animate-pulse">❤️</div>
                      <div
                        className="text-xs animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      >
                        👍
                      </div>
                      <div
                        className="text-xs animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      >
                        🎉
                      </div>
                      <div
                        className="text-xs animate-pulse"
                        style={{ animationDelay: "0.6s" }}
                      >
                        😊
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Reactions
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Express feedback instantly with emoji reactions. See team
                    sentiment in real-time across all content.
                  </p>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Custom emoji reactions</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Real-time feedback</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Reaction analytics</span>
                  </li>
                </ul>
                <a
                  href="#learn-more-reactions"
                  className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                >
                  <span className="mr-2">Learn more</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Component 3 - AI Templates */}
            <div className="group relative overflow-hidden bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-pink-500"></div>
              <div className="p-8">
                <div className="mb-6 relative">
                  <div className="absolute -top-1 -right-1 bg-rose-100 rounded-full p-1.5 group-hover:bg-rose-200 transition-colors">
                    <span className="text-lg">✨</span>
                  </div>
                  <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 text-xs font-semibold rounded-full mb-4">
                    AI POWERED
                  </span>
                  <div className="h-32 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-pink-100/50"></div>
                    <div className="relative z-10 text-center">
                      <div className="text-3xl mb-2">✨</div>
                      <div className="text-xs text-rose-600 font-medium">
                        AI generation
                      </div>
                    </div>
                    {/* Animated sparkles */}
                    <div className="absolute top-2 right-2">
                      <div className="w-1 h-1 bg-rose-400 rounded-full animate-ping"></div>
                    </div>
                    <div className="absolute bottom-4 left-3">
                      <div
                        className="w-1 h-1 bg-rose-400 rounded-full animate-ping"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                    </div>
                    <div className="absolute top-1/2 right-4">
                      <div
                        className="w-1 h-1 bg-rose-400 rounded-full animate-ping"
                        style={{ animationDelay: "1s" }}
                      ></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    AI Templates
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Generate professional templates instantly with Gemini API.
                    Transform ideas into structured documents.
                  </p>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Smart content generation</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Custom prompts</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                      ✓
                    </div>
                    <span>Multiple formats</span>
                  </li>
                </ul>
                <a
                  href="#learn-more-ai"
                  className="inline-flex items-center text-rose-600 font-medium hover:text-rose-700 transition-colors"
                >
                  <span className="mr-2">Learn more</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Live demo section */}
        </div>
      </section>

      {/* Security Section - Modernized */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Security & Compliance
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enterprise-grade security that keeps your data safe and your team
              compliant
            </p>
          </div>

          {/* Main security card */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-3">
                    Your data is our priority
                  </h3>
                  <p className="text-gray-300 mb-4 max-w-2xl">
                    We implement industry-leading security measures to protect
                    your sensitive information. Our platform is built with
                    security in mind from the ground up, ensuring your team can
                    collaborate with confidence.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white/10 px-3 py-1 rounded-full">
                      Secure by Design
                    </span>
                    <span className="bg-white/10 px-3 py-1 rounded-full">
                      Regular Updates
                    </span>
                    <span className="bg-white/10 px-3 py-1 rounded-full">
                      Data Protection
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href="#security-details"
                    className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
                  >
                    <span className="mr-2">Security Details</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Modern Version */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
            Join thousands of satisfied teams already using Kolab
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100 transition-all duration-300 ${
                    currentTestimonial === index
                      ? "md:scale-105 shadow-lg border-purple-200"
                      : "opacity-80 hover:opacity-100"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <svg
                        className="h-8 w-8 text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 mb-6 flex-grow">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center mt-auto">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div className="ml-3">
                        <p className="font-bold text-gray-900">
                          {testimonial.author}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile navigation dots */}
            <div className="md:hidden flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentTestimonial === index
                      ? "w-6 bg-purple-600"
                      : "w-2 bg-purple-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="get-started"
        className="py-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to collaborate in sync?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join thousands of teams already using Kolab to transform how they
            work together.
          </p>

          {/* 
            If user is still loading, show nothing.
            If signed-in, we'll already have redirected.
            Otherwise show the Get Started link.
          */}
          {!isSignedIn && isLoaded && (
            <Link
              href="/sign-in"
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors text-lg inline-block"
            >
              Get Started for Free
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main footer content */}
          <div className="py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Brand section */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <Image
                      src="/logo.png" // your logo file in /public
                      alt="Kolab Logo"
                      width={32}
                      height={32}
                    />
                  </div>
                  <span className="text-2xl font-bold">Kolab</span>
                </div>
                <p className="text-gray-400 mb-6 max-w-sm">
                  The AI-powered collaborative workspace for teams that want to
                  stay in sync and work smarter together.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#twitter"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#linkedin"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="#github"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Links sections */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4 text-white">Product</h3>
                    <ul className="space-y-3">
                      <li>
                        <a
                          href="#features"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          Features
                        </a>
                      </li>
                      <li>
                        <a
                          href="#pricing"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          Pricing
                        </a>
                      </li>
                      <li>
                        <a
                          href="#security"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          Security
                        </a>
                      </li>
                      <li>
                        <a
                          href="#api"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          API
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-white">Company</h3>
                    <ul className="space-y-3">
                      <li>
                        <a
                          href="#about"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          About
                        </a>
                      </li>
                      <li>
                        <a
                          href="#careers"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          Careers
                        </a>
                      </li>
                      <li>
                        <a
                          href="#blog"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          Blog
                        </a>
                      </li>
                      <li>
                        <a
                          href="#press"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          Press
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-white">Support</h3>
                    <ul className="space-y-3">
                      <li>
                        <a
                          href="#help"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          Help Center
                        </a>
                      </li>
                      <li>
                        <a
                          href="#contact"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          Contact
                        </a>
                      </li>
                      <li>
                        <a
                          href="#terms"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          Terms
                        </a>
                      </li>
                      <li>
                        <a
                          href="#privacy"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          Privacy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2026 Kolab. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <span className="text-gray-500 text-sm">
                  Made with ❤️ for teams worldwide
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
