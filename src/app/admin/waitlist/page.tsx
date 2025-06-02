'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Mail, 
  Briefcase, 
  Building, 
  DollarSign,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  X
} from 'lucide-react';

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  company?: string;
  companySize: string;
  phone?: string;
  website?: string;
  painPoint: string;
  budget: string;
  hearAbout: string;
  additionalInfo?: string;
  timestamp: string;
  source: string;
}

interface WaitlistData {
  entries: WaitlistEntry[];
  count: number;
  latest?: string;
}

export default function AdminWaitlistPage() {
  const [data, setData] = useState<WaitlistData>({ entries: [], count: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<WaitlistEntry | null>(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/waitlist');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError('Failed to load waitlist data');
      console.error('Error fetching waitlist data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exportToCSV = () => {
    if (data.entries.length === 0) return;
    
    const headers = [
      'Name', 'Email', 'Job Title', 'Company', 'Company Size', 
      'Phone', 'Website', 'Pain Point', 'Budget', 'Heard About', 
      'Additional Info', 'Timestamp', 'Source'
    ];
    
    const csvContent = [
      headers.join(','),
      ...data.entries.map(entry => [
        entry.name,
        entry.email,
        entry.jobTitle,
        entry.company || '',
        entry.companySize,
        entry.phone || '',
        entry.website || '',
        `"${entry.painPoint.replace(/"/g, '""')}"`,
        entry.budget,
        entry.hearAbout,
        `"${(entry.additionalInfo || '').replace(/"/g, '""')}"`,
        entry.timestamp,
        entry.source
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getBudgetColor = (budget: string) => {
    switch (budget) {
      case 'under-500': return 'bg-gray-100 text-gray-800';
      case '500-1000': return 'bg-blue-100 text-blue-800';
      case '1000-2500': return 'bg-green-100 text-green-800';
      case '2500+': return 'bg-purple-100 text-purple-800';
      case 'enterprise': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompanySizeColor = (size: string) => {
    if (size.includes('1-10')) return 'bg-yellow-100 text-yellow-800';
    if (size.includes('11-50')) return 'bg-blue-100 text-blue-800';
    if (size.includes('51-200')) return 'bg-green-100 text-green-800';
    if (size.includes('201-1000')) return 'bg-purple-100 text-purple-800';
    if (size.includes('1000+')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Waitlist Admin</h1>
                <p className="text-gray-600">Manage and view waitlist submissions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchData}
                disabled={loading}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportToCSV}
                disabled={data.entries.length === 0}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{data.count}</div>
                <div className="text-sm text-gray-600">Total Submissions</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {data.latest ? formatDate(data.latest) : 'No submissions'}
                </div>
                <div className="text-sm text-gray-600">Latest Submission</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {data.entries.filter(e => e.budget.includes('2500') || e.budget === 'enterprise').length}
                </div>
                <div className="text-sm text-gray-600">High-Value Prospects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading waitlist data...</p>
          </div>
        )}

        {/* Entries Table */}
        {!loading && data.entries.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Waitlist Entries</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.entries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {entry.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{entry.name}</div>
                            <div className="text-sm text-gray-500">{entry.email}</div>
                            <div className="text-xs text-gray-400">{entry.jobTitle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{entry.company || 'Not provided'}</div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCompanySizeColor(entry.companySize)}`}>
                          {entry.companySize}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getBudgetColor(entry.budget)}`}>
                          {entry.budget}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(entry.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedEntry(entry)}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && data.entries.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
            <p className="text-gray-600">Waitlist entries will appear here once people start signing up.</p>
          </div>
        )}

        {/* Detail Modal */}
        {selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Entry Details</h3>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                    <p className="text-gray-900">{selectedEntry.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    <p className="text-gray-900">{selectedEntry.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Job Title</label>
                    <p className="text-gray-900">{selectedEntry.jobTitle}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Company</label>
                    <p className="text-gray-900">{selectedEntry.company || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Company Size</label>
                    <p className="text-gray-900">{selectedEntry.companySize}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Budget</label>
                    <p className="text-gray-900">{selectedEntry.budget}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                    <p className="text-gray-900">{selectedEntry.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Website</label>
                    <p className="text-gray-900">{selectedEntry.website || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Heard About</label>
                    <p className="text-gray-900">{selectedEntry.hearAbout}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Submitted</label>
                    <p className="text-gray-900">{formatDate(selectedEntry.timestamp)}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Pain Point</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedEntry.painPoint}</p>
                </div>
                
                {selectedEntry.additionalInfo && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Additional Information</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedEntry.additionalInfo}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
} 