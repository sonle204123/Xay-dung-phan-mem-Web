import Banner from "../Banner/Banner";
import MedicalServices from "../MedicalServices/MedicalServices";
import Neighborhoods from "../Neighborhoods/Neighborhoods";
import BeforeAfterGallery from "../Neighborhoods/BeforeAfterGallery";
import Testimonials from "../Neighborhoods/Testimonials";
import HealthSolution from "../Neighborhoods/HealthSolution";

function Home() {
  return (
    <>
      <Banner></Banner>
      <MedicalServices></MedicalServices>
      <Neighborhoods></Neighborhoods>
      <BeforeAfterGallery></BeforeAfterGallery>
      <Testimonials></Testimonials>
      <HealthSolution></HealthSolution>
    </>
  );
}

export default Home;
