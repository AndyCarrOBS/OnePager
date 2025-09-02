'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useMenu, type MenuItem as CtxMenuItem } from '@/contexts/MenuContext';

// shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

// dnd-kit
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Icons
import { GripVertical, Plus, Pencil, Trash2, MoreVertical, Search, Home, Info, Monitor, Film, Store, Eye, EyeOff } from 'lucide-react';

// Types
interface StatProps { title: string; value: string | number; sub?: string }
interface RouteChipProps { route: string }
interface SortableRowProps { id: string; disabled?: boolean; children: (p: { attributes: any; listeners: any }) => React.ReactNode }
interface ItemFormProps { initial?: Pick<CtxMenuItem, 'text' | 'href'>; onSubmit: (data: { text: string; href: string }) => void; onCancel: () => void }

// Small utilities
function Stat({ title, value, sub }: StatProps) {
  return (
    <Card className="rounded-2xl border border-slate-200 shadow-sm">
      <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500 font-medium">{title}</CardTitle></CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
      </CardContent>
    </Card>
  );
}

function RouteChip({ route }: RouteChipProps) {
  return <Badge variant="secondary" className="font-mono text-xs px-2 py-1 rounded-full">{route}</Badge>;
}

function SortableRow({ id, children, disabled }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id, disabled });
  const style: React.CSSProperties = { transform: CSS.Transform.toString(transform), transition };
  return (<tr ref={setNodeRef} style={style} className="group">{children({ attributes, listeners })}</tr>);
}

const ICONS: Record<string, React.ReactElement> = { home: <Home className="w-4 h-4" />, about: <Info className="w-4 h-4" />, devices: <Monitor className="w-4 h-4" />, content: <Film className="w-4 h-4" />, retail: <Store className="w-4 h-4" /> };

function ItemForm({ initial, onSubmit, onCancel }: ItemFormProps) {
  const [title, setTitle] = useState(initial?.text ?? '');
  const [route, setRoute] = useState(initial?.href ?? '');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ text: title.trim(), href: route.trim() }); }} className="grid gap-4">
      <div className="grid gap-2"><Label htmlFor="title">Title</Label><Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Support" required /></div>
      <div className="grid gap-2"><Label htmlFor="route">Route</Label><Input id="route" value={route} onChange={(e) => setRoute(e.target.value)} placeholder="e.g., /support or #support" required /></div>
      <DialogFooter className="mt-2"><Button type="button" variant="outline" onClick={onCancel}>Cancel</Button><Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Save</Button></DialogFooter>
    </form>
  );
}

