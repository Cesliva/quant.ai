"use client"

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Calendar } from 'lucide-react';

interface BidEvent {
  id: string;
  projectId: string;
  title: string;
  notes?: string;
  startsAt: string;
  endsAt?: string;
  allDay: boolean;
}

export default function BidCalendar({ projectId }: { projectId: string }) {
  const [events, setEvents] = useState<BidEvent[]>([]);
  const [draft, setDraft] = useState({ title: '', startsAt: '', endsAt: '', allDay: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (projectId) {
      loadEvents();
    }
  }, [projectId]);

  async function loadEvents() {
    try {
      const res = await fetch(`/api/bid-events?projectId=${projectId}`);
      const data = await res.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  }

  async function addEvent() {
    if (!draft.title || !draft.startsAt) return;
    
    setLoading(true);
    try {
      const body = {
        projectId,
        title: draft.title,
        startsAt: new Date(draft.startsAt).toISOString(),
        endsAt: draft.endsAt ? new Date(draft.endsAt).toISOString() : null,
        allDay: draft.allDay
      };
      
      const res = await fetch('/api/bid-events', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body) 
      });
      
      const ev = await res.json();
      setEvents(prev => [...prev, ev]);
      setDraft({ title: '', startsAt: '', endsAt: '', allDay: false });
    } catch (error) {
      console.error('Failed to add event:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteEvent(id: string) {
    try {
      await fetch(`/api/bid-events?id=${id}`, { method: 'DELETE' });
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  }

  return (
    <div className="rounded-lg border border-cyan-900/30 bg-[#0f1f35] overflow-hidden">
      <div className="bg-[#0a1525] px-4 py-2 border-b border-cyan-900/30">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-cyan-400" />
          <div className="text-xs text-cyan-400 tracking-wide font-semibold">BID CALENDAR</div>
        </div>
      </div>
      
      <div className="p-4">
        {/* Add Event Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4 text-sm">
          <input 
            placeholder="Event title" 
            value={draft.title} 
            onChange={e => setDraft(v => ({ ...v, title: e.target.value }))}
            className="px-3 py-2 rounded bg-[#0a1525] border border-cyan-900/30 text-cyan-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input 
            type="datetime-local" 
            value={draft.startsAt} 
            onChange={e => setDraft(v => ({ ...v, startsAt: e.target.value }))}
            className="px-3 py-2 rounded bg-[#0a1525] border border-cyan-900/30 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input 
            type="datetime-local" 
            value={draft.endsAt} 
            onChange={e => setDraft(v => ({ ...v, endsAt: e.target.value }))}
            className="px-3 py-2 rounded bg-[#0a1525] border border-cyan-900/30 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="End (optional)"
          />
          <Button 
            onClick={addEvent} 
            disabled={loading || !draft.title || !draft.startsAt}
            size="sm" 
            className="bg-cyan-900/20 border border-cyan-900/30 text-cyan-400 hover:bg-cyan-900/40"
          >
            Add Event
          </Button>
        </div>

        {/* Events List */}
        <div className="space-y-2">
          {events.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              No events scheduled. Add your first event above.
            </div>
          ) : (
            events.map(ev => (
              <div 
                key={ev.id} 
                className="flex justify-between items-start px-3 py-2 rounded border border-cyan-900/20 bg-[#0a1525]/50 hover:bg-cyan-950/20 transition-colors"
              >
                <div className="flex-1">
                  <div className="text-cyan-200 font-medium">{ev.title}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(ev.startsAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                    {ev.endsAt && (
                      <> → {new Date(ev.endsAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}</>
                    )}
                  </div>
                </div>
                {ev.allDay && (
                  <span className="text-[10px] text-cyan-400 bg-cyan-900/20 px-2 py-0.5 rounded mr-2">
                    ALL DAY
                  </span>
                )}
                <button
                  onClick={() => deleteEvent(ev.id)}
                  className="p-1 hover:bg-red-500/20 rounded transition-colors"
                  aria-label="Delete event"
                >
                  <Trash2 className="h-3 w-3 text-red-400" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

