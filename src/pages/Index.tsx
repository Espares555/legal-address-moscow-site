import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Catalog from "@/components/site/Catalog";
import MapSection from "@/components/site/MapSection";
import Services from "@/components/site/Services";
import Reviews from "@/components/site/Reviews";
import Faq from "@/components/site/Faq";
import Contacts from "@/components/site/Contacts";
import Footer from "@/components/site/Footer";
import RequestDialog from "@/components/site/RequestDialog";
import { Address, EMPTY_FILTERS, Filters } from "@/data/addresses";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Index = () => {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [dialog, setDialog] = useState(false);
  const [subject, setSubject] = useState("");

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) setTimeout(() => scrollTo(id), 100);
  }, []);

  const openRequest = (s = "") => {
    setSubject(s);
    setDialog(true);
  };

  const requestAddress = (a?: Address) =>
    openRequest(a ? `Интересует адрес: ${a.street} (ИФНС № ${a.ifns}, ${a.okrug})` : "");

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header onPick={() => openRequest()} />
      <Hero />
      <Catalog filters={filters} setFilters={setFilters} onRequest={requestAddress} />
      <MapSection />
      <Services onRequest={(p) => openRequest(p ? `Интересует: ${p}` : "")} />
      <Reviews />
      <Faq />
      <Contacts />
      <Footer />
      <RequestDialog open={dialog} onOpenChange={setDialog} subject={subject} />
    </div>
  );
};

export default Index;
