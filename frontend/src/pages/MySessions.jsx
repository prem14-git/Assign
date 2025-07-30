import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buildApiUrl } from "../config/api.js";

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ message: "", type: "success", show: false });

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(buildApiUrl("/my-sessions"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch your sessions");
      setSessions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session? This action cannot be undone.")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(buildApiUrl(`/my-sessions/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete session");
      
      showToast(data.message || "Session deleted successfully!", "success");
      setSessions((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type, show: true });
    setTimeout(() => setToast({ message: "", type: "success", show: false }), 4000);
  };

  const Toast = ({ message, type, show, onClose }) => {
    if (!show || !message) return null;
    
    return (
      <div className={`fixed top-6 right-6 z-50 p-4 rounded-2xl shadow-2xl backdrop-blur-md border-2 transform transition-all duration-500 ${
        type === "success" 
          ? "bg-emerald-50/95 border-emerald-200 text-emerald-800" 
          : "bg-red-50/95 border-red-200 text-red-800"
      }`}>
        <div className="flex items-center">
          <span className="text-xl mr-3">{type === "success" ? "✅" : "❌"}</span>
          <span className="font-semibold">{message}</span>
          <button onClick={onClose} className="ml-4 text-xl hover:scale-110 transition-transform">×</button>
        </div>
      </div>
    );
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-emerald-100/50">
          <div className="animate-pulse">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <div className="h-8 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-xl w-2/3 mb-3"></div>
                <div className="h-5 bg-emerald-100 rounded-lg w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-10 bg-yellow-200 rounded-xl w-16"></div>
                <div className="h-10 bg-red-200 rounded-xl w-20"></div>
              </div>
            </div>
            <div className="flex space-x-3 mb-4">
              <div className="h-6 bg-emerald-100 rounded-full w-20"></div>
              <div className="h-6 bg-teal-100 rounded-full w-24"></div>
            </div>
            <div className="h-4 bg-gray-100 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-20">
      <div className="relative w-48 h-48 mx-auto mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-100 to-green-100 rounded-full animate-pulse"></div>
        <div className="absolute inset-6 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full flex items-center justify-center shadow-inner">
          <div className="text-7xl">📝</div>
        </div>
        <div className="absolute -top-3 -right-3 w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center animate-bounce">
          <span className="text-2xl">✨</span>
        </div>
        <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-green-200 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0.5s'}}>
          <span className="text-2xl">🌱</span>
        </div>
      </div>
      <h3 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
        Your Creative Space Awaits
      </h3>
      <p className="text-gray-600 max-w-lg mx-auto text-xl leading-relaxed mb-8">
        You haven't created any wellness sessions yet. This is your sanctuary to craft meaningful mindfulness experiences and share your wisdom with the world.
      </p>
      <div className="flex justify-center space-x-4 mb-8">
        <div className="w-4 h-4 bg-emerald-400 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
      </div>
      <Link
        to="/session-editor"
        className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-600 hover:via-teal-600 hover:to-green-600 text-white font-bold rounded-3xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden group text-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="mr-4 text-2xl group-hover:scale-110 transition-transform duration-200">🌟</span>
        <span className="relative z-10">Create Your First Session</span>
        <svg className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform duration-200 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  );

  const SessionCard = ({ session }) => (
    <div className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-emerald-100/50 hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 hover:scale-[1.01] relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
        <div className="w-16 h-16 text-emerald-600">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="30" cy="30" r="8" fill="currentColor" opacity="0.4"/>
            <circle cx="70" cy="50" r="6" fill="currentColor" opacity="0.6"/>
            <circle cx="50" cy="80" r="10" fill="currentColor" opacity="0.3"/>
            <path d="M30,30 Q50,10 70,50 Q90,80 50,80 Q10,50 30,30" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2"/>
          </svg>
        </div>
      </div>

      {/* Status indicator */}
      <div className="absolute top-6 left-6">
        <div className={`flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
          session.status === "draft" 
            ? "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-2 border-yellow-200" 
            : "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-2 border-emerald-200"
        }`}>
          <div className={`w-3 h-3 rounded-full mr-2 animate-pulse ${
            session.status === "draft" ? "bg-yellow-500" : "bg-emerald-500"
          }`}></div>
          <span className="uppercase tracking-wide text-xs">
            {session.status === "draft" ? "✍️ Draft" : "✅ Published"}
          </span>
        </div>
      </div>

      <div className="relative z-10 pt-12">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 pr-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-4">🧘‍♀️</span>
              <h3 className="text-2xl font-bold text-gray-800 group-hover:text-emerald-700 transition-colors leading-tight">
                {session.title}
              </h3>
            </div>
            <div className="flex items-center text-emerald-600 font-semibold mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm uppercase tracking-wide">Your Creation</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link
              to={`/session-editor/${session._id}`}
              className="group inline-flex items-center px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="mr-2 text-lg group-hover:scale-110 transition-transform duration-200">✏️</span>
              <span className="relative z-10 text-sm">Edit</span>
            </Link>
            <button
              onClick={() => handleDelete(session._id)}
              className="group inline-flex items-center px-4 py-3 bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="mr-2 text-lg group-hover:scale-110 transition-transform duration-200">🗑️</span>
              <span className="relative z-10 text-sm">Delete</span>
            </button>
          </div>
        </div>

        {/* Tags Section */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <span className="text-sm font-semibold text-gray-600 mr-3">🏷️ Practice Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {session.tags && session.tags.length > 0 ? (
              session.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200 shadow-sm"
                >
                  <span className="mr-1">🌿</span>
                  {tag}
                </span>
              ))
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border border-gray-200 shadow-sm">
                <span className="mr-1">🌸</span>
                No tags yet
              </span>
            )}
          </div>
        </div>

        {/* Session Info */}
        <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 rounded-2xl p-6 mb-6 border border-emerald-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-xl flex items-center justify-center mr-4 shadow-md">
                <span className="text-xl">📅</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-700 mb-1">Last Updated</p>
                <p className="text-emerald-600 text-sm">
                  {new Date(session.updated_at).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <a
                href={session.json_file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition-colors group"
              >
                <span className="mr-2">📄</span>
                <span className="group-hover:underline">View JSON</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
      {/* Toast Component */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        show={toast.show}
        onClose={() => setToast({ message: "", type: "success", show: false })} 
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-10 right-1/4 w-48 h-48 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-emerald-100/50 mb-10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-700 via-teal-600 to-green-600 bg-clip-text text-transparent mr-4">
                    📝 My Wellness Sessions
                  </h1>
                </div>
                <p className="text-gray-700 text-xl leading-relaxed max-w-3xl mb-6">
                  Your personal collection of mindfulness journeys and wellness practices. 
                  Here you can create, edit, and manage the sacred experiences you wish to share with the world.
                </p>
                <div className="flex items-center space-x-6 text-emerald-600">
                  <div className="flex items-center">
                    <span className="mr-2">✍️</span>
                    <span className="font-semibold">Create</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">✏️</span>
                    <span className="font-semibold">Edit</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🌟</span>
                    <span className="font-semibold">Share</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-200 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                  <span className="relative z-10">Back to Dashboard</span>
                </Link>
                
                <Link
                  to="/session-editor"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-600 hover:via-teal-600 hover:to-green-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-200">✨</span>
                  <span className="relative z-10">Create New Session</span>
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-200 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Stats */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-emerald-100/50 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-xl flex items-center justify-center shadow-inner">
                  <span className="text-2xl">📝</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {loading ? "..." : sessions.length}
              </div>
              <div className="text-emerald-700 font-bold mb-1">Total Sessions</div>
              <div className="text-emerald-600 text-sm">Your wellness library</div>
            </div>
            
            <div className="text-center group">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-xl flex items-center justify-center shadow-inner">
                  <span className="text-2xl">✍️</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {loading ? "..." : sessions.filter(s => s.status === "draft").length}
              </div>
              <div className="text-yellow-700 font-bold mb-1">Drafts</div>
              <div className="text-yellow-600 text-sm">Work in progress</div>
            </div>
            
            <div className="text-center group">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-green-200 to-emerald-300 rounded-xl flex items-center justify-center shadow-inner">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {loading ? "..." : sessions.filter(s => s.status === "published").length}
              </div>
              <div className="text-green-700 font-bold mb-1">Published</div>
              <div className="text-green-600 text-sm">Live for the world</div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50/90 backdrop-blur-sm border-2 border-red-200 rounded-3xl p-8 mb-10 shadow-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mr-6">
                <span className="text-2xl">⚠️</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-red-800 mb-2">Unable to Load Your Sessions</h3>
                <p className="text-red-700 text-lg">Take a deep breath, center yourself, and try refreshing the page.</p>
                <p className="text-red-600 text-sm mt-2 font-mono bg-red-100 px-3 py-1 rounded-lg inline-block">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-emerald-100/50">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Your Wellness Creations</h2>
              <p className="text-gray-600 text-lg">Mindful sessions crafted from your heart and soul</p>
            </div>
            {!loading && !error && sessions.length > 0 && (
              <div className="text-right">
                <div className="bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-emerald-200 rounded-2xl px-6 py-3 shadow-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📚</span>
                    <div>
                      <span className="block text-emerald-800 font-bold text-lg">
                        {sessions.length} Session{sessions.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-emerald-600 text-sm">Created by you</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {loading && <LoadingSkeleton />}
          
          {!loading && !error && sessions.length === 0 && <EmptyState />}
          
          {!loading && !error && sessions.length > 0 && (
            <div className="space-y-8">
              {sessions.map((session) => (
                <SessionCard key={session._id} session={session} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySessions;