import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";

import "@/components/AnimatedNavbar.css"; // <-- ADD THIS

export default function MainLayout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav("/login");
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10">

        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

            {/* 🔥 ANIMATED NAVBAR */}
            <div className="navbar-wrapper">
              <div className="nav-container">
                <NavLink to="/" className={({ isActive }) => 
                    isActive ? "nav-item active" : "nav-item"
                }>
                  Dashboard
                </NavLink>

                <NavLink to="/students" className={({ isActive }) => 
                    isActive ? "nav-item active" : "nav-item"
                }>
                  Students
                </NavLink>

                {user?.role === "admin" && (
                  <NavLink to="/fields" className={({ isActive }) => 
                      isActive ? "nav-item active" : "nav-item"
                  }>
                    Custom Fields
                  </NavLink>
                )}

                {/* SVG OUTLINE */}
                <svg className="nav-outline" width="420" height="60" xmlns="http://www.w3.org/2000/svg">
                  <rect
                    className="nav-rect"
                    pathLength="100"
                    x="0"
                    y="0"
                    width="420"
                    height="60"
                    fill="transparent"
                    strokeWidth="4"
                    rx="12"
                  />
                </svg>
              </div>
            </div>

            {/* USER + LOGOUT */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-medium text-gray-700">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.role}</div>
              </div>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </div>

          </div>
        </header>

        <main className="max-w-6xl mx-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}





// import React from "react";
// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";
// import { Button } from "@/components/ui/button";
// import AnimatedBackground from "@/components/AnimatedBackground";

// export default function MainLayout() {
//   const { user, logout } = useAuth();
//   const nav = useNavigate();

//   function handleLogout() {
//     logout();
//     nav("/login");
//   }

//   return (
//     <div className="relative min-h-screen overflow-hidden">

//       {/* 🔥 FULL-PAGE BACKGROUND */}
//       <AnimatedBackground />

//       {/* 🔥 PAGE CONTENT ABOVE BACKGROUND */}
//       <div className="relative z-10">

//         <header className="bg-white shadow-sm sticky top-0 z-20">
//           <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            
//             <div className="flex items-center gap-6">
//               <h1 className="text-xl font-semibold">Student RBAC</h1>

//               <nav className="flex gap-4">
//                 <NavLink
//                   to="/"
//                   className={({ isActive }) =>
//                     isActive ? "text-indigo-600" : "text-gray-600"
//                   }
//                 >
//                   Dashboard
//                 </NavLink>

//                 <NavLink
//                   to="/students"
//                   className={({ isActive }) =>
//                     isActive ? "text-indigo-600" : "text-gray-600"
//                   }
//                 >
//                   Students
//                 </NavLink>

//                 {user?.role === "admin" && (
//                   <NavLink
//                     to="/fields"
//                     className={({ isActive }) =>
//                       isActive ? "text-indigo-600" : "text-gray-600"
//                     }
//                   >
//                     Custom Fields
//                   </NavLink>
//                 )}
//               </nav>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="text-right">
//                 <div className="font-medium text-gray-700">{user?.name}</div>
//                 <div className="text-xs text-gray-500">{user?.role}</div>
//               </div>
//               <Button variant="ghost" onClick={handleLogout}>
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </header>

//         <main className="max-w-6xl mx-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


