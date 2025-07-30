import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-10 right-1/4 w-48 h-48 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Floating nature elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 opacity-20 animate-bounce" style={{animationDuration: '3s'}}>
          <span className="text-4xl">🌸</span>
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-20 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
          <span className="text-3xl">🍃</span>
        </div>
        <div className="absolute bottom-1/4 left-1/5 opacity-20 animate-bounce" style={{animationDuration: '3.5s', animationDelay: '2s'}}>
          <span className="text-3xl">🌱</span>
        </div>
        <div className="absolute bottom-1/3 right-1/3 opacity-20 animate-bounce" style={{animationDuration: '4.5s', animationDelay: '0.5s'}}>
          <span className="text-2xl">✨</span>
        </div>
      </div>

      {/* Main Login Container */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-emerald-100/50 relative overflow-hidden">
          {/* Decorative header elements */}
          <div className="absolute top-0 right-0 w-40 h-40 opacity-5 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-600">
              <circle cx="20" cy="20" r="8" fill="currentColor"/>
              <circle cx="50" cy="15" r="6" fill="currentColor"/>
              <circle cx="80" cy="30" r="10" fill="currentColor"/>
              <circle cx="35" cy="50" r="7" fill="currentColor"/>
              <circle cx="70" cy="70" r="9" fill="currentColor"/>
              <circle cx="25" cy="80" r="5" fill="currentColor"/>
              <path d="M20,20 Q50,15 80,30 Q70,70 35,50 Q25,80 20,20" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
            </svg>
          </div>

          <div className="relative z-10">
            {/* Welcome Header */}
            <div className="text-center mb-10">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-100 to-green-100 rounded-full animate-pulse"></div>
                <div className="absolute inset-3 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full flex items-center justify-center shadow-inner">
                  <div className="text-3xl">🧘‍♀️</div>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-sm">🌸</span>
                </div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-green-200 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0.5s'}}>
                  <span className="text-sm">🍃</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 via-teal-600 to-green-600 bg-clip-text text-transparent mb-3">
                🌿 Welcome Back
              </h1>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">to Arvyax</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Continue your journey of wellness and inner peace
              </p>
              <div className="flex justify-center space-x-2 mt-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-emerald-700 mb-2 flex items-center">
                  <span className="mr-2">📧</span>
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border-2 border-emerald-200 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-gray-800 placeholder-emerald-400 shadow-inner group-hover:border-emerald-300"
                    required
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-30">
                    <span className="text-emerald-600">✨</span>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-emerald-700 mb-2 flex items-center">
                  <span className="mr-2">🔐</span>
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border-2 border-emerald-200 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-gray-800 placeholder-emerald-400 shadow-inner group-hover:border-emerald-300"
                    required
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-30">
                    <span className="text-emerald-600">🌿</span>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50/90 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center mr-3">
                      <span className="text-lg">⚠️</span>
                    </div>
                    <div>
                      <p className="text-red-800 font-semibold text-sm">{error}</p>
                      <p className="text-red-600 text-xs mt-1">Take a deep breath and try again</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-600 hover:via-teal-600 hover:to-green-600 disabled:from-emerald-400 disabled:via-teal-400 disabled:to-green-400 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-center">
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      <span className="text-lg">Connecting to your journey...</span>
                    </>
                  ) : (
                    <>
                      <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-200">🌟</span>
                      <span className="text-lg">Begin Your Wellness Journey</span>
                      <svg className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-8">
              <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 rounded-2xl p-6 border border-emerald-100 text-center">
                <p className="text-emerald-700 font-medium mb-3">New to your wellness journey?</p>
                <a
                  href="/register"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 hover:from-emerald-200 hover:to-teal-200 text-emerald-800 font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 group"
                >
                  <span className="mr-2 group-hover:scale-110 transition-transform duration-200">🌱</span>
                  Start Your Journey Here
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Wellness Quote */}
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-emerald-50/60 to-teal-50/60 rounded-2xl p-4 border border-emerald-100/50">
                <p className="text-emerald-700 font-medium text-sm mb-1">💡 Daily Inspiration</p>
                <p className="text-emerald-600 text-xs italic">
                  "The journey of a thousand miles begins with a single step towards inner peace."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;