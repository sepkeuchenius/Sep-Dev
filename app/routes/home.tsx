import * as React from "react";
import { Brain, Code, Rocket, Server } from "lucide-react";
import type { Route } from "./+types/home";
import { Dots } from "../components/dots";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sep Keuchenius" },
    { name: "description", content: "Sep Keuchenius" },
  ];
}

export default function Home() {
  return (
    <main className="flex flex-col items-center h-full py-10">
    <div className="flex flex-col items-center justify-end h-1/4 gap-5">
      {/* <img src="/images/sep-transparent.png" alt="Sep Keuchenius" className="w-64 rounded-full backdrop-opacity-15" /> */}
      <h1 className="text-2xl font-bold center">Sep Keuchenius</h1>
      <h1 className="text-l ">Software Engineer - AI Engineer - Dev Lead</h1>
    
    </div>
    <SoftwareChain />
    <div className="flex flex-row items-center justify-center gap-20">
      <Article>
        <h1 className="text-2xl font-bold center">About me</h1>
        <p className="text-l">I am a software engineer with a passion for building products that help people live better lives.</p>
        <ArticleButton>Why</ArticleButton>
      </Article>

      <Article>
        <h1 className="text-2xl font-bold center">My work</h1>
        <p className="text-l">I have worked on a variety of projects, from small side projects to large scale products.</p>
        <ArticleButton>Show me</ArticleButton>
      </Article>
    </div>
    {/* <Dots /> */}
    </main>
  )
}

function Article({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start justify-start gap-10 w-96 border-[#C5D89D] rounded-lg p-10 border-draw-hover">
      {children}
    </div>
  )
}

function ArticleButton({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row items-center justify-center gap-10 bg-[#89986D] rounded-lg p-5 text-white cursor-pointer hover:bg-[#6D7A55] transition-all duration-300">
      {children}
    </div>
  )
}

function SoftwareChain() {
  return (
    <div className="flex flex-row items-center h-1/2 w-full gap-15">
      {/* Dotted line from left edge to first item */}
      <div className="flex-1 h-0 border-t-2 border-dotted border-[#3a3a3a] opacity-30" />
      
      <Backend />
      
      {/* Dotted line between items */}
      <div className="h-0 w-5 border-t-2 border-dotted border-[#3a3a3a] opacity-30" />
      
      <Frontend />
      
      <div className="h-0 w-5 border-t-2 border-dotted border-[#3a3a3a] opacity-30" />
      
      <AI />
      
      <div className="h-0 w-5 border-t-2 border-dotted border-[#3a3a3a] opacity-30" />
      
      <DevOps />
      
      {/* Dotted line from last item to right edge */}
      <div className="flex-1 h-0 border-t-2 border-dotted border-[#3a3a3a] opacity-30" />
    </div>
  )
}

function SoftwareChainItem({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center p-15 gap-5 rounded cursor-pointer border-draw-hover rounded-full w-16">
      <p className="text-lg">{description}</p>
      {icon}
    </div>
  )
}

function Backend() {
  return (
    <SoftwareChainItem title="Backend" description="Backend" icon={<Server />} />
  )
}

function Frontend() {
  return (
      <SoftwareChainItem title="Frontend" description="Frontend" icon={<Code />} />
  )
}

function AI() {
  return (
    <SoftwareChainItem title="AI" description="AI" icon={<Brain />} />
  )
}

function DevOps() {
  return (
    <SoftwareChainItem title="DevOps" description="DevOps" icon={<Rocket />} />
  )
}

