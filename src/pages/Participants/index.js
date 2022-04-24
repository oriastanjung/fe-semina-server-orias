import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import Table from "../../components/TableWithAction";
import SearchInput from "../../components/SearchInput";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchParticipants,
} from "../../redux/participants/actions";
import AlertMessage from "../../components/Alert";


function ParticipantsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const notif = useSelector((state) => state.notif);
  const participants = useSelector((state) => state.participants);

  useEffect(() => {
    return () => {
      if (!user.token) return navigate("/login");
    };
  });

  useEffect(() => {
    dispatch(fetchParticipants());
  }, [dispatch]);


  return (
    <Container>
      
      {/* <Button action={() => navigate('/speakers/create')}>Tambah</Button> */}
      <BreadCrumb textSecound={"Participants"} />
      {notif.status && (
        <AlertMessage type={notif.typeNotif} message={notif.message} />
      )}
      {/* {console.log(participants)} */}
      <Table
        status={participants.status}
        thead={["Nama Partisipan", "Aksi"]}
        data={participants.data}
        tbody={["personalDetail"]}
        detailPartisipan = {'/participants/detail'}
        withoutPagination
      />
    </Container>
  );
}

export default ParticipantsPage;
