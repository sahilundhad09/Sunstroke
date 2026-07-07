"use client";

import { useState, useEffect } from "react";
import { 
  Wrench, 
  ShoppingCart, 
  ExternalLink, 
  BookOpen, 
  Users, 
  Inbox, 
  Plus, 
  Edit, 
  Trash2, 
  Loader2, 
  Search,
  CheckCircle,
  Eye,
  Send,
  Mail
} from "lucide-react";
import Image from "next/image";
import { AdminModal } from "./AdminModal";

type Tab = "tools" | "products" | "affiliates" | "posts" | "subscribers" | "messages";

export function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState<Tab>("tools");
  const [stats, setStats] = useState<any>({});
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Broadcast state
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastBody, setBroadcastBody] = useState("");
  const [broadcastSending, setBroadcastSending] = useState(false);
  const [broadcastResult, setBroadcastResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // Modal state
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "tool" | "product" | "affiliate" | "post" | null;
    editData: any;
  }>({
    isOpen: false,
    type: null,
    editData: null,
  });

  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const result = await res.json();
      if (result.success) {
        setStats(result.stats);
      }
    } catch (err) {
      console.error("Failed to fetch stats", err);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchData = async (tab: Tab) => {
    setLoading(true);
    try {
      const endpoint = `/api/admin/${tab}`;
      const res = await fetch(endpoint);
      const result = await res.json();
      if (result.success) {
        setDataList(result.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchData(activeTab);
  }, [activeTab]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item? This action is permanent.")) return;

    try {
      const endpoint = `/api/admin/${activeTab}?id=${id}`;
      const res = await fetch(endpoint, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        fetchData(activeTab);
        fetchStats();
      } else {
        alert("Delete failed: " + result.error);
      }
    } catch (err) {
      alert("An error occurred during deletion.");
    }
  };

  const handleToggleMessageRead = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "unread" ? "read" : "unread";
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        fetchData(activeTab);
        fetchStats();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBroadcast = async () => {
    if (!broadcastSubject.trim() || !broadcastBody.trim()) {
      setBroadcastResult({ success: false, message: "Subject and body are both required." });
      return;
    }
    setBroadcastSending(true);
    setBroadcastResult(null);
    try {
      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: broadcastSubject, html: broadcastBody }),
      });
      const result = await res.json();
      setBroadcastResult({ success: result.success, message: result.message || result.error });
      if (result.success) {
        setBroadcastSubject("");
        setBroadcastBody("");
      }
    } catch {
      setBroadcastResult({ success: false, message: "Connection failed. Try again." });
    } finally {
      setBroadcastSending(false);
    }
  };

  const openAddModal = () => {
    if (activeTab === "subscribers" || activeTab === "messages") return;
    const typeMap: Record<string, "tool" | "product" | "affiliate" | "post"> = {
      tools: "tool",
      products: "product",
      affiliates: "affiliate",
      posts: "post"
    };
    setModalState({
      isOpen: true,
      type: typeMap[activeTab],
      editData: null,
    });
  };

  const openEditModal = (item: any) => {
    const typeMap: Record<string, "tool" | "product" | "affiliate" | "post"> = {
      tools: "tool",
      products: "product",
      affiliates: "affiliate",
      posts: "post"
    };
    setModalState({
      isOpen: true,
      type: typeMap[activeTab],
      editData: item,
    });
  };

  const filteredData = dataList.filter((item: any) => {
    const q = searchQuery.toLowerCase();
    if (activeTab === "tools") return item.name?.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q);
    if (activeTab === "products") return item.title?.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q);
    if (activeTab === "affiliates") return item.name?.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q);
    if (activeTab === "posts") return item.title?.toLowerCase().includes(q) || item.content?.toLowerCase().includes(q);
    if (activeTab === "subscribers") return item.email?.toLowerCase().includes(q) || item.name?.toLowerCase().includes(q);
    if (activeTab === "messages") return item.email?.toLowerCase().includes(q) || item.message?.toLowerCase().includes(q);
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Stats Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {[
          { key: "tools", label: "Tools", icon: Wrench, val: stats.tools, bg: "bg-[#00d4ff]" },
          { key: "products", label: "Products", icon: ShoppingCart, val: stats.products, bg: "bg-[#ffc700]" },
          { key: "affiliates", label: "Recommendations", icon: ExternalLink, val: stats.affiliates, bg: "bg-[#ff90e8]" },
          { key: "posts", label: "Articles", icon: BookOpen, val: stats.posts, bg: "bg-[#00e599]" },
          { key: "subscribers", label: "Subscribers", icon: Users, val: stats.subscribers, bg: "bg-white" },
          { key: "messages", label: "Inbox Messages", icon: Inbox, val: stats.messages, bg: "bg-white" },
        ].map((card) => (
          <button
            key={card.key}
            onClick={() => setActiveTab(card.key as Tab)}
            className={`gumroad-card ${card.bg} p-4 text-left shadow-gumroad-sm transition-transform active:translate-y-[2px]`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black uppercase text-black">{card.label}</span>
              <card.icon className="h-4 w-4 text-black stroke-[2.5]" />
            </div>
            <p className="mt-2 font-heading text-2xl font-black text-black">
              {statsLoading ? "..." : card.val ?? 0}
            </p>
          </button>
        ))}
      </div>

      {/* Tabs and Actions bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b-3 border-black pb-4">
        {/* Navigation tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: "tools", label: "Tools" },
            { key: "products", label: "Products" },
            { key: "affiliates", label: "Recommendations" },
            { key: "posts", label: "Articles" },
            { key: "subscribers", label: "Subscribers" },
            { key: "messages", label: "Messages" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setSearchQuery("");
                setActiveTab(t.key as Tab);
              }}
              className={`rounded-lg border-2 border-black px-4 py-2 font-heading text-xs font-black uppercase tracking-wider transition-all shadow-gumroad-sm ${
                activeTab === t.key
                  ? "bg-[#ffc700] text-black"
                  : "bg-white text-black hover:bg-zinc-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Add item button */}
        {activeTab !== "subscribers" && activeTab !== "messages" && (
          <button
            onClick={openAddModal}
            className="btn-gumroad bg-[#00e599] text-black hover:bg-[#00ca87] px-4 py-2 text-xs uppercase font-black tracking-wider flex items-center gap-1.5 self-start"
          >
            <Plus className="h-4 w-4 stroke-[3]" /> Add {activeTab.slice(0, -1)}
          </button>
        )}
      </div>

      {/* Controls & Search */}
      <div className="flex items-center gap-3 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500 stroke-[2.5]" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-xl border-2 border-black bg-white pl-9 pr-4 text-xs font-bold text-black focus:outline-none shadow-gumroad-sm placeholder:text-zinc-400"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-2xl border-3 border-black bg-white shadow-gumroad overflow-hidden">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-black" />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center p-6 text-center">
            <p className="font-heading text-lg font-black text-black">No records found</p>
            <p className="mt-1 text-sm font-bold text-zinc-700">Add some real content to populate this table.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-3 border-black bg-zinc-50">
                  {activeTab === "tools" && (
                    <>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Icon</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Name</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Tagline</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Status</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Tags</th>
                    </>
                  )}
                  {activeTab === "products" && (
                    <>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Preview</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Title</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Price</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Rating</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Badge</th>
                    </>
                  )}
                  {activeTab === "affiliates" && (
                    <>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Logo</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Name</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Category</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Discount</th>
                    </>
                  )}
                  {activeTab === "posts" && (
                    <>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Preview</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Title</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Category</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Status</th>
                    </>
                  )}
                  {activeTab === "subscribers" && (
                    <>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Email</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Source</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Joined Date</th>
                    </>
                  )}
                  {activeTab === "messages" && (
                    <>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Sender</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Subject</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Message</th>
                      <th className="p-4 text-xs font-heading font-black uppercase text-black">Status</th>
                    </>
                  )}
                  <th className="p-4 text-xs font-heading font-black uppercase text-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 transition-colors">
                    {/* Render fields per tab */}
                    {activeTab === "tools" && (
                      <>
                        <td className="p-4">
                          {item.image_url ? (
                            <div className="relative h-10 w-10 overflow-hidden rounded-lg border-2 border-black shadow-gumroad-sm bg-white">
                              <Image src={item.image_url} alt="" fill className="object-cover" sizes="40px" />
                            </div>
                          ) : (
                            <span className="text-xl">{item.icon || "⚡"}</span>
                          )}
                        </td>
                        <td className="p-4 font-heading font-black text-black text-sm">{item.name}</td>
                        <td className="p-4 font-bold text-zinc-700 text-xs">{item.tagline}</td>
                        <td className="p-4">
                          <span className={`rounded border border-black px-2 py-0.5 text-[9px] font-mono font-black uppercase ${
                            item.status === "live" ? "bg-[#00e599] text-black" : item.status === "beta" ? "bg-[#ffc700] text-black" : "bg-zinc-200 text-black"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {item.tags?.map((t: string) => (
                              <span key={t} className="rounded border border-black bg-[#f4f1ea] px-1.5 py-0.5 text-[9px] font-mono font-black text-black">
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                      </>
                    )}

                    {activeTab === "products" && (
                      <>
                        <td className="p-4">
                          <div className="relative h-10 w-10 overflow-hidden rounded-lg border-2 border-black shadow-gumroad-sm bg-[#ff9f0a]">
                            {item.image_url && <Image src={item.image_url} alt="" fill className="object-cover" sizes="40px" />}
                          </div>
                        </td>
                        <td className="p-4 font-heading font-black text-black text-sm">{item.title}</td>
                        <td className="p-4 font-mono font-black text-xs text-black">
                          {Number(item.price) === 0 ? "FREE" : `$${item.price}`}
                        </td>
                        <td className="p-4 font-mono font-black text-xs text-black">⭐ {item.rating || 5.0}</td>
                        <td className="p-4">
                          {item.badge && (
                            <span className="rounded border border-black bg-[#ffc700] px-2 py-0.5 text-[9px] font-mono font-black uppercase text-black">
                              {item.badge}
                            </span>
                          )}
                        </td>
                      </>
                    )}

                    {activeTab === "affiliates" && (
                      <>
                        <td className="p-4">
                          {item.image_url ? (
                            <div className="relative h-10 w-10 overflow-hidden rounded-lg border-2 border-black shadow-gumroad-sm bg-white">
                              <Image src={item.image_url} alt="" fill className="object-cover" sizes="40px" />
                            </div>
                          ) : (
                            <span className="text-xl">{item.logo_url || "🔗"}</span>
                          )}
                        </td>
                        <td className="p-4 font-heading font-black text-black text-sm">{item.name}</td>
                        <td className="p-4 font-bold text-zinc-700 text-xs">{item.category}</td>
                        <td className="p-4">
                          {item.discount && (
                            <span className="rounded border border-black bg-[#00e599] px-2 py-0.5 text-[9px] font-mono font-black text-black">
                              {item.discount}
                            </span>
                          )}
                        </td>
                      </>
                    )}

                    {activeTab === "posts" && (
                      <>
                        <td className="p-4">
                          <div className="relative h-10 w-10 overflow-hidden rounded-lg border-2 border-black shadow-gumroad-sm bg-white">
                            {item.image_url && <Image src={item.image_url} alt="" fill className="object-cover" sizes="40px" />}
                          </div>
                        </td>
                        <td className="p-4 font-heading font-black text-black text-sm">{item.title}</td>
                        <td className="p-4 font-bold text-zinc-700 text-xs">{item.category}</td>
                        <td className="p-4">
                          <span className={`rounded border border-black px-2 py-0.5 text-[9px] font-mono font-black uppercase ${
                            item.published ? "bg-[#00e599] text-black" : "bg-zinc-200 text-black"
                          }`}>
                            {item.published ? "Published" : "Draft"}
                          </span>
                        </td>
                      </>
                    )}

                    {activeTab === "subscribers" && (
                      <>
                        <td className="p-4 font-bold text-black text-sm">{item.email}</td>
                        <td className="p-4 font-mono font-black text-xs uppercase text-zinc-600">{item.source || "web"}</td>
                        <td className="p-4 font-mono text-zinc-500 text-xs">
                          {new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                      </>
                    )}

                    {activeTab === "messages" && (
                      <>
                        <td className="p-4">
                          <p className="font-heading font-black text-black text-sm">{item.name}</p>
                          <p className="text-zinc-500 text-xs font-medium">{item.email}</p>
                        </td>
                        <td className="p-4 font-bold text-zinc-800 text-xs">{item.subject || "No Subject"}</td>
                        <td className="p-4 font-medium text-zinc-700 text-xs max-w-xs truncate">{item.message}</td>
                        <td className="p-4">
                          <span className={`rounded border border-black px-2 py-0.5 text-[9px] font-mono font-black uppercase ${
                            item.status === "unread" ? "bg-red-100 text-red-700" : "bg-[#00e599] text-black"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </>
                    )}

                    {/* Actions cell */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {activeTab === "messages" && (
                          <button
                            onClick={() => handleToggleMessageRead(item.id, item.status)}
                            className="rounded-lg border-2 border-black bg-white p-1.5 text-black shadow-gumroad-sm hover:scale-105 transition-transform"
                            title={item.status === "unread" ? "Mark as Read" : "Mark as Unread"}
                          >
                            <Eye className="h-4 w-4 stroke-[2.5]" />
                          </button>
                        )}
                        {activeTab !== "subscribers" && activeTab !== "messages" && (
                          <button
                            onClick={() => openEditModal(item)}
                            className="rounded-lg border-2 border-black bg-white p-1.5 text-black shadow-gumroad-sm hover:scale-105 transition-transform"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4 stroke-[2.5]" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg border-2 border-black bg-red-100 p-1.5 text-red-600 shadow-gumroad-sm hover:scale-105 transition-transform"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 stroke-[2.5]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      <AdminModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, type: null, editData: null })}
        type={modalState.type}
        initialData={modalState.editData}
        onSave={() => {
          fetchData(activeTab);
          fetchStats();
        }}
      />

      {/* ─── Broadcast Email Panel ─────────────────────────────────── */}
      <div className="mt-8 rounded-2xl border-3 border-black bg-white shadow-gumroad overflow-hidden">
        {/* Panel Header */}
        <div className="flex items-center gap-3 border-b-3 border-black bg-[#ffc700] px-6 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-black bg-black shadow-gumroad-sm">
            <Mail className="h-5 w-5 text-[#ffc700] stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-black text-black">Broadcast Email</h3>
            <p className="text-xs font-bold text-zinc-800">
              Send an email to all {stats.subscribers ?? 0} active subscribers
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Subject line */}
          <div>
            <label className="block text-xs font-mono font-black uppercase text-black mb-1.5">
              Subject Line
            </label>
            <input
              type="text"
              value={broadcastSubject}
              onChange={(e) => setBroadcastSubject(e.target.value)}
              placeholder="e.g. 🚀 New article just dropped — check it out"
              className="h-11 w-full rounded-xl border-2 border-black bg-white px-4 text-sm font-bold text-black placeholder:text-zinc-400 shadow-gumroad-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email body (HTML) */}
          <div>
            <label className="block text-xs font-mono font-black uppercase text-black mb-1.5">
              Email Body <span className="normal-case text-zinc-500">(HTML supported)</span>
            </label>
            <textarea
              value={broadcastBody}
              onChange={(e) => setBroadcastBody(e.target.value)}
              placeholder={`<p>Hey there,</p>\n<p>Just published a new article...</p>\n<a href="https://sunstroke-gules.vercel.app/newsletter">Read it here →</a>`}
              rows={10}
              className="w-full rounded-xl border-2 border-black bg-white px-4 py-3 text-sm font-mono text-black placeholder:text-zinc-400 shadow-gumroad-sm focus:outline-none focus:ring-2 focus:ring-black resize-y"
            />
          </div>

          {/* Result banner */}
          {broadcastResult && (
            <div
              className={`flex items-start gap-3 rounded-xl border-2 border-black p-4 ${
                broadcastResult.success ? "bg-[#00e599]" : "bg-red-100"
              }`}
            >
              <CheckCircle className={`h-5 w-5 shrink-0 stroke-[2.5] ${
                broadcastResult.success ? "text-black" : "text-red-600"
              }`} />
              <p className={`text-sm font-bold ${
                broadcastResult.success ? "text-black" : "text-red-700"
              }`}>
                {broadcastResult.message}
              </p>
            </div>
          )}

          {/* Send button */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs font-bold text-zinc-500">
              Will be sent to <strong className="text-black">{stats.subscribers ?? 0} subscribers</strong>
            </p>
            <button
              onClick={handleBroadcast}
              disabled={broadcastSending || !broadcastSubject.trim() || !broadcastBody.trim()}
              className="btn-gumroad bg-[#000] text-[#ffe566] px-6 py-2.5 text-xs uppercase font-black tracking-wider flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {broadcastSending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4 stroke-[2.5]" />
              )}
              {broadcastSending ? "Sending..." : "Send Broadcast"}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