export default function AdminPanel() {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, moveMenuItem, hasChanges, saveMenuItems } = useMenu();

  // UI state
  const [query, setQuery] = useState('');
  const [addingOpen, setAddingOpen] = useState(false);
  const [editing, setEditing] = useState<CtxMenuItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<CtxMenuItem | null>(null);
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});

  // initialize visibility map
  useEffect(() => {
    setVisibility((prev) => {
      const next = { ...prev } as Record<string, boolean>;
      menuItems.forEach((m) => { if (next[m.id] === undefined) next[m.id] = true; });
      return next;
    });
  }, [menuItems.length]);

  // dnd
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const sortedItems = useMemo(() => [...menuItems].sort((a, b) => a.order - b.order), [menuItems]);
  const displayed = useMemo(() => { const q = query.trim().toLowerCase(); return q ? sortedItems.filter((x) => `${x.text} ${x.href}`.toLowerCase().includes(q)) : sortedItems; }, [sortedItems, query]);
  const ids = displayed.map((x) => x.id);

  function handleDragEnd(event: any) {
    if (query) return; // avoid reorder while filtered
    const { active, over } = event; if (!over || active.id === over.id) return;
    const overIndex = sortedItems.findIndex((x) => x.id === over.id); if (overIndex <= 0) return; // keep home at 0
    moveMenuItem(active.id, overIndex);
  }

  const visibleCount = Object.values(visibility).filter(Boolean).length;
  const routeCount = new Set(menuItems.map((x) => x.href)).size;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        {/* Top bar */}
        <div className="sticky top-0 z-30 backdrop-blur bg-white/90 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-500 shadow-md grid place-items-center text-white font-bold">O</div>
              <div><div className="text-sm text-slate-500">OORO Admin</div><div className="font-semibold -mt-0.5">Menu Editor</div></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search menu items..." className="pl-9 w-64" /></div>
              <Dialog open={addingOpen} onOpenChange={setAddingOpen}>
                <DialogTrigger asChild><Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"><Plus className="w-4 h-4 mr-2"/>Add item</Button></DialogTrigger>
                <DialogContent className="sm:max-w-md"><DialogHeader><DialogTitle>Add menu item</DialogTitle></DialogHeader><ItemForm onCancel={() => setAddingOpen(false)} onSubmit={(data) => { addMenuItem(data.text, data.href); setAddingOpen(false); }} /></DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat title="Menu items" value={menuItems.length} />
            <Stat title="Visible" value={visibleCount} />
            <Stat title="Unique routes" value={routeCount} />
            <Stat title="Last updated" value={new Date().toLocaleDateString()} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4 }}>
            <Card className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="pb-4"><CardTitle className="text-base">Navigation Menu Items</CardTitle></CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-y border-slate-200"><tr><th className="w-12 text-left px-4 py-3 font-medium text-slate-500">Order</th><th className="w-20 text-right px-4 py-3 font-medium text-slate-500">Position</th><th className="px-4 py-3 text-left font-medium text-slate-500">Title</th><th className="px-4 py-3 text-left font-medium text-slate-500">Route</th><th className="w-28 px-4 py-3 text-center font-medium text-slate-500">Visible</th><th className="w-36 px-4 py-3 text-right font-medium text-slate-500">Actions</th></tr></thead>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                        <tbody>
                          {displayed.map((item) => (
                            <SortableRow key={item.id} id={item.id} disabled={item.isHome || !!query}>
                              {({ attributes, listeners }) => (
                                <>
                                  <td className="px-2 py-2 align-middle"><button className="h-9 w-9 grid place-items-center rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-40" {...attributes} {...listeners} aria-label="Drag to reorder" disabled={item.isHome || !!query}><GripVertical className="w-4 h-4" /></button></td>
                                  <td className="px-4 py-3 text-right text-slate-600 tabular-nums">{item.order}</td>
                                  <td className="px-4 py-3"><div className="flex items-center gap-2"><div className={`h-8 w-8 rounded-lg grid place-items-center border ${visibility[item.id] ? 'bg-white' : 'bg-slate-50'}`}>{ICONS[item.id] || <Monitor className="w-4 h-4" />}</div><div><div className="font-medium text-slate-800">{item.text}</div><div className="text-xs text-slate-500">{item.id}</div></div></div></td>
                                  <td className="px-4 py-3"><RouteChip route={item.href} /></td>
                                  <td className="px-4 py-3 text-center"><Switch checked={!!visibility[item.id]} onCheckedChange={(v) => setVisibility((prev) => ({ ...prev, [item.id]: v }))} /></td>
                                  <td className="px-4 py-2"><div className="flex justify-end gap-1">
                                    <Tooltip><TooltipTrigger asChild><Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => setEditing(item)} aria-label="Edit"><Pencil className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent>Edit</TooltipContent></Tooltip>
                                    {!item.isHome && (<Tooltip><TooltipTrigger asChild><Button size="icon" variant="ghost" className="h-9 w-9 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => setConfirmDelete(item)} aria-label="Delete"><Trash2 className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent>Delete</TooltipContent></Tooltip>)}
                                    <DropdownMenu><DropdownMenuTrigger asChild><Button size="icon" variant="ghost" className="h-9 w-9" aria-label="More"><MoreVertical className="w-4 h-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-40"><DropdownMenuLabel>Quick actions</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem onClick={() => setVisibility((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}>{visibility[item.id] ? <Eye className="w-4 h-4 mr-2"/> : <EyeOff className="w-4 h-4 mr-2"/>}{visibility[item.id] ? 'Hide' : 'Show'}</DropdownMenuItem>{!item.isHome && (<DropdownMenuItem onClick={() => setEditing(item)}><Pencil className="w-4 h-4 mr-2"/> Edit</DropdownMenuItem>)}{!item.isHome && (<DropdownMenuItem className="text-red-600 focus:text-red-700" onClick={() => setConfirmDelete(item)}><Trash2 className="w-4 h-4 mr-2"/> Delete</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu></div></td>
                                </>
                              )}
                            </SortableRow>
                          ))}
                        </tbody>
                      </SortableContext>
                    </DndContext>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {hasChanges && (<div className="flex justify-end"><Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={saveMenuItems}>Save Menu Changes</Button></div>)}
        </main>

        {/* Edit dialog */}
        <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}><DialogContent className="sm:max-w-md"><DialogHeader><DialogTitle>Edit menu item</DialogTitle></DialogHeader>{editing && (<ItemForm initial={{ text: editing.text, href: editing.href }} onCancel={() => setEditing(null)} onSubmit={(data) => { updateMenuItem(editing.id, { text: data.text, href: data.href }); setEditing(null); }} />)}</DialogContent></Dialog>

        {/* Delete confirm */}
        <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete "{confirmDelete?.text}"?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. The menu item will be permanently removed.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => { if (confirmDelete) { deleteMenuItem(confirmDelete.id); setConfirmDelete(null); } }}>Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
      </div>
    </TooltipProvider>
  );
}
