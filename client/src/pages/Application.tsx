import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatcher } from "../data/global/dispatcher";
import {
  ApplicationSelectors,
  useStateSelector,
} from "../data/global/selectors";
import ApplicationForm from "../forms/ApplicationForm";

const Application: React.FC = () => {
  const { id: applicationId } = useParams();

  const application = useStateSelector(ApplicationSelectors.application);
  const { dispatcher } = useDispatcher();

  const retrieveApplication = useCallback(() => {
    if (applicationId) {
      dispatcher.application.retrieve(applicationId);
    }
  }, [applicationId, dispatcher]);

  useEffect(() => {
    retrieveApplication();
  }, []);

  return application ? <ApplicationForm data={application} /> : <></>;
};

export default Application;
