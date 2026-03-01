import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) {
        toast({ title: "Erro", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Conta criada", description: "Verifica o teu email para confirmar a conta." });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ title: "Erro", description: error.message, variant: "destructive" });
      } else {
        navigate("/admin");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <img src={logo} alt="Gabarolla" className="h-10 mx-auto mb-6" />
          <h1 className="font-display text-2xl text-foreground">
            {isSignUp ? "CRIAR CONTA" : "ADMIN LOGIN"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-muted-foreground font-body text-sm">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-card border-border text-foreground"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-muted-foreground font-body text-sm">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-card border-border text-foreground"
            />
          </div>
          <Button type="submit" className="w-full font-display tracking-wider" disabled={loading}>
            {loading ? "..." : isSignUp ? "Criar Conta" : "Entrar"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground font-body">
          {isSignUp ? "Já tens conta?" : "Não tens conta?"}{" "}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary hover:underline">
            {isSignUp ? "Entrar" : "Criar conta"}
          </button>
        </p>

        <a href="/" className="block text-center text-sm text-muted-foreground hover:text-foreground font-body">
          ← Voltar ao site
        </a>
      </div>
    </div>
  );
}
