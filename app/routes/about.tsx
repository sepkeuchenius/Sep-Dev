import { Link } from "react-router";
import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Sep Keuchenius" },
    { name: "description", content: "About Sep Keuchenius - Senior Full-stack & AI Engineer" },
  ];
}

export default function About() {
  return (
    <main className="flex flex-col items-center min-h-screen py-4 sm:py-6 md:py-10 px-4 sm:px-6">
      <div className="w-full max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#89986D] hover:text-[#6D7A55] transition-colors mb-6 sm:mb-8"
        >
          ← Back to home
        </Link>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">About me</h1>
        
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
          <section className="border-[#C5D89D] rounded-lg p-6 sm:p-8 md:p-10 border-draw-hover">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Who I am</h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              A skilled, quick-learning, diverse full-stack engineer open to complex challenges! 
              Comfortable behind a screen, but also in front of an audience—whether it's fellow 
              developers or less technically skilled people, it doesn't matter. I take energy from 
              building complete, unique tools that help people, not from automating entire jobs.
            </p>
          </section>

          <section className="border-[#C5D89D] rounded-lg p-6 sm:p-8 md:p-10 border-draw-hover">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Experience</h2>
            
            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">Y. Digital / Lead Developer</h3>
                  <span className="text-sm sm:text-base text-[#6D7A55]">September 2023 - PRESENT, Zeist</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed">
                  As Lead Developer, I am responsible for a team of highly skilled AI engineers and 
                  software engineers. Together, we're building an intelligent, highly configurable, 
                  scalable, and secure text-focused AI platform. My strength in this role is 
                  understanding customers' problems, translating them into actionable implementation 
                  plans in collaboration with the P.O., and continuously optimizing. In addition to 
                  addressing code challenges, I am responsible for keeping the development workflow 
                  easy to understand, enabling quick iterations, and ensuring that all developers 
                  feel they're working in a supportive environment.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">Y. Digital / AI Engineer</h3>
                  <span className="text-sm sm:text-base text-[#6D7A55]">September 2021 - September 2023, Zeist</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed">
                  As an AI engineer, I was at the forefront of developing features for our AI platform, 
                  testing & validating those in production with the customer, and always striving for 
                  the most optimal solution in the code. Using already existing AI solutions, finetuning 
                  those, but also training models, creating synthetic data, and making sure that the 
                  infrastructure runs smoothly in Development, Testing, and Production environments.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">Sep Dev / Freelance Software Developer</h3>
                  <span className="text-sm sm:text-base text-[#6D7A55]">September 2020 - Now, Zeist</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed">
                  During my studies, I started my own freelance company and helped many clients with 
                  various issues. The biggest project was as an automation engineer at an accounting 
                  firm. I was responsible for automating manual processes in HubSpot using efficient, 
                  secure serverless scripts.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">WXNDER / Owner, Software Developer</h3>
                  <span className="text-sm sm:text-base text-[#6D7A55]">September 2020 - Now, Leersum</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed">
                  Part of the creation of WXNDER, which was a company that sold a combination of picnic 
                  boxes with local produce and hiking routes. During COVID, the aim was to provide luxury 
                  articles such as wine, crackers, cheese, beer, etc., from local business owners who 
                  provided the customer with a restaurant-like high-quality experience, out in nature. 
                  The hiking routes were designed to showcase the area's natural beauty and allow customers 
                  to explore it. My function was to be technically responsible for the website (custom 
                  WordPress template), including database management, Slack integration, and an admin 
                  interface to manage assets (inventory), orders, and CRM.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">PB International / Junior Software Developer</h3>
                  <span className="text-sm sm:text-base text-[#6D7A55]">September 2020 - Now, Zeist</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed">
                  Designed and created a complete internal asset management tool in PHP that solved 
                  several nasty, time-wasting problems for all employees. The tool included a 
                  straightforward, easy-to-understand UI, secure SQL database connection, and 
                  authentication.
                </p>
              </div>
            </div>
          </section>

          <section className="border-[#C5D89D] rounded-lg p-6 sm:p-8 md:p-10 border-draw-hover">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Education</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">University of Utrecht / Bachelor's AI</h3>
                  <span className="text-sm sm:text-base text-[#6D7A55]">2018 - 2021</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed">
                  With a thesis focused on an NLP classification problem (7.5/10), I completed my 
                  bachelor's in AI with strong grades. Besides my talent for conceptual programming 
                  and modelling, what particularly stood out to me as a valuable learning experience 
                  in Utrecht was the depth of the more cognitive, ethical, and especially philosophical 
                  aspects of the studies. Some AI should be/have been thought through more carefully.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">Montessori Lyceum Herman Jordan / VWO</h3>
                  <span className="text-sm sm:text-base text-[#6D7A55]">2011 - 2017</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed">
                  With a strong technical focus and an end report in Shortest Paths and algorithms, 
                  I completed VWO with ease (in most parts ;).
                </p>
              </div>
            </div>
          </section>

          <section className="border-[#C5D89D] rounded-lg p-6 sm:p-8 md:p-10 border-draw-hover">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
              <div>
                <h4 className="font-semibold mb-2">Backend & Languages</h4>
                <p>Python - C# - Rust - SQL - SPARQL - RDF - SHACL - APIs - Pydantic - NLP</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Frontend</h4>
                <p>TypeScript - React (React Router - Remix) - Prisma - CSS - HTML - JS</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">DevOps & Infrastructure</h4>
                <p>Docker - Kubernetes - Helm - Prometheus - Grafana - CI/CD - Linux - Git - KinD - Skaffold</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">AI & ML</h4>
                <p>NLP - Knowledge Graphs - RAG - OpenAI - LangChain - LLMs - MLOps - Huggingface - Transformers</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

