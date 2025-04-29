// import { MobileNav } from "./mobile-nav";
// import DarkModeToggle from "@/components/DarkModeToggle";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   ArrowRight,
//   BookOpen,
//   Brain,
//   CheckCircle,
//   ChevronRight,
//   Code,
//   Database,
//   Facebook,
//   FileText,
//   FlaskConical,
//   Github,
//   Globe,
//   Instagram,
//   Layers,
//   Linkedin,
//   MessageSquare,
//   Search,
//   Settings,
//   Sparkles,
//   Twitter,
//   Upload,
//   Zap,
// } from "lucide-react";
// import Link from "next/link";
// export default function LandingPage() {
//   return (
//     <div className="mx-auto flex min-h-screen flex-col">
//       <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
//         <div className="container flex h-16 items-center justify-between">
//           <div className="flex items-center gap-2">
//             <FlaskConical className="text-primary h-6 w-6" />
//             <span className="text-xl font-bold">Alchemist</span>
//           </div>
//           <nav className="hidden items-center gap-6 md:flex">
//             <Link
//               href="#features"
//               className="hover:text-primary text-sm font-medium">
//               Features
//             </Link>
//             <Link
//               href="#how-it-works"
//               className="hover:text-primary text-sm font-medium">
//               How It Works
//             </Link>
//             <Link
//               href="#use-cases"
//               className="hover:text-primary text-sm font-medium">
//               Use Cases
//             </Link>
//             <Link
//               href="#pricing"
//               className="hover:text-primary text-sm font-medium">
//               Pricing
//             </Link>
//           </nav>
//           <div className="flex items-center gap-4">
//             <Link href="/login">
//               <Button variant="outline" className="hidden md:flex">
//                 Log in
//               </Button>
//             </Link>
//             <Button className="hidden md:flex">Start Free Trial</Button>
//             <DarkModeToggle />
//             <MobileNav />
//           </div>
//         </div>
//       </header>
//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
//           <div className="container mx-auto max-w-3xl px-4 text-center md:px-6">
//             <div className="flex flex-col justify-center space-y-10">
//               <div className="mx-auto space-y-5">
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
//                   Transform Your Documents Into Intelligent Knowledge
//                 </h1>
//                 <p className="text-muted-foreground mx-auto md:text-xl">
//                   Alchemist is a powerful RAG-as-a-service platform that lets
//                   you upload documents and interact with them using AI models of
//                   your choice.
//                 </p>
//               </div>
//               <div className="mx-auto flex flex-col gap-2 min-[400px]:flex-row">
//                 <Button size="lg" className="gap-1">
//                   Get Started <ChevronRight className="h-4 w-4" />
//                 </Button>
//                 <Button size="lg" variant="outline">
//                   Book a Demo
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* Features Section */}
//         <section id="features" className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="bg-primary text-primary-foreground inline-block rounded-lg px-3 py-1 text-sm">
//                   Features
//                 </div>
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
//                   Everything you need for RAG
//                 </h2>
//                 <p className="text-muted-foreground max-w-[900px] md:text-xl">
//                   Alchemist provides all the tools you need to transform your
//                   documents into an intelligent knowledge base.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
//               <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary/10 rounded-full p-3">
//                   <Upload className="text-primary h-6 w-6" />
//                 </div>
//                 <h3 className="text-xl font-bold">Easy Document Upload</h3>
//                 <p className="text-muted-foreground text-center">
//                   Upload PDFs, Word docs, text files, and more with simple
//                   drag-and-drop functionality.
//                 </p>
//               </div>
//               <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary/10 rounded-full p-3">
//                   <Brain className="text-primary h-6 w-6" />
//                 </div>
//                 <h3 className="text-xl font-bold">Model Selection</h3>
//                 <p className="text-muted-foreground text-center">
//                   Choose from a variety of AI models to best suit your specific
//                   use case and budget.
//                 </p>
//               </div>
//               <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary/10 rounded-full p-3">
//                   <Search className="text-primary h-6 w-6" />
//                 </div>
//                 <h3 className="text-xl font-bold">Semantic Search</h3>
//                 <p className="text-muted-foreground text-center">
//                   Find exactly what you need with powerful semantic search
//                   capabilities.
//                 </p>
//               </div>
//               <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary/10 rounded-full p-3">
//                   <MessageSquare className="text-primary h-6 w-6" />
//                 </div>
//                 <h3 className="text-xl font-bold">Conversational Interface</h3>
//                 <p className="text-muted-foreground text-center">
//                   Chat with your documents in natural language to extract
//                   insights and answers.
//                 </p>
//               </div>
//               <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary/10 rounded-full p-3">
//                   <Code className="text-primary h-6 w-6" />
//                 </div>
//                 <h3 className="text-xl font-bold">API Access</h3>
//                 <p className="text-muted-foreground text-center">
//                   {`Integrate Alchemist's capabilities directly into your
//                   applications with our robust API.`}
//                 </p>
//               </div>
//               <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary/10 rounded-full p-3">
//                   <Settings className="text-primary h-6 w-6" />
//                 </div>
//                 <h3 className="text-xl font-bold">Customizable Settings</h3>
//                 <p className="text-muted-foreground text-center">
//                   Fine-tune retrieval parameters, context windows, and more to
//                   optimize performance.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* How It Works Section */}
//         <section
//           id="how-it-works"
//           className="bg-muted w-full rounded-xl py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="bg-primary text-primary-foreground inline-block rounded-lg px-3 py-1 text-sm">
//                   How It Works
//                 </div>
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
//                   The Alchemist Process
//                 </h2>
//                 <p className="text-muted-foreground max-w-[900px] md:text-xl">
//                   See how Alchemist transforms your documents into an
//                   intelligent knowledge base in just a few steps.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-4">
//               <div className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
//                   1
//                 </div>
//                 <h3 className="text-xl font-bold">Upload</h3>
//                 <p className="text-muted-foreground text-center">
//                   Upload your documents through our intuitive interface.
//                 </p>
//                 <Upload className="text-muted-foreground mt-4 h-10 w-10" />
//               </div>
//               <div className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
//                   2
//                 </div>
//                 <h3 className="text-xl font-bold">Process</h3>
//                 <p className="text-muted-foreground text-center">
//                   Our system processes and indexes your documents.
//                 </p>
//                 <Layers className="text-muted-foreground mt-4 h-10 w-10" />
//               </div>
//               <div className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
//                   3
//                 </div>
//                 <h3 className="text-xl font-bold">Query</h3>
//                 <p className="text-muted-foreground text-center">
//                   Ask questions in natural language about your documents.
//                 </p>
//                 <MessageSquare className="text-muted-foreground mt-4 h-10 w-10" />
//               </div>
//               <div className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
//                   4
//                 </div>
//                 <h3 className="text-xl font-bold">Discover</h3>
//                 <p className="text-muted-foreground text-center">
//                   Get accurate, contextual answers from your knowledge base.
//                 </p>
//                 <Sparkles className="text-muted-foreground mt-4 h-10 w-10" />
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* Use Cases Section */}
//         <section id="use-cases" className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="bg-primary text-primary-foreground inline-block rounded-lg px-3 py-1 text-sm">
//                   Use Cases
//                 </div>
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
//                   Powerful Applications
//                 </h2>
//                 <p className="text-muted-foreground max-w-[900px] md:text-xl">
//                   Discover how organizations across industries are using
//                   Alchemist to transform their document workflows.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
//               <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary/10 w-fit rounded-full p-2">
//                   <BookOpen className="text-primary h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold">Research & Academia</h3>
//                 <p className="text-muted-foreground">
//                   Quickly search through research papers, extract insights, and
//                   generate literature reviews.
//                 </p>
//               </div>
//               <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary/10 w-fit rounded-full p-2">
//                   <FileText className="text-primary h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold">Legal Document Analysis</h3>
//                 <p className="text-muted-foreground">
//                   Extract key clauses, compare contracts, and answer specific
//                   questions about legal documents.
//                 </p>
//               </div>
//               <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary/10 w-fit rounded-full p-2">
//                   <Database className="text-primary h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold">Knowledge Management</h3>
//                 <p className="text-muted-foreground">
//                   {`Create an intelligent knowledge base from your company's
//                   internal documentation.`}
//                 </p>
//               </div>
//               <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary/10 w-fit rounded-full p-2">
//                   <MessageSquare className="text-primary h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold">Customer Support</h3>
//                 <p className="text-muted-foreground">
//                   Build AI assistants that can answer questions based on your
//                   product documentation.
//                 </p>
//               </div>
//               <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary/10 w-fit rounded-full p-2">
//                   <Globe className="text-primary h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold">Content Creation</h3>
//                 <p className="text-muted-foreground">
//                   Generate content based on your existing materials while
//                   maintaining brand consistency.
//                 </p>
//               </div>
//               <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary/10 w-fit rounded-full p-2">
//                   <Zap className="text-primary h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold">Competitive Intelligence</h3>
//                 <p className="text-muted-foreground">
//                   Analyze competitor materials and extract valuable insights for
//                   strategic planning.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* Pricing Section */}
//         <section
//           id="pricing"
//           className="bg-muted w-full rounded-xl py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="bg-primary text-primary-foreground inline-block rounded-lg px-3 py-1 text-sm">
//                   Pricing
//                 </div>
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
//                   Simple, transparent pricing
//                 </h2>
//                 <p className="text-muted-foreground max-w-[900px] md:text-xl">
//                   {`Choose the plan that's right for your needs. All plans include
//                   a 14-day free trial.`}
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
//               <div className="bg-background flex flex-col rounded-lg border p-6 shadow-sm">
//                 <div className="space-y-2">
//                   <h3 className="text-2xl font-bold">Starter</h3>
//                   <p className="text-muted-foreground">
//                     For individuals and small projects
//                   </p>
//                 </div>
//                 <div className="mt-4 flex items-baseline">
//                   <span className="text-3xl font-bold">$29</span>
//                   <span className="text-muted-foreground ml-1">/month</span>
//                 </div>
//                 <ul className="mt-6 space-y-2">
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="text-primary h-4 w-4" />
//                     <span>Up to 1,000 pages</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="text-primary h-4 w-4" />
//                     <span>Basic models</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="text-primary h-4 w-4" />
//                     <span>100 queries/day</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="text-primary h-4 w-4" />
//                     <span>Email support</span>
//                   </li>
//                 </ul>
//                 <Button className="mt-8">Start Free Trial</Button>
//               </div>
//               <div className="bg-background relative flex flex-col rounded-lg border p-6 shadow-sm">
//                 <div className="bg-primary text-primary-foreground absolute -top-4 right-0 left-0 mx-auto w-fit rounded-full px-3 py-1 text-xs font-medium">
//                   Most Popular
//                 </div>
//                 <div className="space-y-2">
//                   <h3 className="text-2xl font-bold">Professional</h3>
//                   <p className="text-muted-foreground">
//                     For growing teams and businesses
//                   </p>
//                 </div>
//                 <div className="mt-4 flex items-baseline">
//                   <span className="text-3xl font-bold">$99</span>
//                   <span className="text-muted-foreground ml-1">/month</span>
//                 </div>
//                 <ul className="mt-6 space-y-2">
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="text-primary h-4 w-4" />
//                     <span>Up to 10,000 pages</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="text-primary h-4 w-4" />
//                     <span>Advanced models</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="text-primary h-4 w-4" />
//                     <span>1,000 queries/day</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="text-primary h-4 w-4" />
//                     <span>Priority support</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="text-primary h-4 w-4" />
//                     <span>API access</span>
//                   </li>
//                 </ul>
//                 <Button className="mt-8">Start Free Trial</Button>
//               </div>
//               <div className="bg-background flex flex-col rounded-lg border p-6 shadow-sm">
//                 <div className="space-y-2">
//                   <h3 className="text-2xl font-bold">Enterprise</h3>
//                   <p className="text-muted-foreground">
//                     For large organizations with specific needs
//                   </p>
//                 </div>
//                 <div className="mt-4 flex items-baseline">
//                   <span className="text-3xl font-bold">Custom</span>
//                 </div>
//                 <ul className="mt-6 space-y-2">
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="text-primary h-4 w-4" />
//                     <span>Unlimited pages</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="text-primary h-4 w-4" />
//                     <span>All models + custom models</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="text-primary h-4 w-4" />
//                     <span>Unlimited queries</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="text-primary h-4 w-4" />
//                     <span>Dedicated account manager</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="text-primary h-4 w-4" />
//                     <span>Custom integrations</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="text-primary h-4 w-4" />
//                     <span>On-premise deployment options</span>
//                   </li>
//                 </ul>
//                 <Button className="mt-8">Contact Sales</Button>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* Final CTA Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
//             <div className="space-y-2">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
//                 Ready to transform your documents?
//               </h2>
//               <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                 Join hundreds of organizations that are already using Alchemist
//                 to unlock the knowledge in their documents.
//               </p>
//             </div>
//             <div className="flex flex-col gap-4 min-[400px]:flex-row lg:justify-end">
//               <div className="grid w-full gap-2">
//                 <Input type="email" placeholder="Enter your email" />
//                 <Button size="lg" className="w-full gap-1">
//                   Start Your Free Trial <ArrowRight className="h-4 w-4" />
//                 </Button>
//                 <p className="text-muted-foreground text-center text-xs">
//                   No credit card required. 14-day free trial.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <footer className="w-full border-t py-6 md:py-12">
//         <div className="container flex flex-col gap-8 px-4 md:px-6">
//           <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
//             <div className="flex flex-col gap-3 lg:max-w-sm">
//               <div className="flex items-center gap-2">
//                 <FlaskConical className="text-primary h-6 w-6" />
//                 <span className="text-xl font-bold">Alchemist</span>
//               </div>
//               <p className="text-muted-foreground text-sm">
//                 Transform your documents into intelligent knowledge with our
//                 powerful RAG-as-a-service platform.
//               </p>
//               <div className="flex gap-4">
//                 <Link
//                   href="#"
//                   className="text-muted-foreground hover:text-foreground">
//                   <Twitter className="h-5 w-5" />
//                   <span className="sr-only">Twitter</span>
//                 </Link>
//                 <Link
//                   href="#"
//                   className="text-muted-foreground hover:text-foreground">
//                   <Facebook className="h-5 w-5" />
//                   <span className="sr-only">Facebook</span>
//                 </Link>
//                 <Link
//                   href="#"
//                   className="text-muted-foreground hover:text-foreground">
//                   <Instagram className="h-5 w-5" />
//                   <span className="sr-only">Instagram</span>
//                 </Link>
//                 <Link
//                   href="#"
//                   className="text-muted-foreground hover:text-foreground">
//                   <Linkedin className="h-5 w-5" />
//                   <span className="sr-only">LinkedIn</span>
//                 </Link>
//                 <Link
//                   href="#"
//                   className="text-muted-foreground hover:text-foreground">
//                   <Github className="h-5 w-5" />
//                   <span className="sr-only">GitHub</span>
//                 </Link>
//               </div>
//             </div>
//             <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
//               <div className="space-y-3">
//                 <h4 className="text-sm font-medium">Product</h4>
//                 <ul className="space-y-2">
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       Features
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       Pricing
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       API
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       Integrations
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div className="space-y-3">
//                 <h4 className="text-sm font-medium">Company</h4>
//                 <ul className="space-y-2">
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       About
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       Blog
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       Careers
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       Contact
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div className="space-y-3">
//                 <h4 className="text-sm font-medium">Resources</h4>
//                 <ul className="space-y-2">
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       Documentation
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       Guides
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       Support
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       API Reference
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div className="space-y-3">
//                 <h4 className="text-sm font-medium">Legal</h4>
//                 <ul className="space-y-2">
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       Privacy
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       Terms
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       Cookie Policy
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="#"
//                       className="text-muted-foreground hover:text-foreground text-sm">
//                       Security
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <p className="text-muted-foreground text-xs">
//               © {new Date().getFullYear()} Alchemist. All rights reserved.
//             </p>
//             <p className="text-muted-foreground text-xs">
//               Made with ❤️ for document intelligence
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
import { permanentRedirect } from "next/navigation";

export default function LandingPage() {
  permanentRedirect("/login");
}
