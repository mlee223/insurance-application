import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import { Link } from "react-router-dom";
import IApplicationData from "../types/Application";
import ApplicationService from "../services/Application";

const ApplicationsList: React.FC = () => {
  const [applications, setApplications] = useState<Array<IApplicationData>>([]);
  const [currentApplication, setCurrentApplication] =
    useState<IApplicationData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  const retrieveApplications = () => {
    ApplicationService.getAll()
      .then((response: any) => {
        setApplications(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveApplications();
    setCurrentApplication(null);
    setCurrentIndex(-1);
  };

  const setActiveApplication = (
    application: IApplicationData,
    index: number
  ) => {
    setCurrentApplication(application);
    setCurrentIndex(index);
  };

  const removeAllApplications = () => {
    ApplicationService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    ApplicationService.findByTitle(searchTitle)
      .then((response: any) => {
        setApplications(response.data);
        setCurrentApplication(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTitle(e.target.value);
    },
    [setSearchTitle]
  );

  useEffect(() => {
    retrieveApplications();
  }, []);

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Applications List</h4>

        <ul className="list-group">
          {applications &&
            applications.map((application, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveApplication(application, index)}
                key={index}
              >
                {`${application.firstName} ${application.lastName}`}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllApplications}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentApplication ? (
          <div>
            <h4>Application</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {`${currentApplication.firstName} ${currentApplication.lastName}`}
            </div>
            <div>
              <label>
                <strong>Birth Date:</strong>
              </label>{" "}
              {currentApplication.birthDate}
            </div>
            <div>
              <label>
                <strong>Address:</strong>
              </label>{" "}
              {currentApplication.address}
            </div>

            <Link
              to={"/applications/" + currentApplication.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Application...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsList;
