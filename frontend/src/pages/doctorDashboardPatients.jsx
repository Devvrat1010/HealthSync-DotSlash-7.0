import PatientDashboardNavbar from "../components/patientDashboardNavbar";
import PatientsInBed from "../assets/patient in bed.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import CurrPatients from "../components/currPatients";
import DiagnosisCard from "../components/diagnosisCard";

export default function doctorDashboardPatients() {
    const [currPatients, setCurrPatients] = useState(["check", "cad"]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/doctor/get-patients", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                console.log(res.data);
                setCurrPatients(res.data.patients);
            });
    }, []);

    return (
        <div className="h-full">
            <PatientDashboardNavbar
                links={[
                    { name: "Patients", path: "/doctorDashboard/patients" },
                    { name: "Articles", path: "/doctorDashboard/articles" },
                ]}
                currPage="Patients"
            />
            {currPatients.length > 0 ? (
                <>
                    <CurrPatients allPatients={currPatients} />
                </>
            ) : (
                <div className="flex flex-center flex-col gap-5 justify-center items-center w-screen h-5/6">
                    <div className="w-fit h-fit">
                        <img src={PatientsInBed} alt="" />
                    </div>
                    {/* </div> */}
                    <div className="text-center font-inter font-medium opacity-60 text-base">
                        Once patients are assigned to you
                        <br />
                        they will be shown here
                    </div>
                </div>
            )}
            <hr className="border-0 border-t-2 border-[#0f0f11]" />
        </div>
    );
}
