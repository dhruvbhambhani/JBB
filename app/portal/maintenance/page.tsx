'use client';

import { useEffect, useState } from 'react';
import { Wrench, Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PortalLayout } from '@/components/portal-layout';
import { supabase, type MaintenanceRequest } from '@/lib/supabase';
import { toast } from 'sonner';

export default function Maintenance() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    property_id: '',
    title: '',
    description: '',
    category: 'other',
    priority: 'medium',
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const [requestsRes, propertiesRes] = await Promise.all([
      supabase
        .from('maintenance_requests')
        .select('*, properties(title, address)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('investor_properties')
        .select('properties(id, title, address)')
        .eq('investor_id', user.id),
    ]);

    if (requestsRes.data) setRequests(requestsRes.data as any);
    if (propertiesRes.data) {
      setProperties(propertiesRes.data.map((p: any) => p.properties));
    }
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const { error } = await supabase.from('maintenance_requests').insert({
        ...formData,
        user_id: user.id,
        status: 'open',
        images: [],
      });

      if (error) throw error;

      toast.success('Maintenance request submitted successfully');
      setIsOpen(false);
      setFormData({
        property_id: '',
        title: '',
        description: '',
        category: 'other',
        priority: 'medium',
      });
      loadData();
    } catch (error: any) {
      toast.error('Failed to submit request');
      console.error(error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      open: AlertCircle,
      in_progress: Clock,
      completed: CheckCircle,
      cancelled: AlertCircle,
    };
    return icons[status] || AlertCircle;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      open: 'bg-red-100 text-red-700',
      in_progress: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-slate-100 text-slate-700',
    };
    return colors[status] || colors.open;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-blue-100 text-blue-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-orange-100 text-orange-700',
      urgent: 'bg-red-100 text-red-700',
    };
    return colors[priority] || colors.medium;
  };

  const stats = {
    open: requests.filter((r) => r.status === 'open').length,
    inProgress: requests.filter((r) => r.status === 'in_progress').length,
    completed: requests.filter((r) => r.status === 'completed').length,
  };

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Maintenance Requests</h1>
            <p className="text-slate-600">Submit and track property maintenance requests</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus size={18} className="mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Submit Maintenance Request</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="property">Property *</Label>
                  <Select
                    value={formData.property_id}
                    onValueChange={(value) => setFormData({ ...formData, property_id: value })}
                    required
                  >
                    <SelectTrigger id="property">
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map((prop) => (
                        <SelectItem key={prop.id} value={prop.id}>
                          {prop.title} - {prop.address}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title">Issue Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="e.g., Leaking faucet in kitchen"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    placeholder="Provide detailed information about the issue..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="hvac">HVAC</SelectItem>
                        <SelectItem value="structural">Structural</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority *</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit Request</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Open</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.open}</p>
                </div>
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">In Progress</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.inProgress}</p>
                </div>
                <Clock className="w-10 h-10 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.completed}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((request: any) => {
                  const StatusIcon = getStatusIcon(request.status);
                  return (
                    <div
                      key={request.id}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-slate-900">{request.title}</h3>
                            <Badge className={getStatusColor(request.status)}>
                              <StatusIcon size={14} className="mr-1" />
                              {request.status.replace('_', ' ')}
                            </Badge>
                            <Badge className={getPriorityColor(request.priority)}>
                              {request.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{request.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-slate-500">
                            <span>{request.properties.title}</span>
                            <span>•</span>
                            <span className="capitalize">{request.category}</span>
                            <span>•</span>
                            <span>{formatDate(request.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      {request.assigned_to && (
                        <p className="text-sm text-slate-600">
                          Assigned to: <span className="font-semibold">{request.assigned_to}</span>
                        </p>
                      )}
                      {request.resolution_notes && request.status === 'completed' && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-900">
                            <strong>Resolution:</strong> {request.resolution_notes}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Wrench className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Maintenance Requests</h3>
                <p className="text-slate-600 mb-4">You haven't submitted any maintenance requests yet.</p>
                <Button onClick={() => setIsOpen(true)}>
                  <Plus size={18} className="mr-2" />
                  Submit Your First Request
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
