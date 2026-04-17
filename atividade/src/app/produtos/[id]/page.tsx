"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function EditarProduto() {
  const { id } = useParams();
  const router = useRouter();
  
  // Estados para os campos do produto
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Busca os dados atuais do produto para preencher o formulário
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setPrice(data.price);
        setDescription(data.description);
      });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Envia o objeto completo para a API conforme o item 8
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title,
        price: Number(price), // Garante que preço vá como número
        description 
      })
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Retorno da API:", data);
      alert("Sucesso! Produto atualizado (simulação API).");
      router.push("/produtos");
    }
  };

  return (
    <div className="container mx-auto p-10 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Editar Produto {id}</h1>
      
      <form onSubmit={handleUpdate} className="space-y-4 border p-6 rounded-lg shadow-sm">
        {/* Campo Título */}
        <div className="space-y-2">
          <Label htmlFor="title">Título do Produto</Label>
          <Input 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>

        {/* Campo Preço */}
        <div className="space-y-2">
          <Label htmlFor="price">Preço ($)</Label>
          <Input 
            id="price" 
            type="number"
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>

        {/* Campo Descrição */}
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <textarea 
            id="description"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button type="submit">Salvar Alterações</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}