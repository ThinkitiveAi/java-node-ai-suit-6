import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import { LoginFormData } from './types/auth';
import { RegistrationFormData } from './types/registration';

function App() {
  const [currentView, setCurrentView] = useState<'login' | 'register'>('register');

  const handleLogin = async (data: LoginFormData): Promise<void> => {
    // In a real application, this would make an API call to authenticate the user
    console.log('Login attempt:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, we'll just log the data
    // In production, you would:
    // 1. Send credentials to your authentication API
    // 2. Handle the response (success/error)
    // 3. Store authentication tokens
    // 4. Redirect to the dashboard
    
    if (data.emailOrPhone === 'admin@test.com' && data.password === 'password123') {
      console.log('Login successful!');
      // Redirect to dashboard
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const handleRegister = async (data: RegistrationFormData): Promise<void> => {
    // In a real application, this would make an API call to register the provider
    console.log('Registration attempt:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // For demo purposes, we'll just log the data
    // In production, you would:
    // 1. Send registration data to your API
    // 2. Handle validation and creation
    // 3. Send verification emails
    // 4. Redirect to appropriate page
    
    console.log('Registration successful!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-slate-100" />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Panel - Hidden on mobile */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800" />
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-white/10 to-transparent" />
          
          <div className="relative z-10 flex flex-col justify-center px-12 py-24 text-white">
            <div className="max-w-md">
              <h2 className="text-4xl font-bold mb-6">
                Healthcare Provider Portal
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Secure access to patient records, appointments, and healthcare management tools.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full" />
                  <span className="text-blue-100">HIPAA compliant security</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full" />
                  <span className="text-blue-100">Real-time patient monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full" />
                  <span className="text-blue-100">Integrated appointment system</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full" />
                  <span className="text-blue-100">Advanced analytics dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Forms */}
        <div className="flex-1 lg:w-1/2">
          <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl space-y-8">
              {/* Form Toggle */}
              <div className="flex justify-center mb-8">
                <div className="flex bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => setCurrentView('login')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'login'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setCurrentView('register')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'register'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>

              {/* Form Content */}
              {currentView === 'login' ? (
                <div className="max-w-md mx-auto">
                  <LoginForm onLogin={handleLogin} />
                </div>
              ) : (
                <RegistrationForm onRegister={handleRegister} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-white/80 backdrop-blur-sm border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-slate-600">
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <span>© 2024 Healthcare Provider Portal</span>
                <span className="hidden sm:inline">•</span>
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                <span className="hidden sm:inline">•</span>
                <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs">Need help?</span>
                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Contact Support</a>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default App; 