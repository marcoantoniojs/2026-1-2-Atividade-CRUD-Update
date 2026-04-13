import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold mb-8">Gerenciador de Produtos</h1>
      <Link href="/produtos">
        <Button size="lg">Ver Lista de Produtos</Button>
      </Link>
    </main>
  );
}