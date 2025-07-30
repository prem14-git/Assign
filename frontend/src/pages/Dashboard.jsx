// import React, { useEffect, useState } from "react";
// import LogoutButton from "../components/LogoutButton.jsx";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchSessions = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const res = await fetch("/api/sessions");
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message || "Failed to fetch sessions");
//         setSessions(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSessions();
//   }, []);

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Dashboard</h2>
//         <LogoutButton />
//       </div>
//       <div className="mb-4">
//         <Link to="/my-sessions" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
//           My Sessions
//         </Link>
//       </div>
//       {loading && <div>Loading sessions...</div>}
//       {error && <div className="text-red-500 mb-2">{error}</div>}
//       {!loading && !error && (
//         <div>
//           {sessions.length === 0 ? (
//             <div>No public wellness sessions found.</div>
//           ) : (
//             <ul className="space-y-4">
//               {sessions.map((session) => (
//                 <li key={session._id} className="border p-4 rounded">
//                   <h3 className="text-lg font-semibold">{session.title}</h3>
//                   <div className="text-sm text-gray-600 mb-1">
//                     Tags: {session.tags && session.tags.length > 0 ? session.tags.join(", ") : "None"}
//                   </div>
//                   <a
//                     href={session.json_file_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline text-sm"
//                   >
//                     View JSON File
//                   </a>
//                   <div className="text-xs text-gray-400 mt-1">
//                     Published: {new Date(session.created_at).toLocaleString()}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;





// import React, { useEffect, useState } from "react";
// import LogoutButton from "../components/LogoutButton.jsx";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchSessions = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const res = await fetch("/api/sessions");
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message || "Failed to fetch sessions");
//         setSessions(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSessions();
//   }, []);

//   const LoadingSkeleton = () => (
//     <div className="space-y-6">
//       {[1, 2, 3].map((i) => (
//         <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
//           <div className="animate-pulse">
//             <div className="h-6 bg-gradient-to-r from-green-200 to-emerald-200 rounded-lg w-3/4 mb-3"></div>
//             <div className="h-4 bg-green-100 rounded w-1/2 mb-4"></div>
//             <div className="flex space-x-2 mb-3">
//               <div className="h-6 bg-green-100 rounded-full w-16"></div>
//               <div className="h-6 bg-emerald-100 rounded-full w-20"></div>
//             </div>
//             <div className="h-4 bg-green-100 rounded w-1/3"></div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const EmptyState = () => (
//     <div className="text-center py-20">
//       <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 rounded-full flex items-center justify-center shadow-lg">
//         <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       </div>
//       <h3 className="text-2xl font-semibold text-gray-800 mb-3">Find Your Inner Balance</h3>
//       <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">
//         No wellness sessions are currently available. Take this moment to breathe deeply and check back soon for new mindfulness journeys.
//       </p>
//       <div className="mt-8 flex justify-center">
//         <div className="flex space-x-2 text-green-500">
//           <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
//           <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
//           <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
//         </div>
//       </div>
//     </div>
//   );

//   const SessionCard = ({ session }) => (
//     <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100/50 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
//       {/* Subtle nature pattern overlay */}
//       <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
//         <svg viewBox="0 0 100 100" className="w-full h-full text-green-600">
//           <path d="M20,50 Q30,20 50,30 Q70,40 80,50 Q70,80 50,70 Q30,60 20,50 Z" fill="currentColor"/>
//         </svg>
//       </div>

//       <div className="relative z-10">
//         <div className="flex items-start justify-between mb-6">
//           <div className="flex-1">
//             <h3 className="text-xl font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors leading-snug mb-2">
//               {session.title}
//             </h3>
//             <div className="flex items-center text-sm text-green-600 font-medium">
//               <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               Community Wellness Session
//             </div>
//           </div>
//           <div className="flex-shrink-0 ml-4">
//             <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
//               🌱 Live
//             </span>
//           </div>
//         </div>

