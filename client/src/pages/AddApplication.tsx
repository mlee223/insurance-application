import React, { useState, ChangeEvent, useCallback } from "react";
import IApplicationData from "../types/Application";
import ApplicationService from "../services/Application";
import CustomTextInput from "../components/CustomTextInput";

const AddApplication: React.FC = () => {
  const initialApplicationState: IApplicationData = {
    id: null,
    firstName: "",
    lastName: "",
    birthDate: "",
    address: "",
    vehicle: [],
  };
  const [application, setApplication] = useState<IApplicationData>(
    initialApplicationState
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setApplication({ ...application, [name]: value });
    },
    [application, setApplication]
  );

  const saveApplication = () => {
    var data = {
      firstName: application.firstName,
      lastName: application.lastName,
      birthDate: "",
      address: "",
      vehicle: [],
    };

    ApplicationService.create(data)
      .then((response: any) => {
        setApplication({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          birthDate: response.data.birthDate,
          address: response.data.address,
          vehicle: response.data.vehicle,
        });
        setSubmitted(true);
      })
      .catch((e: Error) => {
        setError(e);
      });
  };

  const newApplication = () => {
    setApplication(initialApplicationState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newApplication}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <CustomTextInput
            id="firstName"
            label="First Name"
            name="firstName"
            value={application.firstName}
            onChange={handleInputChange}
          />

          <CustomTextInput
            id="lastName"
            label="Last Name"
            name="lastName"
            value={application.lastName}
            onChange={handleInputChange}
          />

          <button onClick={saveApplication} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddApplication;
