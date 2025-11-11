import CityDetailsCard from "../Components/CityDetailsCard";
import { useAppContext } from "../Context/AppStateContext";
import { useParams } from "react-router-dom";

const CityDetailsPage = () => {
  const { searchCityResult } = useAppContext();
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const city = searchCityResult.find((city) => city.id === id);
  if (!city) {
    return <div>City not found</div>;
  }
  return <CityDetailsCard city={city} />;
};

export default CityDetailsPage;