//         {/* Tags */}
//         <div className="mb-6">
//           <div className="flex flex-wrap gap-2">
//             {session.tags && session.tags.length > 0 ? (
//               session.tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200 hover:from-emerald-100 hover:to-teal-100 transition-colors"
//                 >
//                   <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//                   </svg>
//                   {tag}
//                 </span>
//               ))
//             ) : (
//               <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-50 text-gray-500 border border-gray-200">
//                 <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                 </svg>
//                 Untagged
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Actions and Info */}
//         <div className="flex items-center justify-between pt-4 border-t border-green-100">
//           <div className="flex items-center text-sm text-gray-600">
//             <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-9 4h10l-2 8H10l-2-8z" />
//             </svg>
//             Shared {new Date(session.created_at).toLocaleDateString('en-US', {
//               year: 'numeric',
//               month: 'short',
//               day: 'numeric',
//               hour: '2-digit',
//               minute: '2-digit'
//             })}
//           </div>
//           <a
//             href={session.json_file_url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group"
//           >
//             <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//             </svg>
//             Explore Session
//           </a>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
//       {/* Subtle nature background elements */}
//       <div className="absolute inset-0 opacity-5 pointer-events-none">
//         <div className="absolute top-20 left-10 w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-teal-400 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
//         {/* Header */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100/50 mb-8 relative overflow-hidden">
//           {/* Header decoration */}
//           <div className="absolute top-0 right-0 w-40 h-40 opacity-10 pointer-events-none">
//             <svg viewBox="0 0 100 100" className="w-full h-full text-green-600">
//               <circle cx="30" cy="30" r="3" fill="currentColor"/>
//               <circle cx="50" cy="20" r="2" fill="currentColor"/>
//               <circle cx="70" cy="35" r="4" fill="currentColor"/>
//               <circle cx="40" cy="50" r="2.5" fill="currentColor"/>
//               <circle cx="60" cy="60" r="3.5" fill="currentColor"/>
//               <circle cx="25" cy="65" r="2" fill="currentColor"/>
//             </svg>
//           </div>

//           <div className="relative z-10">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//               <div>
//                 <div className="flex items-center mb-4">
//                   <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent mr-3">
//                     🌿 Arvyax
//                   </h1>
//                   <div className="h-8 w-px bg-green-300 mx-2"></div>
//                   <span className="text-green-600 font-medium">Wellness Dashboard</span>
//                 </div>
//                 <p className="text-gray-700 text-lg leading-relaxed max-w-2xl">
//                   Discover community-shared wellness sessions, meditation practices, and nature-inspired mindfulness journeys. 
//                   Connect with your inner peace and explore holistic wellness experiences.
//                 </p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Link
//                   to="/my-sessions"
//                   className="inline-flex items-center px-6 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
//                 >
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                   My Wellness Journey
//                 </Link>
//                 <LogoutButton />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Wellness Stats */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100/50 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center group">
//               <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//                 </svg>
//               </div>
//               <div className="text-3xl font-bold text-gray-800 mb-1">
//                 {loading ? "..." : sessions.length}
//               </div>
//               <div className="text-green-600 font-medium">Mindful Sessions</div>
//               <div className="text-sm text-gray-500 mt-1">Available for exploration</div>
//             </div>
            
//             <div className="text-center group">
//               <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                 <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div className="text-3xl font-bold text-gray-800 mb-1">🧘</div>
//               <div className="text-emerald-600 font-medium">Harmony</div>
//               <div className="text-sm text-gray-500 mt-1">Mind • Body • Spirit</div>
//             </div>
            
//             <div className="text-center group">
//               <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-100 to-green-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                 <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                 </svg>
//               </div>
//               <div className="text-3xl font-bold text-gray-800 mb-1">∞</div>
//               <div className="text-teal-600 font-medium">Inner Peace</div>
//               <div className="text-sm text-gray-500 mt-1">Endless possibilities</div>
//             </div>
//           </div>
//         </div>

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-6 mb-8 shadow-lg">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-lg font-semibold text-red-800">Unable to Load Wellness Sessions</h3>
//                 <p className="mt-1 text-red-700">Take a deep breath and try refreshing: {error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Content */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100/50">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">Community Wellness Sessions</h2>
//               <p className="text-gray-600">Shared experiences from fellow wellness practitioners</p>
//             </div>
//             {!loading && !error && sessions.length > 0 && (
//               <div className="text-right">
//                 <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//                   <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   {sessions.length} session{sessions.length !== 1 ? 's' : ''} available
//                 </span>
//               </div>
//             )}
//           </div>

//           {loading && <LoadingSkeleton />}
          
//           {!loading && !error && sessions.length === 0 && <EmptyState />}
          
