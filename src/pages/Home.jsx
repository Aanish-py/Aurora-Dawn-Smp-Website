import HeroBackdrop from '../components/HeroBackdrop';
import MainHero from '../components/MainHero';
import LogoLoop from '../components/LogoLoop';
import FeatureGrid from '../components/FeatureGrid';
import TwoColumnFeatures from '../components/TwoColumnFeatures';
import StatsSection from '../components/StatsSection';

const Home = () => {
    return (
        <>
            <HeroBackdrop />
            <MainHero />
            <LogoLoop />
            <TwoColumnFeatures />
            <FeatureGrid />
            <StatsSection />
        </>
    );
};

export default Home;
