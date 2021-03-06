import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/categories/actions';
import AlertMessage from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetchData';
import { setNotif } from '../../redux/notif/actions';

function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const notif = useSelector((state) => state.notif);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    return () => {
      if (!user.token) return navigate('/login');
    };
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`api/v1/categories/${id}`);

        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'success',
        //   title: `Berhasil hapus kategori ${res.data.data.name}`,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });

        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus kategori ${res.data.data.name}`
          )
        );

        dispatch(fetchCategories());
      }
    });
  };

  return (
    <Container>
      <Button action={() => navigate('/categories/create')}>Tambah</Button>
      <BreadCrumb textSecound={'Categories'} />
      {notif.status && (
        <AlertMessage type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={categories.status}
        thead={['Nama', 'Aksi']}
        data={categories.data}
        tbody={['name']}
        editUrl={`/categories/edit`}
        deleteAction={(id) => handleDelete(id)}
        withoutPagination
      />
    </Container>
  );
}

export default Categories;
