import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ApplicationService from "../services/Application";
import IApplicationData from "../types/Application";

const Application: React.FC = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialApplicationState: IApplicationData = {
    id: null,
    firstName: "",
    lastName: "",
    birthDate: "",
    address: "",
    vehicle: [],
    published: false,
  };
  const [currentApplication, setCurrentApplication] =
    useState<IApplicationData>(initialApplicationState);
  const [message, setMessage] = useState<string>("");

  const getApplication = (id: string) => {
    ApplicationService.get(id)
      .then((response: any) => {
        setCurrentApplication(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getApplication(id);
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentApplication({ ...currentApplication, [name]: value });
  };

  const updatePublished = (status: boolean) => {
    var data = {
      id: currentApplication.id,
      firstName: currentApplication.firstName,
      lastName: currentApplication.lastName,
      birthDate: currentApplication.birthDate,
      address: currentApplication.address,
      vehicle: currentApplication.vehicle,
      published: status,
    };

    ApplicationService.update(currentApplication.id, data)
      .then((response: any) => {
        console.log(response.data);
        setCurrentApplication({ ...currentApplication, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const updateApplication = () => {
    ApplicationService.update(currentApplication.id, currentApplication)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The application was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteApplication = () => {
    ApplicationService.remove(currentApplication.id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/applications");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentApplication ? (
        <div className="edit-form">
          <h4>Application</h4>
          <form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={currentApplication.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={currentApplication.lastName}
                onChange={handleInputChange}
              />
            </div>

            {/* <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentApplication.published ? "Published" : "Pending"}
            </div> */}
          </form>

          {currentApplication.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button
            className="badge badge-danger mr-2"
            onClick={deleteApplication}
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateApplication}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Application...</p>
        </div>
      )}
    </div>
  );
};

export default Application;
