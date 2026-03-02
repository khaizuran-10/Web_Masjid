import { useEffect } from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ProgramsSection from '../components/ProgramsSection';
import DonationSection from '../components/DonationSection';

const Home = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => observer.observe(el));

        return () => reveals.forEach(el => observer.unobserve(el));
    }, []);

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
