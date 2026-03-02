import PrayerTimes from '../components/PrayerTimes';
import PageHeader from '../components/PageHeader';

const PrayerPage = () => {
    return (
        <main className="prayer-page">
            <PageHeader
                title="Jadwal Sholat"
                subtitle="Waktu Ibadah"
                description="Jadwal sholat akurat untuk wilayah Mataram, Lombok dan sekitarnya (WITA)."
            />
            <div className="reveal">
                <PrayerTimes />
            </div>
        </main>
    );
};

export default PrayerPage;
