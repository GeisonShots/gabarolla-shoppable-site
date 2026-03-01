import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, X, Send, Menu, XIcon } from "lucide-react";
import logo from "@/assets/logo.png";
import heroImg from "@/assets/hero.png";
import product1 from "@/assets/product1.jpg";
import product2 from "@/assets/product2.jpg";
import product3 from "@/assets/product3.jpg";
import product4 from "@/assets/product4.jpg";
import product5 from "@/assets/product5.jpg";
import product6 from "@/assets/product6.jpg";
import product7 from "@/assets/product7.jpg";
import product8 from "@/assets/product8.jpg";
import product9 from "@/assets/product9.jpg";
import product10 from "@/assets/product10.jpg";
import product11 from "@/assets/product11.jpg";
import product12 from "@/assets/product12.jpg";
import product13 from "@/assets/product13.jpg";
import product14 from "@/assets/product14.jpg";
import product15 from "@/assets/product15.jpg";
import product16 from "@/assets/product16.jpg";

const WHATSAPP_NUMBER = "258868210962";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

const products: Product[] = [
{ id: 1, name: "T-Shirt Branca Classic", price: "1.500 MT", image: product1, category: "T-Shirts" },
{ id: 2, name: "Hoodie Preto Logo", price: "3.500 MT", image: product2, category: "Hoodies" },
{ id: 3, name: "Gorro + T-Shirt Pack", price: "2.000 MT", image: product3, category: "Acessórios" },
{ id: 4, name: "Collection Pack", price: "5.000 MT", image: product4, category: "Packs" },
{ id: 5, name: "T-Shirt Preta Minimal", price: "1.500 MT", image: product5, category: "T-Shirts" },
{ id: 6, name: "T-Shirt Verde Classic", price: "1.500 MT", image: product6, category: "T-Shirts" },
{ id: 7, name: "T-Shirt Verde Premium", price: "1.800 MT", image: product7, category: "T-Shirts" },
{ id: 8, name: "T-Shirt Branca Feminina", price: "1.500 MT", image: product8, category: "T-Shirts" },
{ id: 9, name: "Boné Preto Logo", price: "1.200 MT", image: product9, category: "Acessórios" },
{ id: 10, name: "Conjunto Preto T-Shirt + Short", price: "4.000 MT", image: product10, category: "Packs" },
{ id: 11, name: "Conjunto Rosa T-Shirt + Short", price: "4.000 MT", image: product11, category: "Packs" },
{ id: 12, name: "T-Shirt Preta & Verde Pack", price: "2.800 MT", image: product12, category: "Packs" },
{ id: 13, name: "Boné Preto Premium", price: "1.500 MT", image: product13, category: "Acessórios" },
{ id: 14, name: "Hoodie Preto & Branco", price: "3.500 MT", image: product14, category: "Hoodies" },
{ id: 15, name: "T-Shirt Preta G Logo", price: "1.500 MT", image: product15, category: "T-Shirts" },
{ id: 16, name: "T-Shirt Preta Feminina", price: "1.500 MT", image: product16, category: "T-Shirts" }];


export default function Index() {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const sendWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá Gabarolla! Quero encomendar:\n${cart.
      map((p, i) => `${i + 1}. ${p.name} — ${p.price}`).
      join("\n")}\n\nTotal: ${cart.length} item(s)`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <img src={logo} alt="Gabarolla" className="h-8" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#produtos" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Produtos</a>
            <a href="#sobre" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Sobre</a>
            <a href="#contacto" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Contacto</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-foreground hover:text-primary transition-colors">

              <ShoppingBag size={22} />
              {cart.length > 0 &&
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-display">
                  {cart.length}
                </span>
              }
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-foreground">
              {mobileMenu ? <XIcon size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {mobileMenu &&
        <div className="md:hidden bg-background border-t border-border px-4 py-4 flex flex-col gap-3">
            <a href="#produtos" onClick={() => setMobileMenu(false)} className="text-sm font-body text-muted-foreground">Produtos</a>
            <a href="#sobre" onClick={() => setMobileMenu(false)} className="text-sm font-body text-muted-foreground">Sobre</a>
            <a href="#contacto" onClick={() => setMobileMenu(false)} className="text-sm font-body text-muted-foreground">Contacto</a>
          </div>
        }
      </nav>

      {/* HERO */}
      <section className="relative w-full mt-16 md:h-[85vh] overflow-hidden">
        <img src={heroImg} alt="Gabarolla Hero" className="w-full h-auto md:h-full object-contain md:object-cover md:object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-4 md:bottom-12 left-0 right-0 text-center">

          <a
            href="#produtos"
            className="inline-block bg-primary text-primary-foreground font-display text-lg hover:bg-primary/90 transition-colors tracking-wider py-[2px] px-[20px] mx-0 my-0 mb-0">

            Ver Colecção
          </a>
        </motion.div>
      </section>

      {/* PRODUTOS */}
      <section id="produtos" className="max-w-7xl mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl text-foreground mb-12 text-center">

          Colecção
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) =>
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors">

              <div className="aspect-[3/4] overflow-hidden">
                <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy" />

              </div>
              <div className="p-3 md:p-4">
                <h3 className="font-display text-sm md:text-base text-foreground">{product.name}</h3>
                <p className="text-primary font-display text-lg mt-1">{product.price}</p>
                <button
                onClick={() => addToCart(product)}
                className="mt-3 w-full bg-secondary text-secondary-foreground font-body text-sm py-2.5 rounded hover:bg-primary hover:text-primary-foreground transition-colors">

                  Adicionar
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="bg-card border-y border-border">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h2 className="font-display text-4xl text-foreground mb-6">Onde a Elegância Mora</h2>
          <p className="text-muted-foreground font-body leading-relaxed text-lg">
            Gabarolla® é uma marca moçambicana de streetwear que combina estilo urbano com elegância autêntica. Cada peça é desenhada para quem vive com atitude e confiança.
          </p>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-4xl text-foreground mb-6">Fala Connosco</h2>
        <p className="text-muted-foreground font-body mb-8">Encomendas e dúvidas directamente pelo WhatsApp</p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display text-lg px-10 py-4 hover:bg-primary/90 transition-colors tracking-wider">

          <Send size={20} />
          WhatsApp
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 text-center">
        <img src={logo} alt="Gabarolla" className="h-6 mx-auto mb-3 opacity-60" />
        <p className="text-muted-foreground text-sm font-body">© 2026 Gabarolla®. Todos os direitos reservados.</p>
      </footer>

      {/* CART DRAWER */}
      {cartOpen &&
      <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          className="relative w-full max-w-md bg-card border-l border-border h-full flex flex-col">

            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-display text-xl text-foreground">Carrinho ({cart.length})</h3>
              <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 &&
            <p className="text-muted-foreground font-body text-center mt-10">O carrinho está vazio</p>
            }
              {cart.map((item, index) =>
            <div key={index} className="flex items-center gap-3 bg-secondary rounded-lg p-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-sm font-body text-foreground">{item.name}</p>
                    <p className="text-primary font-display text-sm">{item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(index)} className="text-muted-foreground hover:text-destructive">
                    <X size={16} />
                  </button>
                </div>
            )}
            </div>
            {cart.length > 0 &&
          <div className="p-5 border-t border-border">
                <button
              onClick={sendWhatsApp}
              className="w-full bg-primary text-primary-foreground font-display text-lg py-4 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors tracking-wider">

                  <Send size={20} />
                  Enviar Pedido via WhatsApp
                </button>
              </div>
          }
          </motion.div>
        </div>
      }
    </div>);

}