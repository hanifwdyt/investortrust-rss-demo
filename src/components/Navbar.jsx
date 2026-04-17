import { Link, useLocation } from 'react-router-dom'
import GrantedFieldsBadge from './GrantedFieldsBadge'

export default function Navbar({ settings, onOpenSettings, grantedFields }) {
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="InvestorTrust" className="h-8" />
            </Link>
            <div className="hidden md:flex items-center gap-1">
              <NavLink to="/" current={location.pathname}>Home</NavLink>
              <NavLink to="/channel/market" current={location.pathname}>Market</NavLink>
              <NavLink to="/channel/business" current={location.pathname}>Business</NavLink>
              <NavLink to="/channel/macro" current={location.pathname}>Macro</NavLink>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {grantedFields && grantedFields.size > 0 && (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wide text-subtitle font-semibold">Fields</span>
                <GrantedFieldsBadge grantedFields={grantedFields} size="sm" />
              </div>
            )}
            {settings.apikey && (
              <span className="text-xs text-green-600 hidden sm:block">
                API Key Active
              </span>
            )}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Settings"
            >
              <svg className="w-5 h-5 text-subtitle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, current, children }) {
  const isActive = current === to || (to !== '/' && current.startsWith(to))
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-subtitle hover:text-title hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  )
}
