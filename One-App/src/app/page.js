import MenuBar from '../components/MenuBar'

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#221d3c] to-[#5c4fa2]/40 font-noto-sans overflow-hidden">
      {/* Background gradient that covers everything */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-[#221d3c] to-[#5c4fa2]/40 -z-10"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #221d3c 0%, rgba(92, 79, 162, 0.4) 100%)',
          zIndex: -10
        }}
      ></div>

      {/* Menu Bar - Absolute positioned as in original */}
      <MenuBar />

      {/* Body Section - Adjusted for absolute MenuBar */}
      <main className="pt-[62px] relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-display-large font-bold text-white mb-6">
              Welcome to OnPager
            </h1>
            <p className="text-body text-white/80 max-w-2xl mx-auto">
              This is the main content area where we'll add all the sections from the original website. 
              Each section will be implemented as a separate component for better organization and maintainability.
            </p>
            <div className="mt-8">
              <a 
                href="/admin" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Access Admin Panel
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-900/50 text-white mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-body text-white/70">
              © 2024 OnPager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
