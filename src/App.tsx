import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { EquipmentPage } from './components/pages/EquipmentPage';
import { EquipmentDetail } from './components/EquipmentDetail';
import { mockEquipmentData } from './utils/mockData';
export function App() {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'equipment'
  const handleEquipmentSelect = equipment => {
    setSelectedEquipment(equipment);
  };
  const handleNavigation = view => {
    setCurrentView(view);
    setSelectedEquipment(null);
  };
  return <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} currentView={currentView} onNavigate={handleNavigation} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {currentView === 'dashboard' ? <>
              <DashboardOverview />
              <div className="mt-6">
                {selectedEquipment && <EquipmentDetail equipment={selectedEquipment} onBack={() => setSelectedEquipment(null)} />}
              </div>
            </> : selectedEquipment ? <EquipmentDetail equipment={selectedEquipment} onBack={() => setSelectedEquipment(null)} /> : <EquipmentPage equipmentData={mockEquipmentData} onSelectEquipment={handleEquipmentSelect} />}
        </main>
      </div>
    </div>;
}