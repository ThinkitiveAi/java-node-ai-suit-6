import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import PatientLogin from './components/PatientLogin';
import ProviderLogin from './components/ProviderLogin';
import SmookyCursor from './components/SmookyCursor';
import LoginToggle from './components/LoginToggle';
import { ProviderSelectPage, AppointmentListPage } from './pages';
import ProviderDashboard from './components/ProviderAvailability/ProviderDashboard';

function PatientLoginRoute() {
  const navigate = useNavigate();
  return (
    <PatientLogin onSuccess={() => navigate('/appointments')} onShowRegistration={() => navigate('/appointments')} onForgotPassword={() => {}} onNeedHelp={() => {}} />
  );
}

function ProviderLoginRoute() {
  const navigate = useNavigate();
  return (
    <ProviderLogin onSuccess={() => navigate('/provider/availability')} />
  );
}

function AppRoutes() {
  const [activeView, setActiveView] = useState('patient');
  const [showRegistration] = useState(false);

  return (
    <div className="App">
      <SmookyCursor />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <LoginToggle activeView={activeView} onToggle={setActiveView} />
              {activeView === 'patient' ? <PatientLoginRoute /> : <ProviderLoginRoute />}
            </div>
          }
        />
        <Route path="/provider/select" element={<ProviderSelectPage />} />
        <Route path="/provider/availability" element={<ProviderDashboard />} />
        <Route path="/appointments" element={<AppointmentListPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
