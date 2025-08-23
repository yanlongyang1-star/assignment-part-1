"use client";
import dynamic from 'next/dynamic';

const ClientTabsPage = dynamic(() => import('./ClientTabsPage'), { ssr: false });

export default function TabsPage() {
  return <ClientTabsPage />;
}
