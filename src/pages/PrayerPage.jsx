import PrayerTimes from '../components/PrayerTimes';

const PrayerPage = () => {
    // Add top padding to account for fixed navbar
    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <PrayerTimes />
        </div>
    );
};

export default PrayerPage;
