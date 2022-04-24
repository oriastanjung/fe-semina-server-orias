import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/BreadCrumb";
import Alert from "../../components/Alert";
import { getData } from "../../utils/fetchData";
import { useParams } from "react-router-dom";
import CardWithList from "../../components/CardWithLists";

function ParticipantsDetail() {
  const { participantsId } = useParams();

  const [personalDetail, setPersonalDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const fetchOneCategories = async () => {
    const res = await getData(`api/v1/participants/dashboard`);
    // console.log(res.data.data);
    res.data.data.map((item) => {
      if (item._id === participantsId) {
        setPersonalDetail({
          firstName: item.personalDetail.firstName,
          lastName: item.personalDetail.lastName,
          email: item.personalDetail.email,
          role: item.personalDetail.role,
        });
      }
    });
  };

  useEffect(() => {
    fetchOneCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <BreadCrumb
        textSecound={"Participants"}
        urlSecound={"/participants"}
        textThird="Detail"
      />

      {alert.status && <Alert type={alert.type} message={alert.message} />}

      <div className="container mx-auto">
        <div className="row">
          <div className="col">
            <CardWithList
              cardHeader={"Personal Detail"}
              variant={"flush"}
              widthProps={"18rem"}
              labels={["Nama Depan", "Nama Belakang", "Email", "Role"]}
              items={[personalDetail.firstName, personalDetail.lastName, personalDetail.email, personalDetail.role]}
            
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ParticipantsDetail;
