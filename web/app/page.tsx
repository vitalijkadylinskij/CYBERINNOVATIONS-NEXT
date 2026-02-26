"use client"

import { useState } from 'react';
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TechnologyDirections, type CommitteeKey } from './components/TechnologyDirections';
import {GoalsAndAccents} from "./components/GoalsAndAccents";
import { Challenges } from './components/Challenges';
import { TargetAudience } from './components/TargetAudience';
import { Priorities } from './components/Priorities';
import { Team } from './components/Team';
import { Achievements } from './components/Achievements';
import { Documents } from './components/Documents';
import { Footer } from './components/Footer';

export default function Home() {
  const [activeCommittee, setActiveCommittee] = useState<CommitteeKey>('ai');

  return (
    <div className="min-h-screen bg-[#F3F4E9] scroll-smooth">
      <Header />
      <main>
        <Hero activeCommittee={activeCommittee} />
        <GoalsAndAccents />
        <Challenges />
        <TargetAudience />
        <TechnologyDirections activeKey={activeCommittee} onActiveKeyChange={setActiveCommittee} />
        <Priorities />
        <Team />
        <Achievements />
        <Documents />
      </main>
      <Footer />
    </div>
  );
}
