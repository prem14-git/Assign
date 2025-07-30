import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const AUTO_SAVE_DELAY = 5000; // 5 seconds

const SessionEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [jsonFileUrl, setJsonFileUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [autoSaved, setAutoSaved] = useState(false);
  const [sessionId, setSessionId] = useState(id || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const timerRef = useRef(null);

  // Fetch session if editing
  useEffect(() => {
    const fetchSession = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/my-sessions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch session");
        setTitle(data.title || "");
        setTags(data.tags ? data.tags.join(", ") : "");
        setJsonFileUrl(data.json_file_url || "");
        setSessionId(data._id);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSession();
  }, [id]);

  const saveDraft = async (showMessage = true) => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/my-sessions/save-draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sessionId,
          title,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          json_file_url: jsonFileUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save draft");
      if (data.session && data.session._id) setSessionId(data.session._id);
      if (showMessage) setMessage(data.message || "Draft saved!");
      setAutoSaved(!showMessage);
      if (!showMessage) setTimeout(() => setAutoSaved(false), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Auto-save effect
  useEffect(() => {
    if (!title && !jsonFileUrl) return; // Don't auto-save empty form
    setAutoSaved(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      saveDraft(false); // Auto-save, no message
    }, AUTO_SAVE_DELAY);
    return () => clearTimeout(timerRef.current);
  }, [title, tags, jsonFileUrl]);

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    await saveDraft(true);
    setIsLoading(false);
  };

  const handlePublish = async () => {
    setMessage("");
    setError("");
    if (!sessionId) {
      setError("Please save the draft first before publishing.");
      return;
    }
    setIsPublishing(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/my-sessions/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to publish session");
      setMessage("Session published successfully!");
      // Redirect to my-sessions after successful publish
      setTimeout(() => {
        navigate("/my-sessions");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-8 animate-pulse">
      <div className="h-16 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-2xl"></div>
      <div className="h-16 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-2xl"></div>
      <div className="h-16 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-2xl"></div>
      <div className="flex gap-4">
        <div className="flex-1 h-14 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-2xl"></div>
        <div className="flex-1 h-14 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-2xl"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-emerald-100/50 mb-8 relative overflow-hidden">
          {/* Header decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 opacity-5 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-600">
              <path d="M50,10 C30,30 30,70 50,90 C70,70 70,30 50,10 Z" fill="currentColor" opacity="0.3"/>
              <circle cx="50" cy="30" r="8" fill="currentColor" opacity="0.5"/>
              <circle cx="35" cy="50" r="6" fill="currentColor" opacity="0.4"/>
              <circle cx="65" cy="70" r="7" fill="currentColor" opacity="0.6"/>
            </svg>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                <span className="text-2xl">✍️</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-2">
                  {id ? 'Edit Wellness Session' : 'Create New Session'}
                </h1>
                <p className="text-gray-600 text-lg">Share your mindful practice with the community</p>
              </div>
            </div>
            <Link
              to="/my-sessions"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
            >
              <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to My Sessions</span>
            </Link>
          </div>
        </div>

        {/* Auto-save indicator */}
        {autoSaved && (
          <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-xl border-2 border-green-400 animate-bounce z-50">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
              <span className="font-semibold">Auto-saved! ✨</span>
            </div>
          </div>
        )}

        {/* Main Editor Form */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-emerald-100/50 relative overflow-hidden">
          {/* Form decorative elements */}
          <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
            <div className="w-20 h-20 text-emerald-600">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="25" cy="25" r="3" fill="currentColor"/>
                <circle cx="50" cy="15" r="4" fill="currentColor"/>
                <circle cx="75" cy="30" r="3" fill="currentColor"/>
                <circle cx="40" cy="50" r="5" fill="currentColor"/>
                <circle cx="70" cy="65" r="4" fill="currentColor"/>
                <circle cx="20" cy="75" r="3" fill="currentColor"/>
              </svg>
            </div>
          </div>

          <div className="relative z-10">
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <form onSubmit={handleSaveDraft} className="space-y-8">
                {/* Title Input */}
                <div className="group">
                  <label className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                    <span className="text-2xl mr-3">🌸</span>
                    Session Title
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your wellness session title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-6 text-lg border-2 border-emerald-200 rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl placeholder-gray-400 group-hover:border-emerald-300"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                      <span className="text-emerald-400 text-xl">✨</span>
                    </div>
                  </div>
                </div>

                {/* Tags Input */}
                <div className="group">
                  <label className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                    <span className="text-2xl mr-3">🏷️</span>
                    Practice Tags
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="meditation, mindfulness, breathing, relaxation..."
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full p-6 text-lg border-2 border-emerald-200 rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl placeholder-gray-400 group-hover:border-emerald-300"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                      <span className="text-emerald-400 text-xl">🌿</span>
                    </div>
                  </div>
                  <p className="text-emerald-600 text-sm mt-3 ml-2">Separate tags with commas to help others discover your session</p>
                </div>

                {/* JSON File URL Input */}
                <div className="group">
                  <label className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                    <span className="text-2xl mr-3">🔗</span>
                    Session Content URL
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      placeholder="https://example.com/your-wellness-session.json"
                      value={jsonFileUrl}
                      onChange={(e) => setJsonFileUrl(e.target.value)}
                      className="w-full p-6 text-lg border-2 border-emerald-200 rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl placeholder-gray-400 group-hover:border-emerald-300"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                      <span className="text-emerald-400 text-xl">🌐</span>
                    </div>
                  </div>
                  <p className="text-emerald-600 text-sm mt-3 ml-2">Link to your session's JSON content file</p>
                </div>

                {/* Messages */}
                {error && (
                  <div className="bg-red-50/90 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-xl">⚠️</span>
                      </div>
                      <div>
                        <h4 className="text-red-800 font-semibold text-lg mb-1">Unable to Process</h4>
                        <p className="text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {message && (
                  <div className="bg-green-50/90 backdrop-blur-sm border-2 border-green-200 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-xl">✅</span>
                      </div>
                      <div>
                        <h4 className="text-green-800 font-semibold text-lg mb-1">Success</h4>
                        <p className="text-green-700">{message}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 group inline-flex items-center justify-center px-8 py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-600 hover:via-teal-600 hover:to-green-600 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        <span className="relative z-10">Saving...</span>
                      </>
                    ) : (
                      <>
                        <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-200">💾</span>
                        <span className="relative z-10">Save as Draft</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={isPublishing || !sessionId}
                    className="flex-1 group inline-flex items-center justify-center px-8 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isPublishing ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        <span className="relative z-10">Publishing...</span>
                      </>
                    ) : (
                      <>
                        <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-200">🚀</span>
                        <span className="relative z-10">Publish Session</span>
                      </>
                    )}
                  </button>
                </div>

                {!sessionId && (
                  <div className="bg-amber-50/90 backdrop-blur-sm border-2 border-amber-200 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-xl">💡</span>
                      </div>
                      <div>
                        <h4 className="text-amber-800 font-semibold text-lg mb-1">Mindful Reminder</h4>
                        <p className="text-amber-700">Save your session as a draft first before you can publish it to the community</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Helpful Tips */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-emerald-100/50 mt-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-2">
              Creating Mindful Sessions ✨
            </h3>
            <p className="text-gray-600">Tips for sharing meaningful wellness experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Clear Intent</h4>
              <p className="text-gray-600 text-sm">Define the purpose and goals of your wellness session</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">🌱</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Growth Focus</h4>
              <p className="text-gray-600 text-sm">Include practices that encourage personal development</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">💚</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Community Care</h4>
              <p className="text-gray-600 text-sm">Share with love and consideration for others' wellbeing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionEditor;