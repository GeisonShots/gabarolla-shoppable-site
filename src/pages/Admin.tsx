import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, LogOut, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image_url: string | null;
  visible: boolean;
  sort_order: number;
}

export default function Admin() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", price: "", category: "T-Shirts", image_url: "" });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Product[];
    },
    enabled: isAdmin,
  });

  const saveMutation = useMutation({
    mutationFn: async (product: Partial<Product>) => {
      if (editingId) {
        const { error } = await supabase.from("products").update(product).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert([product as any]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      resetForm();
      toast({ title: editingId ? "Produto actualizado" : "Produto adicionado" });
    },
    onError: (e: Error) => toast({ title: "Erro", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast({ title: "Produto removido" });
    },
  });

  const toggleVisibility = useMutation({
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) => {
      const { error } = await supabase.from("products").update({ visible }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-products"] }),
  });

  const resetForm = () => {
    setForm({ name: "", price: "", category: "T-Shirts", image_url: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (p: Product) => {
    setForm({ name: p.name, price: p.price, category: p.category, image_url: p.image_url || "" });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    saveMutation.mutate({
      name: form.name,
      price: form.price,
      category: form.category,
      image_url: form.image_url || null,
    });
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">A carregar...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return (
    <div className="min-h-screen bg-background flex items-center justify-center text-center px-4">
      <div>
        <h1 className="font-display text-2xl text-foreground mb-4">ACESSO NEGADO</h1>
        <p className="text-muted-foreground font-body mb-6">Esta conta não tem permissões de administrador.</p>
        <Button variant="outline" onClick={signOut}>Sair</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Gabarolla" className="h-7" />
          <span className="font-display text-sm text-primary">ADMIN</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground font-body">Ver Site</a>
          <Button variant="ghost" size="sm" onClick={signOut}><LogOut size={16} /></Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl text-foreground">PRODUTOS</h1>
          <Button onClick={() => { resetForm(); setShowForm(true); }} className="font-display tracking-wider">
            <Plus size={16} /> Adicionar
          </Button>
        </div>

        {showForm && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-display text-lg text-foreground">{editingId ? "EDITAR" : "NOVO PRODUTO"}</h3>
              <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground font-body text-sm">Nome</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-secondary border-border text-foreground" />
              </div>
              <div>
                <Label className="text-muted-foreground font-body text-sm">Preço</Label>
                <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="1.500 MT" className="bg-secondary border-border text-foreground" />
              </div>
              <div>
                <Label className="text-muted-foreground font-body text-sm">Categoria</Label>
                <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-secondary border-border text-foreground" />
              </div>
              <div>
                <Label className="text-muted-foreground font-body text-sm">URL da Imagem</Label>
                <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="bg-secondary border-border text-foreground" />
              </div>
            </div>
            <Button onClick={handleSave} disabled={saveMutation.isPending} className="font-display tracking-wider">
              {saveMutation.isPending ? "A guardar..." : "Guardar"}
            </Button>
          </div>
        )}

        {isLoading ? (
          <p className="text-muted-foreground font-body text-center py-10">A carregar produtos...</p>
        ) : products.length === 0 ? (
          <p className="text-muted-foreground font-body text-center py-10">Nenhum produto adicionado ainda.</p>
        ) : (
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.id} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
                {p.image_url && <img src={p.image_url} alt={p.name} className="w-14 h-14 object-cover rounded" />}
                <div className="flex-1 min-w-0">
                  <p className="font-body text-foreground text-sm truncate">{p.name}</p>
                  <p className="text-primary font-display text-sm">{p.price}</p>
                  <p className="text-muted-foreground text-xs font-body">{p.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleVisibility.mutate({ id: p.id, visible: !p.visible })}
                    className="text-muted-foreground hover:text-foreground p-1"
                    title={p.visible ? "Esconder" : "Mostrar"}
                  >
                    {p.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <Button variant="ghost" size="sm" onClick={() => startEdit(p)} className="text-sm font-body">Editar</Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(p.id)} className="text-destructive text-sm font-body">Apagar</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
