import NavBar from "~/components/NavBar";
import {ArrowRight, ArrowUpRight, Clock, Layers} from "lucide-react";
import Button from "~/components/ui/Button";
import Upload from "~/components/Upload";


export default function Home() {
  return <main className="min-h-screen bg-background text-foreground relative z-10">
    <NavBar/>
    <div className="home">
      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse"></div>
          </div>
          <p>Introducing SAV 1.0</p>
        </div>
        <h1>Build beautiful Spaces at the speed of thought with SAV</h1>
        <p className="subtitle">
          SAV is an a powerfull AI environment
          that helps you visualize architectural projects
          with a single click .
        </p>
        <div className="actions">
          <a href="#upload" className="cta">
            Start Building <ArrowRight className="icon"/>
          </a>
          <Button variant="outline">
            Watch Demo
          </Button>
        </div>
        <div id="upload" className="upload-shell">
          <div className="grid-overlay" />
            <div className="upload-card">
              <div className="upload-head">
                <div className="upload-icon">
                  <Layers className="icon" />
                </div>
                <h3>Upload your plan</h3>
                <p>JPG,PNG, formats up to 10MB</p>
              </div>
              <Upload />
            </div>
        </div>
      </section>
      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Projects</h2>
              <p>Your latest work and shared, community projects, all in one , place.</p>
            </div>
          </div>
          <div className="projects-grid">
            <div className="project-card group">
              <div className="preview">
                <div className="badge">
                  <span>Community</span>
                </div>
              </div>
              <div className="card-body">
                <div>
                  <h3>Project Manhattan</h3>
                  <div className="meta">
                    <Clock size={12} />
                    <span>{new Date('01.01.2027').toLocaleDateString()}By Mohamed Moussa</span>
                  </div>
                </div>
                <div className="arrow">
                  <ArrowUpRight size={18}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
}
