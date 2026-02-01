
import React, { useState, useEffect, useCallback } from 'react';
import { PLACEMENT_DATA, TOP_RECRUITERS } from './constants';
import { MetricsCard } from './components/MetricsCard';
import { PlacementChart } from './components/PlacementChart';
import { getPlacementInsights } from './services/geminiService';
import { 
  BriefcaseIcon, 
  AcademicCapIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  LightBulbIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedBranch, setSelectedBranch] = useState<string | undefined>(undefined);
  const [insights, setInsights] = useState<string>('Loading insights...');
  const [loadingInsights, setLoadingInsights] = useState(false);

  const currentYearData = PLACEMENT_DATA.find(d => d.year === selectedYear) || PLACEMENT_DATA[0];
  
  const activeStats = selectedBranch 
    ? currentYearData.branches.find(b => b.branch === selectedBranch)
    : {
        totalStudents: currentYearData.branches.reduce((acc, b) => acc + b.totalStudents, 0),
        placedStudents: currentYearData.branches.reduce((acc, b) => acc + b.placedStudents, 0),
        avgPackage: currentYearData.avgPackage,
        highestPackage: currentYearData.highestPackage,
        placementPercentage: Math.round((currentYearData.branches.reduce((acc, b) => acc + b.placedStudents, 0) / currentYearData.branches.reduce((acc, b) => acc + b.totalStudents, 0)) * 100)
      };

  const fetchInsights = useCallback(async () => {
    setLoadingInsights(true);
    const result = await getPlacementInsights(selectedYear, selectedBranch);
    setInsights(result);
    setLoadingInsights(false);
  }, [selectedYear, selectedBranch]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">V</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">VIIT Placement Dashboard</h1>
              <p className="text-xs text-gray-500 font-medium">Vignan Institute of Information Technology</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {['2023', '2024'].map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                    selectedYear === year 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
            
            <select 
              className="bg-gray-100 border-none rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-indigo-500"
              value={selectedBranch || ""}
              onChange={(e) => setSelectedBranch(e.target.value || undefined)}
            >
              <option value="">All Branches</option>
              {currentYearData.branches.map(b => (
                <option key={b.branch} value={b.branch}>{b.branch}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* KPI Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricsCard 
            title="Total Students" 
            value={activeStats?.totalStudents || 0} 
            icon={<AcademicCapIcon className="w-6 h-6" />} 
            color="bg-blue-600" 
          />
          <MetricsCard 
            title="Placed Students" 
            value={activeStats?.placedStudents || 0} 
            icon={<BriefcaseIcon className="w-6 h-6" />} 
            color="bg-emerald-600" 
            trend={`${activeStats?.placementPercentage}% Rate`}
          />
          <MetricsCard 
            title="Avg Package" 
            value={`${activeStats?.avgPackage} LPA`} 
            icon={<CurrencyDollarIcon className="w-6 h-6" />} 
            color="bg-amber-600" 
          />
          <MetricsCard 
            title="Highest Package" 
            value={`${activeStats?.highestPackage} LPA`} 
            icon={<ChartBarIcon className="w-6 h-6" />} 
            color="bg-indigo-600" 
          />
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Package Comparison by Branch</h3>
            <p className="text-sm text-gray-500 mb-6">Comparison of Average vs Highest package across all engineering disciplines.</p>
            <PlacementChart data={currentYearData.branches} type="bar" />
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Placement Success</h3>
            <p className="text-sm text-gray-500 mb-6">Distribution of placed students across branches.</p>
            <PlacementChart data={currentYearData.branches} type="pie" />
          </div>
        </section>

        {/* AI Insight Section */}
        <section className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-3xl border border-indigo-100 shadow-sm">
          <div className="flex items-center space-x-2 mb-4 text-indigo-700">
            <LightBulbIcon className="w-6 h-6" />
            <h2 className="text-xl font-bold italic">AI-Powered Placement Insights</h2>
          </div>
          {loadingInsights ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ) : (
            <div className="prose prose-indigo max-w-none text-gray-700 leading-relaxed">
              {insights.split('\n').map((para, i) => para.trim() && <p key={i} className="mb-4">{para}</p>)}
            </div>
          )}
          <button 
            onClick={fetchInsights}
            className="mt-4 inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Regenerate Insights <ChevronRightIcon className="w-4 h-4 ml-1" />
          </button>
        </section>

        {/* Recruiter Section */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Top Recruiters</h3>
              <p className="text-sm text-gray-500">Leading organizations hiring from Vignan Institute.</p>
            </div>
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search companies..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 w-64"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {TOP_RECRUITERS.map((recruiter) => (
              <div key={recruiter.name} className="flex flex-col items-center group cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center p-2 transition-all group-hover:bg-white group-hover:shadow-md border border-transparent group-hover:border-gray-100">
                  <img src={recruiter.logo} alt={recruiter.name} className="w-10 h-10 object-contain" />
                </div>
                <p className="mt-3 text-xs font-bold text-gray-700 text-center">{recruiter.name}</p>
                <p className="text-[10px] text-gray-400 font-medium">{recruiter.offers} Offers</p>
              </div>
            ))}
          </div>
        </section>

        {/* Branch-wise Detailed Table */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-800">Branch-wise Performance Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Branch</th>
                  <th className="px-6 py-4">Students</th>
                  <th className="px-6 py-4">Placed</th>
                  <th className="px-6 py-4">Placement %</th>
                  <th className="px-6 py-4">Avg Package</th>
                  <th className="px-6 py-4">Highest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentYearData.branches.map((b) => (
                  <tr key={b.branch} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-indigo-700">{b.branch}</td>
                    <td className="px-6 py-4 text-gray-600">{b.totalStudents}</td>
                    <td className="px-6 py-4 text-gray-600">{b.placedStudents}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full rounded-full" 
                            style={{ width: `${b.placementPercentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{b.placementPercentage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{b.avgPackage} LPA</td>
                    <td className="px-6 py-4 font-bold text-amber-600">{b.highestPackage} LPA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Vignan Institute of Information Technology Placement Cell. All data is for institutional use.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-indigo-600">Contact Admin</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
