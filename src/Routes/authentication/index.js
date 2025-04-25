import Login from "../../pages/login";
import Home from "../../pages/home";
import { login, home, generalInfo, fishingVesselDetails, catchData, fishingEffortPerformance, bycatchAndVesselSightings, surveyFeedback, station, tracking } from "../pathName";
import GeneralInformation from "../../pages/generalInfo";
import FishingVesselDetails from "../../pages/fishingVesselDetails";
import CatchData from "../../pages/catchData";
import FishingEffortPerformance from "../../pages/fishingEffortPerformance";
import BycatchAndVesselSightings from "../../pages/bycatchAndVesselSightings";
import SurveyFeedback from "../../pages/Feedback";
import Station from "../../pages/station";
import Tracking from "../../pages/tracking";

const authRoutes = [
  {
    title: "login",
    component: Login,
    path: login,
  },
  {
    title: "General Information",
    component: GeneralInformation,
    path: generalInfo,
  },
  {
    title: "Fishing Vessel Details",
    component: FishingVesselDetails,
    path: fishingVesselDetails,
  },
  {
    title: "Fishing Effort Performance",
    component: FishingEffortPerformance,
    path: fishingEffortPerformance,
  },
  {
    title: "Catch Data",
    component: CatchData,
    path: catchData,
  },
  {
    title: "Bycatch And Vessel Sightings",
    component: BycatchAndVesselSightings,
    path: bycatchAndVesselSightings,
  },
  {
    title: "SurveyFeedback",
    component: SurveyFeedback,
    path: surveyFeedback,
  },
  {
    title: "home",
    component: Home,
    path: home,
  },
  {
    title: "station/id",
    component: Station,
    path: station,
  },
  {
    title: "tracking/id",
    component: Tracking,
    path: tracking,
  },

];

export default authRoutes;