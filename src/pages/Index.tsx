import { useState } from "react";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Catalog from "@/components/site/Catalog";
import MapSection from "@/components/site/MapSection";
import Services from "@/components/site/Services";
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

  const openRequest = (s = "") => {
    setSubject(s);
    setDialog(true);
  };

  const requestAddress = (a?: Address) =>
    openRequest(a ? `Интересует адрес: ${a.street} (ИФНС № ${a.ifns}, ${a.okrug})` : "");

  const search = (f: Partial<Filters>) => {
    setFilters({ ...EMPTY_FILTERS, ...f });
    requestAnimationFrame(() => scrollTo("catalog"));
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header onPick={() => openRequest()} />
      <Hero onSearch={search} onOpenMap={() => scrollTo("map")} />
      <Catalog filters={filters} setFilters={setFilters} onRequest={requestAddress} />
      <MapSection onRequest={requestAddress} />
      <Services onRequest={(p) => openRequest(p ? `Интересует: ${p}` : "")} />
      <Faq />
      <Contacts />
      <Footer />
      <RequestDialog open={dialog} onOpenChange={setDialog} subject={subject} />
    </div>
  );
};

export default Index;
