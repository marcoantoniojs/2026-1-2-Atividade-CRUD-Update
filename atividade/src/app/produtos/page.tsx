import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

async function getProducts() {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  return data.products;
}

export default async function ListaProdutos() {
  const products = await getProducts();

  return (
    <div className="container mx-auto p-8 bg-green-100">
      <h1 className="text-3xl font-bold mb-6">Lista de Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <Card key={p.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{p.title}</CardTitle>
              <CardDescription>{p.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={`/produtos/${p.id}`} className="w-full">
                <Button variant="outline" className="w-full">Editar Detalhes</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}