//           {!loading && !error && sessions.length > 0 && (
//             <div className="space-y-6">
//               {sessions.map((session) => (
//                 <SessionCard key={session._id} session={session} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import LogoutButton from "../components/LogoutButton.jsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/sessions");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch sessions");
        setSessions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-emerald-100/50">
          <div className="animate-pulse">
            <div className="h-7 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-xl w-3/4 mb-4"></div>
            <div className="h-5 bg-emerald-100 rounded-lg w-1/2 mb-6"></div>
            <div className="flex space-x-3 mb-6">
              <div className="h-8 bg-emerald-100 rounded-full w-20"></div>
              <div className="h-8 bg-teal-100 rounded-full w-24"></div>
              <div className="h-8 bg-green-100 rounded-full w-18"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-5 bg-emerald-100 rounded w-1/3"></div>
              <div className="h-10 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-xl w-32"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-20">
      <div className="relative w-40 h-40 mx-auto mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-100 to-green-100 rounded-full animate-pulse"></div>
        <div className="absolute inset-4 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full flex items-center justify-center shadow-inner">
          <div className="text-6xl">🧘‍♀️</div>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center animate-bounce">
          <span className="text-lg">🌸</span>
        </div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-green-200 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0.5s'}}>
          <span className="text-lg">🍃</span>
        </div>
      </div>
      <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
        Your Wellness Journey Awaits
      </h3>
      <p className="text-gray-600 max-w-lg mx-auto text-lg leading-relaxed mb-8">
        No wellness sessions are currently available. Take this moment to breathe deeply, 
        connect with your inner self, and check back soon for new mindfulness journeys.
      </p>
      <div className="flex justify-center space-x-4 mb-8">
        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
      </div>
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 max-w-md mx-auto border border-emerald-100">
        <p className="text-emerald-700 font-medium mb-2">💡 Mindful Tip</p>
        <p className="text-emerald-600 text-sm">
          "In the stillness of silence, we find the voice of our soul. Every moment of waiting is an opportunity for inner growth."
        </p>
      </div>
    </div>
  );

  const SessionCard = ({ session }) => (
    <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-emerald-100/50 hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
      {/* Floating nature elements */}
      <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
        <div className="w-20 h-20 text-emerald-600">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50,10 C30,30 30,70 50,90 C70,70 70,30 50,10 Z" fill="currentColor" opacity="0.3"/>
            <circle cx="50" cy="30" r="8" fill="currentColor" opacity="0.5"/>
            <circle cx="35" cy="50" r="6" fill="currentColor" opacity="0.4"/>
            <circle cx="65" cy="70" r="7" fill="currentColor" opacity="0.6"/>
          </svg>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-teal-50/50 rounded-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">🧘‍♀️</span>
              <h3 className="text-2xl font-bold text-gray-800 group-hover:text-emerald-700 transition-colors leading-tight">
                {session.title}
              </h3>
            </div>
            <div className="flex items-center text-emerald-600 font-semibold mb-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm uppercase tracking-wide">Wellness Session</span>
            </div>
          </div>
          <div className="flex-shrink-0 ml-6">
            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-emerald-200 rounded-2xl px-4 py-2 shadow-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-emerald-800 font-bold text-sm">LIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <span className="text-sm font-semibold text-gray-600 mr-3">🏷️ Practice Tags:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {session.tags && session.tags.length > 0 ? (
              session.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-2 border-emerald-200 hover:from-emerald-100 hover:to-teal-100 hover:scale-105 transition-all duration-200 shadow-sm"
                >
                  <span className="mr-2">🌿</span>
                  {tag}
                </span>
              ))
            ) : (
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border-2 border-gray-200 shadow-sm">
                <span className="mr-2">🌸</span>
                Open Practice
              </span>
            )}
          </div>
        </div>

        {/* Session Info Card */}
        <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 rounded-2xl p-6 mb-6 border border-emerald-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-xl flex items-center justify-center mr-4 shadow-md">
                <span className="text-xl">📅</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-700 mb-1">Shared with Love</p>
                <p className="text-emerald-600 text-sm">
                  {new Date(session.created_at).toLocaleDateString('en-US', {
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
              <div className="flex items-center text-emerald-600 mb-1">
                <span className="mr-2">✨</span>
                <span className="text-sm font-semibold">Ready to Explore</span>
              </div>
              <p className="text-xs text-emerald-500">Click to begin your journey</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <a
            href={session.json_file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-600 hover:via-teal-600 hover:to-green-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">🌟</span>
            <span className="relative z-10 text-lg">Begin Wellness Journey</span>
            <svg className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-200 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
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
        <div className="absolute top-10 right-1/4 w-48 h-48 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Header */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-emerald-100/50 mb-10 relative overflow-hidden">
          {/* Header decorative elements */}
          <div className="absolute top-0 right-0 w-60 h-60 opacity-5 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full text-emerald-600">
              <circle cx="50" cy="50" r="8" fill="currentColor"/>
              <circle cx="100" cy="30" r="6" fill="currentColor"/>
              <circle cx="150" cy="70" r="10" fill="currentColor"/>
              <circle cx="80" cy="100" r="7" fill="currentColor"/>
              <circle cx="130" cy="130" r="9" fill="currentColor"/>
              <circle cx="40" cy="150" r="5" fill="currentColor"/>
              <path d="M50,50 Q100,30 150,70 Q130,130 80,100 Q40,150 50,50" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-700 via-teal-600 to-green-600 bg-clip-text text-transparent mr-4">
                    🌿 Arvyax
                  </h1>
                  <div className="h-12 w-px bg-emerald-300 mx-4"></div>
                  <div>
                    <span className="text-emerald-700 font-bold text-lg">Wellness Dashboard</span>
                    <p className="text-emerald-600 text-sm">Where Mind, Body & Spirit Unite</p>
                  </div>
                </div>
                <p className="text-gray-700 text-xl leading-relaxed max-w-3xl mb-6">
                  Welcome to your sacred space of healing and growth. Discover community-shared wellness sessions, 
                  meditation practices, and nature-inspired mindfulness journeys. Connect with your inner peace 
                  and explore holistic wellness experiences that nurture your soul.
                </p>
                <div className="flex items-center space-x-6 text-emerald-600">
                  <div className="flex items-center">
                    <span className="mr-2">🧘‍♀️</span>
                    <span className="font-semibold">Meditation</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🌱</span>
                    <span className="font-semibold">Growth</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🌸</span>
                    <span className="font-semibold">Healing</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/my-sessions"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-200">🌟</span>
                  <span className="relative z-10">My Wellness Journey</span>
                </Link>
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>

        {/* Wellness Stats Dashboard */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-emerald-100/50 mb-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-2">
              Wellness Insights
            </h2>
            <p className="text-gray-600">Your journey to inner peace and holistic well-being</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-3xl shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-2xl flex items-center justify-center shadow-inner">
                  <span className="text-3xl">🧘‍♀️</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {loading ? "..." : sessions.length}
              </div>
              <div className="text-emerald-700 font-bold text-lg mb-1">Mindful Sessions</div>
              <div className="text-emerald-600 text-sm">Available for your practice</div>
            </div>
            
            <div className="text-center group">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-green-200 rounded-3xl shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-teal-200 to-green-300 rounded-2xl flex items-center justify-center shadow-inner">
                  <span className="text-3xl">🌱</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">∞</div>
              <div className="text-teal-700 font-bold text-lg mb-1">Growth</div>
              <div className="text-teal-600 text-sm">Endless possibilities await</div>
            </div>
            
            <div className="text-center group">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-200 rounded-3xl shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-green-200 to-emerald-300 rounded-2xl flex items-center justify-center shadow-inner">
                  <span className="text-3xl">💚</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">🕉️</div>
              <div className="text-green-700 font-bold text-lg mb-1">Inner Harmony</div>
              <div className="text-green-600 text-sm">Mind • Body • Spirit</div>
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
                <h3 className="text-2xl font-bold text-red-800 mb-2">Unable to Load Wellness Sessions</h3>
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
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Community Wellness Sessions</h2>
              <p className="text-gray-600 text-lg">Shared experiences from fellow wellness practitioners around the world</p>
            </div>
            {!loading && !error && sessions.length > 0 && (
              <div className="text-right">
                <div className="bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-emerald-200 rounded-2xl px-6 py-3 shadow-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">✨</span>
                    <div>
                      <span className="block text-emerald-800 font-bold text-lg">
                        {sessions.length} Session{sessions.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-emerald-600 text-sm">Available for practice</span>
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

export default Dashboard;