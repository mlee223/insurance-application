import React, { useCallback, useEffect } from "react";
import { useDispatcher } from "../data/global/dispatcher";
import {
  ApplicationSelectors,
  useStateSelector,
} from "../data/global/selectors";
import ApplicationForm from "../forms/ApplicationForm";

const Application: React.FC = () => {
  const application = useStateSelector(ApplicationSelectors.application);
  const { dispatcher } = useDispatcher();

  const retrieveApplication = useCallback(() => {
    dispatcher.application.retrieve("1");
  }, [dispatcher]);

  useEffect(() => {
    retrieveApplication();
  }, []);

  return application ? <ApplicationForm data={application} /> : <></>;
};

export default Application;
