import React from 'react'
import SmoothScroll from './components/SmoothScroll'
import { ThemeProvider } from './context/ThemeContext'
import CustomCursor from './components/cursor/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import Stats         from './components/Stats'
import About         from './components/About'
import MyJourney     from './components/MyJourney'
import Projects      from './components/Projects'
import WorkGallery   from './components/WorkGallery'
import Skills        from './components/Skills'
import Certifications from './components/Certifications'
import Education     from './components/Education'
import Experience    from './components/Experience'
import CallToAction  from './components/CallToAction'
import Contact       from './components/Contact'
import Footer        from './components/Footer'

export default function App() {
  return (
    <ThemeProvider>
    <SmoothScroll>
      <div className="relative min-h-screen bg-bg-primary text-body overflow-x-hidden">
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <About />
          <MyJourney />
          <Projects />
          <WorkGallery />
          <Skills />
          <Certifications />
          <Education />
          <Experience />
          <CallToAction />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
    </ThemeProvider>
  )
}
