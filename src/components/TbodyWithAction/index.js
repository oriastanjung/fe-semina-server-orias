import React from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { Image, Spinner } from "react-bootstrap";
import moment from "moment";
import { config } from "../../configs";

function TbodyWithAction({
  data,
  display,
  editUrl,
  deleteAction,
  customAction,
  toggleStatusBank,
  actionNotDisplay,
  detailPartisipan,
  status,
}) {
  const navigate = useNavigate();
  return (
    <tbody>
      {status === "process" ? (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: "center" }}>
            <div className="flex items-center justify-center">
              <Spinner animation="border" variant="primary" />
            </div>
          </td>
        </tr>
      ) : data.length ? (
        data.map((data, index) => {
          return (
            <tr key={index}>
              {Object.keys(data).map(
                (key) =>
                  display.indexOf(key) > -1 && (
                    <td key={key}>
                      {key === "avatar" ? (
                        <Image
                          height={40}
                          width={40}
                          roundedCircle
                          src={`${config.api_image}/${data[key]}`}
                        />
                      ) : key === "date" ? (
                        moment(data[key]).format("DD-MM-YYYY, h:mm:ss a")
                      ) : key === "imageUrl" ? (
                        <Image
                          height={40}
                          width={40}
                          roundedCircle
                          src={`${config.api_image}/${data[key]}`}
                        />
                      ) : key === "status" ? (
                        <p>{data[key] === true ? "true" : "false"}</p>
                      ) : key === "personalDetail" ? (
                        <p>
                          {data[key].firstName} {data[key].lastName}
                        </p>
                      ) : (
                        data[key]
                      )}
                    </td>
                  )
              )}
              {!actionNotDisplay && (
                <td>
                  {editUrl && (
                    <Button
                      variant="success"
                      size={"sm"}
                      action={() => navigate(`${editUrl}/${data._id}`)}
                    >
                      Edit
                    </Button>
                  )}
                  {deleteAction && (
                    <Button
                      className={"mx-2"}
                      variant="danger"
                      size={"sm"}
                      action={() => deleteAction(data._id)}
                    >
                      Hapus
                    </Button>
                  )}
                  {toggleStatusBank && (
                    <Button
                      className={"mx-2"}
                      variant="warning"
                      size={"sm"}
                      action={() => toggleStatusBank(data._id)}
                    >
                      Ubah Status
                    </Button>
                  )}
                  {detailPartisipan && (
                    <Button
                      className={"mx-2"}
                      variant="info"
                      size={"sm"}
                      action={() => navigate(`${detailPartisipan}/${data._id}`)}
                    >
                      Detail Partisipan
                    </Button>
                  )}
                </td>
              )}
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: "center" }}>
            Tidak Ditemukan Data
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default TbodyWithAction;
