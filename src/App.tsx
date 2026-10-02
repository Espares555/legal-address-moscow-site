
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Messengers from "./components/site/Messengers";
import AddressPage from "./pages/AddressPage";
import IfnsPage from "./pages/IfnsPage";
import OkrugPage from "./pages/OkrugPage";
import MetroPage from "./pages/MetroPage";
import DistrictPage from "./pages/DistrictPage";
import ServicePage from "./pages/ServicePage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticlePage from "./pages/ArticlePage";
import FaqPage from "./pages/FaqPage";
import AboutPage from "./pages/AboutPage";
import ReviewsPage from "./pages/ReviewsPage";
import ContactsPage from "./pages/ContactsPage";
import AdminReviewsPage from "./pages/AdminReviewsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/address/:id" element={<AddressPage />} />
          <Route path="/ifns/:num" element={<IfnsPage />} />
          <Route path="/okrug/:slug" element={<OkrugPage />} />
          <Route path="/metro/:slug" element={<MetroPage />} />
          <Route path="/district/:slug" element={<DistrictPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/admin/reviews" element={<AdminReviewsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Messengers />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
