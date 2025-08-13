import React, { useMemo, useState } from 'react';
import Navbar from '../components/ui/Navbar';
import SearchableCombobox from '../components/ui/SearchableCombobox';
import { providers } from '../utils/sampleData';
import { useNavigate } from 'react-router-dom';

export default function ProviderSelectPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const items = useMemo(() => providers.map(p => ({ id: p.id, label: p.name, subLabel: p.specialty || 'General Medicine', avatar: p.avatar })), []);

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <Navbar active="Settings" />
      <div className="mx-auto mt-3 w-[1408px] max-w-full rounded border border-black/10 bg-white shadow px-4 py-3">
        <div className="md:w-[350px]">
          <SearchableCombobox
            label="Provider"
            placeholder="Search by provider name"
            items={items}
            value={selected}
            onChange={(item) => { setSelected(item); navigate('/provider/availability'); }}
          />
        </div>
      </div>
    </div>
  );
} 