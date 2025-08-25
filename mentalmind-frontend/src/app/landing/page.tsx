"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { AnimatedButton } from "@/components/animations/AnimatedButton";
import {
  Brain,
  Heart,
  MessageCircle,
  BarChart3,
  ArrowRight,
  Play,
  Menu,
} from "lucide-react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Abstract 3D Element - Better positioned and contained */}
      <div className="absolute top-0 right-0 w-1/2 h-screen pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Main 3D Shape - Better centered and sized */}
          <div className="relative w-80 h-80 lg:w-96 lg:h-96">
            {/* Base shape layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 rounded-[2rem] transform rotate-12 shadow-2xl"></div>
            <div className="absolute inset-3 bg-gradient-to-tr from-emerald-300 via-teal-400 to-cyan-500 rounded-[1.8rem] transform -rotate-6 shadow-xl"></div>
            <div className="absolute inset-6 bg-gradient-to-bl from-cyan-200 via-teal-300 to-emerald-400 rounded-[1.5rem] transform rotate-3 shadow-lg"></div>

            {/* Floating accent elements */}
            <div className="absolute -top-6 -left-6 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center animate-bounce">
              <Brain className="h-7 w-7 text-teal-600" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-teal-100 rounded-full shadow-lg"></div>
            <div className="absolute top-1/2 -left-8 w-6 h-6 bg-emerald-200 rounded-full shadow-md"></div>
          </div>

          {/* Floating info cards - Better positioned */}
          <div className="absolute top-24 right-16 lg:right-24 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-100 max-w-[200px] hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                <Heart className="h-3 w-3 text-teal-600" />
              </div>
              <span className="text-xs font-medium text-gray-700">
                Partnering for a Better Future
              </span>
            </div>
          </div>

          <div className="absolute bottom-32 right-8 lg:right-16 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-100 max-w-[180px] hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-gray-700">
                VIEW ALL DETAILS
              </span>
            </div>
          </div>

          <div className="absolute bottom-16 right-20 lg:right-32 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-100 max-w-[200px] hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                <MessageCircle className="h-3 w-3 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-gray-700">
                SCHEDULE APPOINTMENT
              </span>
            </div>
          </div>

          {/* Circular badge - Better positioned */}
          <div className="absolute top-1/2 left-8 lg:left-16 transform -translate-y-1/2">
            <div className="relative w-24 h-24 lg:w-28 lg:h-28">
              <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <Brain className="h-4 w-4 lg:h-5 lg:w-5 text-teal-600 mx-auto mb-1" />
                  <div className="text-[8px] lg:text-[9px] font-medium text-gray-600 leading-tight">
                    EXPLORE
                    <br />
                    DETAILS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="relative z-10">
        {/* Navigation - Enhanced with better hover effects */}
        <nav className="container mx-auto px-6 py-6 lg:py-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:bg-teal-600 transition-all duration-300">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-black group-hover:text-teal-600 transition-colors duration-300">
                MENTAL MIND
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link
                href="#home"
                className="relative text-black font-medium pb-1 group"
              >
                Home
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
              </Link>
              <span className="text-gray-300">/</span>
              <Link
                href="#about"
                className="relative text-gray-600 hover:text-black transition-all duration-300 group"
              >
                About Us
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></div>
              </Link>
              <span className="text-gray-300">/</span>
              <Link
                href="#features"
                className="relative text-gray-600 hover:text-black transition-all duration-300 group"
              >
                Features
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></div>
              </Link>
              <span className="text-gray-300">/</span>
              <Link
                href="#demo"
                className="relative text-gray-600 hover:text-black transition-all duration-300 group"
              >
                Demo
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                asChild
              >
                <Link href="/dashboard">Try Demo</Link>
              </Button>
            </div>

            <button
              className="md:hidden flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="text-black font-medium">MENU</span>
              <Menu className="h-5 w-5 text-black" />
            </button>
          </div>
        </nav>

        {/* Hero Section - Better text contrast and spacing */}
        <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20">
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl">
            <div className="text-xs sm:text-sm font-semibold text-gray-500 tracking-[0.2em] mb-4 sm:mb-6 lg:mb-8 animate-fade-in">
              HEALTHY CHOICES WITH MENTAL MIND
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-[1.05] mb-4 sm:mb-6 lg:mb-8 animate-slide-up">
              Advancing Mental Healthcare through AI Technology
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-8 sm:mb-10 lg:mb-12 max-w-xl animate-fade-in-delayed">
              Welcome to our Mental Mind platform, where we are committed to
              developing innovative solutions for mental wellness and emotional
              well-being.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 lg:mb-16">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-full font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
              >
                Start Program
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>

              <button className="flex items-center gap-2 sm:gap-3 text-gray-600 hover:text-black transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-full flex items-center justify-center group-hover:border-black group-hover:scale-110 transition-all duration-300">
                  <Play className="h-3 w-3 sm:h-4 sm:w-4 ml-0.5 group-hover:text-black" />
                </div>
                <span className="text-xs sm:text-sm font-medium">
                  Watch Demo
                </span>
              </button>
            </div>

            {/* Additional Content Section */}
            {/* <div className="mb-8 sm:mb-12 lg:mb-16">
              <div className="text-sm font-medium text-gray-700 mb-4 sm:mb-6 animate-fade-in-delayed">
                Trusted by mental health professionals worldwide
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-lg">
                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-colors duration-300">
                      <Brain className="h-4 w-4 text-teal-600" />
                    </div>
                    <span className="text-2xl font-bold text-black">95%</span>
                  </div>
                  <p className="text-sm text-gray-600">Accuracy Rate</p>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                      <Heart className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-2xl font-bold text-black">24/7</span>
                  </div>
                  <p className="text-sm text-gray-600">Support Available</p>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-black">10K+</span>
                  </div>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                      <BarChart3 className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-2xl font-bold text-black">50+</span>
                  </div>
                  <p className="text-sm text-gray-600">Countries</p>
                </div>
              </div>
            </div> */}

            {/* Key Benefits */}
            {/* <div className="mb-8 sm:mb-12 lg:mb-16">
              <h3 className="text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4 animate-fade-in-delayed">
                Why Choose Mental Mind?
              </h3>

              <div className="space-y-3 max-w-lg">
                <div className="flex items-start gap-3 group">
                  <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Evidence-Based Approach
                    </p>
                    <p className="text-xs text-gray-600">
                      Built on proven therapeutic methodologies
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Personalized Experience
                    </p>
                    <p className="text-xs text-gray-600">
                      Tailored to your unique mental health needs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Complete Privacy
                    </p>
                    <p className="text-xs text-gray-600">
                      Your data is encrypted and secure
                    </p>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Scroll indicator - Better styling */}
            <div className="flex items-center gap-3 text-black group cursor-pointer">
              <div className="w-6 h-6 border border-black rounded-sm flex items-center justify-center transform rotate-45 group-hover:bg-black group-hover:text-white transition-all duration-300">
                <ArrowRight className="h-3 w-3 transform -rotate-45" />
              </div>
              <span className="text-sm font-medium group-hover:text-teal-600 transition-colors duration-300">
                Scroll for More
              </span>
            </div>
          </div>
        </section>

        {/* Simple CTA Section - Minimalist */}
        <section className="container mx-auto px-4 sm:px-6 py-16 lg:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight mb-6">
              Experience AI-Powered Mental Wellness
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Advanced technology meets compassionate care for your mental health journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/dashboard"
                className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Try Live Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link 
                href="/analytics"
                className="inline-flex items-center justify-center border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300"
              >
                View Analytics
              </Link>
            </div>
          </div>
        </section>

        {/* Innovation Showcase Section - Perfect for Hackathon */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            {/* Innovation Header */}
            <div className="text-center mb-12 lg:mb-16">
              <div className="text-xs sm:text-sm font-semibold text-teal-600 tracking-[0.2em] mb-4">
                HACKATHON PROJECT SHOWCASE
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight mb-6">
                Revolutionizing Mental Health with AI Innovation
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Built with cutting-edge technology to demonstrate the future of
                accessible mental healthcare through artificial intelligence.
              </p>
            </div>

            {/* Tech Stack & Innovation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
              {/* AI Innovation */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 lg:p-8 border border-purple-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-3">
                  Advanced AI Models
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Implementing state-of-the-art NLP and sentiment analysis for
                  real-time mental health assessment
                </p>
              </div>

              {/* Real-time Processing */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 lg:p-8 border border-teal-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-3">
                  Real-time Analysis
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Instant mood detection and personalized recommendations
                  powered by machine learning algorithms
                </p>
              </div>

              {/* Data Visualization */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 lg:p-8 border border-green-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-3">
                  Smart Analytics
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Interactive dashboards and data visualization for tracking
                  mental wellness patterns
                </p>
              </div>
            </div>

            {/* Call to Action - Hackathon Style */}
            <div className="text-center bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-gray-100 shadow-xl">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight mb-6">
                Experience the Future of Mental Healthcare
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                This innovative platform demonstrates how AI can make mental
                health support more accessible, personalized, and effective for
                everyone.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  Try Live Demo
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>

                <Link
                  href="/analytics"
                  className="inline-flex items-center justify-center border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg hover:scale-105 transition-all duration-300"
                >
                  View Analytics
                </Link>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Open Source Project</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>AI-Powered Innovation</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Real-time Processing</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delayed {
          animation: fade-in 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }

        /* Responsive improvements */
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
