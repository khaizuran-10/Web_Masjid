import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ProgramsSection from '../components/ProgramsSection';
import DonationSection from '../components/DonationSection';

const Home = () => {
    return (
        <main>
            <Hero />
            <div className="reveal">
                <AboutSection />
            </div>
            <div className="reveal">
                <ProgramsSection />
            </div>
            <div className="reveal">
                <DonationSection />
            </div>
        </main>
    );
};

export default Home;
