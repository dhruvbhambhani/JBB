'use client';

import { useEffect, useState } from 'react';
import { FileText, Download, Calendar, Folder } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PortalLayout } from '@/components/portal-layout';
import { supabase, type Document } from '@/lib/supabase';

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    async function loadDocuments() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .or(`investor_id.eq.${user.id},investor_id.is.null`)
        .order('created_at', { ascending: false });

      if (data) {
        setDocuments(data as Document[]);
        setFilteredDocs(data as Document[]);
      }
      setLoading(false);
    }

    loadDocuments();
  }, []);

  useEffect(() => {
    let filtered = documents;

    if (searchTerm) {
      filtered = filtered.filter((doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((doc) => doc.category === categoryFilter);
    }

    setFilteredDocs(filtered);
  }, [searchTerm, categoryFilter, documents]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      investor_report: 'bg-blue-100 text-blue-700',
      legal: 'bg-purple-100 text-purple-700',
      financial: 'bg-green-100 text-green-700',
      maintenance: 'bg-orange-100 text-orange-700',
      other: 'bg-slate-100 text-slate-700',
    };
    return colors[category] || colors.other;
  };

  const categories = Array.from(new Set(documents.map((doc) => doc.category)));

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Documents</h1>
          <p className="text-slate-600">Access your investment reports, contracts, and other important documents</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : filteredDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <Badge className={getCategoryColor(doc.category)}>
                      {doc.category.replace('_', ' ')}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{doc.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{doc.description}</p>

                  <div className="flex items-center text-xs text-slate-500 mb-4 space-x-4">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(doc.created_at)}</span>
                    </div>
                    <div className="flex items-center">
                      <Folder size={14} className="mr-1" />
                      <span>{formatFileSize(doc.file_size)}</span>
                    </div>
                  </div>

                  <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full">
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No Documents Found</h3>
              <p className="text-slate-600">
                {searchTerm || categoryFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Documents will appear here when they become available'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </PortalLayout>
  );
}
