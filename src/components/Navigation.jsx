import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Brain, Home, BookOpen, Search, User, LogOut } from 'lucide-react'

export default function Navigation({ user, onLogout }) {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <Brain className="h-8 w-8 text-blue-600" />
            <span>The Learn Master</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/dashboard">
              <Button 
                variant={isActive('/dashboard') ? 'default' : 'ghost'}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>

            <Link to="/request">
              <Button 
                variant={isActive('/request') ? 'default' : 'ghost'}
                className="gap-2"
              >
                <Search className="h-4 w-4" />
                Request Path
              </Button>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            <Link to="/profile">
              <Button variant="ghost" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">{user?.name}</span>
              </Button>
            </Link>
            <Button variant="ghost" onClick={onLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

