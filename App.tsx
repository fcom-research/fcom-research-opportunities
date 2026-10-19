import React, { useState, useMemo } from 'react';
import { RESEARCH_DATA } from './constants';
import { ResearchOpportunity } from './types';
import { Badge } from './components/Badge';
import { DetailModal } from './components/DetailModal';

// Icons
const SearchIcon = () => (
  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
  </svg>
);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('All');
  const [selectedOpportunity, setSelectedOpportunity] = useState<ResearchOpportunity | null>(null);

  // Filter Logic
  const filteredData = useMemo(() => {
    return RESEARCH_DATA.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      
      const matchesSearch = 
        item.piLastName.toLowerCase().includes(searchLower) ||
        item.piFirstName.toLowerCase().includes(searchLower) ||
        (item.institution && item.institution.toLowerCase().includes(searchLower)) ||
        item.department.toLowerCase().includes(searchLower) ||
        item.researchFocus.toLowerCase().includes(searchLower) ||
        item.keywords.toLowerCase().includes(searchLower) ||
        item.projectOverview.toLowerCase().includes(searchLower);

      const matchesTimeframe = 
        selectedTimeframe === 'All' || 
        item.timeframe.some(t => t.includes(selectedTimeframe));

      return matchesSearch && matchesTimeframe;
    });
  }, [searchTerm, selectedTimeframe]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* Header */}
  <header className="bg-brand-900 text-white shadow-md">
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">FCoM Research Opportunities</h1>
      <p className="mt-2 text-brand-100 text-lg">
        A centralized hub where medical students can explore active research projects across the Frist College of Medicine and partner institutions to connect with faculty mentors. This database highlights current opportunities, supports equitable access to research experiences, and promotes collaboration between students and faculty engaged in scholarly work.
      </p>
      <div className="mt-6">
        <button 
          disabled
          className="inline-block rounded-md bg-gray-300 px-6 py-3 text-base font-semibold text-gray-500 shadow-sm cursor-not-allowed uppercase"
        >
          Application Opens November 1st
        </button>
      </div>
    </div>
  </header>

      <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Controls */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          
          <div className="relative flex-1 max-w-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
              placeholder="Search by PI, keyword, topic, or institution..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="timeframe" className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Timeframe:
            </label>
            <select
              id="timeframe"
              className="block rounded-md border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              <option value="All">All Timeframes</option>
              <option value="Summer">Summer Research</option>
              <option value="Academic Year">Academic Year</option>
            </select>
          </div>
        </div>

        {/* Desktop/Tablet Table View */}
        <div className="hidden md:block shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg bg-white overflow-hidden">
          <table className="w-full table-fixed divide-y divide-gray-300 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 w-[14%]">PI Name</th>
                <th scope="col" className="px-2 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 w-[14%]">Institution</th>
                <th scope="col" className="px-2 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 w-[22%]">Area of Research</th>
                <th scope="col" className="px-2 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 w-[28%]">Project Overview</th>
                <th scope="col" className="px-2 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-700 w-[6%]">Students</th>
                <th scope="col" className="px-2 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 w-[9%]">Timeframe</th>
                <th scope="col" className="py-3.5 pl-2 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 w-[7%]">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredData.length > 0 ? (
                filteredData.map((opp) => (
                  <tr key={opp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 pl-4 pr-2 text-sm font-medium text-gray-900 align-top">
                      <div className="font-bold leading-tight">{opp.piLastName}, {opp.piFirstName}</div>
                      <div className="text-gray-500 font-normal text-xs mt-0.5">{opp.degree}</div>
                    </td>
                    <td className="px-2 py-3 text-xs text-gray-700 align-top">
                      <span className="inline-block rounded bg-gray-100 px-1.5 py-0.5 font-medium text-gray-800 leading-snug">
                        {opp.institution || 'Belmont University'}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-xs text-gray-600 align-top">
                      <div className="text-gray-900 font-semibold mb-1 line-clamp-2 leading-tight">{opp.researchFocus}</div>
                      <div className="text-gray-400 italic line-clamp-1">{opp.keywords}</div>
                    </td>
                    <td className="px-2 py-3 text-xs text-gray-600 align-top">
                      <p className="line-clamp-2 leading-relaxed mb-1">{opp.projectOverview}</p>
                      <button 
                        onClick={() => setSelectedOpportunity(opp)}
                        className="text-brand-600 hover:text-brand-800 text-xs font-medium focus:outline-none"
                      >
                        Read more →
                      </button>
                    </td>
                    <td className="px-2 py-3 text-xs text-gray-700 text-center font-medium align-top">
                      {opp.studentCount}
                    </td>
                    <td className="px-2 py-3 text-xs text-gray-500 align-top">
                       <div className="flex flex-col gap-1 items-start">
                          {opp.timeframe.map((tf, idx) => (
                             <Badge key={idx} color={tf.includes('Summer') ? 'yellow' : 'indigo'}>
                               {tf.replace('Research Elective', '').replace('Academic Year', 'Acad. Year').trim()}
                             </Badge>
                          ))}
                       </div>
                    </td>
                    <td className="py-3 pl-2 pr-4 text-xs text-gray-700 align-top">
                      <span className="font-medium text-gray-900 block leading-tight">
                        {opp.applicationDate || 'Open 05/15/2027'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No research opportunities found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((opp) => (
              <div key={opp.id} className="bg-white shadow rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{opp.piLastName}, {opp.piFirstName}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">{opp.degree}</span>
                      {opp.institution && (
                        <span className="inline-flex items-center rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-700">
                          {opp.institution}
                        </span>
                      )}
                    </div>
                  </div>
                   <div className="text-xs font-semibold bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {opp.applicationDate || 'Open 05/15/2027'}
                   </div>
                </div>
                
                <div className="mb-3">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Research Area</h4>
                  <p className="text-sm text-gray-900">{opp.researchFocus}</p>
                </div>

                <div className="mb-3">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Overview</h4>
                  <p className="text-sm text-gray-700 line-clamp-3">{opp.projectOverview}</p>
                  <button 
                    onClick={() => setSelectedOpportunity(opp)}
                    className="text-brand-600 text-xs font-medium mt-1"
                  >
                    View Details
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                  <Badge color="gray">{opp.studentCount} Students</Badge>
                  {opp.timeframe.map((tf, idx) => (
                      <Badge key={idx} color={tf.includes('Summer') ? 'yellow' : 'indigo'}>{tf}</Badge>
                  ))}
                </div>
              </div>
            ))
          ) : (
             <div className="py-12 text-center text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                No research opportunities found.
              </div>
          )}
        </div>

      </main>

      {/* Modal */}
      {selectedOpportunity && (
        <DetailModal 
          opportunity={selectedOpportunity} 
          onClose={() => setSelectedOpportunity(null)} 
        />
      )}

    </div>
  );
}